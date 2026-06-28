import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isAuthenticated } from "@/lib/auth/session";
import AdminLoginPage from "./page.client";

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <Suspense fallback={null}>
      <AdminLoginPage />
    </Suspense>
  );
}
