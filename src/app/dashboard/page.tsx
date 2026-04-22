"use client";
import Card from "@/components/Card";
import { toast } from "sonner";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";
import { useUserAuthStore } from "@/features/auth/state/userAuthStore";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const { userDetails, loading } = useAuthHooks();
  const { clearUser } = useUserAuthStore();
  const router = useRouter();
  const logout = () => {
    toast.success("Logged out successfully!");
    clearUser();
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {loading ? (
        <p className="text-zinc-400 animate-pulse">loading...</p>
      ) : userDetails?.data ? (
        <Card user={userDetails} />
      ) : (
        <p className="text-zinc-500 text-sm">No user details found.</p>
      )}

      <button
        onClick={logout}
        className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-2xl  cursor-pointer active:scale-95 "
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
