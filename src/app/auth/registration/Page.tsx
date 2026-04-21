"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, Building, User, Phone } from "lucide-react";
import { RegisterInput } from "@/types/auth";
import { useAuthHooks } from "@/features/auth/hooks/useHooks";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();
  const { handleRegister } = useAuthHooks();

  const onSubmit = async (data: RegisterInput) => {
    await handleRegister(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Join our platform and start managing your organization
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Organization Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <Building size={20} className="text-zinc-400" /> Organization
              Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Org Name
                </label>
                <input
                  {...register("orgDetails.name", { required: "Required" })}
                  placeholder="Acme Corp"
                  className="block w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Legal Name
                </label>
                <input
                  {...register("orgDetails.legalName", {
                    required: "Required",
                  })}
                  placeholder="Acme Industries LLC"
                  className="block w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Org Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail size={16} />
                  </div>
                  <input
                    {...register("orgDetails.contactInfo.email", {
                      required: "Required",
                    })}
                    type="email"
                    placeholder="org@example.com"
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Org Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Phone size={16} />
                  </div>
                  <input
                    {...register("orgDetails.contactInfo.phone", {
                      required: "Required",
                    })}
                    placeholder="+1 (555) 000-0000"
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <User size={20} className="text-zinc-400" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Your Name
                </label>
                <input
                  {...register("name", { required: "Required" })}
                  placeholder="John Doe"
                  className="block w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Personal Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail size={16} />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="john@example.com"
                    className={`block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border ${
                      errors.email ? "border-red-500" : "border-zinc-700"
                    } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={16} />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number and 1 special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-2.5 bg-zinc-800 border ${
                    errors.password ? "border-red-500" : "border-zinc-700"
                  } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Toaster richColors position="top-right" />

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-zinc-950 bg-zinc-100 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-400">
              Already have an account? <Link href="/auth/login" >Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
