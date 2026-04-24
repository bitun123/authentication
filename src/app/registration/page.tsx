"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/features/auth/state/tokenStore";
import { Step1 } from "@/features/auth/components/registration/Step1";
import { Step2 } from "@/features/auth/components/registration/Step2";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";

export default function RegistrationPage() {
  const { accessToken } = useTokenStore();
  const router = useRouter();
  const {
    formData,
    currentStep,
    nextStep,
    prevStep,
    submitRegistration,
    loading,
  } = useAuthHooks();

  useEffect(() => {
    if (accessToken) {
      router.push("/dashboard");
    }
  }, [accessToken, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            Create an account
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  currentStep >= 1
                    ? "bg-zinc-100 text-zinc-950"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep === 1 ? "text-zinc-100" : "text-zinc-500"
                }`}
              >
                Organization
              </span>
            </div>
            <div className="w-12 h-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  currentStep >= 2
                    ? "bg-zinc-100 text-zinc-950"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep === 2 ? "text-zinc-100" : "text-zinc-500"
                }`}
              >
                Personal
              </span>
            </div>
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            {currentStep === 1
              ? "Tell us about your organization to get started"
              : "Set up your personal account details"}
          </p>
        </div>

        <div className="mt-8">
          {currentStep === 1 && (
            <Step1 initialData={formData} onNext={nextStep} />
          )}
          {currentStep === 2 && (
            <Step2
              initialData={formData}
              onBack={prevStep}
              onSubmit={submitRegistration}
              loading={loading}
            />
          )}
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-zinc-100 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
