import { AppointmentStatus } from "@prisma/client";

export type Appointment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  patientId: string;
  doctorId: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes: string | null;
  doctor: {
    id: string;
    name: string | null;
    email: string;
  };
};
