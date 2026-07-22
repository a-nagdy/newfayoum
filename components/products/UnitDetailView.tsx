import {
  Bath,
  BedDouble,
  Building2,
  Car,
  ChartNoAxesCombined,
  Layers,
  MapPin,
  Maximize2,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedString } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils/format";
import { PageBackLink } from "@/components/shared/SectionHeader";
import { ProductGallery } from "@/components/products/ProductGallery";
import { InquirySidebar } from "@/components/products/InquirySidebar";

export interface UnitDetailModel {
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  price: number;
  currency: string;
  image: string;
  gallery?: string[];
  description?: LocalizedString;
  amenities?: LocalizedString[];
  mapUrl?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floors?: number;
  parkingSpaces?: number;
  expectedReturn?: number;
  monthlyInstallment?: number;
  fundedPercent?: number;
  marketValue?: number;
  minInvestment?: number;
  featured?: boolean;
  isNew?: boolean;
  isShared?: boolean;
}

interface UnitDetailViewProps {
  unit: UnitDetailModel;
  locale: Locale;
  backHref: string;
  backLabel: string;
  phone: string;
  whatsappUrl: string;
  labels: {
    featured: string;
    new: string;
    shared: string;
    area: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    floors: string;
    parking: string;
    unitDetails: string;
    description: string;
    amenities: string;
    investmentAnalysis: string;
    expectedReturn: string;
    marketValue: string;
    monthlyInstallment: string;
    minInvestment: string;
    funded: string;
    location: string;
    viewOnMap: string;
    similar: string;
    details: string;
    invest: string;
    inquiry: {
      price: string;
      name: string;
      phone: string;
      email: string;
      send: string;
      whatsapp: string;
      call: string;
      success: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      emailPlaceholder: string;
    };
  };
  similar?: UnitDetailModel[];
  similarHrefBase: "/products" | "/investments";
}

