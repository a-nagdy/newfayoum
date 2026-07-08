import type { Category, Product as DbProduct } from "@prisma/client";
import type { Product, ProductCategory } from "@/lib/api/types";

type ProductWithCategory = DbProduct & { category: Category };

export function toCategory(row: Category): ProductCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: { ar: row.nameAr, en: row.nameEn },
  };
}

export function toProduct(row: ProductWithCategory): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: { ar: row.titleAr, en: row.titleEn },
    location: { ar: row.locationAr, en: row.locationEn },
    price: row.price,
    currency: row.currency,
    image: row.image,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    area: row.area ?? undefined,
    postedAt: row.postedAt.toISOString().slice(0, 10),
    badges: (row.badges as Product["badges"]) ?? undefined,
    categorySlug: row.category.slug,
    featured: row.featured,
    isNew: row.isNew,
    isShared: row.isShared,
    expectedReturn: row.expectedReturn ?? undefined,
    monthlyInstallment: row.monthlyInstallment ?? undefined,
  };
}

export function toCategoryWriteData(item: ProductCategory) {
  return {
    id: item.id,
    slug: item.slug,
    nameAr: item.name.ar,
    nameEn: item.name.en,
  };
}

export function toProductWriteData(item: Product, categoryId: string) {
  return {
    id: item.id,
    slug: item.slug,
    titleAr: item.title.ar,
    titleEn: item.title.en,
    locationAr: item.location.ar,
    locationEn: item.location.en,
    price: item.price,
    currency: item.currency,
    image: item.image,
    bedrooms: item.bedrooms ?? null,
    bathrooms: item.bathrooms ?? null,
    area: item.area ?? null,
    postedAt: new Date(item.postedAt),
    badges: item.badges ?? null,
    featured: Boolean(item.featured),
    isNew: Boolean(item.isNew),
    isShared: Boolean(item.isShared),
    expectedReturn: item.expectedReturn ?? null,
    monthlyInstallment: item.monthlyInstallment ?? null,
    categoryId,
  };
}
