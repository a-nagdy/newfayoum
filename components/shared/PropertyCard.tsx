import Image from "next/image";
import { Bath, BedDouble, Heart, Maximize2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { formatDate, formatPrice } from "@/lib/utils/format";

interface PropertyCardProps {
  product: Product;
  locale: Locale;
  detailsLabel: string;
}

export function PropertyCard({
  product,
  locale,
  detailsLabel,
}: PropertyCardProps) {
  const title = pickLocalized(product.title, locale);
  const location = pickLocalized(product.location, locale);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          {product.isNew && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-black">
              {locale === "ar" ? "جديد" : "New"}
            </span>
          )}
          {product.badges?.map((badge) => (
            <span
              key={pickLocalized(badge, locale)}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-black"
            >
              {pickLocalized(badge, locale)}
            </span>
          ))}
        </div>
        <button
          type="button"
          aria-label="Favorite"
          className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition-colors hover:text-secondary"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-foreground">{title}</h3>
        <p className="mb-1 text-sm text-muted-foreground">{location}</p>
        <p className="mb-4 text-xs text-muted-foreground">
          {formatDate(product.postedAt, locale)}
        </p>

        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {product.bedrooms != null && (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-4 w-4 text-secondary" />
              {product.bedrooms}
            </span>
          )}
          {product.bathrooms != null && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-4 w-4 text-secondary" />
              {product.bathrooms}
            </span>
          )}
          {product.area != null && (
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-4 w-4 text-secondary" />
              {product.area} {locale === "ar" ? "م²" : "sqm"}
            </span>
          )}
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            {detailsLabel}
          </Link>
          <p className="text-end text-base font-bold text-secondary sm:text-lg">
            {formatPrice(product.price, locale, product.currency)}
          </p>
        </div>
      </div>
    </article>
  );
}
