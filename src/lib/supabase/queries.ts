import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./client";
import type {
  Appointment,
  ClinicalNote,
  LabResult,
  MedicalRecord,
  Patient,
  Prescription,
  Provider,
} from "@/types";
import {
  appointments as demoAppointments,
  clinicalNotes as demoClinicalNotes,
  labResults as demoLabResults,
  medicalRecords as demoMedicalRecords,
  messages as demoMessages,
  patients as demoPatients,
  prescriptions as demoPrescriptions,
  providers as demoProviders,
} from "@/seed/demoData";

type AnyRow = Record<string, unknown>;
type QueryResult<T> = {
  data: T[] | null;
  error: PostgrestError | null;
};

async function queryWithFallback<T extends AnyRow>(
  query: PromiseLike<QueryResult<T>>,
  fallback: T[]
): Promise<T[]> {
  const { data, error } = await query;
  if (error) {
    console.warn("Supabase query failed:", error.message);
    return fallback;
  }
  return data ?? fallback;
}

function ensureArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }
  if (typeof value === "string" && value.length > 0) {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

function ensureVisitHistory(
  value: unknown
): {
  date: string;
  summary: string;
}[] {
  if (Array.isArray(value)) {
    return value as {
      date: string;
      summary: string;
    }[];
  }
  if (typeof value === "string" && value.length > 0) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return [];
    }
  }
  return [];
}

export async function fetchPatients(): Promise<Patient[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("patients")
      .select(
        "id, name, email, phone, age, status, conditions, last_visit, next_appointment, created_at"
      )
      .order("created_at", { ascending: false }),
    demoPatients
  );

  return rows.map((row) => ({
    id: String(row.id ?? ""),
    name: String(row.name ?? "Unnamed patient"),
    email: String(row.email ?? "unknown@medstack.health"),
    phone: String(row.phone ?? "Not provided"),
    age: typeof row.age === "number" ? row.age : undefined,
    status: (row.status as Patient["status"]) ?? "active",
    conditions: ensureArray(row.conditions),
    lastVisit:
      typeof row.last_visit === "string"
        ? row.last_visit
        : typeof row.lastVisit === "string"
        ? row.lastVisit
        : undefined,
    nextAppointment:
      typeof row.next_appointment === "string"
        ? row.next_appointment
        : typeof row.nextAppointment === "string"
        ? row.nextAppointment
        : undefined,
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : typeof row.createdAt === "string"
        ? row.createdAt
        : undefined,
  }));
}

export async function fetchProviders(): Promise<Provider[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("providers")
      .select("id, name, specialty, avatar_url, created_at")
      .order("created_at", { ascending: false }),
    demoProviders
  );

  return rows.map((row) => ({
    id: String(row.id ?? ""),
    name: String(row.name ?? "Provider"),
    specialty: String(row.specialty ?? "Primary Care"),
    avatar:
      typeof row.avatar_url === "string"
        ? row.avatar_url
        : typeof row.avatar === "string"
        ? row.avatar
        : undefined,
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : typeof row.createdAt === "string"
        ? row.createdAt
        : undefined,
  }));
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("appointments")
      .select(
        "id, patient_id, provider_id, appointment_date, location, type, status, created_at"
      )
      .order("appointment_date", { ascending: true }),
    demoAppointments
  );

  return rows.map((row) => ({
    id: String(row.id ?? ""),
    patientId: String(row.patient_id ?? row.patientId ?? ""),
    providerId: String(row.provider_id ?? row.providerId ?? ""),
    appointmentDate: String(row.appointment_date ?? row.appointmentDate ?? ""),
    location: String(row.location ?? "Virtual"),
    type: (row.type as Appointment["type"]) ?? "video",
    status: (row.status as Appointment["status"]) ?? "pending",
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : typeof row.createdAt === "string"
        ? row.createdAt
        : undefined,
  }));
}

export async function fetchMedicalRecords(): Promise<MedicalRecord[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("medical_records")
      .select(
        "id, patient_id, diagnosis, notes, allergies, medications, visit_history, created_at"
      )
      .order("created_at", { ascending: false }),
    demoMedicalRecords
  );

  return rows.map((row) => ({
    id: String(row.id ?? row.patient_id ?? row.patientId ?? ""),
    patientId: String(row.patient_id ?? row.patientId ?? ""),
    diagnosis: String(row.diagnosis ?? ensureArray(row.diagnoses).join(", ")),
    notes: String(row.notes ?? ensureArray(row.note_entries).join(", ")),
    allergies: ensureArray(row.allergies),
    medications: ensureArray(row.medications),
    visitHistory: ensureVisitHistory(row.visit_history ?? row.visits),
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : typeof row.createdAt === "string"
        ? row.createdAt
        : undefined,
  }));
}

export async function fetchClinicalNotes(): Promise<ClinicalNote[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("clinical_notes")
      .select("id, patient_id, patient_name, title, excerpt, created_at")
      .order("created_at", { ascending: false }),
    demoClinicalNotes
  );

  return rows.map((row) => ({
    id: String(row.id ?? ""),
    patientId: typeof row.patient_id === "string" ? row.patient_id : undefined,
    patient:
      typeof row.patient_name === "string"
        ? row.patient_name
        : String(row.patient ?? "Patient"),
    title: String(row.title ?? "Clinical note"),
    createdAt: String(row.created_at ?? row.createdAt ?? ""),
    excerpt: String(row.excerpt ?? ""),
  }));
}

export async function fetchPrescriptions(): Promise<Prescription[]> {
  const rows = await queryWithFallback<AnyRow>(
    supabase
      .from("prescriptions")
      .select("id, patient_id, medication, status, created_at")
      .order("created_at", { ascending: false }),
    demoPrescriptions
  );

  return rows.map((row) => ({
    id: String(row.id ?? ""),
    patientId: String(row.patient_id ?? row.patientId ?? ""),
    medication: String(row.medication ?? "Medication"),
    status: (row.status as Prescription["status"]) ?? "active",
  }));
}

export async function fetchLabResults(): Promise<LabResult[]> {
  return demoLabResults;
}

export async function fetchMessages(): Promise<
  {
    id: string;
    sender: string;
    message: string;
    time: string;
  }[]
> {
  return demoMessages;
}
