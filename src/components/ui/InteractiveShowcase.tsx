"use client";

import { useState } from "react";
import { Button } from "./Button";

const experiences = [
  {
    id: "provider",
    title: "Provider cockpit",
    description: "Queue triage, live vitals, and one-click telehealth sessions keep your clinicians focused on care.",
    stat: "4 active rooms",
    helper: "Real-time clinical context",
  },
  {
    id: "patient",
    title: "Patient portal",
    description: "Timeline of labs, meds, and messages with guided onboarding to accelerate adoption.",
    stat: "96% engagement",
    helper: "Automated reminders",
  },
  {
    id: "ops",
    title: "Ops workspace",
    description: "Scheduling, billing hooks, and compliance logs come together so your revenue ops can move faster.",
    stat: "22 automations",
    helper: "Built-in audit trails",
  },
];

export function InteractiveShowcase() {
  const [active, setActive] = useState(experiences[0]);

  return (
    <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Experience lab</p>
        <h3 className="text-2xl font-semibold text-slate-900">{active.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{active.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold text-teal-600">{active.stat}</p>
          <span className="text-xs text-slate-500">{active.helper}</span>
        </div>
        <Button variant="secondary" size="md">
          Preview workflow
        </Button>
      </div>
      <div className="grid gap-3 rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-white shadow-2xl">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            type="button"
            className={`flex items-center justify-between rounded-2xl border p-4 transition ${
              active.id === experience.id
                ? "border-teal-400 bg-white/10"
                : "border-transparent bg-white/5 hover:border-teal-300/50"
            }`}
            onClick={() => setActive(experience)}
          >
            <div>
              <p className="text-sm font-semibold">{experience.title}</p>
              <p className="text-xs text-slate-200">{experience.helper}</p>
            </div>
            <span className="text-sm text-teal-300">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
