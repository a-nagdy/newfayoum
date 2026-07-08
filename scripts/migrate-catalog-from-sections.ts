/**
 * One-time helper: move legacy products/categories JSON blobs
 * from content_sections into proper relational tables.
 *
 * Run: npx tsx scripts/migrate-catalog-from-sections.ts
 */
import { PrismaClient } from "@prisma/client";
import type { Product, ProductCategory } from "../lib/api/types";
import { syncCategories } from "../lib/db/categories";
import { syncProducts } from "../lib/db/products";

const prisma = new PrismaClient();

async function main() {
  const [categoriesRow, productsRow] = await Promise.all([
    prisma.contentSection.findUnique({ where: { key: "categories" } }),
    prisma.contentSection.findUnique({ where: { key: "products" } }),
  ]);

  if (categoriesRow?.data) {
    const categories = categoriesRow.data as ProductCategory[];
    await syncCategories(categories);
    console.log(`Migrated ${categories.length} categories.`);
  } else {
    console.log("No legacy categories section found.");
  }

  if (productsRow?.data) {
    const products = productsRow.data as Product[];
    await syncProducts(products);
    console.log(`Migrated ${products.length} products.`);
  } else {
    console.log("No legacy products section found.");
  }

  await prisma.contentSection.deleteMany({
    where: { key: { in: ["categories", "products"] } },
  });

  console.log("Removed legacy categories/products JSON sections.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
