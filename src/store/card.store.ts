import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import {
  getAll,
  createCard,
  updateCard,
  deleteCard,
  getById,
  addStock,
  addCardToSpecial,
  deleteRequiredCard,
} from "@/middleware/Cards";

interface State {
  cards: any | null;
  cardItem: any | null;
  getCard: (payload: string) => Promise<void>;
  createCard: (payload: any) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  getOneCard: (id: string) => Promise<void>;
  updateCard: (id: string, payload: any) => Promise<void>;
  addStockCard: (id: string, payload: any) => Promise<void>;
  addCardToSpecial: (id: string, payload: any) => Promise<void>;
  deleteRequiredCard: (idSpecial: string, idCard: string) => Promise<void>;
}

const CardStore = create<State>((set) => ({
  cards: null,
  cardItem: null,

  getCard: async (payload) => {
    const { data } = await getAll(payload);

    set({
      cards: data,
    });
  },

  createCard: async (payload) => {
    try {
      await createCard(payload);
      const { data } = await getAll("");
      set({ cards: data });
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
  updateCard: async (id, payload) => {
    try {
      await updateCard(id, payload);
      const { data } = await getAll("");
      set({ cards: data });
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
  addStockCard: async (id, payload) => {
    try {
      await addStock(id, payload);
      const { data } = await getById(id);
      set({ cardItem: data });
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

  deleteCard: async (id) => {
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
          await deleteCard(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getAll("");
          set({ cards: data });
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
  deleteRequiredCard: async (idSpecial, idCard) => {
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
          await deleteRequiredCard(idSpecial);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getById(idCard);
          set({ cardItem: data });
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
  getOneCard: async (id) => {
    try {
      const { data } = await getById(id);
      set({ cardItem: data });
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
  addCardToSpecial: async (id, payload) => {
    try {
      await addCardToSpecial(id, payload);
      const { data } = await getById(id);
      set({ cardItem: data });
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

export default CardStore;
