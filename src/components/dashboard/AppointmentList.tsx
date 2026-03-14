import { format } from "date-fns";
import { AppointmentActions } from "./AppointmentActions";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Appointment, Patient, Provider } from "@/types";

export interface AppointmentListProps {
  appointments: Appointment[];
  patients: Patient[];
  providers: Provider[];
}

export function AppointmentList({
  appointments,
  patients,
  providers,
}: AppointmentListProps) {
  const getPatient = (id: string) =>
    patients.find((patient) => patient.id === id)?.name ?? "Unknown patient";
  const getProvider = (id: string) =>
    providers.find((provider) => provider.id === id)?.name ?? "Provider";

  const mapStatus = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "info";
      case "completed":
        return "neutral";
      case "cancelled":
        return "warning";
    }
  };

  return (
    <Card title="Appointments">
      {appointments.length === 0 ? (
        <EmptyState
          title="No appointments yet"
          description="Booked visits will appear here."
        />
      ) : (
        <div className="space-y-4">
          {appointments.slice(0, 8).map((appointment) => (
            <div
              key={appointment.id}
              className="space-y-3 rounded-2xl border border-slate-100 p-4 transition hover:border-teal-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {format(new Date(appointment.appointmentDate), "MMM d • h:mm a")}
                  </p>
                  <p className="text-sm text-slate-500">
                    {getPatient(appointment.patientId)} with {getProvider(appointment.providerId)}
                  </p>
                  <p className="text-xs text-slate-400">{appointment.location}</p>
                </div>
                <Badge variant={mapStatus(appointment.status)}>{appointment.status}</Badge>
              </div>
              <AppointmentActions appointment={appointment} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
