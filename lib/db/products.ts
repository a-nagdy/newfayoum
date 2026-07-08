import type { Product } from "@/lib/api/types";
import { ensureCategoriesSeeded, getCategoryIdBySlug } from "@/lib/db/categories";
import { prisma } from "@/lib/db/prisma";
import { toProduct, toProductWriteData } from "@/lib/db/mappers";
import { getDefaultProducts } from "@/lib/content/default-content";

const productInclude = { category: true } as const;

async function seedDefaultProducts() {
  await ensureCategoriesSeeded();

  const defaults = getDefaultProducts();

  for (const item of defaults) {
    const categoryId = await getCategoryIdBySlug(item.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category for product seed: ${item.categorySlug}`);
    }

    const data = toProductWriteData(item, categoryId);
    await prisma.product.upsert({
      where: { id: item.id },
      create: data,
      update: data,
    });
  }
}

export async function ensureProductsSeeded() {
  const count = await prisma.product.count();
  if (count === 0) {
    await seedDefaultProducts();
  }
}

export async function listProducts(options?: {
  categorySlug?: string;
  sharedOnly?: boolean;
}): Promise<Product[]> {
  await ensureProductsSeeded();

  const rows = await prisma.product.findMany({
    include: productInclude,
    orderBy: { postedAt: "desc" },
    where: {
      ...(options?.categorySlug
        ? { category: { slug: options.categorySlug } }
        : {}),
      ...(options?.sharedOnly ? { isShared: true } : {}),
    },
  });

  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureProductsSeeded();

  const row = await prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });

  return row ? toProduct(row) : null;
}

export async function syncProducts(items: Product[]): Promise<Product[]> {
  await ensureProductsSeeded();

  const existing = await prisma.product.findMany({ select: { id: true } });
  const incomingIds = new Set(items.map((item) => item.id));

  await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const categoryId = await getCategoryIdBySlug(item.categorySlug);
      if (!categoryId) {
        throw new Error(`Unknown category slug: ${item.categorySlug}`);
      }

      const data = toProductWriteData(item, categoryId);
      await tx.product.upsert({
        where: { id: item.id },
        create: data,
        update: data,
      });
    }

    for (const row of existing) {
      if (!incomingIds.has(row.id)) {
        await tx.product.delete({ where: { id: row.id } });
      }
    }
  });

  return listProducts();
}

export async function countProducts(): Promise<number> {
  await ensureProductsSeeded();
  return prisma.product.count();
}
