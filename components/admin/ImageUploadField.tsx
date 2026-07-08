"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { Field, TextInput } from "./FormControls";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;

      if (!res.ok || !data?.url) {
        setError(data?.error ?? "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label}>
      {value ? (
        <div className="mb-3 overflow-hidden rounded-lg border border-white/10 bg-black/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-44 w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-3 flex h-32 items-center justify-center rounded-lg border border-dashed border-white/15 bg-black/20 text-sm text-gray-500">
          No image selected
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#233a72] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f4d8f] disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Upload from device"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-gray-500">
        JPG, PNG, WebP, GIF, or SVG. Max 5MB. Or paste an external URL below.
      </p>

      <div className="mt-2">
        <TextInput value={value} dir="ltr" onChange={onChange} />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </Field>
  );
}
