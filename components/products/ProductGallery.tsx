"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];
  const current = safeImages[active] ?? safeImages[0];

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={current}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>

      {safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {safeImages.slice(0, 4).map((src, index) => (
            <button
              key={src + index}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-4/3 overflow-hidden rounded-xl border-2 transition-colors ${
                active === index
                  ? "border-secondary"
                  : "border-transparent hover:border-primary/30"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
