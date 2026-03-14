import { isSameDay, parseISO } from "date-fns";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { RecentNotes } from "@/components/dashboard/RecentNotes";
import { StatsCards } from "@/components/dashboard/StatsCards";
import type { Stat } from "@/components/dashboard/StatsCards";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  fetchAppointments,
  fetchClinicalNotes,
  fetchPatients,
  fetchProviders,
} from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function ProviderDashboardPage() {
  const [patients, appointments, providers, clinicalNotes] = await Promise.all([
    fetchPatients(),
    fetchAppointments(),
    fetchProviders(),
    fetchClinicalNotes(),
  ]);

  const today = new Date();
  const todaysAppointments = appointments.filter((appointment) =>
    isSameDay(parseISO(appointment.appointmentDate), today)
  );
  const upcomingVisits = appointments.filter(
    (appointment) => parseISO(appointment.appointmentDate) >= today
  );

  const stats: Stat[] = [
    {
      label: "Total Patients",
      value: `${patients.length}`,
      helper: "Registered patient profiles",
      accent: "blue",
    },
    {
      label: "Today's Appointments",
      value: `${todaysAppointments.length}`,
      helper: "Scheduled for today",
      accent: "teal",
    },
    {
      label: "Recent Clinical Notes",
      value: `${clinicalNotes.length}`,
      helper: "Latest chart activity",
      accent: "emerald",
    },
    {
      label: "Upcoming Visits",
      value: `${upcomingVisits.length}`,
      helper: "Future appointments",
      accent: "amber",
    },
  ] as const;

  const statusVariantMap = {
    confirmed: "success",
    pending: "info",
    completed: "neutral",
    cancelled: "warning",
  } as const;

  return (
    <DashboardShell title="Provider Dashboard" subtitle="Care operations center">
      <div className="space-y-8">
        <StatsCards stats={stats} />
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <AppointmentList
            appointments={todaysAppointments}
            patients={patients}
            providers={providers}
          />
          <Card title="Upcoming visit queue">
            <div className="space-y-4">
              {upcomingVisits.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(appointment.appointmentDate).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Location: {appointment.location}</p>
                  </div>
                  <Badge variant={statusVariantMap[appointment.status]}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <PatientTable patients={patients} />
          <RecentNotes notes={clinicalNotes} />
        </div>
        <CalendarView appointments={appointments} />
      </div>
    </DashboardShell>
  );
}
