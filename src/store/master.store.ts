import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";
import {
  createMaster,
  deleteMaster,
  getAllMaster,
  getMasterById,
  updateMaster,
} from "@/middleware/Master";
import Swal from "sweetalert2";

interface State {
  masters: any | null;
  master: any | null;
  getMaster: (payload: string) => Promise<void>;
  createMaster: (payload: any) => Promise<void>;
  deleteMaster: (id: string) => Promise<void>;
  getOneMaster: (id: string) => Promise<void>;
  updateMaster: (id: string, payload: any) => Promise<void>;
}

const masterStore = create<State>((set) => ({
  master: null,
  masters: null,

  getMaster: async (payload) => {
    const { data } = await getAllMaster(payload);

    set({
      masters: data,
    });
  },

  createMaster: async (payload) => {
    try {
      await createMaster(payload);
      const { data } = await getAllMaster("");
      set({ masters: data });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
  updateMaster: async (id, payload) => {
    try {
      await updateMaster(id, payload);
      const { data } = await getAllMaster("");
      set({ masters: data });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },

  deleteMaster: async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMaster(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getAllMaster("");
          set({ masters: data });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
  getOneMaster: async (id) => {
    try {
      const { data } = await getMasterById(id);
      set({ master: data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
}));

export default masterStore;
