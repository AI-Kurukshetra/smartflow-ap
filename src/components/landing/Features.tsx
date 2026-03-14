import type { LucideIcon } from "lucide-react";
import { CalendarClock, FileText, MonitorPlay, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: UsersRound,
    title: "Patient Management",
    description: "Organize onboarding, contact details, care status, and follow-up workflows in a single operational hub.",
  },
  {
    icon: CalendarClock,
    title: "Appointment Scheduling",
    description: "Coordinate virtual and in-person visits with cleaner provider calendars and faster booking experiences.",
  },
  {
    icon: FileText,
    title: "Clinical Notes",
    description: "Capture diagnoses, visit context, and care plans with structured documentation that fits provider workflows.",
  },
  {
    icon: MonitorPlay,
    title: "Telehealth Consultations",
    description: "Support remote care delivery with integrated communication, follow-up coordination, and chart updates.",
  },
];

export function Features() {
  return (
    <section id="platform" className="border border-slate-100 bg-white/90">
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">Platform</p>
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
          Core infrastructure for healthcare teams
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600">
          MedStack brings together patient management, scheduling, documentation, and telehealth delivery in a premium SaaS interface.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="h-full border-slate-100 bg-white p-6 shadow-md transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 p-3 text-teal-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-500">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
