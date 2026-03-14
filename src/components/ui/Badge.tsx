import clsx from "clsx";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "info" | "warning" | "neutral";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  success: "bg-emerald-50 text-emerald-700",
  info: "bg-sky-50 text-sky-700",
  warning: "bg-amber-50 text-amber-700",
  neutral: "bg-slate-50 text-slate-600",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
