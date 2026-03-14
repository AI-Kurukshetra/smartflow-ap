import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import React from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarProps {
  items: NavItem[];
  title?: string;
  compact?: boolean;
}

export function Sidebar({ items, title = "MedStack", compact }: SidebarProps) {
  return (
    <div
      className={clsx(
        "flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-md",
        compact && "rounded-2xl p-4"
      )}
    >
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {title}
          </p>
          <p className="text-lg font-semibold text-slate-900">Provider Portal</p>
        </div>
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-teal-50 hover:text-teal-600"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="space-y-1 text-xs text-slate-500">
        <p>Secure cloud infrastructure</p>
        <p className="text-slate-400">HIPAA-ready</p>
      </div>
    </div>
  );
}
