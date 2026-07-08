import { PrismaClient } from "@prisma/client";
import { getDefaultContent } from "../lib/content/default-content";
import type { ContentKey } from "../lib/api/types";
import { syncCategories } from "../lib/db/categories";
import { syncProducts } from "../lib/db/products";

const prisma = new PrismaClient();

const SECTION_KEYS = (Object.keys(getDefaultContent()) as ContentKey[]).filter(
  (key) => key !== "categories" && key !== "products",
);

async function main() {
  const store = getDefaultContent();

  await syncCategories(store.categories);
  await syncProducts(store.products);

  for (const key of SECTION_KEYS) {
    await prisma.contentSection.upsert({
      where: { key },
      create: { key, data: store[key] as object },
      update: { data: store[key] as object },
    });
  }

  console.log(
    `Seeded ${store.categories.length} categories, ${store.products.length} products, and ${SECTION_KEYS.length} content sections.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
