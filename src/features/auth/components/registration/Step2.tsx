import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { RegisterInput } from "@/types/auth";

interface Step2Props {
  initialData: RegisterInput;
  onBack: () => void;
  onSubmit: (data: Partial<RegisterInput>) => void;
  loading: boolean;
}

export const Step2: React.FC<Step2Props> = ({
  initialData,
  onBack,
  onSubmit,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: RegisterInput) => {
    onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
          <User size={20} className="text-zinc-400" /> Personal Details
        </h3>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <User size={16} />
            </div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className={`block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border ${
                errors.name ? "border-red-500" : "border-zinc-700"
              } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>
          )}
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
            <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>
          )}
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-zinc-700 text-sm font-semibold rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all active:scale-[0.98]"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] flex items-center justify-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-zinc-950 bg-zinc-100 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>
  );
};
