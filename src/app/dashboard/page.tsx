"use client";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";
import { useEffect } from "react";

function DashboardPage() {
  const { userDetails, accessToken, fetchUserDetails } = useAuthHooks();

  useEffect(() => {
    if (accessToken) {
      fetchUserDetails(accessToken);
    }
  }, []);

console.log("User Details in Dashboard:", userDetails);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userDetails?.data.name}!</p>
    </div>
  );
}

export default DashboardPage;
