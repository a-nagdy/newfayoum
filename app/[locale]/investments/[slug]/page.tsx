import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import {
  getInvestmentOpportunityBySlug,
  getRelatedInvestments,
  getSiteSettings,
} from "@/lib/api/client";
import type { InvestmentOpportunity } from "@/lib/api/types";
import {
  UnitDetailView,
  type UnitDetailModel,
} from "@/components/products/UnitDetailView";

function toUnitModel(item: InvestmentOpportunity): UnitDetailModel {
  return {
    slug: item.slug,
    title: item.title,
    location: item.location,
    price: item.totalValue,
    currency: item.currency,
    image: item.image,
    gallery: item.gallery,
    description: item.description,
    amenities: item.amenities,
    mapUrl: item.mapUrl,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    area: item.area,
    floors: item.floors,
    parkingSpaces: item.parkingSpaces,
    expectedReturn: item.expectedReturn,
    fundedPercent: item.fundedPercent,
    marketValue: item.totalValue,
    minInvestment: item.minInvestment,
    isNew: item.isNew,
    isShared: true,
  };
}

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const t = await getTranslations();
  const [investment, settings, related] = await Promise.all([
    getInvestmentOpportunityBySlug(locale, slug),
    getSiteSettings(locale),
    getRelatedInvestments(locale, slug, 3),
  ]);

  if (!investment) notFound();

  return (
    <UnitDetailView
      unit={toUnitModel(investment)}
      locale={locale}
      backHref="/betak-share"
      backLabel={t("product.backToBetakShare")}
      phone={settings.phone}
      whatsappUrl={settings.whatsappUrl}
      similar={related.map(toUnitModel)}
      similarHrefBase="/investments"
      labels={{
        featured: t("product.featured"),
        new: t("betakPage.new"),
        shared: t("betakPage.shared"),
        area: t("product.area"),
        price: t("investment.totalValue"),
        bedrooms: t("product.bedrooms"),
        bathrooms: t("product.bathrooms"),
        floors: t("product.floors"),
        parking: t("product.parking"),
        unitDetails: t("product.unitDetails"),
        description: t("product.description"),
        amenities: t("product.amenities"),
        investmentAnalysis: t("product.investmentAnalysis"),
        expectedReturn: t("investment.expectedReturn"),
        marketValue: t("investment.totalValue"),
        monthlyInstallment: t("product.monthlyInstallment"),
        minInvestment: t("investment.minInvestment"),
        funded: t("investment.funded"),
        location: t("product.location"),
        viewOnMap: t("product.viewOnMap"),
        similar: t("product.relatedInvestments"),
        details: t("product.details"),
        invest: t("investment.investNow"),
        inquiry: {
          price: t("investment.minInvestment"),
          name: t("product.inquiryName"),
          phone: t("product.inquiryPhone"),
          email: t("product.inquiryEmail"),
          send: t("product.inquirySend"),
          whatsapp: t("footer.whatsapp"),
          call: t("product.call"),
          success: t("product.inquirySuccess"),
          namePlaceholder: t("product.inquiryNamePlaceholder"),
          phonePlaceholder: t("product.inquiryPhonePlaceholder"),
          emailPlaceholder: t("product.inquiryEmailPlaceholder"),
        },
      }}
    />
  );
}
