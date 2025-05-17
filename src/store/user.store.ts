import { create } from "zustand";
import type { User } from "@/middleware/Auth";
import getErrorMessage from "@/helper/helper.api";
import { showMe } from "@/middleware/User";

interface AuthState {
  user: User | null;
  getUser: () => Promise<void>;
  deleteUser: () => void;
}

const userStore = create<AuthState>((set) => ({
  user: null,

  getUser: async () => {
    const { data } = await showMe();

    set({
      user: data,
    });
  },
  deleteUser: () => set({ user: null }), 
}));

export default userStore;
