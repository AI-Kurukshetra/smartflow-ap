import clsx from "clsx";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "default" | "panel";
  header?: React.ReactNode;
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "border border-slate-100 bg-white shadow-sm",
  panel: "bg-slate-50 border border-transparent",
};

export function Card({
  title,
  description,
  children,
  variant = "default",
  header,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "group rounded-3xl border border-transparent bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lg",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {(title || description || header) && (
        <div className="mb-4 space-y-0.5">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {description && (
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
          )}
          {header}
        </div>
      )}
      {children}
    </div>
  );
}
