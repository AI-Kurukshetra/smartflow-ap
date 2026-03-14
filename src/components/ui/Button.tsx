import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import React from "react";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm md:text-base",
  lg: "px-6 py-3 text-base",
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-500 text-white shadow-sm hover:bg-teal-600 focus-visible:ring focus-visible:ring-teal-300",
  secondary:
    "border border-slate-300 text-slate-800 hover:border-teal-400 hover:text-teal-700",
  ghost:
    "text-slate-700 hover:text-teal-600 hover:bg-teal-50",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      icon: Icon,
      loading,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        sizeMap[size],
        variantMap[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white border-t-transparent animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {props.children}
        </>
      )}
    </button>
  )
);

Button.displayName = "Button";
