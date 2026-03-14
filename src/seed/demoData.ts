import type {
  Appointment,
  ClinicalNote,
  LabResult,
  MedicalRecord,
  Patient,
  Prescription,
  Provider,
} from "@/types";

export const providers: Provider[] = [
  {
    id: "prov-1",
    name: "Dr. Elena Torres",
    specialty: "Cardiology",
    createdAt: "2026-03-01T09:00:00.000Z",
  },
  {
    id: "prov-2",
    name: "Dr. Sameer Patel",
    specialty: "Primary Care",
    createdAt: "2026-03-01T09:00:00.000Z",
  },
  {
    id: "prov-3",
    name: "Dr. Lila Morgan",
    specialty: "Pediatrics",
    createdAt: "2026-03-01T09:00:00.000Z",
  },
];

export const patients: Patient[] = [
  {
    id: "pt-1",
    name: "Aria Bennett",
    email: "aria.bennett@example.com",
    phone: "+1 415 555 0101",
    age: 32,
    lastVisit: "Feb 12, 2026",
    conditions: ["Hypertension"],
    nextAppointment: "Mar 18, 2026 • 9:30 AM",
    status: "active",
    createdAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "pt-2",
    name: "Marcus Reed",
    email: "marcus.reed@example.com",
    phone: "+1 415 555 0102",
    age: 47,
    lastVisit: "Jan 22, 2026",
    conditions: ["Type 2 Diabetes"],
    nextAppointment: "Mar 18, 2026 • 1:00 PM",
    status: "follow-up",
    createdAt: "2026-03-01T10:15:00.000Z",
  },
  {
    id: "pt-3",
    name: "Nina Harper",
    email: "nina.harper@example.com",
    phone: "+1 415 555 0103",
    age: 26,
    lastVisit: "Mar 2, 2026",
    conditions: ["Asthma"],
    nextAppointment: "Mar 19, 2026 • 8:00 AM",
    status: "active",
    createdAt: "2026-03-01T10:30:00.000Z",
  },
  {
    id: "pt-4",
    name: "Luca Murray",
    email: "luca.murray@example.com",
    phone: "+1 415 555 0104",
    age: 58,
    lastVisit: "Feb 4, 2026",
    conditions: ["Hyperlipidemia"],
    status: "new",
    createdAt: "2026-03-01T10:45:00.000Z",
  },
  {
    id: "pt-5",
    name: "Sasha Reyes",
    email: "sasha.reyes@example.com",
    phone: "+1 415 555 0105",
    age: 41,
    lastVisit: "Jan 15, 2026",
    conditions: ["Chronic Migraine"],
    nextAppointment: "Mar 20, 2026 • 11:00 AM",
    status: "follow-up",
    createdAt: "2026-03-01T11:00:00.000Z",
  },
];

export const appointments: Appointment[] = [
  {
    id: "apt-101",
    patientId: "pt-1",
    providerId: "prov-1",
    appointmentDate: "2026-03-18T09:30:00.000Z",
    location: "Video",
    type: "video",
    status: "confirmed",
  },
  {
    id: "apt-102",
    patientId: "pt-2",
    providerId: "prov-2",
    appointmentDate: "2026-03-18T13:00:00.000Z",
    location: "Clinic 4",
    type: "inPerson",
    status: "confirmed",
  },
  {
    id: "apt-103",
    patientId: "pt-3",
    providerId: "prov-3",
    appointmentDate: "2026-03-19T08:00:00.000Z",
    location: "Video",
    type: "video",
    status: "pending",
  },
  {
    id: "apt-104",
    patientId: "pt-4",
    providerId: "prov-2",
    appointmentDate: "2026-03-20T10:30:00.000Z",
    location: "Clinic 7",
    type: "inPerson",
    status: "pending",
  },
  {
    id: "apt-105",
    patientId: "pt-5",
    providerId: "prov-1",
    appointmentDate: "2026-03-20T11:00:00.000Z",
    location: "Video",
    type: "video",
    status: "confirmed",
  },
  {
    id: "apt-106",
    patientId: "pt-3",
    providerId: "prov-1",
    appointmentDate: "2026-03-21T09:00:00.000Z",
    location: "Phone",
    type: "phone",
    status: "pending",
  },
  {
    id: "apt-107",
    patientId: "pt-1",
    providerId: "prov-2",
    appointmentDate: "2026-03-22T14:30:00.000Z",
    location: "Clinic 1",
    type: "inPerson",
    status: "pending",
  },
  {
    id: "apt-108",
    patientId: "pt-5",
    providerId: "prov-3",
    appointmentDate: "2026-03-23T15:00:00.000Z",
    location: "Video",
    type: "video",
    status: "pending",
  },
  {
    id: "apt-109",
    patientId: "pt-4",
    providerId: "prov-1",
    appointmentDate: "2026-03-24T08:45:00.000Z",
    location: "Clinic 2",
    type: "inPerson",
    status: "pending",
  },
  {
    id: "apt-110",
    patientId: "pt-2",
    providerId: "prov-3",
    appointmentDate: "2026-03-24T10:00:00.000Z",
    location: "Phone",
    type: "phone",
    status: "pending",
  },
];

