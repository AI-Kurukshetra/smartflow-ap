import { Card } from "@/components/ui/Card";
import { InteractiveShowcase } from "@/components/ui/InteractiveShowcase";

export function DashboardPreview() {
  return (
    <section id="who-we-serve" className="border border-slate-100 bg-white/90">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">Who we serve</p>
          <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
            Built for clinics, digital care teams, and patient-first practices
          </h2>
          <p className="text-base leading-7 text-slate-600">
            Coordinate front-desk operations, provider scheduling, patient engagement, and charting from one premium interface.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-slate-100 bg-slate-50 p-5 shadow-none hover:translate-y-0">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Patient dashboard</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">Clear onboarding and progress tracking</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Give patients one place to review upcoming visits, messages, and care context without friction.
              </p>
            </Card>
            <Card className="border-slate-100 bg-slate-50 p-5 shadow-none hover:translate-y-0">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Medical records</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">Structured documentation with less overhead</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep diagnoses, notes, and clinical updates aligned so every appointment starts with the right information.
              </p>
            </Card>
          </div>
        </div>

        <div id="dashboard-preview" className="space-y-5">
          <Card className="border-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 shadow-2xl hover:translate-y-0">
            <div className="space-y-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Dashboard</p>
                  <p className="mt-2 text-xl font-semibold">Operational snapshot</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                  Preview
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Appointments", value: "42", tone: "text-teal-300" },
                  { label: "Patient dashboard", value: "1.2K", tone: "text-sky-300" },
                  { label: "Medical records", value: "18", tone: "text-emerald-300" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                    <p className={`mt-3 text-3xl font-semibold ${item.tone}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Mock care workspace</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Realtime</p>
                </div>
                <div className="space-y-3">
                  {["Patient dashboard synced", "Appointment confirmed", "Medical record updated", "Follow-up reminder sent"].map(
                    (item) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                        <span className="text-sm text-slate-200">{item}</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-teal-300" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>

          <InteractiveShowcase />
        </div>
      </div>
    </section>
  );
}
