export interface UsersTable {
  id: string;
  email: string;
  role: "admin" | "provider" | "patient";
  provider_id?: string | null;
  patient_id?: string | null;
  created_at: string;
}

export interface PatientsTable {
  id: string;
  name: string;
  email: string;
  phone: string;
  age?: number | null;
  status?: "active" | "follow-up" | "new" | null;
  conditions?: string[] | null;
  last_visit?: string | null;
  next_appointment?: string | null;
  created_at: string;
}

export interface ProvidersTable {
  id: string;
  name: string;
  specialty: string;
  avatar_url?: string | null;
  created_at: string;
}

export interface AppointmentsTable {
  id: string;
  patient_id: string;
  provider_id: string;
  appointment_date: string;
  location?: string | null;
  type?: "video" | "inPerson" | "phone" | null;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  created_at: string;
}

export interface MedicalRecordsTable {
  id: string;
  patient_id: string;
  diagnosis: string;
  notes: string;
  allergies?: string[] | null;
  medications?: string[] | null;
  visit_history?: {
    date: string;
    summary: string;
  }[] | null;
  created_at: string;
}

export interface ClinicalNotesTable {
  id: string;
  patient_id?: string | null;
  patient_name: string;
  title: string;
  excerpt: string;
  created_at: string;
}

export interface PrescriptionsTable {
  id: string;
  patient_id: string;
  medication: string;
  status: "active" | "pending" | "refill";
  created_at: string;
}
