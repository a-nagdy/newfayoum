import type { Product } from "@/lib/api/types";
import { ensureCategoriesSeeded, getCategoryIdBySlug } from "@/lib/db/categories";
import { toProduct, toProductWriteRow, type ProductRow } from "@/lib/db/mappers";
import { getDefaultProducts } from "@/lib/content/default-content";
import { getSupabase, throwIfError } from "@/lib/supabase/client";

const productSelect = "*, categories(slug)";

let detailsColumnSupported: boolean | null = null;
let fundedPercentSupported: boolean | null = null;

async function hasColumn(column: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("products").select(column).limit(1);
  return !error;
}

async function hasDetailsColumn() {
  if (detailsColumnSupported == null) {
    detailsColumnSupported = await hasColumn("details");
  }
  return detailsColumnSupported;
}

async function hasFundedPercentColumn() {
  if (fundedPercentSupported == null) {
    fundedPercentSupported = await hasColumn("funded_percent");
  }
  return fundedPercentSupported;
}

function writeRow(
  item: Product,
  categoryId: string,
  options: { includeDetails: boolean; includeFundedPercent: boolean },
) {
  const row = toProductWriteRow(item, categoryId);
  const result: Record<string, unknown> = { ...row };

  if (!options.includeDetails) delete result.details;
  if (!options.includeFundedPercent) delete result.funded_percent;

  return result;
}

async function columnOptions() {
  const [includeDetails, includeFundedPercent] = await Promise.all([
    hasDetailsColumn(),
    hasFundedPercentColumn(),
  ]);
  return { includeDetails, includeFundedPercent };
}

async function seedDefaultProducts() {
  await ensureCategoriesSeeded();
  const defaults = getDefaultProducts();
  const supabase = getSupabase();
  const options = await columnOptions();

  const rows = [];
  for (const item of defaults) {
    const categoryId = await getCategoryIdBySlug(item.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category for product seed: ${item.categorySlug}`);
    }
    rows.push(writeRow(item, categoryId, options));
  }

  const { error } = await supabase.from("products").upsert(rows, {
    onConflict: "id",
  });

  throwIfError(error);
}

export async function ensureProductsSeeded() {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  throwIfError(error);
  if ((count ?? 0) === 0) await seedDefaultProducts();
}

export async function listProducts(options?: {
  categorySlug?: string;
  sharedOnly?: boolean;
  excludeShared?: boolean;
}): Promise<Product[]> {
  await ensureProductsSeeded();
  const supabase = getSupabase();

  let categoryId: string | null = null;
  if (options?.categorySlug) {
    categoryId = await getCategoryIdBySlug(options.categorySlug);
    if (!categoryId) return [];
  }

  let query = supabase
    .from("products")
    .select(productSelect)
    .order("posted_at", { ascending: false });

  if (categoryId) query = query.eq("category_id", categoryId);
  if (options?.sharedOnly) query = query.eq("is_shared", true);
  if (options?.excludeShared) query = query.eq("is_shared", false);

  const { data, error } = await query;
  throwIfError(error);

  return (data as ProductRow[] | null)?.map(toProduct) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureProductsSeeded();
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .maybeSingle();

  throwIfError(error);
  return data ? toProduct(data as ProductRow) : null;
}

export async function syncProducts(items: Product[]): Promise<Product[]> {
  await ensureProductsSeeded();
  const supabase = getSupabase();
  const options = await columnOptions();

  const { data: existing, error: existingError } = await supabase
    .from("products")
    .select("id");

  throwIfError(existingError);

  const incomingIds = new Set(items.map((item) => item.id));
  const rows = [];

  for (const item of items) {
    const categoryId = await getCategoryIdBySlug(item.categorySlug);
    if (!categoryId) {
      throw new Error(`Unknown category slug: ${item.categorySlug}`);
    }
    rows.push(writeRow(item, categoryId, options));
  }

  const { error: upsertError } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" });

  throwIfError(upsertError);

  for (const row of existing ?? []) {
    if (incomingIds.has(row.id)) continue;

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", row.id);

    throwIfError(deleteError);
  }

  return listProducts();
}

export async function countProducts(): Promise<number> {
  await ensureProductsSeeded();
  const supabase = getSupabase();

  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  throwIfError(error);
  return count ?? 0;
}
