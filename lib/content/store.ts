import type { ContentKey, ContentStore } from "@/lib/api/types";
import { listCategories } from "@/lib/db/categories";
import { listProducts } from "@/lib/db/products";
import { prisma } from "@/lib/db/prisma";
import { getDefaultContent } from "./default-content";

const SECTION_KEYS = (Object.keys(getDefaultContent()) as ContentKey[]).filter(
  (key) => key !== "categories" && key !== "products",
);

function assignSection<K extends ContentKey>(
  store: ContentStore,
  key: K,
  data: unknown,
): void {
  store[key] = data as ContentStore[K];
}

async function seedAllSections(store: ContentStore) {
  await prisma.$transaction(
    SECTION_KEYS.map((key) =>
      prisma.contentSection.upsert({
        where: { key },
        create: { key, data: store[key] as object },
        update: { data: store[key] as object },
      }),
    ),
  );
}

async function ensureSeeded() {
  const count = await prisma.contentSection.count();
  if (count > 0) return;

  await seedAllSections(getDefaultContent());
}

export async function readStore(): Promise<ContentStore> {
  await ensureSeeded();

  const rows = await prisma.contentSection.findMany();
  const store = getDefaultContent();

  for (const row of rows) {
    const key = row.key as ContentKey;
    if (SECTION_KEYS.includes(key)) {
      assignSection(store, key, row.data);
    }
  }

  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts(),
  ]);

  return { ...store, categories, products };
}

export async function getSection<K extends ContentKey>(
  key: K,
): Promise<ContentStore[K]> {
  await ensureSeeded();

  const row = await prisma.contentSection.findUnique({ where: { key } });
  if (row) {
    return row.data as unknown as ContentStore[K];
  }

  const fallback = getDefaultContent()[key];
  await prisma.contentSection.create({
    data: { key, data: fallback as object },
  });
  return fallback;
}

export async function updateSection<K extends ContentKey>(
  key: K,
  value: ContentStore[K],
): Promise<ContentStore[K]> {
  await ensureSeeded();

  await prisma.contentSection.upsert({
    where: { key },
    create: { key, data: value as object },
    update: { data: value as object },
  });

  return value;
}

/** Import existing JSON file content into MySQL (one-time migration helper). */
export async function importStore(store: ContentStore): Promise<void> {
  await seedAllSections(store);
}
