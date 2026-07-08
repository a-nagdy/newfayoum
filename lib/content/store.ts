import type { ContentStore, SectionKey } from "@/lib/api/types";
import { listCategories } from "@/lib/db/categories";
import { listProducts } from "@/lib/db/products";
import { getDefaultContent } from "./default-content";
import { getSupabase, throwIfError } from "@/lib/supabase/client";

const SECTION_KEYS: SectionKey[] = [
  "settings",
  "stats",
  "hero",
  "betakPage",
  "investments",
  "features",
  "testimonials",
  "blog",
  "promo",
];

function isSectionKey(key: string): key is SectionKey {
  return (SECTION_KEYS as string[]).includes(key);
}

function assignSection<K extends SectionKey>(
  store: ContentStore,
  key: K,
  data: unknown,
): void {
  store[key] = data as ContentStore[K];
}

async function seedAllSections(store: ContentStore) {
  const supabase = getSupabase();
  const rows = SECTION_KEYS.map((key) => ({
    key,
    data: store[key],
  }));

  const { error } = await supabase
    .from("content_sections")
    .upsert(rows, { onConflict: "key" });

  throwIfError(error);
}

async function ensureSeeded() {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("content_sections")
    .select("*", { count: "exact", head: true });

  throwIfError(error);
  if ((count ?? 0) > 0) return;

  await seedAllSections(getDefaultContent());
}

export async function readStore(): Promise<ContentStore> {
  await ensureSeeded();
  const supabase = getSupabase();

  const { data: rows, error } = await supabase.from("content_sections").select("*");
  throwIfError(error);

  const store = getDefaultContent();

  for (const row of rows ?? []) {
    if (isSectionKey(row.key)) {
      assignSection(store, row.key, row.data);
    }
  }

  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts(),
  ]);

  return { ...store, categories, products };
}

export async function getSection<K extends SectionKey>(
  key: K,
): Promise<ContentStore[K]> {
  await ensureSeeded();
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("content_sections")
    .select("data")
    .eq("key", key)
    .maybeSingle();

  throwIfError(error);

  if (data) {
    return data.data as ContentStore[K];
  }

  const fallback = getDefaultContent()[key];
  const { error: insertError } = await supabase
    .from("content_sections")
    .insert({ key, data: fallback });

  throwIfError(insertError);
  return fallback;
}

export async function updateSection<K extends SectionKey>(
  key: K,
  value: ContentStore[K],
): Promise<ContentStore[K]> {
  await ensureSeeded();
  const supabase = getSupabase();

  const { error } = await supabase
    .from("content_sections")
    .upsert({ key, data: value }, { onConflict: "key" });

  throwIfError(error);
  return value;
}

export async function importStore(store: ContentStore): Promise<void> {
  await seedAllSections(store);
}
