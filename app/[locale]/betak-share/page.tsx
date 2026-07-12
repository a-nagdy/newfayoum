import { BetakShareAdvantages } from "@/components/betak-share/BetakShareAdvantages";
import { BetakShareFaq } from "@/components/betak-share/BetakShareFaq";
import { BetakShareHero } from "@/components/betak-share/BetakShareHero";
import { BetakShareSteps } from "@/components/betak-share/BetakShareSteps";
import { InvestmentCalculator } from "@/components/home/InvestmentCalculator";
import { InvestmentOpportunitiesGrid } from "@/components/shared/InvestmentOpportunitiesGrid";
import {
  getBetakSharePageContent,
  getInvestmentOpportunities,
} from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { getTranslations } from "next-intl/server";

export default async function BetakSharePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations("investment");
  const tShare = await getTranslations("betakSharePage");

  const [pageContent, opportunities] = await Promise.all([
    getBetakSharePageContent(locale),
    getInvestmentOpportunities(locale),
  ]);

  return (
    <>
      <BetakShareHero
        locale={locale}
        content={pageContent.hero}
        featurePills={pageContent.featurePills}
      />
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="mb-10 flex flex-wrap items-center justify-start gap-3">
            <p className="text-sm font-semibold text-primary bg-primary/20 p-2 rounded-lg">
              {opportunities.length} {tShare("opportunitiesAvailable")}
            </p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {pickLocalized(pageContent.opportunitiesTitle, locale)}
            </h2>
          </div>
          <InvestmentOpportunitiesGrid
            locale={locale}
            opportunities={opportunities}
            labels={{
              totalValue: t("totalValue"),
              expectedReturn: t("expectedReturn"),
              minInvestment: t("minInvestment"),
              funded: t("funded"),
              investNow: t("investNow"),
            }}
          />
        </div>
      </section>
      <InvestmentCalculator locale={locale} />
      <BetakShareAdvantages
        locale={locale}
        title={pickLocalized(pageContent.advantagesTitle, locale)}
        advantages={pageContent.advantages}
      />
      <BetakShareSteps
        locale={locale}
        title={pickLocalized(pageContent.stepsTitle, locale)}
        steps={pageContent.steps}
      />
      <BetakShareFaq
        locale={locale}
        title={pickLocalized(pageContent.faqTitle, locale)}
        items={pageContent.faq}
      />
    </>
  );
}
