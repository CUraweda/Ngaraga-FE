import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";
import Swal from "sweetalert2";
import {
  addToCartItem,
  deleteCartItem,
  getAllCartItem,
  getCartItemById,
  getCountCartItem,
  updateCartItem,
} from "@/middleware/CartItem";

interface State {
  carts: any | null;
  cartItem: any | null;
  countCartItem: any | null;
  getCart: (payload: string) => Promise<void>;
  addToCart: (payload: any) => Promise<void>;
  deleteCart: (id: string) => Promise<void>;
  getOneCart: (id: string) => Promise<void>;
  updateCart: (id: string, payload: any) => Promise<void>;
  getCountCartItem: () => Promise<void>;
}

const CartItemStore = create<State>((set) => ({
  carts: null,
  cartItem: null,
  countCartItem: null,
  getCart: async (payload) => {
    const { data } = await getAllCartItem(payload);
    set({
      carts: data,
    });
  },

  addToCart: async (payload) => {
    try {
      await addToCartItem(payload);
      const { data } = await getAllCartItem("");
      set({ carts: data });
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
  updateCart: async (id, payload) => {
    try {
      await updateCartItem(id, payload);
      const { data } = await getAllCartItem("");
      set({ carts: data });
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

  deleteCart: async (id) => {
    try {
      await deleteCartItem(id);
      const { data } = await getAllCartItem("");
      set({ carts: data });
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
  getOneCart: async (id) => {
    try {
      const { data } = await getCartItemById(id);
      set({ cartItem: data });
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
  getCountCartItem: async () => {
    const { data } = await getCountCartItem();
    set({ countCartItem: data });
  },
}));

export default CartItemStore;
