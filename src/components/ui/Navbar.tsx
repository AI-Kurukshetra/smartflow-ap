import React from "react";
import { BellRing } from "lucide-react";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

export interface NavbarProps {
  title?: string;
  onNotificationClick?: () => void;
  children?: React.ReactNode;
  onLogout?: () => Promise<void>;
  logoutLoading?: boolean;
}

export function Navbar({
  title,
  onNotificationClick,
  children,
  onLogout,
  logoutLoading,
}: NavbarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-3xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">MedStack</p>
        <p className="text-lg font-semibold text-slate-900">{title ?? "Provider Dashboard"}</p>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <button
          type="button"
          className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-teal-600"
          onClick={onNotificationClick}
        >
          <BellRing className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>
        <div className="hidden flex-col text-right text-xs text-slate-400 md:flex">
          <span className="text-sm font-semibold text-slate-900">Dr. Elena Torres</span>
          <span>Cardiology</span>
        </div>
        <Avatar name="Dr. Elena Torres" size="md" />
        {onLogout && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:text-rose-600 md:inline-flex"
            onClick={onLogout}
            loading={logoutLoading}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
