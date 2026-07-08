import { PageHeader } from "@/components/admin/FormControls";
import { readStore } from "@/lib/content/store";
import { BarChart3, BookOpen, Package, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminHomePage() {
  const store = await readStore();

  const cards = [
    {
      label: "Properties / Units",
      value: store.products.length,
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Blog posts",
      value: store.blog.length,
      href: "/admin/blog",
      icon: BookOpen,
    },
    {
      label: "Investments",
      value: store.investments.length,
      href: "/admin/investments",
      icon: TrendingUp,
    },
    {
      label: "Annual return",
      value: `${store.stats.annualReturn}%`,
      href: "/admin/stats",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage all dynamic content for the BITAK website."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition-colors hover:border-[#c8a85a]/40"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#233a72] text-[#c8a85a]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1a2440] p-6">
        <h2 className="mb-2 text-lg font-semibold text-[#c8a85a]">
          Content API
        </h2>
        <p className="mb-4 text-sm text-gray-400">
          GET routes are public and power the website. PUT saves from this
          dashboard require your admin login.
        </p>
        <ul className="grid gap-2 font-mono text-xs text-white/80 sm:grid-cols-2">
          {[
            "/api/settings",
            "/api/stats",
            "/api/hero",
            "/api/categories",
            "/api/products",
            "/api/investments",
            "/api/features",
            "/api/testimonials",
            "/api/blog",
            "/api/promo",
          ].map((path) => (
            <li key={path} className="rounded bg-black/30 px-3 py-2">
              {path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
