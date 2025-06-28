"use server";

import prisma from "@/lib/prisma";
import { Doctor } from "@/types/doctors";

// Function to get all doctors
export async function getDoctors() {
  try {
    return (await prisma.user.findMany({
      where: { role: "DOCTOR" },
      select: { id: true, name: true, email: true },
    })) as Doctor[];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}
