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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:px-6">
        {items.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary sm:h-12 sm:w-12">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold sm:text-2xl">{value}</p>
              <p className="text-xs text-white/75 sm:text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
