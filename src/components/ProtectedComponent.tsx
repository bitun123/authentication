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
  const { accessToken, isLoggingOut, setLoggingOut } = useTokenStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !accessToken) {
      if (!isLoggingOut) {
        toast.error("Please login to access this page", {
          id: "unauthorized-access-toast",
        });
      }

      const timer = setTimeout(() => {
        router.push("/login");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [accessToken, checked, isLoggingOut, router]);

  useEffect(() => {
    return () => {
      if (isLoggingOut) {
        setLoggingOut(false);
      }
    };
  }, [isLoggingOut, setLoggingOut]);

  if (!checked || !accessToken) return null;

  return <>{children}</>;
}