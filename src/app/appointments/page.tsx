import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import Link from "next/link";
import {
  fetchAppointments,
  fetchPatients,
  fetchProviders,
} from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function AppointmentSchedulerPage() {
  const [providers, patients, appointments] = await Promise.all([
    fetchProviders(),
    fetchPatients(),
    fetchAppointments(),
  ]);

  return (
    <DashboardShell title="Appointments" subtitle="All scheduled visits">
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Appointment schedule</p>
            <h2 className="text-xl font-semibold text-slate-900">Upcoming visits</h2>
          </div>
          <Link
            href="/book"
            className="rounded-2xl border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50"
          >
            Book new visit
          </Link>
        </div>
        <AppointmentList appointments={appointments} patients={patients} providers={providers} />
      </div>
    </DashboardShell>
  );
}
