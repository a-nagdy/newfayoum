import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClient | undefined;
};

export function getSupabase() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_API_KEY?.trim().replace(/^["']+|["']+$/g, "");

  if (!url || !key) {
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
  if (error) throw new Error(error.message);
}
