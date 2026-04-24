import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Building, Phone, ArrowRight } from "lucide-react";
import { RegisterInput } from "@/types/auth";

interface Step1Props {
  initialData: RegisterInput;
  onNext: (data: Partial<RegisterInput>) => void;
}

export const Step1: React.FC<Step1Props> = ({ initialData, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: initialData,
  });

  const onSubmit = (data: RegisterInput) => {
    onNext({
      orgDetails: data.orgDetails,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
          <Building size={20} className="text-zinc-400" /> Organization Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Org Name
            </label>
            <input
              {...register("orgDetails.name", { required: "Required" })}
              placeholder="Acme Corp"
              className={`block w-full px-3 py-2.5 bg-zinc-800 border ${
                errors.orgDetails?.name ? "border-red-500" : "border-zinc-700"
              } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
            />
            {errors.orgDetails?.name && (
              <p className="mt-1 text-xs text-red-500">Name is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Legal Name
            </label>
            <input
              {...register("orgDetails.legalName", { required: "Required" })}
              placeholder="Acme Industries LLC"
              className={`block w-full px-3 py-2.5 bg-zinc-800 border ${
                errors.orgDetails?.legalName ? "border-red-500" : "border-zinc-700"
              } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
            />
            {errors.orgDetails?.legalName && (
              <p className="mt-1 text-xs text-red-500">Legal name is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="org@example.com"
                className={`block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border ${
                  errors.orgDetails?.contactInfo?.email ? "border-red-500" : "border-zinc-700"
                } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
              />
            </div>
            {errors.orgDetails?.contactInfo?.email && (
              <p className="mt-1 text-xs text-red-500">Valid org email is required</p>
            )}
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
                {...register("orgDetails.contactInfo.phone", { required: "Required" })}
                placeholder="+1 (555) 000-0000"
                className={`block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border ${
                  errors.orgDetails?.contactInfo?.phone ? "border-red-500" : "border-zinc-700"
                } rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all sm:text-sm`}
              />
            </div>
            {errors.orgDetails?.contactInfo?.phone && (
              <p className="mt-1 text-xs text-red-500">Phone is required</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-zinc-950 bg-zinc-100 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all active:scale-[0.98]"
        >
          Next Step <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};
