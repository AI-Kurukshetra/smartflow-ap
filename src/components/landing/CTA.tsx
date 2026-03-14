import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="absolute -left-12 top-8 h-44 w-44 rounded-full bg-teal-100/80 blur-3xl" />
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">
              <Sparkles className="h-4 w-4" />
              Start managing healthcare smarter
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-4xl xl:text-5xl">
              Replace fragmented tools with one premium operating system for modern care delivery.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Give providers, care teams, and patients a faster experience for scheduling,
              coordination, documentation, and follow-ups without the overhead of legacy systems.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Faster patient onboarding and intake",
              "Cleaner scheduling and telehealth coordination",
              "Structured records and follow-up workflows",
              "A modern interface for providers and patients",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Start for Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-400 hover:text-teal-700"
            >
              Book Demo
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Secure healthcare workflows
            </span>
            <span>No credit card required</span>
            <span>Launch in minutes</span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal-200">Workflow impact</p>
                <p className="mt-2 text-2xl font-semibold text-white">Operational clarity at every step</p>
              </div>
              <ArrowRight className="h-5 w-5 text-teal-200" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Patient intake", value: "2x faster" },
                { label: "Visit readiness", value: "95%" },
                { label: "Documentation flow", value: "Unified" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">What teams get with MedStack</p>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs uppercase tracking-[0.25em] text-teal-700">
                  Included
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Provider dashboard with live scheduling visibility",
                  "Patient records and documentation in one place",
                  "Telehealth-ready workflows and follow-up coordination",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
