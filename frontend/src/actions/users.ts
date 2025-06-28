"use server";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

// Function to update a user's role
export async function updateUserRole(userId: string, newRole: Role) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
}
