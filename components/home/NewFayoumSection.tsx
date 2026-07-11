"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Product, ProductCategory, PromoBanner } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { PropertyCard } from "@/components/shared/PropertyCard";

interface NewFayoumSectionProps {
  locale: Locale;
  title: string;
  description: string;
  categories: ProductCategory[];
  products: Product[];
  promo: PromoBanner;
  detailsLabel: string;
}

export function NewFayoumSection({
  locale,
  title,
  description,
  categories,
  products,
  promo,
  detailsLabel,
}: NewFayoumSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.categorySlug === activeCategory)
    : products;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeCategory === null
                ? "bg-primary text-white"
                : "border border-border bg-card text-primary hover:border-secondary/50"
            }`}
          >
            {locale === "ar" ? "الكل" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat.slug
                  ? "bg-primary text-white"
                  : "border border-border bg-card text-primary hover:border-secondary/50"
              }`}
            >
              {pickLocalized(cat.name, locale)}
            </button>
          ))}
        </div>

        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/9] min-h-[200px] sm:aspect-[21/9] sm:min-h-[220px]">
            <Image
              src={promo.image}
              alt={pickLocalized(promo.title, locale)}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h3 className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl">
                {pickLocalized(promo.title, locale)}
              </h3>
              <p className="mb-5 max-w-xl text-sm text-white/85 md:text-base">
                {pickLocalized(promo.description, locale)}
              </p>
              <Link
                href={promo.ctaHref}
                className="rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-secondary-hover"
              >
                {pickLocalized(promo.ctaLabel, locale)}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, 3).map((product) => (
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
