import Link from "next/link";
import { ArrowRight, BookOpenText, FileChartColumnIncreasing, Headset } from "lucide-react";
import { Card } from "@/components/ui/Card";

const resources = [
  {
    icon: BookOpenText,
    title: "Implementation guides",
    description: "Reference onboarding playbooks for launching scheduling, intake, and remote care workflows.",
    href: "/signup",
    cta: "Explore guides",
  },
  {
    icon: FileChartColumnIncreasing,
    title: "Operational insights",
    description: "See how modern clinics improve throughput, reduce admin overhead, and improve patient engagement.",
    href: "/login",
    cta: "View insights",
  },
  {
    icon: Headset,
    title: "Support and demos",
    description: "Review product walkthroughs, workflow examples, and support materials for your team.",
    href: "/login",
    cta: "Book a demo",
  },
];

export function Resources() {
  return (
    <section id="resources" className="border border-slate-100 bg-gradient-to-b from-white to-slate-50">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">Resources</p>
          <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
            Everything your team needs to evaluate and launch MedStack
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            From implementation guidance to workflow demos, these resources help providers and operators understand how MedStack fits into real clinical operations.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.title} className="h-full border-slate-100 bg-white shadow-md">
              <div className="space-y-4">
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 p-3 text-teal-600">
                  <resource.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                  <p className="text-sm leading-6 text-slate-500">{resource.description}</p>
                </div>
                <Link
                  href={resource.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
                >
                  {resource.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
