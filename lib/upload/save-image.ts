import { randomUUID } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase, throwIfError } from "@/lib/supabase/client";

export const UPLOAD_BUCKET = "uploads";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
]);

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;

function getMaxBytes() {
  const mb = Number(process.env.UPLOAD_MAX_MB ?? "5");
  return Number.isFinite(mb) && mb > 0 ? mb * 1024 * 1024 : DEFAULT_MAX_BYTES;
}

export async function ensureUploadBucket(
  supabase: SupabaseClient = getSupabase(),
) {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  throwIfError(listError);

  if (buckets?.some((bucket) => bucket.name === UPLOAD_BUCKET)) {
    return;
  }

  const { error } = await supabase.storage.createBucket(UPLOAD_BUCKET, {
    public: true,
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throwIfError(error);
  }
}

export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WebP, GIF, and SVG images are allowed.");
  }

  const maxBytes = getMaxBytes();
  if (file.size > maxBytes) {
    throw new Error(
      `Image is too large. Maximum size is ${Math.round(maxBytes / (1024 * 1024))}MB.`,
    );
  }

  const extension = ALLOWED_TYPES.get(file.type)!;
  const filename = `${randomUUID()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabase();

  await ensureUploadBucket(supabase);

  const { error } = await supabase.storage
    .from(UPLOAD_BUCKET)
    .upload(filename, bytes, {
      contentType: file.type,
      upsert: false,
    });

  throwIfError(error);

  const { data } = supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}
