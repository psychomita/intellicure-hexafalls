import { getServerSession } from "@/lib/session";
import RoleSelection from "@/components/auth/role-selection";

export default async function OnboardingPage() {
  const user = await getServerSession();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-h-screen w-full">
      {user.user?.name && (
        <p className="text-lg mb-4">Hello, {user.user.name}!</p>
      )}
      <RoleSelection userId={user.user?.id || ""} />
    </div>
  );
}
