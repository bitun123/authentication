"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTokenStore } from "@/features/auth/state/tokenStore";

export default function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken } = useTokenStore();


  useEffect(() => {
    if ( !accessToken) {
      toast.error("Please login to access this page");
      const timer = setTimeout(() => {
        router.push("/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [router, accessToken, ]);

  if (!accessToken) return null;

  return <>{children}</>;
}