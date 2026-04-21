"use client";
import ProtectedComponent from "@/components/ProtectedComponent";
import DashboardPage from "./dashboard/page";

function page() {
  return (
    <ProtectedComponent>
      <DashboardPage />
    </ProtectedComponent>
  );
}

export default page;
