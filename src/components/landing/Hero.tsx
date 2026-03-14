import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";

const stats = [
  { icon: Users, label: "Active patients", value: "12.4K" },
  { icon: CalendarDays, label: "Appointments booked", value: "1,240" },
  { icon: FileText, label: "Notes synced", value: "4,891" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border border-slate-100 bg-gradient-to-br from-white via-sky-50/70 to-teal-50/70">
      <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute -right-8 top-0 h-56 w-56 rounded-full bg-teal-200/35 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI-powered care operations
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl xl:text-6xl">
                Practice management, reimagined.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Simplify operations and deliver better care with an AI-powered healthcare platform.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Get Started
            </Link>
            <a
              href="#dashboard-preview"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-400 hover:text-teal-700"
            >
              See a Demo
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <Card key={item.label} className="border-slate-100 bg-white/90 p-5 shadow-md hover:translate-y-0">
                <div className="space-y-3">
                  <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <Card className="overflow-hidden border-slate-100 bg-white p-0 shadow-2xl hover:translate-y-0">
            <div className="border-b border-slate-100 bg-slate-950 px-6 py-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-teal-300">MedStack OS</p>
                  <h2 className="mt-2 text-2xl font-semibold">Unified care workspace</h2>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-200">
                  Live preview
                </span>
              </div>
            </div>

            <div className="grid gap-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-6 text-white">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Waitlist", value: "08", note: "High-priority patient reviews" },
                  { label: "Visits today", value: "32", note: "Mixed virtual and in-person care" },
                  { label: "Tasks", value: "14", note: "Notes, renewals, and follow-ups" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Daily workflow</p>
                    <ArrowRight className="h-4 w-4 text-teal-300" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "09:00 AM · Intake review",
                      "10:30 AM · Follow-up consult",
                      "11:45 AM · Clinical documentation",
                      "01:00 PM · Virtual nutrition session",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">Patient flow overview</p>
                  <div className="mt-5 space-y-4">
                    {[
                      { label: "Onboarding complete", width: "w-full" },
                      { label: "Appointments confirmed", width: "w-5/6" },
                      { label: "Notes filed", width: "w-4/5" },
                      { label: "Care plans delivered", width: "w-3/4" },
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
                          <span>{item.label}</span>
                          <span>Synced</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className={`h-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 ${item.width}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
