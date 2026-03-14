"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import clsx from "clsx";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <label className="block space-y-1 text-sm text-slate-700">
        <span className="font-medium text-slate-900">{label}</span>
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className={clsx(
              "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 disabled:opacity-70",
              className,
              error && "border-red-400 focus:border-red-500 focus:ring-red-200"
            )}
            {...props}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 inline-flex cursor-pointer items-center text-slate-400 transition hover:text-teal-600"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
      </label>
    );
  }
);

PasswordField.displayName = "PasswordField";
