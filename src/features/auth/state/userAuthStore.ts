import { create } from "zustand";
import { User, userDetailsData } from "@/types/auth";

interface UserAuthState {
  userDetails: userDetailsData | null;
  user: User | null;

  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setUserDetails: (userDetails: userDetailsData) => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    set({ user: null, accessToken: null });
  },
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),
}));
