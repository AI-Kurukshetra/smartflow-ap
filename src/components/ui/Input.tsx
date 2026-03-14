import clsx from "clsx";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, className, ...props }, ref) => (
    <label className="block space-y-1 text-sm text-slate-700">
      {label && <span className="font-medium text-slate-900">{label}</span>}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 disabled:opacity-70",
          className,
          error && "border-red-400 focus:border-red-500 focus:ring-red-200"
        )}
        {...props}
      />
      {description && <p className="text-xs text-slate-500">{description}</p>}
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </label>
  )
);

Input.displayName = "Input";
