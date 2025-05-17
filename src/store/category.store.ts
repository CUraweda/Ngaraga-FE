import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "@/middleware/Category";

interface State {
  categories: any | null;
  category: any | null;
  getCategory: (payload: string) => Promise<void>;
  createCategory: (payload: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getOneCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, payload: any) => Promise<void>;
}

const CategoryStore = create<State>((set) => ({
  category: null,
  categories: null,

  getCategory: async (payload) => {
    const { data } = await getAllCategory(payload);

    set({
      categories: data,
    });
  },

  createCategory: async (payload) => {
    try {
      await createCategory(payload);
      const { data } = await getAllCategory("");
      set({ categories: data });
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
  updateCategory: async (id, payload) => {
    try {
      await updateCategory(id, payload);
      const { data } = await getAllCategory("");
      set({ categories: data });
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

  deleteCategory: async (id) => {
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
          await deleteCategory(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getAllCategory("");
          set({ categories: data });
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
  getOneCategory: async (id) => {
    try {
      const { data } = await getCategoryById(id);
      set({ category: data });
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

export default CategoryStore;
