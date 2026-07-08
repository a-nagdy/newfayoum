import { getDefaultContent } from "../lib/content/default-content";
import type { SectionKey } from "../lib/api/types";
import { syncCategories } from "../lib/db/categories";
import { syncProducts } from "../lib/db/products";
import { getSupabase, throwIfError } from "../lib/supabase/client";

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

async function main() {
  const store = getDefaultContent();
  const supabase = getSupabase();

  await syncCategories(store.categories);
  await syncProducts(store.products);

  const rows = SECTION_KEYS.map((key) => ({
    key,
    data: store[key],
  }));

  const { error } = await supabase
    .from("content_sections")
    .upsert(rows, { onConflict: "key" });

  throwIfError(error);

  console.log(
    `Seeded ${store.categories.length} categories, ${store.products.length} products, and ${SECTION_KEYS.length} content sections.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
