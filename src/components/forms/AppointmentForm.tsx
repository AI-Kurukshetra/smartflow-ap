"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAppointment } from "@/lib/api";
import type { Appointment, Patient, Provider } from "@/types";
import { Button } from "@/components/ui/Button";

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Select a patient"),
  providerId: z.string().min(1, "Select a provider"),
  appointmentDate: z.string().min(1, "Select date and time"),
  location: z.string().min(2, "Enter a location"),
  type: z.enum(["video", "inPerson", "phone"]),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  patients: Patient[];
  providers: Provider[];
}

export function AppointmentForm({ patients, providers }: AppointmentFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: "video",
      location: "Virtual",
    },
  });

  const onSubmit = async (values: AppointmentFormValues) => {
    setLoading(true);
    setMessage(null);

    const { error } = await createAppointment({
      patientId: values.patientId,
      providerId: values.providerId,
      appointmentDate: new Date(values.appointmentDate).toISOString(),
      location: values.location,
      type: values.type as Appointment["type"],
      status: "confirmed",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Appointment booked successfully.");
      reset();
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="block text-sm font-medium text-slate-700">
        Patient
        <select
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          {...register("patientId")}
        >
          <option value="">Select patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        {errors.patientId && <p className="mt-1 text-xs text-rose-500">{errors.patientId.message}</p>}
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Provider
        <select
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          {...register("providerId")}
        >
          <option value="">Select provider</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
        {errors.providerId && <p className="mt-1 text-xs text-rose-500">{errors.providerId.message}</p>}
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Appointment time
        <input
          type="datetime-local"
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          {...register("appointmentDate")}
        />
        {errors.appointmentDate && (
          <p className="mt-1 text-xs text-rose-500">{errors.appointmentDate.message}</p>
        )}
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Location
        <input
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          {...register("location")}
        />
        {errors.location && <p className="mt-1 text-xs text-rose-500">{errors.location.message}</p>}
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Type
        <select
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          {...register("type")}
        >
          <option value="video">Video</option>
          <option value="inPerson">In-person</option>
          <option value="phone">Phone</option>
        </select>
      </label>
      {message && <p className="text-xs text-slate-500">{message}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Book appointment
      </Button>
    </form>
  );
}
