import { create } from "zustand";
import { User, userDetailsData } from "@/types/auth";

interface UserAuthState {
  userDetails: userDetailsData | null;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setUserDetails: (userDetails: userDetailsData) => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
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
  setAccessToken: (accessToken) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    set({ accessToken });
  },
  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),
}));
