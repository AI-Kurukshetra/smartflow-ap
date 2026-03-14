import { format, parseISO } from "date-fns";
import { Card } from "@/components/ui/Card";
import type { Appointment } from "@/types";

export interface CalendarViewProps {
  appointments: Appointment[];
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function CalendarView({ appointments }: CalendarViewProps) {
  return (
    <Card title="Clinic Calendar">
      <div className="grid gap-4 sm:grid-cols-5">
        {days.map((day) => {
          const dayAppointments = appointments.filter(
            (appointment) => format(parseISO(appointment.appointmentDate), "EEE") === day
          );

          return (
            <div key={day} className="space-y-2 rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-400">{day}</p>
              {dayAppointments.length === 0 ? (
                <p className="text-xs text-slate-400">Clear</p>
              ) : (
                dayAppointments.slice(0, 2).map((appointment) => (
                  <p key={appointment.id} className="text-xs text-slate-600">
                    {format(parseISO(appointment.appointmentDate), "h:mm a")}
                  </p>
                ))
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
