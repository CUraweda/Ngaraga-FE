// AddressManager.tsx
import { useEffect, useMemo, useState } from "react";
import type { Address } from "@/pages/user/Checkout";
import { AddressModal } from "./AddressModal";
import addressStore from "@/store/address.store";
import userStore from "@/store/user.store";

interface AddressManagerProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
  onAddressEdit: (address: Address) => void;
  onAddressDelete: (addressId: string) => void;
  onAddNewAddress: (address: Omit<Address, "id">) => void;
  error?: string;
}

export const AddressManager = ({
  addresses,
  selectedAddress,
  onAddressSelect,
  onAddressEdit,
  onAddNewAddress,
  error,
}: AddressManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // store untuk address
  const { list, loading, fetchMyAddresses, deleteData } = addressStore();
  // store untuk user login
  const { user, getUser } = userStore();

  // Ambil user & daftar alamat saat mount
  useEffect(() => {
    (async () => {
      await getUser();
      await fetchMyAddresses();
    })();
  }, [getUser, fetchMyAddresses]);

  // Saring alamat berdasarkan userId login
  const userId = user?.id ?? "";
  // ganti blok useMemo ini
  const storeAddressesForUser = useMemo(() => {
    if (!userId) return [];

    // list sudah pasti array
    const itemsArray = list ?? [];

    return itemsArray.filter((a: any) => String(a.userId) === String(userId));
  }, [list, userId]);

  // Tentukan sumber data yang dipakai untuk ditampilkan:
  // - Jika ada data dari store yang sudah terfilter by user → pakai itu
  // - Jika tidak, fallback ke props.addresses (agar backward compatible)
  const addressesToShow: Address[] = useMemo(() => {
    // Pastikan struktur minimalnya sesuai tampilan (label, phone, address, dsb)
    const normalize = (arr: any[]): Address[] =>
      (arr || []).map((a: any) => ({
        id: String(a.id),
        // di UI Anda sebelumnya pakai address.name → ganti jadi label
        // agar tidak error di TypeScript, bila tipe Address Anda belum punya 'label',
        // bisa tambahkan field 'name' di sini sebagai alias tampilan:
        name: a.label ?? a.name ?? "", // <- untuk h4 title (kompatibel UI lama)
        label: a.label ?? "",
        phone: a.phone ?? "",
        addressId: a.addressId ?? 0,
        address: a.address ?? "",
        subdistrict: a.subdistrict ?? "",
        city: a.city ?? "",
        province: a.province ?? "",
        postalCode: a.postalCode ?? "",
        note: a.note ?? "",
        // isDefault opsional tergantung backend Anda
        isDefault: !!a.isDefault,
        userId: String(a.userId ?? ""),
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }));

    if (storeAddressesForUser.length > 0)
      return normalize(storeAddressesForUser);
    return normalize(addresses);
  }, [storeAddressesForUser, addresses]);

  const handleEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  // Dipanggil jika AddressModal mengirim onSave (opsi, jika Anda pakai alur props)
  const handleModalSave = async (addressData: Omit<Address, "id">) => {
    if (editingAddress) {
      onAddressEdit({ ...addressData, id: editingAddress.id } as Address);
    } else {
      onAddNewAddress(addressData);
    }
    setIsModalOpen(false);
    setEditingAddress(null);
    // refresh daftar dari store agar sinkron
    await fetchMyAddresses();
  };

  const handleDeleteAddress = async (addressId: string) => {
    await deleteData(addressId); // ini sudah ada SweetAlert konfirmasi di store
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    // setiap kali modal ditutup (tambah/edit), refresh agar sinkron
    await fetchMyAddresses();
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading && (
        <div className="mb-4 text-sm text-gray-500">Loading addresses…</div>
      )}

      <div className="space-y-3 mb-4">
        {addressesToShow.map((address) => (
          <label
            key={address.id}
            className={`block border rounded-lg p-4 cursor-pointer ${
              selectedAddress?.id === address.id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === address.id}
              onChange={() => onAddressSelect(address)}
              className="sr-only"
            />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {/* Gunakan 'name' (alias untuk label) agar UI lama tetap jalan */}
                  <h4 className="font-semibold">
                    {address.name || address.label || "Alamat"}
                  </h4>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {/* Susun alamat panjang */}
                  {address.address}
                  {address.subdistrict ? `, ${address.subdistrict}` : ""}
                  {address.city ? `, ${address.city}` : ""}
                  {address.province ? `, ${address.province}` : ""}
                  {address.postalCode ? ` ${address.postalCode}` : ""}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditAddress(address);
                  }}
                  className="text-yellow-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleDeleteAddress(address.id);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            {selectedAddress?.id === address.id && (
              <div className="mt-2 flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-yellow-600">Selected</span>
              </div>
            )}
          </label>
        ))}

        {/* Jika tidak ada data */}
        {!loading && addressesToShow.length === 0 && (
          <div className="text-sm text-gray-500">
            Belum ada alamat. Tambahkan alamat baru.
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddNewAddress}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          + Add New Address
        </button>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleModalSave} // opsional; AddressModal Anda saat ini sudah langsung create via store
        address={editingAddress}
      />
    </div>
  );
};
