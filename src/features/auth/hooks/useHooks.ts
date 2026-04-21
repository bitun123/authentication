"use client";
import { LoginFormInputs, RegisterInput } from "@/types/auth";
import { useUserAuthStore } from "../state/userAuthStore";
import { registerUser, loginUser, getUserDetails } from "../services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuthHooks = () => {
  const {
    user,
    setUser,
    setLoading,
    setError,
    loading,
    error,
    accessToken,
    setAccessToken,
    userDetails,
    setUserDetails,
  } = useUserAuthStore();
  const router = useRouter();
  const handleRegister = async (data: RegisterInput) => {
    try {
      setLoading(true);
      setError(null);
      await registerUser(data);
      toast.success("Registration successful!");
      router.push("/auth/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(data);
      setUser(response.data);
      toast.success(response.message || "Login successful!");
      router.push("/dashboard");
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (accessToken: string | null) => {
    if (!accessToken) return;
    try {
      setLoading(true);
      const userDetails = await getUserDetails(accessToken);
      setUserDetails(userDetails);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching user details.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    accessToken,
    user,
    loading,
    error,
    handleRegister,
    handleLogin,
    fetchUserDetails,
    userDetails,
  };
};
