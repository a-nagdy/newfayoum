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
    </div>
  );
}
