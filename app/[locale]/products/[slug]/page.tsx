import Image from "next/image";
import { notFound } from "next/navigation";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { PageBackLink } from "@/components/shared/SectionHeader";
import { PropertyCard } from "@/components/shared/PropertyCard";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const t = await getTranslations();
  const product = await getProductBySlug(locale, slug);

  if (!product) notFound();

  const related = await getRelatedProducts(
    locale,
    product.categorySlug,
    product.slug,
  );

  const title = pickLocalized(product.title, locale);
  const location = pickLocalized(product.location, locale);

  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <PageBackLink href="/products" label={t("product.backToProducts")} />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src={product.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            <p className="mb-2 inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-secondary" />
              {location}
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              {t("product.postedAt")}: {formatDate(product.postedAt, locale)}
            </p>

            <p className="mb-6 text-2xl font-bold text-secondary sm:text-3xl">
              {formatPrice(product.price, locale, product.currency)}
            </p>

            <div className="mb-8 flex flex-wrap gap-6 rounded-2xl border border-border bg-card p-5 text-sm">
              {product.bedrooms != null && (
                <span className="inline-flex items-center gap-2 text-foreground">
                  <BedDouble className="h-5 w-5 text-secondary" />
                  {product.bedrooms} {t("product.bedrooms")}
                </span>
              )}
              {product.bathrooms != null && (
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Bath className="h-5 w-5 text-secondary" />
                  {product.bathrooms} {t("product.bathrooms")}
                </span>
              )}
              {product.area != null && (
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Maximize2 className="h-5 w-5 text-secondary" />
                  {product.area} {t("product.area")}
                </span>
              )}
            </div>

            <button
              type="button"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-light"
            >
              {t("investment.investNow")}
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              {t("product.related")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <PropertyCard
                  key={item.id}
                  product={item}
                  locale={locale}
                  detailsLabel={t("product.details")}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
