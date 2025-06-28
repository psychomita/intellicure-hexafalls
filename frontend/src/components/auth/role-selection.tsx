"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Role } from "@prisma/client";
import { updateUserRole } from "@/actions/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RoleSelection({ userId }: { userId: string }) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = async (role: Role) => {
    setSelectedRole(role);
    setIsLoading(true);
    await updateUserRole(userId, role);
    toast.success(`Role successfully set to ${role}`);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md w-full space-y-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Choose Your Role</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Card
          onClick={() => setSelectedRole("PATIENT" as Role)}
          className={`w-full cursor-pointer transition-all ${
            selectedRole === "PATIENT" ? "ring-2 ring-sky-500" : ""
          }`}
        >
          <CardContent className="p-6 flex flex-col items-center">
            <User className="w-12 h-12 mb-2 text-sky-600" />
            <span className="text-lg font-medium">Patient</span>
          </CardContent>
        </Card>
        <Card
          onClick={() => setSelectedRole("DOCTOR" as Role)}
          className={`w-full cursor-pointer transition-all ${
            selectedRole === "DOCTOR" ? "ring-2 ring-emerald-500" : ""
          }`}
        >
          <CardContent className="p-6 flex flex-col items-center">
            <Stethoscope className="w-12 h-12 mb-2 text-emerald-600" />
            <span className="text-lg font-medium">Doctor</span>
          </CardContent>
        </Card>
      </div>

      <Button
        disabled={!selectedRole}
        className="w-full mt-4"
        onClick={() => handleRoleChange(selectedRole!)}
      >
        {isLoading
          ? "Saving..."
          : "Continue as " +
            (selectedRole === "PATIENT" ? "Patient" : "Doctor")}
      </Button>
    </div>
  );
}
