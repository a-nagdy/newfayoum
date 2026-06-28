"use client";

import { useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { PropertyCard } from "@/components/shared/PropertyCard";

interface ProductFiltersProps {
  locale: Locale;
  categories: ProductCategory[];
  allLabel: string;
}

export function ProductFilters({
  locale,
  categories,
  allLabel,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <a
        href="?"
        className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
          !active
            ? "bg-primary text-white"
            : "border border-border bg-card text-primary hover:border-secondary/50"
        }`}
      >
        {allLabel}
      </a>
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <a
            key={cat.id}
            href={`?category=${cat.slug}`}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "border border-border bg-card text-primary hover:border-secondary/50"
            }`}
          >
            {pickLocalized(cat.name, locale)}
          </a>
        );
      })}
    </div>
  );
}

export function ProductGrid({
  products,
  locale,
  detailsLabel,
}: {
  products: Product[];
  locale: Locale;
  detailsLabel: string;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
        {locale === "ar"
          ? "لا توجد منتجات في هذه الفئة."
          : "No products in this category."}
      </p>
    );
  }

  return (
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
  );
}
