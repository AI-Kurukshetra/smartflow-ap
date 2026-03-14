import { supabase } from "@/lib/supabase/client";
import { fetchAppointments, fetchClinicalNotes, fetchMedicalRecords, fetchPatients } from "@/lib/supabase/queries";
import type { Appointment, ClinicalNote, MedicalRecord, Patient } from "@/types";

export async function signupUser(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: "provider" | "patient" | "clinic_admin";
  name?: string;
}) {
  const firstName =
    input.firstName ?? input.name?.split(" ").filter(Boolean)[0] ?? "";
  const lastName =
    input.lastName ??
    input.name?.split(" ").filter(Boolean).slice(1).join(" ") ??
    "";
  const fullName = `${firstName} ${lastName}`.trim() || input.name;
  const normalizedRole = input.role === "clinic_admin" ? "admin" : input.role ?? "provider";

  const response = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        phone: input.phone,
        role: input.role ?? "provider",
      },
    },
  });

  if (!response.error && response.data.user) {
    await supabase.from("users").upsert({
      id: response.data.user.id,
      email: input.email,
      first_name: firstName || null,
      last_name: lastName || null,
      full_name: fullName || null,
      phone: input.phone ?? null,
      role: normalizedRole,
    });
  }

  return response;
}

export async function loginUser(input: { email: string; password: string }) {
  return supabase.auth.signInWithPassword(input);
}

export async function loginWithOAuth(provider: "google" | "azure") {
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo:
        typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
    },
  });
}

export async function logoutUser() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function getPatients(): Promise<Patient[]> {
  return fetchPatients();
}

export async function getPatientById(id: string): Promise<Patient | null> {
  const patients = await fetchPatients();
  return patients.find((patient) => patient.id === id) ?? null;
}

export async function createPatient(input: {
  name: string;
  email: string;
  phone: string;
}) {
  const { data, error } = await supabase
    .from("patients")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
    })
    .select()
    .single();

  return { data: data as Patient | null, error };
}

export async function updatePatient(id: string, updates: Partial<Patient>) {
  const { data, error } = await supabase
    .from("patients")
    .update({
      name: updates.name,
      email: updates.email,
      phone: updates.phone,
      age: updates.age,
      status: updates.status,
      conditions: updates.conditions,
      last_visit: updates.lastVisit,
      next_appointment: updates.nextAppointment,
    })
    .eq("id", id)
    .select()
    .single();

  return { data: data as Patient | null, error };
}

export async function deletePatient(id: string) {
  return supabase.from("patients").delete().eq("id", id);
}

export async function getAppointments(): Promise<Appointment[]> {
  return fetchAppointments();
}

export async function createAppointment(input: {
  patientId: string;
  providerId: string;
  appointmentDate: string;
  status?: Appointment["status"];
  location?: string;
  type?: Appointment["type"];
}) {
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: input.patientId,
      provider_id: input.providerId,
      appointment_date: input.appointmentDate,
      status: input.status ?? "pending",
      location: input.location ?? "Virtual",
      type: input.type ?? "video",
    })
    .select()
    .single();

  return { data: data as Appointment | null, error };
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  const { data, error } = await supabase
    .from("appointments")
    .update({
      appointment_date: updates.appointmentDate,
      status: updates.status,
      location: updates.location,
      type: updates.type,
    })
    .eq("id", id)
    .select()
    .single();

  return { data: data as Appointment | null, error };
}

export async function deleteAppointment(id: string) {
  return supabase.from("appointments").delete().eq("id", id);
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
  return fetchMedicalRecords();
}

export async function createMedicalRecord(input: {
  patientId: string;
  diagnosis: string;
  notes: string;
}) {
  const { data, error } = await supabase
    .from("medical_records")
    .insert({
      patient_id: input.patientId,
      diagnosis: input.diagnosis,
      notes: input.notes,
    })
    .select()
    .single();

  return { data: data as MedicalRecord | null, error };
}

export async function updateMedicalRecord(id: string, updates: Partial<MedicalRecord>) {
  const { data, error } = await supabase
    .from("medical_records")
    .update({
      diagnosis: updates.diagnosis,
      notes: updates.notes,
      allergies: updates.allergies,
      medications: updates.medications,
      visit_history: updates.visitHistory,
    })
    .eq("id", id)
    .select()
    .single();

  return { data: data as MedicalRecord | null, error };
}

export async function getClinicalNotes(): Promise<ClinicalNote[]> {
  return fetchClinicalNotes();
}

export async function createClinicalNote(input: {
  patientId?: string;
  patient: string;
  title: string;
  excerpt: string;
}) {
  const { data, error } = await supabase
    .from("clinical_notes")
    .insert({
      patient_id: input.patientId ?? null,
      patient_name: input.patient,
      title: input.title,
      excerpt: input.excerpt,
    })
    .select()
    .single();

  return { data: data as ClinicalNote | null, error };
}
