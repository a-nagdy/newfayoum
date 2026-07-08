import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClient | undefined;
};

export function getSupabase() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_API_KEY?.trim().replace(/^["']+|["']+$/g, "");

  if (!url || !key) {
    console.error(
      "[supabase] Missing env vars. SUPABASE_URL:",
      url ? "set" : "MISSING",
      "SUPABASE_API_KEY:",
      key ? "set" : "MISSING",
    );
    throw new Error("SUPABASE_URL and SUPABASE_API_KEY must be set");
  }

  if (!globalForSupabase.supabase) {
    globalForSupabase.supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return globalForSupabase.supabase;
}

export function throwIfError(error: { message: string } | null) {
  if (error) {
    console.error("[supabase]", error.message);
    throw new Error(error.message);
  }
}
