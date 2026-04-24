import { create } from "zustand";

interface TokenState {
  accessToken: string | null;
  isLoggingOut: boolean;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
  setLoggingOut: (val: boolean) => void;
}

export const useTokenStore = create<TokenState>((set) => {
  const getInitialToken = () => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("access-token-storage");
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      return parsed?.state?.accessToken ?? stored;
    } catch {
      return stored;
    }
  };

  return {
    accessToken: getInitialToken(),
    isLoggingOut: false,

    setAccessToken: (token) => {
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("access-token-storage", token);
        } else {
          localStorage.removeItem("access-token-storage");
        }
      }
      set({ accessToken: token, isLoggingOut: false });
    },

    setLoggingOut: (val) => set({ isLoggingOut: val }),

    removeAccessToken: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access-token-storage");
      }
      set({ accessToken: null, isLoggingOut: true });
    },
  };
});