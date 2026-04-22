"use client";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";
import LoginPage from "./login/page";
import ProtectedComponent from "@/components/ProtectedComponent";
import DashboardPage from "./dashboard/page";

function page() {
  const { userDetails, accessToken } = useAuthHooks();

  return (
    <div>
      {userDetails && accessToken ? (
        <ProtectedComponent>
          <DashboardPage />
        </ProtectedComponent>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default page;
