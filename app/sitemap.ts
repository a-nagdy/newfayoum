import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSection } from "@/lib/content/store";
import { listProducts } from "@/lib/db/products";
import { getSiteUrl } from "@/lib/tracking/config";

const STATIC_PATHS = ["", "/betak", "/betak-share", "/products", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const [products, blogPosts, investments] = await Promise.all([
    listProducts(),
    getSection("blog"),
    getSection("investments"),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(product.postedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const investment of investments) {
      entries.push({
        url: `${baseUrl}/${locale}/investments/${investment.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
