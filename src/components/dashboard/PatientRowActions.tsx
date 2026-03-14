"use client";

import { Patient } from "@/types";
import { Button } from "@/components/ui/Button";
import { deletePatient, updatePatient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const statuses: Patient["status"][] = ["active", "follow-up", "new"];

export function PatientRowActions({ patient }: { patient: Patient }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Patient["status"]>(patient.status ?? "active");

  const handleToggle = async () => {
    setLoading(true);
    const nextIndex = (statuses.indexOf(status) + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    const { error } = await updatePatient(patient.id, { status: nextStatus });
    if (!error) {
      setStatus(nextStatus);
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Remove this patient from the roster?")) return;
    setLoading(true);
    const { error } = await deletePatient(patient.id);
    if (!error) {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/patients/${patient.id}`}
        className="text-xs font-semibold text-teal-600 underline"
      >
        View
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-slate-500"
        onClick={handleToggle}
        disabled={loading}
      >
        {status === "active" ? "Set follow-up" : "Toggle status"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-rose-500"
        onClick={handleDelete}
        disabled={loading}
      >
        Delete
      </Button>
    </div>
  );
}
