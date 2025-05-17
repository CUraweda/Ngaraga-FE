import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import { claimNormalCard, deleteCard, getAll, getById, updateCard } from "@/middleware/CardList";

interface State {
  cardsList: any | null;
  cardListItem: any | null;
  getCardList: (payload: string) => Promise<void>;
  deleteCardList: (id: string) => Promise<void>;
  getOneCardList: (id: string) => Promise<void>;
  updateCardList: (id: string, payload: any) => Promise<void>;
  claimNormalCard: (id: string) => Promise<void>;
}

const CardListStore = create<State>((set) => ({
  cardsList: null,
  cardListItem: null,

  getCardList: async (payload) => {
    const { data } = await getAll(payload);

    set({
      cardsList: data,
    });
  },


  updateCardList: async (id, payload) => {
    try {
      await updateCard(id, payload);
      const { data } = await getAll("");
      set({ cardsList: data });
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

  deleteCardList: async (id) => {
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
          set({ cardsList: data });
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
  getOneCardList: async (id) => {
    try {
      const { data } = await getById(id);
      set({ cardListItem: data });
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

  claimNormalCard: async (id) => {
    try {
      const { data } = await claimNormalCard(id);
      // const { data: dataCard } = await getById(data.cardId);
      // set({ cardListItem: dataCard });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
      });
    }
  },
}));

export default CardListStore;
