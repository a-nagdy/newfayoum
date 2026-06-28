import { Building2, Percent, TrendingUp, Users } from "lucide-react";
import { getSiteStats } from "@/lib/api/client";
import type { Locale } from "@/i18n/routing";
import { formatCompactMillions, formatNumber } from "@/lib/utils/format";

interface StatsBarProps {
  locale: Locale;
  labels: {
    unitsSold: string;
    clients: string;
    totalInvestments: string;
    annualReturn: string;
  };
}

export async function StatsBar({ locale, labels }: StatsBarProps) {
  const stats = await getSiteStats(locale);

  const items = [
    {
      icon: Building2,
      value: `+${formatNumber(stats.unitsSold, locale)}`,
      label: labels.unitsSold,
    },
    {
      icon: Users,
      value: `${formatNumber(stats.clients, locale)}+`,
      label: labels.clients,
    },
    {
      icon: TrendingUp,
      value: formatCompactMillions(stats.totalInvestments, locale),
      label: labels.totalInvestments,
    },
    {
      icon: Percent,
      value: `${stats.annualReturn}%`,
      label: labels.annualReturn,
    },
  ];

  return (
    <section className="border-y border-border bg-primary py-8 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 lg:grid-cols-4 lg:px-6">
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-white/75">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
