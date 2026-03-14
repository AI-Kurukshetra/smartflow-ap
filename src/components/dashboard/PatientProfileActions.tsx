"use client";

import { Button } from "@/components/ui/Button";
import { deletePatient, updatePatient } from "@/lib/api";
import { Patient } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PatientProfileActionsProps {
  patient: Patient;
}

export function PatientProfileActions({ patient }: PatientProfileActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogVisit = async () => {
    setLoading(true);
    await updatePatient(patient.id, {
      lastVisit: new Date().toLocaleDateString(),
    });
    router.refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Archive this patient and remove access?")) return;
    setLoading(true);
    await deletePatient(patient.id);
    router.push("/patients");
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" size="sm" onClick={handleLogVisit} loading={loading}>
        Log visit
      </Button>
      <Button variant="ghost" size="sm" className="text-rose-500" onClick={handleDelete}>
        Archive patient
      </Button>
    </div>
  );
}
