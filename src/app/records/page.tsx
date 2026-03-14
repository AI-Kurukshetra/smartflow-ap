import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ClinicalNoteForm } from "@/components/forms/ClinicalNoteForm";
import { MedicalRecordForm } from "@/components/forms/MedicalRecordForm";
import type { Patient } from "@/types";
import {
  fetchClinicalNotes,
  fetchMedicalRecords,
  fetchPatients,
} from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function PatientRecordsPage() {
  const [patients, medicalRecords, clinicalNotes] = await Promise.all([
    fetchPatients(),
    fetchMedicalRecords(),
    fetchClinicalNotes(),
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

  const record = medicalRecords.find((entry) => entry.patientId === patient.id);
  const notes = clinicalNotes.filter((note) => note.patient === patient.name);

  return (
    <DashboardShell title="Patient Records" subtitle="Clinical documentation">
      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Update medical record">
            <MedicalRecordForm patientId={patient.id} record={record} />
          </Card>
          <Card title="Add clinical note">
            <ClinicalNoteForm patientId={patient.id} patientName={patient.name} />
          </Card>
        </div>

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
          <div className="flex flex-wrap gap-3">
            {patient.conditions.map((condition) => (
              <Badge key={condition} variant="info">
                {condition}
              </Badge>
            ))}
            <Badge variant="success">{patient.status ?? "active"}</Badge>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Diagnosis">
            <p className="text-sm text-slate-500">{record?.diagnosis ?? "No diagnosis recorded."}</p>
          </Card>
          <Card title="Medical notes">
            <p className="text-sm text-slate-500">{record?.notes ?? "No notes available."}</p>
          </Card>
          <Card title="Allergies">
            <p className="text-sm text-slate-500">
              {record && record.allergies.length > 0 ? record.allergies.join(", ") : "No recorded allergies."}
            </p>
          </Card>
          <Card id="prescriptions" title="Medications">
            <p className="text-sm text-slate-500">
              {record && record.medications.length > 0 ? record.medications.join(", ") : "No medications listed."}
            </p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Clinical notes">
            <div className="space-y-4 text-sm">
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
                    <p className="text-slate-500">{note.excerpt}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No notes available yet.</p>
              )}
            </div>
          </Card>
          <Card title="Visit timeline">
            <div className="space-y-3 text-sm text-slate-500">
              {record && record.visitHistory.length > 0 ? (
                record.visitHistory.map((visit) => (
                  <div key={`${visit.date}-timeline`} className="space-y-1">
                    <p className="font-semibold text-slate-900">{visit.date}</p>
                    <p>{visit.summary}</p>
                  </div>
                ))
              ) : (
                <p>No timeline yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
