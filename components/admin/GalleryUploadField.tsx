"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { Field, TextInput } from "./FormControls";

interface GalleryUploadFieldProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export function GalleryUploadField({
  label,
  value,
  onChange,
}: GalleryUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlDraft, setUrlDraft] = useState("");

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

      onChange([...value, data.url]);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function addUrl() {
    const url = urlDraft.trim();
    if (!url) return;
    onChange([...value, url]);
    setUrlDraft("");
  }

  return (
    <Field label={label}>
      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {value.map((url) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-lg border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((item) => item !== url))}
                className="absolute end-1 top-1 rounded bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
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
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#111827] px-3 py-2 text-sm text-white hover:border-[#c8a85a]"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          Upload image
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <TextInput
          value={urlDraft}
          dir="ltr"
          onChange={setUrlDraft}
        />
        <button
          type="button"
          onClick={addUrl}
          className="shrink-0 rounded-lg bg-[#c8a85a] px-3 py-2 text-sm font-semibold text-black"
        >
          Add URL
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </Field>
  );
}
