"use client";

import { AppointmentList } from "./AppointmentList";
import { Card } from "@/components/ui/Card";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import type { Appointment, Patient, Provider } from "@/types";

interface AppointmentSchedulerProps {
  providers: Provider[];
  patients: Patient[];
  appointments: Appointment[];
}

export function AppointmentScheduler({
  providers,
  patients,
  appointments,
}: AppointmentSchedulerProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card
        title="Create appointment"
        description="Book and persist a new appointment in Supabase."
      >
        <AppointmentForm patients={patients} providers={providers} />
      </Card>
      <AppointmentList appointments={appointments} patients={patients} providers={providers} />
    </div>
  );
}

export default AppointmentScheduler;
