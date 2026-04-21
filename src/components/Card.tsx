import React from "react";
import { User, Mail, Building2 } from "lucide-react";
import { userDetailsData } from "@/types/auth";

const Card = ({ user }: { user: userDetailsData }) => {
  const formattedDate = new Date(user.data.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-all hover:shadow-zinc-900/50">
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-zinc-800 p-3 rounded-full border border-zinc-700 shadow-inner">
              <User className="w-6 h-6 text-zinc-100" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-zinc-100 truncate tracking-tight">
                {user.data.name}
              </h3>
              <div className="flex items-center text-zinc-400 mt-1">
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                <p className="text-sm font-medium truncate uppercase tracking-wider">
                  {user.data.orgId.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                user.data.enabled === 1
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {user.data.enabled === 1 ? "Active" : "Inactive"}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 font-medium">
              {user.data.role}
            </span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
          <div className="flex items-center px-4 py-3 bg-zinc-950/50 rounded-xl border border-zinc-800/30 group transition-colors hover:bg-zinc-800/20">
            <Mail className="w-5 h-5 text-zinc-500 mr-3 group-hover:text-zinc-300 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase text-zinc-500 font-bold tracking-widest mb-0.5">
                Contact Email
              </p>
              <p className="text-sm text-zinc-200 truncate font-medium">
                {user.data.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="px-4 py-2 bg-zinc-950/30 rounded-lg border border-zinc-800/20">
              <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest mb-0.5">
                Created
              </p>
              <p className="text-xs text-zinc-300 font-medium">
                {formattedDate}
              </p>
            </div>
            <div className="px-4 py-2 bg-zinc-950/30 rounded-lg border border-zinc-800/20 text-right">
              <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest mb-0.5">
                Last Updated
              </p>
              <p className="text-xs text-zinc-300 font-medium">
                {new Date(user.data.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
