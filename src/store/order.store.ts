import { create } from "zustand";
import {
  getAllOrder,
  getDetailOrder,
  deleteData,
  printData,
} from "@/middleware/Order";
import Swal from "sweetalert2";

interface State {
  orders: any | null;
  order: any | null;
  detailOrder: any | null;
  getOrder: (payload: string) => Promise<void>;
  getDetailOrder: (id: any) => Promise<void>;
  deleteOrder: (id: any) => Promise<void>;
  printOrder: (id: any) => Promise<void>;
  deletingId: string | null;
  downloadingId: string | null;
  lastPayload: string;
}

const orderStore = create<State>((set, get) => ({
  orders: [],
  order: null,
  detailOrder: null,
  deletingId: null,
  downloadingId: null,
  lastPayload: "",

  getOrder: async (payload) => {
    const { data } = await getAllOrder(payload);

    set({
      orders: data,
      order: data.stats,
      lastPayload: payload,
    });
  },

  getDetailOrder: async (id) => {
    const { data } = await getDetailOrder(id);

    set({
      detailOrder: data,
    });
  },

  deleteOrder: async (id) => {
    const result = await Swal.fire({
      title: "Hapus transaksi?",
      html: `Transaksi <b>${id}</b> akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      set({ deletingId: id });
      await deleteData(id);
      // Opsional: munculkan notifikasi sukses
      await Swal.fire({
        title: "Terhapus!",
        text: `Transaksi ${id} telah dihapus.`,
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
      const payload = get().lastPayload || "";
      await get().getOrder(payload);
    } catch (e: any) {
      // await Swal.fire({
      //   title: "Gagal menghapus",
      //   text: e?.response?.data?.message || "Terjadi kesalahan.",
      //   icon: "error",
      // });
    } finally {
      set({ deletingId: null });
    }
  },

  // Download file transaksi
  printOrder: async (id) => {
    try {
      set({ downloadingId: id });
      await printData(id); // sudah trigger download di browser
      // (opsional) tampilkan toast sukses di UI Anda
    } catch (e: any) {
      await Swal.fire({
        title: "Gagal mengunduh",
        text: e?.response?.data?.message || "Terjadi kesalahan saat download.",
        icon: "error",
      });
    } finally {
      set({ downloadingId: null });
    }
  },
}));

export default orderStore;
