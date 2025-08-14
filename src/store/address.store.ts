// src/store/address.store.ts
import { create } from "zustand";
import Swal from "sweetalert2";
import apiClient from "@/middleware/Base";
import {
  createAddress as createAddressAPI,
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  updateAddress,
} from "@/middleware/Address";

// ====== Types ======
export type Province = { id: string; name: string };
export type Regency = { id: string; name: string };
export type District = { id: string; name: string };
export type Village = { id: string; name: string };

export type AddressItem = {
  id: string;
  userId: string;
  label?: string; // nama penerima (opsional kalau backend belum ada)
  phone: string;
  province: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  address: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Payload yang dikirim ke backend (dibungkus { address: {...} })
export type AddressPayload = {
  userId: string; // dipastikan string
  label?: string;
  phone: string;
  province: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  address: string;
  isDefault?: boolean;
};

type RegionState = {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
  villages: Village[];
  selectedProvinceId: string | null;
  selectedRegencyId: string | null;
  selectedDistrictId: string | null;
  selectedVillageId: string | null;
};

interface Address {
  id: string;
  label: string;
  phone: string;
  isDefault: boolean;
  province: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  address: string;
}

type AddressState = {
  loading: boolean;
  error: string | null;

  // data
  list: Address[];
  defaultId: string | null;

  // region
  region: RegionState;

  // actions: wilayah
  fetchProvinces: () => Promise<void>;
  selectProvince: (provinceId: string | null) => Promise<void>;
  selectRegency: (regencyId: string | null) => Promise<void>;
  selectDistrict: (districtId: string | null) => Promise<void>;
  selectVillage: (villageId: string | null) => void;

  // actions: address
  fetchMyAddresses: () => Promise<void>;
  createData: (data: AddressPayload) => Promise<void>;
  updateData: (id: string, data: any) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  setDefault: (id: string) => Promise<void>;
};

// ====== Helpers ======
const toStringId = (id: unknown): string => {
  if (id === null || id === undefined) return "";
  return typeof id === "string" ? id : String(id);
};

const initialRegion: RegionState = {
  provinces: [],
  regencies: [],
  districts: [],
  villages: [],
  selectedProvinceId: null,
  selectedRegencyId: null,
  selectedDistrictId: null,
  selectedVillageId: null,
};

// ====== Store ======
const addressStore = create<AddressState>((set, get) => ({
  loading: false,
  error: null,

  list: [],
  defaultId: null,

  region: { ...initialRegion },

  // -------- Wilayah (EMSIFA) --------
  fetchProvinces: async () => {
    try {
      const provinces = await getProvinces();
      set((s) => ({
        region: {
          ...s.region,
          provinces: (provinces ?? []).map((p: any) => ({
            id: toStringId(p.id || p.code || p.province_id || p.value),
            name: p.name || p.text || p.label,
          })),
        },
      }));
    } catch (e) {
      console.error("fetchProvinces failed:", e);
    }
  },

  selectProvince: async (provinceId) => {
    // reset turunannya
    set((s) => ({
      region: {
        ...s.region,
        selectedProvinceId: provinceId,
        regencies: [],
        districts: [],
        villages: [],
        selectedRegencyId: null,
        selectedDistrictId: null,
        selectedVillageId: null,
      },
    }));
    if (!provinceId) return;
    try {
      const regencies = await getRegencies(provinceId);
      set((s) => ({
        region: {
          ...s.region,
          regencies: (regencies ?? []).map((r: any) => ({
            id: toStringId(r.id || r.code || r.regency_id || r.value),
            name: r.name || r.text || r.label,
          })),
        },
      }));
    } catch (e) {
      console.error("selectProvince/getRegencies failed:", e);
    }
  },

  selectRegency: async (regencyId) => {
    // reset turunannya
    set((s) => ({
      region: {
        ...s.region,
        selectedRegencyId: regencyId,
        districts: [],
        villages: [],
        selectedDistrictId: null,
        selectedVillageId: null,
      },
    }));
    if (!regencyId) return;
    try {
      const districts = await getDistricts(regencyId);
      set((s) => ({
        region: {
          ...s.region,
          districts: (districts ?? []).map((d: any) => ({
            id: toStringId(d.id || d.code || d.district_id || d.value),
            name: d.name || d.text || d.label,
          })),
        },
      }));
    } catch (e) {
      console.error("selectRegency/getDistricts failed:", e);
    }
  },

  selectDistrict: async (districtId) => {
    // reset desa
    set((s) => ({
      region: {
        ...s.region,
        selectedDistrictId: districtId,
        villages: [],
        selectedVillageId: null,
      },
    }));
    if (!districtId) return;
    try {
      const villages = await getVillages(districtId);
      set((s) => ({
        region: {
          ...s.region,
          villages: (villages ?? []).map((v: any) => ({
            id: toStringId(v.id || v.code || v.village_id || v.value),
            name: v.name || v.text || v.label,
          })),
        },
      }));
    } catch (e) {
      console.error("selectDistrict/getVillages failed:", e);
    }
  },

  selectVillage: (villageId) => {
    set((s) => ({
      region: {
        ...s.region,
        selectedVillageId: villageId,
      },
    }));
  },

  // -------- Address (Backend) --------
  fetchMyAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(
        "/api/v1/address/show-all?limit=10000"
      );

      set({
        list: data?.data?.items || [],
        loading: false,
      });
    } catch (e: any) {
      console.error("fetchMyAddresses failed:", e);
      set({
        error:
          e?.response?.data?.message || e?.message || "Gagal memuat alamat.",
        loading: false,
      });
      await Swal.fire({
        title: "Gagal!",
        text:
          e?.response?.data?.message || "Terjadi kesalahan saat memuat alamat.",
        icon: "error",
      });
    }
  },

  createData: async (data: AddressPayload) => {
    try {
      // pastikan string
      const payload = {
        address: {
          ...data,
          userId: toStringId(data.userId),
          phone: (data.phone || "").trim(),
        },
      };
      await createAddressAPI(payload);
      await Swal.fire({
        title: "Berhasil!",
        text: "Alamat telah berhasil dibuat.",
        icon: "success",
        timer: 1400,
      });
      // refresh list
      await get().fetchMyAddresses();
    } catch (e: any) {
      console.error("createData failed:", e);
      await Swal.fire({
        title: "Gagal!",
        text: e?.response?.data?.message || "Terjadi kesalahan.",
        icon: "error",
      });
      throw e;
    }
  },

  updateData: async (id: string, data: any) => {
    try {
      await updateAddress(data, id);
      await Swal.fire({
        title: "Berhasil!",
        text: `Alamat telah berhasil diperbarui.`,
        icon: "success",
        timer: 1400,
      });
    } catch (e: any) {
      await Swal.fire({
        title: "Gagal!",
        text: e?.response?.data?.message || "Terjadi kesalahan.",
        icon: "error",
      });
    }
  },

  deleteData: async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Hapus alamat?",
        text: "Tindakan ini tidak dapat dibatalkan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
      });
      if (!confirm.isConfirmed) return;

      await apiClient.delete(`/api/v1/address/delete/${id}`);
      await Swal.fire({
        title: "Berhasil!",
        text: "Alamat telah dihapus.",
        icon: "success",
        timer: 1200,
      });
      await get().fetchMyAddresses();
    } catch (e: any) {
      console.error("deleteData failed:", e);
      await Swal.fire({
        title: "Gagal!",
        text: e?.response?.data?.message || "Terjadi kesalahan.",
        icon: "error",
      });
      throw e;
    }
  },

  setDefault: async (id) => {
    try {
      await apiClient.put(`/api/v1/address/set-default/${id}`);
      await Swal.fire({
        title: "Berhasil!",
        text: "Alamat default telah diatur.",
        icon: "success",
        timer: 1200,
      });
      await get().fetchMyAddresses();
    } catch (e: any) {
      console.error("setDefault failed:", e);
      await Swal.fire({
        title: "Gagal!",
        text: e?.response?.data?.message || "Terjadi kesalahan.",
        icon: "error",
      });
      throw e;
    }
  },
}));

export default addressStore;
