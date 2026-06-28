import type { Locale } from "@/i18n/routing";
import { getSection } from "@/lib/content/store";
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
  return getSection("categories");
}

export async function getProducts(locale: Locale, categorySlug?: string) {
  const products = await getSection("products");
  if (!categorySlug) return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProducts(_locale: Locale) {
  const products = await getSection("products");
  return products.filter((p) => p.featured).slice(0, 3);
}

export async function getProductBySlug(_locale: Locale, slug: string) {
  const products = await getSection("products");
  return products.find((p) => p.slug === slug) ?? null;
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
) {
  const products = await getProducts(locale, categorySlug);
  return products.filter((p) => p.slug !== excludeSlug).slice(0, limit);
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
