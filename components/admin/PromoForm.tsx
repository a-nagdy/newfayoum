"use client";

import { useState } from "react";
import type { PromoBanner } from "@/lib/api/types";
import {
  Field,
  LocalizedField,
  PageHeader,
  SaveButton,
  TextInput,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

export function PromoForm({ initialData }: { initialData: PromoBanner }) {
  const [data, setData] = useState(initialData);

  async function save() {
    const res = await fetch("/api/promo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div>
      <PageHeader
        title="Promo Banner"
        description="New Fayoum promotional section on the homepage."
      />
      <div className="max-w-3xl space-y-6">
        <LocalizedField
          label="Title"
          value={data.title}
          onChange={(title) => setData({ ...data, title })}
        />
        <LocalizedField
          label="Description"
          value={data.description}
          onChange={(description) => setData({ ...data, description })}
          multiline
        />
        <LocalizedField
          label="CTA label"
          value={data.ctaLabel}
          onChange={(ctaLabel) => setData({ ...data, ctaLabel })}
        />
        <Field label="CTA link">
          <TextInput
            value={data.ctaHref}
            dir="ltr"
            onChange={(ctaHref) => setData({ ...data, ctaHref })}
          />
        </Field>
        <ImageUploadField
          label="Promo image"
          value={data.image}
          onChange={(image) => setData({ ...data, image })}
        />
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
