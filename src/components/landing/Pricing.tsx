import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";

const plans = [
  {
    name: "Starter",
    price: "$79",
    description: "For solo providers launching virtual care and lightweight practice operations.",
    features: [
      "Patient onboarding workspace",
      "Appointment scheduling",
      "Basic clinical notes",
      "Secure patient messaging",
    ],
    cta: "Start for Free",
    href: "/signup",
    featured: false,
  },
  {
    name: "Growth",
    price: "$199",
    description: "For growing clinics that need stronger coordination across providers and support staff.",
    features: [
      "Everything in Starter",
      "Shared provider calendars",
      "Medical record workflows",
      "Telehealth care coordination",
      "Operational reporting",
    ],
    cta: "Choose Growth",
    href: "/signup",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-location organizations that need configurable infrastructure and onboarding support.",
    features: [
      "Custom implementation",
      "Dedicated success support",
      "Advanced workflow design",
      "API-first integrations",
      "Compliance review support",
    ],
    cta: "Talk to Sales",
    href: "/login",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border border-slate-100 bg-white/90">
      <div className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">Pricing</p>
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">
          Pricing that scales with your care model
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600">
          Start with a lean provider setup, then expand into a full healthcare operations stack as your practice grows.
        </p>
      </div>

      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.featured
                ? "relative border-teal-200 bg-gradient-to-b from-white to-teal-50 shadow-xl"
                : "border-slate-100 bg-white shadow-md"
            }
          >
            {plan.featured && (
              <span className="absolute right-6 top-6 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                Most Popular
              </span>
            )}
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {plan.name}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold text-slate-950">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="pb-1 text-sm text-slate-500">/ month</span>}
                </div>
                <p className="text-sm leading-6 text-slate-500">{plan.description}</p>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 inline-flex rounded-full bg-teal-50 p-1 text-teal-600">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={
                  plan.featured
                    ? "inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    : "inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-400 hover:text-teal-700"
                }
              >
                {plan.cta}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
