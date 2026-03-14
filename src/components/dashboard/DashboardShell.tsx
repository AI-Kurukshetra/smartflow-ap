"use client";

import clsx from "clsx";
import { Activity, Calendar, FileText, MessageCircle, Menu, Pill, Settings, Users } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Navbar } from "@/components/ui/Navbar";
import { useToggle } from "@/hooks/useToggle";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Activity },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Appointments", href: "/appointments", icon: Calendar },
  { label: "Medical Records", href: "/records", icon: FileText },
  { label: "Prescriptions", href: "/records#prescriptions", icon: Pill },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Patient Portal", href: "/portal", icon: Activity },
];

export interface DashboardShellProps {
  title?: string;
  children: ReactNode;
  subtitle?: string;
}

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  const { value: sidebarOpen, toggle } = useToggle(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logoutUser();
    router.replace("/login");
    router.refresh();
    setLogoutLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
        <div className="hidden lg:block lg:w-64">
          <Sidebar items={navItems} />
        </div>
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:border-teal-200 lg:hidden"
              onClick={toggle}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <Navbar
                title={title}
                onNotificationClick={() => undefined}
                onLogout={handleLogout}
                logoutLoading={logoutLoading}
              >
                <p className="hidden text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 lg:block">
                  {subtitle ?? "Clinic operations"}
                </p>
              </Navbar>
            </div>
          </div>

          <div
            className={clsx(
              "rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition",
              "lg:p-8"
            )}
          >
            {children}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={toggle}>
          <div
            className="absolute left-0 top-0 h-full w-64"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar items={navItems} compact />
          </div>
        </div>
      )}
    </div>
  );
}
