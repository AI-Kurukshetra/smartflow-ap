import { Card } from "@/components/ui/Card";
import type { ClinicalNote } from "@/types";

export interface RecentNotesProps {
  notes: ClinicalNote[];
}

export function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <Card title="Recent Clinical Notes">
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="space-y-1 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{note.title}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-slate-500">{note.excerpt}</p>
            <p className="text-xs text-slate-400">Patient: {note.patient}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
