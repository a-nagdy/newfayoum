import type { ProductCategory } from "@/lib/api/types";
import { toCategory, toCategoryWriteRow } from "@/lib/db/mappers";
import { getDefaultCategories } from "@/lib/content/default-content";
import { getSupabase, throwIfError } from "@/lib/supabase/client";

async function seedDefaultCategories() {
  const defaults = getDefaultCategories();
  const supabase = getSupabase();

  const { error } = await supabase
    .from("categories")
    .upsert(defaults.map(toCategoryWriteRow), { onConflict: "id" });

  throwIfError(error);
}

export async function ensureCategoriesSeeded() {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  throwIfError(error);
  if ((count ?? 0) === 0) await seedDefaultCategories();
}

export async function listCategories(): Promise<ProductCategory[]> {
  await ensureCategoriesSeeded();
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name_en", { ascending: true });

  throwIfError(error);
  return (data ?? []).map(toCategory);
}

export async function syncCategories(
  items: ProductCategory[],
): Promise<ProductCategory[]> {
  await ensureCategoriesSeeded();
  const supabase = getSupabase();

  const { data: existing, error: existingError } = await supabase
    .from("categories")
    .select("id");

  throwIfError(existingError);

  const incomingIds = new Set(items.map((item) => item.id));

  const { error: upsertError } = await supabase
    .from("categories")
    .upsert(items.map(toCategoryWriteRow), { onConflict: "id" });

  throwIfError(upsertError);

  for (const row of existing ?? []) {
    if (incomingIds.has(row.id)) continue;

    const { count, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category_id", row.id);

    throwIfError(countError);

    if ((count ?? 0) === 0) {
      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", row.id);

      throwIfError(deleteError);
    }
  }

  return listCategories();
}

export async function getCategoryIdBySlug(
  slug: string,
): Promise<string | null> {
  await ensureCategoriesSeeded();
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  throwIfError(error);
  return data?.id ?? null;
}
