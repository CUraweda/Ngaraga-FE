import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";
import { getAllOrder } from "@/middleware/Order";
import Swal from "sweetalert2";

interface State {
  orders: any | null;
  order: any | null;
  getOrder: (payload: string) => Promise<void>;
}

const orderStore = create<State>((set) => ({
  orders: [],
  order: null,

  getOrder: async (payload) => {
    const { data } = await getAllOrder(payload);

    set({
      orders: data,
    });
  },
}));

export default orderStore;
