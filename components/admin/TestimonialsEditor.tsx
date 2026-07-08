"use client";

import type { Testimonial } from "@/lib/api/types";
import { newId } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import { Field, LocalizedField, TextInput } from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

export function TestimonialsEditor({
  initialData,
}: {
  initialData: Testimonial[];
}) {
  return (
    <CollectionManager
      title="Testimonials"
      description="Investor reviews on the homepage."
      apiPath="/api/testimonials"
      initialItems={initialData}
      getItemLabel={(item) => item.name.en || item.name.ar || "Testimonial"}
      createItem={() => ({
        id: newId(),
        quote: { ar: "", en: "" },
        name: { ar: "", en: "" },
        role: { ar: "", en: "" },
        avatar: "",
        rating: 5,
      })}
      renderForm={(item, onChange) => (
        <>
          <LocalizedField
            label="Quote"
            value={item.quote}
            onChange={(quote) => onChange({ ...item, quote })}
            multiline
          />
          <LocalizedField
            label="Name"
            value={item.name}
            onChange={(name) => onChange({ ...item, name })}
          />
          <LocalizedField
            label="Role"
            value={item.role}
            onChange={(role) => onChange({ ...item, role })}
          />
          <ImageUploadField
            label="Avatar image"
            value={item.avatar}
            onChange={(avatar) => onChange({ ...item, avatar })}
          />
          <Field label="Rating (1–5)">
            <TextInput
              type="number"
              value={String(item.rating)}
              onChange={(v) =>
                onChange({
                  ...item,
                  rating: Math.min(5, Math.max(1, Number(v) || 5)),
                })
              }
            />
          </Field>
        </>
      )}
    />
  );
}
