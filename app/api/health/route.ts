import { NextResponse } from "next/server";
import { getSupabase, throwIfError } from "@/lib/supabase/client";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("content_sections")
      .select("key")
      .limit(1);

    throwIfError(error);

    return NextResponse.json({
      ok: true,
      db: true,
      provider: "supabase",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";

    return NextResponse.json(
      {
        ok: false,
        db: false,
        provider: "supabase",
        error: message,
      },
      { status: 503 },
    );
  }
}
