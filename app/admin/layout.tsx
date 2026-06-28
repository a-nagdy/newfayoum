import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Login | BITAK Admin",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
