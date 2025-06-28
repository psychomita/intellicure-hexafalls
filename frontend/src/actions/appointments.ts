"use server";

import prisma from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Get all appointments for a doctor
export async function getDoctorAppointments(doctorId: string) {
  try {
    return await prisma.appointment.findMany({
      where: { doctorId },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw new Error("Failed to fetch doctor appointments");
  }
}

// Get upcoming appointments for a doctor
export async function getDoctorUpcomingAppointments(doctorId: string) {
  try {
    return await prisma.appointment.findMany({
      where: {
        doctorId,
        scheduledAt: { gte: new Date() },
      },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw new Error("Failed to fetch upcoming doctor appointments");
  }
}

// Create a new appointment as a patient
export async function createAppointment(
  patientId: string,
  doctorId: string,
  scheduledAt: Date
) {
  try {
    const result = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        scheduledAt,
      },
    });
    revalidatePath("/appointments");
    return result;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }
}

// Get all appointments for a patient
export async function getPatientAppointments(patientId: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      include: {
        doctor: { select: { id: true, name: true, email: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    throw new Error("Failed to fetch patient appointments");
  }
}

// Get upcoming appointments for a patient
export async function getPatientUpcomingAppointments(patientId: string) {
  try {
    return await prisma.appointment.findMany({
      where: {
        patientId,
        scheduledAt: { gte: new Date() },
      },
      include: {
        doctor: { select: { id: true, name: true, email: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw new Error("Failed to fetch upcoming patient appointments");
  }
}

// Cancel an appointment (both doctor or patient)
export async function cancelAppointment(appointmentId: string) {
  try {
    return await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw new Error("Failed to cancel appointment");
  }
}

// Update appointment status (e.g., COMPLETED)
export async function updateAppointmentStatus(
  appointmentId: string,
  newStatus: AppointmentStatus
) {
  try {
    return await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus },
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw new Error("Failed to update appointment status");
  }
}
