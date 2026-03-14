"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClinicalNote } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const clinicalSchema = z.object({
  title: z.string().min(3, "Provide a title"),
  excerpt: z.string().min(10, "Write a short summary"),
});

type ClinicalFormValues = z.infer<typeof clinicalSchema>;

interface ClinicalNoteFormProps {
  patientId?: string;
  patientName: string;
}

export function ClinicalNoteForm({ patientId, patientName }: ClinicalNoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClinicalFormValues>({
    resolver: zodResolver(clinicalSchema),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (values: ClinicalFormValues) => {
    setLoading(true);
    setMessage(null);
    const { error } = await createClinicalNote({
      patientId,
      patient: patientName,
      title: values.title,
      excerpt: values.excerpt,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Clinical note saved.");
      reset();
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Note title"
        placeholder="Follow-up summary"
        {...register("title")}
        error={errors.title?.message}
      />
      <Input
        label="Summary"
        placeholder="Patient is responding well..."
        {...register("excerpt")}
        error={errors.excerpt?.message}
      />
      {message && <p className="text-xs text-slate-500">{message}</p>}
      <Button loading={loading} type="submit" className="w-full">
        Save note
      </Button>
    </form>
  );
}
