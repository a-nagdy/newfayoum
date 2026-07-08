/**
 * One-time helper: copy data/content.json into MySQL.
 * Run: npx tsx scripts/import-json-to-db.ts
 */
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import type { ContentStore } from "../lib/api/types";

const prisma = new PrismaClient();
const DATA_FILE = path.join(process.cwd(), "data", "content.json");

async function main() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const store = JSON.parse(raw) as ContentStore;
  const keys = Object.keys(store) as (keyof ContentStore)[];

  for (const key of keys) {
    await prisma.contentSection.upsert({
      where: { key },
      create: { key, data: store[key] as object },
      update: { data: store[key] as object },
    });
  }

  console.log(`Imported ${keys.length} sections from ${DATA_FILE}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
