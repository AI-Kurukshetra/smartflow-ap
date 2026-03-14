"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createMedicalRecord, updateMedicalRecord } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { MedicalRecord } from "@/types";

const medicalRecordSchema = z.object({
  diagnosis: z.string().min(3, "Enter a diagnosis"),
  notes: z.string().min(10, "Add clinical notes"),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

interface MedicalRecordFormProps {
  patientId: string;
  record?: MedicalRecord;
}

export function MedicalRecordForm({ patientId, record }: MedicalRecordFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      diagnosis: record?.diagnosis ?? "",
      notes: record?.notes ?? "",
    },
  });

  const onSubmit = async (values: MedicalRecordFormValues) => {
    setLoading(true);
    setMessage(null);

    const response = record
      ? await updateMedicalRecord(record.id, values)
      : await createMedicalRecord({
          patientId,
          diagnosis: values.diagnosis,
          notes: values.notes,
        });

    if (response.error) {
      setMessage(response.error.message);
    } else {
      setMessage(record ? "Medical record updated." : "Medical record created.");
      if (!record) {
        reset();
      }
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Diagnosis"
        placeholder="Hypertension"
        error={errors.diagnosis?.message}
        {...register("diagnosis")}
      />
      <label className="block space-y-1 text-sm text-slate-700">
        <span className="font-medium text-slate-900">Clinical notes</span>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          placeholder="Summarize the encounter, plan, and follow-up."
          {...register("notes")}
        />
        {errors.notes?.message && (
          <p className="text-xs font-semibold text-red-500">{errors.notes.message}</p>
        )}
      </label>
      {message && <p className="text-xs text-slate-500">{message}</p>}
      <Button type="submit" loading={loading} className="w-full">
        {record ? "Update record" : "Create record"}
      </Button>
    </form>
  );
}
