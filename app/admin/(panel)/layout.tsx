import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/Sidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
