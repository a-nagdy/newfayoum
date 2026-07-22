import type { Locale } from "@/i18n/routing";
import { getSection } from "@/lib/content/store";
import { listCategories } from "@/lib/db/categories";
import {
  countProducts,
  getProductBySlug as getProductBySlugFromDb,
  listProducts,
} from "@/lib/db/products";
import type {
  BlogPost,
  HeroContent,
  InvestmentOpportunity,
  Product,
  ProductCategory,
  PromoBanner,
  SiteSettings,
  SiteStats,
  Feature,
  Testimonial,
} from "@/lib/api/types";

export async function getSiteSettings(_locale: Locale) {
  return getSection("settings");
}

export async function getSiteStats(_locale: Locale) {
  return getSection("stats");
}

export async function getHeroContent(_locale: Locale) {
  return getSection("hero");
}

export async function getCategories(_locale: Locale) {
  return listCategories();
}

export async function getBetakPageContent(_locale: Locale) {
  return getSection("betakPage");
}

export async function getProducts(
  _locale: Locale,
  options?: {
    categorySlug?: string;
    sharedOnly?: boolean;
    excludeShared?: boolean;
  },
) {
  return listProducts(options);
}

export async function getBetakSharePageContent(_locale: Locale) {
  return getSection("betakSharePage");
}

export async function getFeaturedProducts(_locale: Locale) {
  const products = await listProducts({ excludeShared: true });
  return products.filter((p) => p.featured).slice(0, 3);
}

export async function getProductBySlug(_locale: Locale, slug: string) {
  return getProductBySlugFromDb(slug);
}

export async function getInvestmentOpportunities(_locale: Locale) {
  return getSection("investments");
}

export async function getFeatures(_locale: Locale) {
  return getSection("features");
}

export async function getTestimonials(_locale: Locale) {
  return getSection("testimonials");
}

export async function getBlogPosts(_locale: Locale) {
  return getSection("blog");
}

export async function getBlogPostBySlug(_locale: Locale, slug: string) {
  const posts = await getSection("blog");
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPromoBanner(_locale: Locale) {
  return getSection("promo");
}

export async function getRelatedProducts(
  locale: Locale,
  categorySlug: string,
  excludeSlug: string,
  limit = 3,
  options?: { sharedOnly?: boolean; excludeShared?: boolean },
) {
  const products = await getProducts(locale, {
    categorySlug,
    sharedOnly: options?.sharedOnly,
    excludeShared: options?.excludeShared ?? !options?.sharedOnly,
  });
  return products.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export async function getInvestmentOpportunityBySlug(
  _locale: Locale,
  slug: string,
) {
  const investments = await getSection("investments");
  return investments.find((item) => item.slug === slug) ?? null;
}

export async function getRelatedInvestments(
  _locale: Locale,
  excludeSlug: string,
  limit = 3,
) {
  const investments = await getSection("investments");
  return investments.filter((item) => item.slug !== excludeSlug).slice(0, limit);
}

export async function getProductCount(_locale: Locale) {
  return countProducts();
}

// Re-export types for convenience
export type {
  BlogPost,
  Feature,
  HeroContent,
  InvestmentOpportunity,
  Product,
  ProductCategory,
  PromoBanner,
  SiteSettings,
  SiteStats,
  Testimonial,
};
