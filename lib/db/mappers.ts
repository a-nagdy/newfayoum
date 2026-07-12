import type { Product, ProductCategory } from "@/lib/api/types";

export type CategoryRow = {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
};

export type ProductRow = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  location_ar: string;
  location_en: string;
  price: number;
  currency: string;
  image: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  posted_at: string;
  badges: Product["badges"] | null;
  featured: boolean;
  is_new: boolean;
  is_shared: boolean;
  expected_return: number | null;
  monthly_installment: number | null;
  funded_percent: number | null;
  category_id: string;
  categories: { slug: string } | null;
};

export type ContentSectionRow = {
  key: string;
  data: unknown;
};

export function toCategory(row: CategoryRow): ProductCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: { ar: row.name_ar, en: row.name_en },
  };
}

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: { ar: row.title_ar, en: row.title_en },
    location: { ar: row.location_ar, en: row.location_en },
    price: row.price,
    currency: row.currency,
    image: row.image,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    area: row.area ?? undefined,
    postedAt: row.posted_at.slice(0, 10),
    badges: row.badges ?? undefined,
    categorySlug: row.categories?.slug ?? "",
    featured: row.featured,
    isNew: row.is_new,
    isShared: row.is_shared,
    expectedReturn: row.expected_return ?? undefined,
    monthlyInstallment: row.monthly_installment ?? undefined,
    fundedPercent: row.funded_percent ?? undefined,
  };
}

export function toCategoryWriteRow(item: ProductCategory) {
  return {
    id: item.id,
    slug: item.slug,
    name_ar: item.name.ar,
    name_en: item.name.en,
  };
}

export function toProductWriteRow(item: Product, categoryId: string) {
  return {
    id: item.id,
    slug: item.slug,
    title_ar: item.title.ar,
    title_en: item.title.en,
    location_ar: item.location.ar,
    location_en: item.location.en,
    price: item.price,
    currency: item.currency,
    image: item.image,
    bedrooms: item.bedrooms ?? null,
    bathrooms: item.bathrooms ?? null,
    area: item.area ?? null,
    posted_at: item.postedAt,
    badges: item.badges ?? null,
    featured: Boolean(item.featured),
    is_new: Boolean(item.isNew),
    is_shared: Boolean(item.isShared),
    expected_return: item.expectedReturn ?? null,
    monthly_installment: item.monthlyInstallment ?? null,
    funded_percent: item.fundedPercent ?? null,
    category_id: categoryId,
  };
}
