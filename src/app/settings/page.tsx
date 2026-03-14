import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" subtitle="Configure your workspace">
      <div className="space-y-6">
        <Card title="Workspace settings">
          <p className="text-sm text-slate-500">
            Manage connected clinics, notifications, and secure access policies from the MedStack control plane.
          </p>
        </Card>
        <Card title="Notifications & alerts">
          <p className="text-sm text-slate-500">
            Enable SMS & email reminders, customize alert thresholds, and keep every provider informed.
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}
