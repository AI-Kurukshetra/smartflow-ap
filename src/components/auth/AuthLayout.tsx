import {
  Activity,
  CalendarCheck2,
  FolderHeart,
  MessageSquareQuote,
  Shield,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutMode = "signup" | "login";

interface AuthLayoutProps {
  children: ReactNode;
  mode?: AuthLayoutMode;
}

const contentMap: Record<
  AuthLayoutMode,
  {
    heading: string;
    description: string;
    stats: {
      label: string;
      value: string;
      icon: typeof Activity;
    }[];
    features: {
      icon: typeof Activity;
      label: string;
    }[];
    workspaceTitle: string;
    workspaceScheduleLabel: string;
    workspaceScheduleValue: string;
    workspaceScheduleHelper: string;
    workspaceTasksLabel: string;
    workspaceTasksValue: string;
    workspaceTasksHelper: string;
    flow: { label: string; width: string }[];
    tags: string[];
    testimonial: string;
    customer: string;
    customerRole: string;
  }
> = {
  signup: {
    heading: "An all-in-one healthcare platform that manages your entire practice.",
    description:
      "Join thousands of providers managing patients, appointments, and records using MedStack.",
    stats: [
      { label: "Patients onboarded", value: "12.4K", icon: Activity },
      { label: "Appointments booked", value: "1,240", icon: CalendarCheck2 },
      { label: "Telehealth visits", value: "96%", icon: Video },
    ],
    features: [
      { icon: Stethoscope, label: "Streamline patient management" },
      { icon: CalendarCheck2, label: "Schedule and manage appointments" },
      { icon: FolderHeart, label: "Secure medical records and clinical notes" },
    ],
    workspaceTitle: "Clinic operations overview",
    workspaceScheduleLabel: "Today's schedule",
    workspaceScheduleValue: "18 visits",
    workspaceScheduleHelper: "7 virtual · 11 in-clinic",
    workspaceTasksLabel: "Pending notes",
    workspaceTasksValue: "6 charts",
    workspaceTasksHelper: "Ready for provider review",
    flow: [
      { label: "Patient intake synced", width: "w-full" },
      { label: "Appointments confirmed", width: "w-5/6" },
      { label: "Records updated", width: "w-4/5" },
    ],
    tags: ["Patient onboarding", "Scheduling", "Clinical records"],
    testimonial:
      "MedStack helped us simplify our entire clinic workflow. Everything from appointments to patient records is now centralized.",
    customer: "Dr. Elena Torres",
    customerRole: "Cardiology Practice Lead",
  },
  login: {
    heading: "Secure access to your practice operations, patient records, and daily care workflows.",
    description:
      "Sign in to review today's schedule, manage patient communication, and keep clinical tasks moving from a single workspace.",
    stats: [
      { label: "Providers active", value: "320", icon: Shield },
      { label: "Visits today", value: "842", icon: CalendarCheck2 },
      { label: "Queue response", value: "< 4 min", icon: Activity },
    ],
    features: [
      { icon: CalendarCheck2, label: "Review today's patient and provider schedule" },
      { icon: Stethoscope, label: "Access charts, notes, and care plans faster" },
      { icon: FolderHeart, label: "Keep operational handoffs and follow-ups aligned" },
    ],
    workspaceTitle: "Daily access snapshot",
    workspaceScheduleLabel: "Next consults",
    workspaceScheduleValue: "09 in queue",
    workspaceScheduleHelper: "Video, phone, and in-clinic visits",
    workspaceTasksLabel: "Unread updates",
    workspaceTasksValue: "14 items",
    workspaceTasksHelper: "Messages, notes, and refill tasks",
    flow: [
      { label: "Morning schedule confirmed", width: "w-full" },
      { label: "Clinical notes synced", width: "w-5/6" },
      { label: "Patient reminders sent", width: "w-4/5" },
    ],
    tags: ["Provider dashboard", "Care coordination", "Secure sign-in"],
    testimonial:
      "Our team logs in each morning and immediately sees the entire care workflow in one place. MedStack removed the back-and-forth between disconnected systems.",
    customer: "Lila Morgan",
    customerRole: "Clinic Operations Manager",
  },
};

export function AuthLayout({ children, mode = "signup" }: AuthLayoutProps) {
  const content = contentMap[mode];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)] px-4 py-8 text-slate-900 lg:px-8 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#f0fdfa_58%,_#eff6ff_100%)] px-6 py-10 text-slate-900 md:px-10 md:py-12 lg:px-14 lg:py-16">
          <div className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-teal-200/70 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-200/70 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-cyan-100/80 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  MedStack
                </span>
                <div className="space-y-4">
                  <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                    {content.heading}
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-700">
                    {content.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {content.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                      <span className="rounded-2xl bg-teal-100 p-2 text-teal-700">
                        <item.icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4">
                  {content.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-md transition hover:border-teal-300 hover:bg-teal-50/50"
                    >
                      <span className="inline-flex rounded-2xl bg-teal-100 p-2 text-teal-700 transition group-hover:bg-teal-200">
                        <feature.icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-slate-800">{feature.label}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-teal-100">Live workspace</p>
                      <p className="mt-2 text-xl font-semibold text-white">{content.workspaceTitle}</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      Live
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-200">
                          {content.workspaceScheduleLabel}
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                          {content.workspaceScheduleValue}
                        </p>
                        <p className="mt-1 text-xs text-slate-100">
                          {content.workspaceScheduleHelper}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-200">
                          {content.workspaceTasksLabel}
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                          {content.workspaceTasksValue}
                        </p>
                        <p className="mt-1 text-xs text-slate-100">
                          {content.workspaceTasksHelper}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">Care flow</p>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Realtime</p>
                      </div>
                      <div className="space-y-3">
                        {content.flow.map((item) => (
                          <div key={item.label} className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-100">
                              <span>{item.label}</span>
                              <span>Ready</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/15">
                              <div className={`h-2 rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 ${item.width}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="inline-flex rounded-2xl bg-teal-100 p-3 text-teal-700">
                  <MessageSquareQuote className="h-6 w-6" />
                </span>
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-slate-700">
                    &ldquo;{content.testimonial}&rdquo;
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{content.customer}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        {content.customerRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-start bg-white px-5 py-8 md:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-xl lg:mx-0">{children}</div>
        </section>
      </div>
    </div>
  );
}
