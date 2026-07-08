/**
 * Test Supabase connection.
 * Run: npm run db:test
 */
import { getSupabase, throwIfError } from "../lib/supabase/client";

async function main() {
  const url = process.env.SUPABASE_URL;
  console.log("SUPABASE_URL:", url ?? "(not set)");

  if (!process.env.SUPABASE_API_KEY) {
    console.error("SUPABASE_API_KEY is not set.");
    process.exit(1);
  }

  try {
    const supabase = getSupabase();

    const [sections, categories, products] = await Promise.all([
      supabase.from("content_sections").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
    ]);

    throwIfError(sections.error);
    throwIfError(categories.error);
    throwIfError(products.error);

    console.log("Connection OK");
    console.log(`Content sections: ${sections.count ?? 0}`);
    console.log(`Categories: ${categories.count ?? 0}`);
    console.log(`Products: ${products.count ?? 0}`);
  } catch (error) {
    console.error("Connection failed:");
    console.error(error instanceof Error ? error.message : error);
    console.error("\n1. Run supabase/schema.sql in Supabase SQL Editor");
    console.error("2. Set SUPABASE_URL and SUPABASE_API_KEY in env");
    process.exit(1);
  }
}

main();
