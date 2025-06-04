import { create } from "zustand";
import type { User } from "@/middleware/Auth";
import { showAllUser, showMe, updateProfile } from "@/middleware/User";
import swal from "sweetalert2";

interface AuthState {
  user: User | null;
  allUser: any;
  getUser: () => Promise<void>;
  deleteUser: () => void;
  getAllUser: (payload: any) => Promise<void>;
  updateProfile: (id: string, payload: any) => Promise<void>;
}

const userStore = create<AuthState>((set) => ({
  user: null,
  allUser: [],

  getUser: async () => {
    const { data } = await showMe();

    set({
      user: data,
    });
  },
  getAllUser: async (payload: any) => {
    const { data } = await showAllUser(payload);

    set({
      allUser: data,
    });
  },
  deleteUser: () => set({ user: null }),
  updateProfile: async (id: string, payload: any) => {
    await updateProfile(id, payload);
    const { data } = await showMe();
    swal.fire({
      title: "Success",
      text: "Profile updated successfully",
      icon: "success",
    });

    set({
      user: data,
    });
  },
}));

export default userStore;
