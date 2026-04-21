"use client";
import Card from "@/components/Card";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";
import { useEffect } from "react";

function DashboardPage() {
  const { userDetails, accessToken, fetchUserDetails, loading } =
    useAuthHooks();

  useEffect(() => {
    if (accessToken) {
      fetchUserDetails(accessToken);
    }
  }, []);

  console.log("User Details in Dashboard:", userDetails);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {loading ? (
        <p className="text-zinc-400 animate-pulse">loading...</p>
      ) : userDetails?.data ? (
        <Card user={userDetails} />
      ) : (
        <p className="text-zinc-500 text-sm">No user details found.</p>
      )}
    </div>
  );
}

export default DashboardPage;
