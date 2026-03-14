import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { Patient } from "@/types";
import {
  fetchAppointments,
  fetchClinicalNotes,
  fetchMedicalRecords,
  fetchMessages,
  fetchPatients,
  fetchPrescriptions,
} from "@/lib/supabase/queries";
import Link from "next/link";

export const revalidate = 30;

export default async function PatientPortalPage() {
  const [patients, appointments, medicalRecords, prescriptions, clinicalNotes, messages] =
    await Promise.all([
      fetchPatients(),
      fetchAppointments(),
      fetchMedicalRecords(),
      fetchPrescriptions(),
      fetchClinicalNotes(),
      fetchMessages(),
    ]);

  const patient: Patient =
    patients[0] ?? {
      id: "patient-unknown",
      name: "Care Partner",
      email: "unknown@medstack.health",
      phone: "Not provided",
      conditions: [],
      status: "active",
    };

  const record = medicalRecords.find((item) => item.patientId === patient.id);
  const patientAppointments = appointments.filter((appointment) => appointment.patientId === patient.id);
  const patientPrescriptions = prescriptions.filter((prescription) => prescription.patientId === patient.id);
  const patientNotes = clinicalNotes.filter((note) => note.patientId === patient.id);

  return (
    <DashboardShell title="Patient Portal" subtitle="Your care workspace">
      <div className="space-y-8">
        <Card
          className="space-y-6 border-teal-100 bg-gradient-to-r from-white to-slate-50 shadow-xl"
          title={`Welcome, ${patient.name}`}
        >
          <p className="text-sm text-slate-500">
            {patient.email} • {patient.phone}
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">{patient.status ?? "active"}</Badge>
            {patient.conditions.map((condition) => (
              <Badge key={condition} variant="info">
                {condition}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/records"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-teal-400 hover:text-teal-700"
            >
              View records
            </Link>
            <Link
              href="/messages"
              className="inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-600"
            >
              Message provider
            </Link>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Upcoming appointments">
            <div className="space-y-4">
              {patientAppointments.length > 0 ? (
                patientAppointments.map((appointment) => (
                  <div key={appointment.id} className="space-y-1 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(appointment.appointmentDate).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">
                      {appointment.location} • {appointment.status}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-slate-400">No appointments scheduled</p>
              )}
            </div>
          </Card>
          <Card title="Medical summary">
            <div className="space-y-3 text-sm text-slate-500">
              <p>
                <span className="font-semibold text-slate-900">Diagnosis:</span>{" "}
                {record?.diagnosis ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Notes:</span>{" "}
                {record?.notes ?? "No notes available"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Allergies:</span>{" "}
                {record && record.allergies.length > 0 ? record.allergies.join(", ") : "None"}
              </p>
            </div>
          </Card>
          <Card title="Prescriptions">
            <div className="space-y-3 text-sm">
              {patientPrescriptions.map((prescription) => (
                <div key={prescription.id} className="space-y-1">
                  <p className="font-semibold text-slate-900">{prescription.medication}</p>
                  <Badge
                    variant={
                      prescription.status === "pending"
                        ? "info"
                        : prescription.status === "refill"
                        ? "warning"
                        : "success"
                    }
                  >
                    {prescription.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Recent clinical notes">
            <div className="space-y-4 text-sm">
              {patientNotes.length > 0 ? (
                patientNotes.map((note) => (
                  <div key={note.id} className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <p className="font-semibold text-slate-900">{note.title}</p>
                    <p className="text-slate-500">{note.excerpt}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No clinical notes yet.</p>
              )}
            </div>
          </Card>

          <Card title="Messages with provider">
            <div className="space-y-4 text-sm">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="space-y-1 rounded-2xl border border-slate-100 p-4 bg-white"
                >
                  <p className="text-xs font-semibold text-slate-400">{message.time}</p>
                  <p className="font-semibold text-slate-800">{message.sender}</p>
                  <p className="text-slate-500">{message.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
