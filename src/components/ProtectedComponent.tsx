"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";

export default function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userDetails, accessToken } = useAuthHooks();

  useEffect(() => {
   
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/auth/login");
    }
  }, [router, userDetails, accessToken]);

  return <>{children}</>;
}