export const clinicalNotes: ClinicalNote[] = [
  {
    id: "note-1",
    patientId: "pt-1",
    patient: "Aria Bennett",
    title: "Cardiology follow-up",
    createdAt: "2026-03-18T08:40:00.000Z",
    excerpt: "Stable vitals, continue lisinopril. Review labs once available.",
  },
  {
    id: "note-2",
    patientId: "pt-2",
    patient: "Marcus Reed",
    title: "Diabetes management",
    createdAt: "2026-03-17T16:10:00.000Z",
    excerpt: "Adjusted metformin dose, encourage CGM compliance.",
  },
  {
    id: "note-3",
    patientId: "pt-3",
    patient: "Nina Harper",
    title: "Asthma review",
    createdAt: "2026-03-10T10:02:00.000Z",
    excerpt: "Prescribed budesonide inhaler. Follow-up in 6 weeks.",
  },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "mr-1",
    patientId: "pt-1",
    diagnosis: "Hypertension",
    notes: "Blood pressure improved after medication adjustment.",
    allergies: ["Penicillin"],
    medications: ["Lisinopril 20mg"],
    visitHistory: [
      { date: "Feb 12, 2026", summary: "Routine check-in, vitals stable." },
      { date: "Nov 3, 2025", summary: "Annual wellness visit." },
    ],
  },
  {
    id: "mr-2",
    patientId: "pt-2",
    diagnosis: "Type 2 Diabetes",
    notes: "Referred to nutritionist for carb counting.",
    allergies: ["None"],
    medications: ["Metformin 500mg", "Atorvastatin 20mg"],
    visitHistory: [
      { date: "Jan 22, 2026", summary: "HbA1c 7.2%, adjusted metformin." },
    ],
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "rx-1",
    patientId: "pt-1",
    medication: "Lisinopril 20mg",
    status: "active",
  },
  {
    id: "rx-2",
    patientId: "pt-2",
    medication: "Metformin 500mg",
    status: "refill",
  },
  {
    id: "rx-3",
    patientId: "pt-5",
    medication: "Topiramate 50mg",
    status: "pending",
  },
];

export const labResults: LabResult[] = [
  {
    id: "lab-1",
    patientId: "pt-1",
    testName: "Lipid Panel",
    result: "LDL 98 mg/dL",
    date: "Mar 05, 2026",
  },
  {
    id: "lab-2",
    patientId: "pt-2",
    testName: "HbA1c",
    result: "7.2%",
    date: "Jan 22, 2026",
  },
];

export const messages = [
  {
    id: "msg-1",
    sender: "Aria Bennett",
    message: "Can we move my appointment to later tomorrow?",
    time: "09:12",
  },
  {
    id: "msg-2",
    sender: "Marcus Reed",
    message: "Uploaded my glucose logs for review.",
    time: "08:54",
  },
];
