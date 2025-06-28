import { HeartHandshake } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <a href="#" className="flex items-center gap-2 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
          <HeartHandshake className="size-6" />
        </div>
        <span className="text-xl font-semibold">IntelliCure</span>
      </a>
      <LoginForm />
    </div>
  );
}
