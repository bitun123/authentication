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
const {userDetails}  =  useAuthHooks();


  useEffect(() => {
    if (userDetails?.data === null) {
      router.push("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
