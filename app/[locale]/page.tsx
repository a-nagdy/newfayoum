import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import {
  getCategories,
  getProducts,
  getPromoBanner,
} from "@/lib/api/client";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedUnits } from "@/components/home/FeaturedUnits";
import { NewFayoumSection } from "@/components/home/NewFayoumSection";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { InvestmentCalculator } from "@/components/home/InvestmentCalculator";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { pickLocalized } from "@/lib/api/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations();

  const [categories, products, promo] = await Promise.all([
    getCategories(locale),
    getProducts(locale, { excludeShared: true }),
    getPromoBanner(locale),
  ]);

  return (
    <>
      <HeroSection locale={locale} ctaLabel={t("hero.cta")} />
      <StatsBar
        locale={locale}
        labels={{
          unitsSold: t("stats.unitsSold"),
          clients: t("stats.clients"),
          totalInvestments: t("stats.totalInvestments"),
          annualReturn: t("stats.annualReturn"),
        }}
      />
      <FeaturedUnits
        locale={locale}
        title={t("featured.title")}
        viewAllLabel={t("featured.viewAll")}
        detailsLabel={t("product.details")}
      />
      <NewFayoumSection
        locale={locale}
        title={pickLocalized(promo.title, locale)}
        description={pickLocalized(promo.description, locale)}
        categories={categories}
        products={products}
        promo={promo}
        detailsLabel={t("product.details")}
      />
      <InvestmentSection
        locale={locale}
        title={t("investment.title")}
        subtitle={t("investment.subtitle")}
        labels={{
          totalValue: t("investment.totalValue"),
          expectedReturn: t("investment.expectedReturn"),
          minInvestment: t("investment.minInvestment"),
          funded: t("investment.funded"),
          investNow: t("investment.investNow"),
          viewAll: t("investment.viewAll"),
        }}
      />
      <InvestmentCalculator locale={locale} />
      <FeaturesSection locale={locale} title={t("features.title")} />
      <TestimonialsSection locale={locale} title={t("testimonials.title")} />
      <LatestArticles
        locale={locale}
        title={t("blog.title")}
        viewAllLabel={t("blog.viewAll")}
        minReadLabel={t("blog.minRead")}
      />
    </>
  );
}
