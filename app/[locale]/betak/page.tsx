import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { BetakHero } from "@/components/betak/BetakHero";
import { BetakListing } from "@/components/betak/BetakListing";
import { WhatsAppFab } from "@/components/shared/WhatsAppFab";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import {
  getCategories,
  getProducts,
  getSiteSettings,
} from "@/lib/api/client";

export default async function BetakPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations("betakPage");

  const [categories, products, settings] = await Promise.all([
    getCategories(locale),
    getProducts(locale),
    getSiteSettings(locale),
  ]);

  return (
    <div className="bg-white pb-8">
      <BetakHero
        locale={locale}
        unitsCount={products.length}
        unitsAvailableLabel={t("unitsAvailable")}
      />

      <Suspense fallback={null}>
        <BetakListing
          locale={locale}
          products={products}
          categories={categories}
          labels={{
            filters: t("filters"),
            sharedOnly: t("sharedOnly"),
            unitsAvailable: t("unitsAvailable"),
            details: t("details"),
            new: t("new"),
            shared: t("shared"),
            return: t("return"),
            rooms: t("rooms"),
            bathrooms: t("bathrooms"),
            noResults: t("noResults"),
          }}
        />
      </Suspense>

      <WhatsAppFab href={settings.whatsappUrl} label={t("whatsapp")} />
    </div>
  );
}
