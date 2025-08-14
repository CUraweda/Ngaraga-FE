import { useState, useEffect } from "react";
import type { Address } from "@/pages/user/Checkout";
import { X } from "lucide-react";
import addressStore from "@/store/address.store";
import userStore from "@/store/user.store";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, "id">) => void;
  address?: Address | null; // data lama (edit), boleh null
}

type FormState = {
  address: {
    userId: string | null;
    label: string;
    phone: string;
    province: string;
    city: string;
    subdistrict: string;
    postalCode: string;
    address: string;
  };
};

const EMPTY_FORM: FormState = {
  address: {
    userId: null,
    label: "",
    phone: "",
    province: "",
    city: "",
    subdistrict: "",
    postalCode: "",
    address: "",
  },
};

const toStringId = (id: unknown): string | null => {
  if (id === null || id === undefined) return null;
  return typeof id === "string" ? id : String(id);
};

const getIdByName = <T extends { id: string; name: string }>(
  list: T[],
  name?: string | null
) => {
  if (!name) return null;
  const item = list.find(
    (x) => x.name.toLowerCase() === String(name).toLowerCase()
  );
  return item?.id ?? null;
};

export const AddressModal = ({
  isOpen,
  onClose,
  address,
}: AddressModalProps) => {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const {
    createData,
    updateData, // <-- penting untuk UPDATE
    region,
    fetchProvinces,
    selectProvince,
    selectRegency,
    selectDistrict,
  } = addressStore();

  const { user, getUser } = userStore();

  useEffect(() => {
    if (!isOpen) return;
    getUser();
    fetchProvinces();
  }, [isOpen, getUser, fetchProvinces]);

  useEffect(() => {
    if (!isOpen) return;
    const uid = toStringId(user?.id);

    if (address) {
      setFormData({
        address: {
          userId: uid ?? null,
          label: (address as any)?.label ?? "",
          phone: (address.phone ?? "").replace(/^\+62\s?/, ""),
          province: address.province ?? "",
          city: address.city ?? "",
          subdistrict: address.subdistrict ?? "",
          postalCode: address.postalCode ?? "",
          address: address.address ?? "",
        },
      });
    } else {
      setFormData({
        address: {
          ...EMPTY_FORM.address,
          userId: uid ?? null,
        },
      });
    }
  }, [isOpen, address, user]);

  useEffect(() => {
    if (!isOpen || !address || region.provinces.length === 0) return;
    const pid = getIdByName(region.provinces, address.province);
    if (pid && pid !== region.selectedProvinceId) {
      (async () => {
        await selectProvince(pid);
        setFormData((prev) => ({
          address: { ...prev.address, province: address.province ?? "" },
        }));
      })();
    }
  }, [isOpen, address, region.provinces]);

  useEffect(() => {
    if (!isOpen || !address || region.regencies.length === 0) return;
    const rid = getIdByName(region.regencies, address.city);
    if (rid && rid !== region.selectedRegencyId) {
      (async () => {
        await selectRegency(rid);
        setFormData((prev) => ({
          address: { ...prev.address, city: address.city ?? "" },
        }));
      })();
    }
  }, [isOpen, address, region.regencies]);

  useEffect(() => {
    if (!isOpen || !address || region.districts.length === 0) return;
    const did = getIdByName(region.districts, address.subdistrict);
    if (did && did !== region.selectedDistrictId) {
      (async () => {
        await selectDistrict(did);
        setFormData((prev) => ({
          address: { ...prev.address, subdistrict: address.subdistrict ?? "" },
        }));
      })();
    }
  }, [isOpen, address, region.districts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      let uidStr = toStringId(user?.id) ?? formData.address.userId;
      if (!uidStr) {
        await getUser();
        uidStr = toStringId(userStore.getState().user?.id) ?? null;
      }
      if (!uidStr) {
        throw new Error("User ID tidak ditemukan. Pastikan sudah login.");
      }

      const payload = {
        userId: uidStr,
        label: formData.address.label,
        phone: formData.address.phone.trim(),
        province: formData.address.province,
        city: formData.address.city,
        subdistrict: formData.address.subdistrict,
        postalCode: formData.address.postalCode,
        address: formData.address.address,
      };

      if (address?.id) {
        await updateData(String(address.id), payload); // <-- UPDATE
      } else {
        await createData(payload); // <-- CREATE
      }

      setFormData(EMPTY_FORM);
      onClose();
    } catch (err) {
      console.error("Submit address failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-lg w-full max-w-lg mx-4 shadow-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {address ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Nama Alamat"
              value={formData.address.label}
              onChange={(e) =>
                setFormData({
                  address: { ...formData.address, label: e.target.value },
                })
              }
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
            {formData.address.label && (
              <button
                type="button"
                onClick={() =>
                  setFormData({ address: { ...formData.address, label: "" } })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3">
              <select
                value="+62"
                className="border-none outline-none bg-transparent text-sm font-medium"
              >
                <option value="+62">+62</option>
              </select>
              <svg
                className="w-4 h-4 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="flex-1 relative">
              <input
                type="tel"
                placeholder="8xx xxxx xxxx"
                value={formData.address.phone}
                onChange={(e) =>
                  setFormData({
                    address: { ...formData.address, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
              {formData.address.phone && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ address: { ...formData.address, phone: "" } })
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={region.selectedProvinceId ?? ""}
                onChange={async (e) => {
                  const val = e.target.value || null;
                  const p = region.provinces.find((x) => x.id === val);
                  setFormData((prev) => ({
                    address: {
                      ...prev.address,
                      province: p?.name ?? "",
                      city: "",
                      subdistrict: "",
                    },
                  }));
                  await selectProvince(val);
                }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
              >
                <option value="">Pilih Provinsi</option>
                {region.provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={region.selectedRegencyId ?? ""}
                onChange={async (e) => {
                  const val = e.target.value || null;
                  const r = region.regencies.find((x) => x.id === val);
                  setFormData((prev) => ({
                    address: {
                      ...prev.address,
                      city: r?.name ?? "",
                      subdistrict: "",
                    },
                  }));
                  await selectRegency(val);
                }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                disabled={!region.selectedProvinceId}
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {region.regencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={region.selectedDistrictId ?? ""}
                onChange={async (e) => {
                  const val = e.target.value || null;
                  const d = region.districts.find((x) => x.id === val);
                  setFormData((prev) => ({
                    address: { ...prev.address, subdistrict: d?.name ?? "" },
                  }));
                  await selectDistrict(val);
                }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                disabled={!region.selectedRegencyId}
              >
                <option value="">Pilih Kecamatan</option>
                {region.districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={formData.address.postalCode}
              onChange={(e) =>
                setFormData({
                  address: { ...formData.address, postalCode: e.target.value },
                })
              }
              placeholder="Kode Pos"
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <textarea
            placeholder="Alamat lengkap"
            rows={3}
            value={formData.address.address}
            onChange={(e) =>
              setFormData({
                address: { ...formData.address, address: e.target.value },
              })
            }
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 resize-none"
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-60"
              disabled={submitting}
            >
              {address ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
