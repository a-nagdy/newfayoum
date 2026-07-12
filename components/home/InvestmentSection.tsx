import { Link } from "@/i18n/navigation";
import { InvestmentOpportunitiesGrid } from "@/components/shared/InvestmentOpportunitiesGrid";
import { getInvestmentOpportunities } from "@/lib/api/client";
import type { Locale } from "@/i18n/routing";

interface InvestmentSectionProps {
  locale: Locale;
  title: string;
  subtitle: string;
  labels: {
    totalValue: string;
    expectedReturn: string;
    minInvestment: string;
    funded: string;
    investNow: string;
    viewAll: string;
  };
}

export async function InvestmentSection({
  locale,
  title,
  subtitle,
  labels,
}: InvestmentSectionProps) {
  const opportunities = await getInvestmentOpportunities(locale);

  return (
    <section className="border-t border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mb-10">
          <InvestmentOpportunitiesGrid
            locale={locale}
            opportunities={opportunities}
            labels={labels}
          />
        </div>

        <div className="text-center">
          <Link
            href="/betak-share"
            className="inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-light"
          >
            {labels.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
