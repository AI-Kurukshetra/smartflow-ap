import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AppointmentScheduler } from "@/components/dashboard/AppointmentScheduler";
import {
  fetchAppointments,
  fetchPatients,
  fetchProviders,
} from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function BookAppointment() {
  const [providers, patients, appointments] = await Promise.all([
    fetchProviders(),
    fetchPatients(),
    fetchAppointments(),
  ]);

  return (
    <DashboardShell title="Book Appointment" subtitle="Schedule a new visit">
      <AppointmentScheduler providers={providers} patients={patients} appointments={appointments} />
    </DashboardShell>
  );
}
