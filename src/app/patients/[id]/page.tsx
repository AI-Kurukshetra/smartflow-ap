import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ClinicalNoteForm } from "@/components/forms/ClinicalNoteForm";
import { MedicalRecordForm } from "@/components/forms/MedicalRecordForm";
import { PatientProfileActions } from "@/components/dashboard/PatientProfileActions";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  fetchAppointments,
  fetchClinicalNotes,
  fetchMedicalRecords,
  fetchPatients,
} from "@/lib/supabase/queries";

export const revalidate = 30;

interface PatientProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PatientProfilePage({ params }: PatientProfileProps) {
  const resolvedParams = await params;
  const [patients, medicalRecords, clinicalNotes, appointments] = await Promise.all([
    fetchPatients(),
    fetchMedicalRecords(),
    fetchClinicalNotes(),
    fetchAppointments(),
  ]);

  const patient = patients.find((entry) => entry.id === resolvedParams.id);

  if (!patient) {
    notFound();
  }

  const record = medicalRecords.find((entry) => entry.patientId === patient.id);
  const notes = clinicalNotes.filter((note) => note.patientId === patient.id);
  const visits = appointments.filter((appointment) => appointment.patientId === patient.id);

  return (
    <DashboardShell title="Patient profile" subtitle={patient.name}>
      <div className="space-y-8">
        <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={patient.name} size="lg" />
            <div>
              <p className="text-lg font-semibold text-slate-900">{patient.name}</p>
              <p className="text-sm text-slate-500">
                {patient.email} • {patient.phone}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 md:items-center">
            <PatientProfileActions patient={patient} />
            <Badge variant="success">{patient.status ?? "active"}</Badge>
            {patient.conditions[0] && <Badge variant="info">{patient.conditions[0]}</Badge>}
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Update medical record">
            <MedicalRecordForm patientId={patient.id} record={record} />
          </Card>
          <Card title="Add clinical note">
            <ClinicalNoteForm patientId={patient.id} patientName={patient.name} />
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Diagnosis">
            <p className="text-sm text-slate-500">{record?.diagnosis ?? "No diagnosis recorded."}</p>
          </Card>
          <Card title="Medical notes">
            <p className="text-sm text-slate-500">{record?.notes ?? "No notes available."}</p>
          </Card>
          <Card title="Conditions">
            <p className="text-sm text-slate-500">
              {patient.conditions.length > 0 ? patient.conditions.join(", ") : "No conditions recorded."}
            </p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Upcoming visits">
            <div className="space-y-4 text-sm text-slate-500">
              {visits.length > 0 ? (
                visits.map((visit) => (
                  <div key={visit.id} className="space-y-1 rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {new Date(visit.appointmentDate).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-slate-900">
                      {new Date(visit.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-slate-500">{visit.location}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-slate-400">
                  No scheduled or recent visits.
                </p>
              )}
            </div>
          </Card>
          <Card title="Clinical notes">
            <div className="space-y-3 text-sm text-slate-500">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="space-y-1 rounded-2xl border border-slate-100 p-4 bg-white"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <p className="font-semibold text-slate-900">{note.title}</p>
                    <p>{note.excerpt}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-slate-400">
                  No clinical notes available yet.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
