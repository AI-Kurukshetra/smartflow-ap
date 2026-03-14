"use client";

import clsx from "clsx";
import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-2xl bg-slate-200/70",
        shimmer && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
    </div>
  );
}
