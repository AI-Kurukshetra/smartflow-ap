import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import type { BadgeProps } from "@/components/ui/Badge";
import { PatientRowActions } from "./PatientRowActions";
import type { Patient } from "@/types";

export interface PatientTableProps {
  patients: Patient[];
}

const statusMap: Record<Exclude<Patient["status"], undefined>, BadgeProps["variant"]> = {
  active: "success",
  "follow-up": "info",
  new: "warning",
};

export function PatientTable({ patients }: PatientTableProps) {
  const columns = [
    {
      header: "Patient",
      accessor: (row: Patient) => (
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-900">{row.name}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Phone",
      accessor: (row: Patient) => row.phone || "Not provided",
    },
    {
      header: "Status",
      accessor: (row: Patient) => {
        const statusLabel = row.status ?? "active";
        return <Badge variant={statusMap[statusLabel]}>{statusLabel.replace("-", " ")}</Badge>;
      },
    },
    {
      header: "Conditions",
      accessor: (row: Patient) =>
        row.conditions.length > 0 ? row.conditions.slice(0, 2).join(", ") : "No conditions recorded",
    },
    {
      header: "Actions",
      accessor: (row: Patient) => <PatientRowActions patient={row} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Patient roster
        </p>
        <p className="text-xs text-slate-500">Live data from Supabase</p>
      </div>
      <Table columns={columns} data={patients} emptyMessage="No patients created yet." />
    </div>
  );
}
