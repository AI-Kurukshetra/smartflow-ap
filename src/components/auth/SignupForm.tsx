"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { signupUser } from "@/lib/api";
import { PasswordField } from "./PasswordField";

const signupSchema = z.object({
  firstName: z.string().min(2, "Enter a valid first name"),
  lastName: z.string().min(2, "Enter a valid last name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["provider", "patient", "clinic_admin"]),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "provider",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const result = await signupUser(values);

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        setMessage("Account created successfully. Redirecting to your dashboard...");
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Unable to create your account right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] md:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-600">
          MedStack signup
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Start Your Free Trial
        </h2>
        <p className="text-sm leading-6 text-slate-500">
          Set up your workspace and start managing care operations in one place.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="First Name"
            placeholder="Elena"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Input
            label="Last Name"
            placeholder="Torres"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <Input
          label="Email Address"
          placeholder="doctor@medstack.health"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone Number"
          placeholder="+1 415 555 0101"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <PasswordField
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <label className="block space-y-1 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Role</span>
          <select
            className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            {...register("role")}
          >
            <option value="provider">Provider</option>
            <option value="patient">Patient</option>
            <option value="clinic_admin">Clinic Admin</option>
          </select>
          {errors.role?.message && (
            <p className="text-xs font-semibold text-red-500">{errors.role.message}</p>
          )}
        </label>

        {message && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          className="w-full cursor-pointer rounded-2xl py-3"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-teal-600 transition hover:text-teal-700">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
