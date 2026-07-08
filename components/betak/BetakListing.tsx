"use client";

import { LayoutGrid, MapPin, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { BetakPropertyCard } from "./BetakPropertyCard";

const PAGE_SIZE = 6;

interface BetakListingProps {
  locale: Locale;
  products: Product[];
  categories: ProductCategory[];
  labels: {
    filters: string;
    sharedOnly: string;
    unitsAvailable: string;
    details: string;
    new: string;
    shared: string;
    return: string;
    rooms: string;
    bathrooms: string;
    noResults: string;
  };
}

function buildQuery(
  current: URLSearchParams,
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(current.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null) params.delete(key);
    else params.set(key, value);
  }
  return params.toString();
}

export function BetakListing({
  locale,
  products,
  categories,
  labels,
}: BetakListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const sharedOnly = searchParams.get("shared") === "1";
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const filtered = products.filter((product) => {
    if (activeCategory && product.categorySlug !== activeCategory) return false;
    if (sharedOnly && !product.isShared) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function navigate(updates: Record<string, string | null>) {
    const query = buildQuery(searchParams, { ...updates, page: "1" });
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function goToPage(nextPage: number) {
    const query = buildQuery(searchParams, { page: String(nextPage) });
    router.push(`${pathname}?${query}`);
  }

  const pillClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-primary text-white"
        : "bg-muted text-primary hover:bg-primary/10"
    }`;

  return (
    <>
      <div className="relative z-20 -mt-10 mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(35,58,114,0.1)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {labels.filters}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  navigate({
                    category:
                      activeCategory === cat.slug ? null : cat.slug,
                  })
                }
                className={pillClass(activeCategory === cat.slug)}
              >
                {pickLocalized(cat.name, locale)}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                navigate({ shared: sharedOnly ? null : "1" })
              }
              className={pillClass(sharedOnly)}
            >
              {labels.sharedOnly}
            </button>
          </div>

          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              type="button"
              aria-label="Grid view"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Map view"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary"
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-6">
        <p className="mb-6 text-sm font-semibold text-primary">
          {filtered.length} {labels.unitsAvailable}
        </p>

        {paginated.length === 0 ? (
          <p className="rounded-2xl border border-border bg-white p-10 text-center text-muted-foreground">
            {labels.noResults}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginated.map((product) => (
              <BetakPropertyCard
                key={product.id}
                product={product}
                locale={locale}
                detailsLabel={labels.details}
                newLabel={labels.new}
                sharedLabel={labels.shared}
                returnLabel={labels.return}
                roomsLabel={labels.rooms}
                bathroomsLabel={labels.bathrooms}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => goToPage(pageNumber)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    pageNumber === page
                      ? "bg-primary text-white"
                      : "bg-white text-primary ring-1 ring-border hover:bg-muted"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </>
  );
}
