import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { AuthForm } from "@/components/forms/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-slate-900">
      <div className="w-full max-w-4xl">
        <section className="mb-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">MedStack</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Create a workspace for your telehealth clinic.
          </h1>
          <p className="text-sm text-slate-500">
            Enable your team with secure messaging, patient records, and scheduling in one control center.
          </p>
        </section>
        <Card className="max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-900">Create an account</h2>
          <p className="text-sm text-slate-500">
            You’ll receive a confirmation to activate your MedStack workspace.
          </p>
          <div className="mt-6">
            <AuthForm mode="signup" />
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Already registered?{" "}
            <Link className="font-semibold text-teal-600" href="/login">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
