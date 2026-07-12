import Image from "next/image";
import { Share2 } from "lucide-react";
import type { InvestmentOpportunity } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils/format";

interface InvestmentOpportunitiesGridProps {
  locale: Locale;
  opportunities: InvestmentOpportunity[];
  labels: {
    totalValue: string;
    expectedReturn: string;
    minInvestment: string;
    funded: string;
    investNow: string;
  };
}

export function InvestmentOpportunitiesGrid({
  locale,
  opportunities,
  labels,
}: InvestmentOpportunitiesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={item.image}
              alt={pickLocalized(item.title, locale)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {item.isNew && (
              <span className="absolute start-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-black">
                {locale === "ar" ? "جديد" : "New"}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="mb-1 text-lg font-bold text-foreground">
              {pickLocalized(item.title, locale)}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {pickLocalized(item.location, locale)}
            </p>
            <dl className="mb-4 grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between gap-2 rounded-lg bg-card-elevated px-3 py-2">
                <dt className="text-muted-foreground">{labels.totalValue}</dt>
                <dd className="font-semibold text-foreground">
                  {formatPrice(item.totalValue, locale, item.currency)}
                </dd>
              </div>
              <div className="flex justify-between gap-2 rounded-lg bg-card-elevated px-3 py-2">
                <dt className="text-muted-foreground">
                  {labels.expectedReturn}
                </dt>
                <dd className="font-semibold text-secondary">
                  {item.expectedReturn}%
                </dd>
              </div>
              <div className="flex justify-between gap-2 rounded-lg bg-card-elevated px-3 py-2">
                <dt className="text-muted-foreground">
                  {labels.minInvestment}
                </dt>
                <dd className="font-semibold text-foreground">
                  {formatPrice(item.minInvestment, locale, item.currency)}
                </dd>
              </div>
            </dl>
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>{labels.funded}</span>
                <span>{item.fundedPercent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-secondary"
                  style={{ width: `${item.fundedPercent}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {labels.investNow}
              </button>
              <button
                type="button"
                aria-label="Share"
                className="text-muted-foreground transition-colors hover:text-secondary"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
