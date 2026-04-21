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
  const { accessToken } = useAuthHooks();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
