"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { deleteAppointment, updateAppointment } from "@/lib/api";
import type { Appointment } from "@/types";

export function AppointmentActions({ appointment }: { appointment: Appointment }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    await updateAppointment(appointment.id, { status: "completed" });
    router.refresh();
    setLoading(false);
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancel this appointment?")) return;
    setLoading(true);
    await updateAppointment(appointment.id, { status: "cancelled" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {appointment.status !== "completed" && appointment.status !== "cancelled" && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-slate-500"
          onClick={handleComplete}
          disabled={loading}
        >
          Complete
        </Button>
      )}
      {appointment.status !== "cancelled" && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-rose-500"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      )}
      {appointment.status === "cancelled" && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-slate-400"
          onClick={async () => {
            setLoading(true);
            await deleteAppointment(appointment.id);
            router.refresh();
            setLoading(false);
          }}
          disabled={loading}
        >
          Delete
        </Button>
      )}
    </div>
  );
}
