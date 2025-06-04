import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import { checkCardSpecial, claimCardSpecial, getAllSpecialCards } from "@/middleware/cardSpecial";
interface State {
  specialCard: any | null;
  specialCards: any | null;
  isClaimed: boolean;
  checkCardSpecial: (id: string) => Promise<void>;
  claimCardSpecial: (id: string) => Promise<void>;
  getAllSpecialCards: () => Promise<void>;
  resetClaimed: () => void;
}

const CardSpecialStore = create<State>((set) => ({
  specialCard: null,
  specialCards: null,
  isClaimed: false,
  checkCardSpecial: async (id) => {
    try {
      const { data } = await checkCardSpecial(id);
      set({ specialCard: data });
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

  claimCardSpecial: async (id) => {
    try {
      await claimCardSpecial(id);
      set({ isClaimed: true });
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
  getAllSpecialCards: async () => {
    try {
      const { data } = await getAllSpecialCards();
      set({ specialCards: data });
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
  resetClaimed: () => {
    set({ isClaimed: false });
  },
}));

export default CardSpecialStore;
