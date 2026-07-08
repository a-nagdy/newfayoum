import { PrismaClient } from "@prisma/client";
import { getDefaultContent } from "../lib/content/default-content";
import type { ContentKey, ContentStore } from "../lib/api/types";

const prisma = new PrismaClient();

async function main() {
  const store = getDefaultContent();
  const keys = Object.keys(store) as ContentKey[];

  for (const key of keys) {
    await prisma.contentSection.upsert({
      where: { key },
      create: { key, data: store[key] as object },
      update: { data: store[key] as object },
    });
  }

  console.log(`Seeded ${keys.length} content sections.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
