"use client";

import { useState } from "react";
import type { PromoBanner } from "@/lib/api/types";
import { putApi } from "@/lib/admin/api-client";
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
    await putApi("/api/promo", data);
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
