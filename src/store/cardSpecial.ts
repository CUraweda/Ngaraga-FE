import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import { checkCardSpecial } from "@/middleware/cardSpecial";
interface State {
  specialCard: any | null;
  
  checkCardSpecial: (id: string) => Promise<void>;
 
}

const CardSpecialStore = create<State>((set) => ({
  specialCard: null,

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
}));

export default CardSpecialStore;
