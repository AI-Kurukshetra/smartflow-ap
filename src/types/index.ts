export type Provider = {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  createdAt?: string;
};

export type PatientStatus = "active" | "follow-up" | "new";

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age?: number;
  lastVisit?: string;
  conditions: string[];
  nextAppointment?: string;
  status?: PatientStatus;
  createdAt?: string;
};

export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  patientId: string;
  providerId: string;
  appointmentDate: string;
  location: string;
  type: "video" | "inPerson" | "phone";
  status: AppointmentStatus;
  createdAt?: string;
};

export type MedicalRecord = {
  id: string;
  patientId: string;
  diagnosis: string;
  notes: string;
  allergies: string[];
  medications: string[];
  visitHistory: {
    date: string;
    summary: string;
  }[];
  createdAt?: string;
};

export type ClinicalNote = {
  id: string;
  patientId?: string;
  patient: string;
  title: string;
  createdAt: string;
  excerpt: string;
};

export type Prescription = {
  id: string;
  patientId: string;
  medication: string;
  status: "active" | "pending" | "refill";
};

export type LabResult = {
  id: string;
  patientId: string;
  testName: string;
  result: string;
  date: string;
};
