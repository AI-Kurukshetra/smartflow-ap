"use client";

import { FileText } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
      <div
        className={clsx(
          "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm"
        )}
      >
        {icon ?? <FileText className="h-5 w-5 text-slate-400" />}
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {description && <p className="text-xs text-slate-400">{description}</p>}
    </div>
  );
}
