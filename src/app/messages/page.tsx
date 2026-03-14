import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { fetchMessages } from "@/lib/supabase/queries";

export const revalidate = 30;

export default async function MessagesPage() {
  const messages = await fetchMessages();

  return (
    <DashboardShell title="Messages" subtitle="Patient communication">
      <div className="space-y-6">
        {messages.map((message) => (
          <Card key={message.id}>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{message.time}</p>
            <p className="text-sm font-semibold text-slate-900">{message.sender}</p>
            <p className="text-sm text-slate-500">{message.message}</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
