import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    if (session.user.role === 'admin') {
      redirect("/dashboard/admin");
    } else if (session.user.role === 'company') {
      redirect("/dashboard/company/fleet");
    } else {
      redirect("/dashboard");
    }
  }

  return <LoginForm />;
}
