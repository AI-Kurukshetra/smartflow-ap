"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPatient } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export function CreatePatientForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (values: PatientFormValues) => {
    setLoading(true);
    setMessage(null);

    const { error } = await createPatient(values);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Patient created successfully.");
      reset();
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Patient name"
        placeholder="Aria Bennett"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        placeholder="aria@example.com"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone"
        placeholder="+1 415 555 0101"
        error={errors.phone?.message}
        {...register("phone")}
      />
      {message && <p className="text-xs text-slate-500">{message}</p>}
      <Button loading={loading} type="submit" className="w-full">
        Create patient
      </Button>
    </form>
  );
}
