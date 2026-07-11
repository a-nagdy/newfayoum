import Image from "next/image";
import { Bath, BedDouble, Heart, MapPin, Maximize2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import {
  formatBetakPrice,
  formatMonthlyPrice,
} from "@/lib/utils/format";

interface BetakPropertyCardProps {
  product: Product;
  locale: Locale;
  detailsLabel: string;
  newLabel: string;
  sharedLabel: string;
  returnLabel: string;
  roomsLabel: string;
  bathroomsLabel: string;
}

export function BetakPropertyCard({
  product,
  locale,
  detailsLabel,
  newLabel,
  sharedLabel,
  returnLabel,
  roomsLabel,
  bathroomsLabel,
}: BetakPropertyCardProps) {
  const title = pickLocalized(product.title, locale);
  const location = pickLocalized(product.location, locale);

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(35,58,114,0.08)] transition-shadow hover:shadow-[0_12px_40px_rgba(35,58,114,0.12)]">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <button
          type="button"
          aria-label="Favorite"
          className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary/70 shadow-sm transition-colors hover:text-secondary"
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          {product.isNew && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-black">
              {newLabel}
            </span>
          )}
          {product.isShared && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
              {sharedLabel}
            </span>
          )}
        </div>

        {product.expectedReturn != null && (
          <span className="absolute bottom-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-emerald-600">
            {returnLabel} {product.expectedReturn}%
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-secondary" />
          {location}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {product.bedrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-secondary" />
              {product.bedrooms} {roomsLabel}
            </span>
          )}
          {product.area != null && (
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4 text-secondary" />
              {product.area} {locale === "ar" ? "م²" : "sqm"}
            </span>
          )}
          {product.bathrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-secondary" />
              {product.bathrooms} {bathroomsLabel}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-light"
          >
            {detailsLabel}
          </Link>
          <div className="text-end">
            <p className="text-base font-black text-primary sm:text-lg">
              {formatBetakPrice(product.price, locale)}
            </p>
            {product.monthlyInstallment != null && (
              <p className="text-xs text-muted-foreground">
                {formatMonthlyPrice(product.monthlyInstallment, locale)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
