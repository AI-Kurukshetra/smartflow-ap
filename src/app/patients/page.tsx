import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { Card } from "@/components/ui/Card";
import { CreatePatientForm } from "@/components/forms/PatientForm";
import { fetchPatients } from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function PatientsPage() {
  const patients = await fetchPatients();

  return (
    <DashboardShell title="Patients" subtitle="Full patient roster">
      <div className="space-y-8">
        <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Roster</p>
            <h2 className="text-2xl font-semibold text-slate-900">{patients.length} patients</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#create-patient"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-400 hover:text-teal-700"
            >
              Add patient
            </Link>
            <Link href="/book" className="text-sm font-semibold text-teal-600 underline">
              Schedule visit
            </Link>
          </div>
        </Card>

        <Card id="create-patient" title="Add patient">
          <CreatePatientForm />
        </Card>

        <PatientTable patients={patients} />
      </div>
    </DashboardShell>
  );
}
