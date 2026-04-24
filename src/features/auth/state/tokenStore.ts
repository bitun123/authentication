import { toast } from "sonner";
import { create } from "zustand";

interface TokenState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
  
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: localStorage.getItem("access-token-storage"),

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem("access-token-storage", token);
    } else {
      localStorage.removeItem("access-token-storage");
    }
    set({ accessToken: token });
  },

  removeAccessToken: () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("access-token-storage");
    set({ accessToken: null });
  },
}));