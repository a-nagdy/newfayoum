"use client";

import { AdminToastProvider } from "./AdminToast";
import {
  BarChart3,
  BookOpen,
  Building2,
  ExternalLink,
  ImageIcon,
  Layers,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Package,
  Settings,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/stats", label: "Statistics", icon: BarChart3 },
  { href: "/admin/promo", label: "Promo Banner", icon: Megaphone },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/products", label: "Properties / Units", icon: Package },
  { href: "/admin/investments", label: "Investments", icon: TrendingUp },
  { href: "/admin/features", label: "Features", icon: Building2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-e border-white/10 bg-[#1a2440]">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="text-xl font-black text-[#c8a85a]">
          BITAK
        </Link>
        <p className="mt-1 text-xs text-gray-400">Admin Dashboard</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-[#233a72] text-white"
                  : "text-white/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-3 border-t border-white/10 p-4 text-xs text-gray-400">
        <Link
          href="/ar"
          target="_blank"
          className="inline-flex items-center gap-2 text-[#c8a85a] hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Preview website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 text-white/75 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminToastProvider>
      <div className="admin-theme flex min-h-screen bg-black text-white">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-primary p-6 lg:p-8">
          {children}
        </main>
      </div>
    </AdminToastProvider>
  );
}
