import { getFeaturedProducts } from "@/lib/api/client";
import type { Locale } from "@/i18n/routing";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface FeaturedUnitsProps {
  locale: Locale;
  title: string;
  viewAllLabel: string;
  detailsLabel: string;
}

export async function FeaturedUnits({
  locale,
  title,
  viewAllLabel,
  detailsLabel,
}: FeaturedUnitsProps) {
  const products = await getFeaturedProducts(locale);

  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          title={title}
          viewAllHref="/products"
          viewAllLabel={viewAllLabel}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <PropertyCard
              key={product.id}
              product={product}
              locale={locale}
              detailsLabel={detailsLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
