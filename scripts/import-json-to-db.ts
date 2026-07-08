/**
 * One-time helper: copy data/content.json into MySQL.
 * Products and categories go to relational tables; other sections stay in content_sections.
 *
 * Run: npx tsx scripts/import-json-to-db.ts
 */
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import type { ContentStore } from "../lib/api/types";
import { syncCategories } from "../lib/db/categories";
import { syncProducts } from "../lib/db/products";

const prisma = new PrismaClient();
const DATA_FILE = path.join(process.cwd(), "data", "content.json");

const SECTION_KEYS = [
  "settings",
  "stats",
  "hero",
  "betakPage",
  "investments",
  "features",
  "testimonials",
  "blog",
  "promo",
] as const;

async function main() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const store = JSON.parse(raw) as ContentStore;

  if (store.categories?.length) {
    await syncCategories(store.categories);
    console.log(`Imported ${store.categories.length} categories.`);
  }

  if (store.products?.length) {
    await syncProducts(store.products);
    console.log(`Imported ${store.products.length} products.`);
  }

  for (const key of SECTION_KEYS) {
    if (store[key] == null) continue;

    await prisma.contentSection.upsert({
      where: { key },
      create: { key, data: store[key] as object },
      update: { data: store[key] as object },
    });
  }

  console.log(`Imported JSON content from ${DATA_FILE}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
