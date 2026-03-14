import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Activity, MessageCircle, Pill, Users } from "lucide-react";

export type Stat = {
  label: string;
  value: string;
  helper?: string;
  accent: "teal" | "blue" | "amber" | "emerald";
};

export interface StatsCardsProps {
  stats: Stat[];
}

const iconMap: Record<Stat["accent"], React.ComponentType<{ className?: string }>> = {
  teal: Activity,
  blue: Users,
  amber: Pill,
  emerald: MessageCircle,
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.accent];
        const badgeVariant = stat.accent === "emerald" ? "success" : "info";

        return (
          <Card
            key={stat.label}
            className="flex flex-col gap-3 border-slate-100 bg-gradient-to-br from-white to-slate-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow">
                <Icon className="h-6 w-6 text-slate-600" />
              </div>
            </div>
            {stat.helper && (
              <p className="text-sm text-slate-500">{stat.helper}</p>
            )}
            <Badge variant={badgeVariant}>{stat.label}</Badge>
          </Card>
        );
      })}
    </div>
  );
}