export function UnitDetailView({
  unit,
  locale,
  backHref,
  backLabel,
  phone,
  whatsappUrl,
  labels,
  similar = [],
  similarHrefBase,
}: UnitDetailViewProps) {
  const title = pickLocalized(unit.title, locale);
  const location = pickLocalized(unit.location, locale);
  const description = unit.description
    ? pickLocalized(unit.description, locale)
    : null;

  const images = [
    unit.image,
    ...(unit.gallery ?? []).filter((src) => src && src !== unit.image),
  ];

  const quickStats = [
    unit.area != null
      ? { label: labels.area, value: `${unit.area} ${locale === "ar" ? "م²" : "sqm"}` }
      : null,
    {
      label: labels.price,
      value: formatPrice(unit.price, locale, unit.currency),
    },
    unit.bedrooms != null
      ? { label: labels.bedrooms, value: String(unit.bedrooms) }
      : null,
    unit.bathrooms != null
      ? { label: labels.bathrooms, value: String(unit.bathrooms) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const detailCards = [
    unit.bedrooms != null
      ? { icon: BedDouble, label: labels.bedrooms, value: String(unit.bedrooms) }
      : null,
    unit.bathrooms != null
      ? { icon: Bath, label: labels.bathrooms, value: String(unit.bathrooms) }
      : null,
    unit.area != null
      ? {
          icon: Maximize2,
          label: labels.area,
          value: `${unit.area} ${locale === "ar" ? "م²" : "sqm"}`,
        }
      : null,
    unit.floors != null
      ? { icon: Layers, label: labels.floors, value: String(unit.floors) }
      : null,
    unit.parkingSpaces != null
      ? {
          icon: Car,
          label: labels.parking,
          value: String(unit.parkingSpaces),
        }
      : null,
    unit.isShared
      ? {
          icon: Building2,
          label: labels.shared,
          value: unit.fundedPercent != null ? `${unit.fundedPercent}%` : "—",
        }
      : null,
  ].filter(Boolean) as {
    icon: typeof BedDouble;
    label: string;
    value: string;
  }[];

  const investmentCards = [
    unit.expectedReturn != null
      ? {
          icon: TrendingUp,
          label: labels.expectedReturn,
          value: `${unit.expectedReturn}%`,
          color: "text-emerald-600",
        }
      : null,
    (unit.marketValue ?? unit.price) != null
      ? {
          icon: ChartNoAxesCombined,
          label: labels.marketValue,
          value: formatPrice(
            unit.marketValue ?? unit.price,
            locale,
            unit.currency,
          ),
          color: "text-primary",
        }
      : null,
    unit.monthlyInstallment != null
      ? {
          icon: Wallet,
          label: labels.monthlyInstallment,
          value: formatPrice(unit.monthlyInstallment, locale, unit.currency),
          color: "text-secondary",
        }
      : unit.minInvestment != null
        ? {
            icon: Wallet,
            label: labels.minInvestment,
            value: formatPrice(unit.minInvestment, locale, unit.currency),
            color: "text-secondary",
          }
        : null,
  ].filter(Boolean) as {
    icon: typeof TrendingUp;
    label: string;
    value: string;
    color: string;
  }[];

  return (
    <div className="bg-muted pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <PageBackLink href={backHref} label={backLabel} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-8">
            <ProductGallery images={images} alt={title} />

            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {unit.featured && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-black">
                    {labels.featured}
                  </span>
                )}
                {unit.isNew && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {labels.new}
                  </span>
                )}
                {unit.isShared && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {labels.shared}
                  </span>
                )}
              </div>

              <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                {title}
              </h1>
              <p className="mb-6 inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-secondary" />
                {location}
              </p>

              {quickStats.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {quickStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-card px-4 py-4 text-center shadow-sm"
                    >
                      <p className="mb-1 text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold text-foreground sm:text-base">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {detailCards.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  {labels.unitDetails}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {detailCards.map((card) => (
                    <div
                      key={card.label}
                      className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-4"
                    >
                      <card.icon className="h-6 w-6 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {card.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {card.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {description && (
              <section>
                <h2 className="mb-3 text-xl font-bold text-foreground">
                  {labels.description}
                </h2>
                <p className="leading-8 text-muted-foreground whitespace-pre-line">
                  {description}
                </p>
              </section>
            )}

            {unit.amenities && unit.amenities.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  {labels.amenities}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {unit.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
                    >
                      <Shield className="h-3.5 w-3.5 text-secondary" />
                      {pickLocalized(amenity, locale)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {investmentCards.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  {labels.investmentAnalysis}
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {investmentCards.map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      <card.icon className={`mb-3 h-6 w-6 ${card.color}`} />
                      <p className="mb-1 text-xs text-muted-foreground">
                        {card.label}
                      </p>
                      <p className={`text-lg font-bold ${card.color}`}>
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">
                {labels.location}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {unit.mapUrl ? (
                  <iframe
                    title={location}
                    src={unit.mapUrl}
                    className="h-64 w-full border-0 sm:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-56 flex-col items-center justify-center gap-3 bg-muted px-4 text-center">
                    <MapPin className="h-10 w-10 text-primary" />
                    <p className="font-medium text-foreground">{location}</p>
                  </div>
                )}
                <div className="border-t border-border px-4 py-3">
                  <a
                    href={
                      unit.mapUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:text-secondary"
                  >
                    {labels.viewOnMap}
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div id="inquire">
            <InquirySidebar
              locale={locale}
              price={unit.minInvestment ?? unit.price}
              currency={unit.currency}
              unitTitle={title}
              phone={phone}
              whatsappUrl={whatsappUrl}
              labels={labels.inquiry}
            />
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              {labels.similar}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((item) => {
                const itemTitle = pickLocalized(item.title, locale);
                const itemLocation = pickLocalized(item.location, locale);
                return (
                  <article
                    key={item.slug}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-md"
                  >
                    <div className="relative aspect-4/3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={itemTitle}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute start-3 top-3 flex gap-2">
                        {item.isNew && (
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-black">
                            {labels.new}
                          </span>
                        )}
                        {item.featured && (
                          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                            {labels.featured}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-1 text-lg font-bold text-foreground">
                        {itemTitle}
                      </h3>
                      <p className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-secondary" />
                        {itemLocation}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {item.bedrooms != null && (
                          <span className="inline-flex items-center gap-1">
                            <BedDouble className="h-3.5 w-3.5" />
                            {item.bedrooms}
                          </span>
                        )}
                        {item.bathrooms != null && (
                          <span className="inline-flex items-center gap-1">
                            <Bath className="h-3.5 w-3.5" />
                            {item.bathrooms}
                          </span>
                        )}
                        {item.area != null && (
                          <span className="inline-flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5" />
                            {item.area}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-primary">
                          {formatPrice(
                            item.minInvestment ?? item.price,
                            locale,
                            item.currency,
                          )}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            href={`${similarHrefBase}/${item.slug}`}
                            className={`rounded-lg px-3 py-2 text-xs font-bold ${
                              similarHrefBase === "/investments"
                                ? "border border-primary text-primary hover:bg-muted"
                                : "bg-primary text-white hover:bg-primary-light"
                            }`}
                          >
                            {labels.details}
                          </Link>
                          {similarHrefBase === "/investments" && (
                            <Link
                              href={`${similarHrefBase}/${item.slug}#inquire`}
                              className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary-light"
                            >
                              {labels.invest}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
