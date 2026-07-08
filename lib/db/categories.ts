import type { ProductCategory } from "@/lib/api/types";
import { prisma } from "@/lib/db/prisma";
import { toCategory, toCategoryWriteData } from "@/lib/db/mappers";
import { getDefaultCategories } from "@/lib/content/default-content";

async function seedDefaultCategories() {
  const defaults = getDefaultCategories();

  for (const item of defaults) {
    const data = toCategoryWriteData(item);
    await prisma.category.upsert({
      where: { id: item.id },
      create: data,
      update: {
        slug: data.slug,
        nameAr: data.nameAr,
        nameEn: data.nameEn,
      },
    });
  }
}

export async function ensureCategoriesSeeded() {
  const count = await prisma.category.count();
  if (count === 0) {
    await seedDefaultCategories();
  }
}

export async function listCategories(): Promise<ProductCategory[]> {
  await ensureCategoriesSeeded();

  const rows = await prisma.category.findMany({
    orderBy: { nameEn: "asc" },
  });

  return rows.map(toCategory);
}

export async function syncCategories(
  items: ProductCategory[],
): Promise<ProductCategory[]> {
  await ensureCategoriesSeeded();

  const existing = await prisma.category.findMany();
  const incomingIds = new Set(items.map((item) => item.id));

  await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const data = toCategoryWriteData(item);
      await tx.category.upsert({
        where: { id: item.id },
        create: data,
        update: {
          slug: data.slug,
          nameAr: data.nameAr,
          nameEn: data.nameEn,
        },
      });
    }

    for (const row of existing) {
      if (incomingIds.has(row.id)) continue;

      const productCount = await tx.product.count({
        where: { categoryId: row.id },
      });

      if (productCount === 0) {
        await tx.category.delete({ where: { id: row.id } });
      }
    }
  });

  return listCategories();
}

export async function getCategoryIdBySlug(
  slug: string,
): Promise<string | null> {
  await ensureCategoriesSeeded();

  const row = await prisma.category.findUnique({
    where: { slug },
    select: { id: true },
  });

  return row?.id ?? null;
}
