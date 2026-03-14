import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { AuthForm } from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-slate-900">
      <div className="w-full max-w-4xl">
        <section className="mb-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">MedStack</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Secure login for telehealth providers.
          </h1>
          <p className="text-sm text-slate-500">
            Access your practice dashboard, patient queue, and e-prescribing tools in one place.
          </p>
        </section>
        <Card className="max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-900">Sign in</h2>
          <p className="text-sm text-slate-500">
            Use your MedStack account or continue with your clinic SSO.
          </p>
          <div className="mt-6">
            <AuthForm mode="login" />
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Don’t have an account?{" "}
            <Link className="font-semibold text-teal-600" href="/signup">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
