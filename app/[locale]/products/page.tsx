import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import {
  getCategories,
  getProducts,
} from "@/lib/api/client";
import {
  ProductFilters,
  ProductGrid,
} from "@/components/products/ProductFilters";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await getLocaleParam(params);
  const { category } = await searchParams;
  const t = await getTranslations();

  const [categories, products] = await Promise.all([
    getCategories(locale),
    getProducts(locale, { categorySlug: category, excludeShared: true }),
  ]);

  return (
    <div className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10">
          <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
            {t("productsPage.title")}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {t("productsPage.subtitle")}
          </p>
        </div>

        <Suspense fallback={null}>
          <ProductFilters
            locale={locale}
            categories={categories}
            allLabel={t("product.allCategories")}
          />
        </Suspense>

        <ProductGrid
          products={products}
          locale={locale}
          detailsLabel={t("product.details")}
        />
      </div>
    </div>
  );
}
