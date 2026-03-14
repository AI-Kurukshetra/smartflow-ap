import { ArrowRight, CircleUserRound, FolderHeart, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    step: "Step 1",
    title: "Create account",
    description: "Launch your workspace quickly and give your team a centralized environment for scheduling and care operations.",
    icon: CircleUserRound,
  },
  {
    step: "Step 2",
    title: "Manage patients",
    description: "Track intake, visit readiness, and follow-up activity in one place so operational handoffs stay clean.",
    icon: FolderHeart,
  },
  {
    step: "Step 3",
    title: "Deliver better care",
    description: "Use coordinated appointments, notes, and remote care workflows to support a higher-quality patient experience.",
    icon: HeartPulse,
  },
];

export function HowItWorks() {
  return (
    <section className="border border-slate-100 bg-gradient-to-b from-white to-slate-50">
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">How it works</p>
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
          A straightforward workflow for connected care
        </h2>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {steps.map((item, index) => (
          <Card key={item.step} className="relative h-full border-slate-100 bg-white shadow-md">
            {index < steps.length - 1 && (
              <span className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-10 translate-x-5 -translate-y-1/2 bg-gradient-to-r from-slate-200 to-transparent lg:block" />
            )}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full bg-teal-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                  {item.step}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 text-slate-300 lg:block" />
                )}
              </div>
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 p-3 text-teal-600">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
