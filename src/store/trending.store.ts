import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import {  getAllHomePage, createHomePage, deleteHomePage, updateHomePage} from "@/middleware/settingcard";

interface State {
  items: any | null;
  
  getAllHomePage: (payload: string) => Promise<void>;
  createHomePage: (payload: any) => Promise<void>;
  deleteHomePage: (id: string) => Promise<void>;
  updateHomePage: (id: string, payload: any) => Promise<void>;
}

const TrendingStore = create<State>((set) => ({
    items: null,
    

  getAllHomePage: async (payload) => {
    const { data } = await getAllHomePage(payload);

    set({
      items: data,
    });
  },

  createHomePage: async (payload) => {
    try {
      await createHomePage(payload);
      const { data } = await getAllHomePage("");
      set({ items: data });
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
  updateHomePage: async (id, payload) => {
    try {
      await updateHomePage(id, payload);
      const { data } = await getAllHomePage("");
      set({ items: data });
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

  deleteHomePage: async (id) => {
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
          await deleteHomePage(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getAllHomePage("");
          set({ items: data });
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
 
}));

export default TrendingStore;
