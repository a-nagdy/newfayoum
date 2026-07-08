import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
]);

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;

function getUploadDir() {
  return path.join(process.cwd(), "public", "uploads");
}

function getMaxBytes() {
  const mb = Number(process.env.UPLOAD_MAX_MB ?? "5");
  return Number.isFinite(mb) && mb > 0 ? mb * 1024 * 1024 : DEFAULT_MAX_BYTES;
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
  const uploadDir = getUploadDir();

  await mkdir(uploadDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), bytes);

  return `/uploads/${filename}`;
}
