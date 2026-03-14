"use client";

import Link from "next/link";
import { Building2, Chrome } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { loginUser, loginWithOAuth } from "@/lib/api";
import { PasswordField } from "./PasswordField";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "azure" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const result = await loginUser(values);

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        setMessage("Signed in successfully. Redirecting to your dashboard...");
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Unable to sign you in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "azure") => {
    setOauthLoading(provider);
    setMessage(null);
    setErrorMessage(null);

    try {
      const result = await loginWithOAuth(provider);

      if (result.error) {
        setErrorMessage(
          provider === "google"
            ? "Google sign-in is not configured yet for this workspace."
            : "Microsoft SSO is not configured yet for this workspace."
        );
      }
    } catch (error) {
      console.error("OAuth login failed:", error);
      setErrorMessage("Unable to start the SSO flow right now. Please try again.");
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <Card className="border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] md:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-600">
          MedStack login
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Welcome Back
        </h2>
        <p className="text-sm leading-6 text-slate-500">
          Sign in to manage patients, appointments, and care operations from one workspace.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50/40"
          onClick={() => void handleOAuth("google")}
          disabled={oauthLoading !== null}
        >
          <Chrome className="h-4 w-4" />
          {oauthLoading === "google" ? "Connecting..." : "Google"}
        </button>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50/40"
          onClick={() => void handleOAuth("azure")}
          disabled={oauthLoading !== null}
        >
          <Building2 className="h-4 w-4" />
          {oauthLoading === "azure" ? "Connecting..." : "Microsoft SSO"}
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address"
          placeholder="doctor@medstack.health"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

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
          Login
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-teal-600 transition hover:text-teal-700">
          Start your free trial
        </Link>
      </p>
    </Card>
  );
}
