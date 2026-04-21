import { create } from "zustand";
import { User, userDetailsData } from "@/types/auth";

interface UserAuthState {
  userDetails: userDetailsData | null;
  user: User | null;
  accessToken?: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAccessToken?: (token: string | null) => void;
  setUserDetails: (userDetails: userDetailsData) => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => {
    set({ user: null });
  },
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),
}));
