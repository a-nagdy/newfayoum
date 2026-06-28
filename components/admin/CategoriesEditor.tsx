"use client";

import type { ProductCategory } from "@/lib/api/types";
import { newId, slugify } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import { Field, LocalizedField, TextInput } from "./FormControls";

export function CategoriesEditor({
  initialData,
}: {
  initialData: ProductCategory[];
}) {
  return (
    <CollectionManager
      title="Categories"
      description="Property types used for filtering on the website."
      apiPath="/api/categories"
      initialItems={initialData}
      getItemLabel={(item) => item.name.en || item.name.ar || item.slug}
      createItem={() => ({
        id: newId(),
        slug: "",
        name: { ar: "", en: "" },
      })}
      renderForm={(item, onChange) => (
        <>
          <LocalizedField
            label="Category name"
            value={item.name}
            onChange={(name) => {
              const slug = item.slug || slugify(name.en || name.ar);
              onChange({ ...item, name, slug });
            }}
          />
          <Field label="Slug (URL key)">
            <TextInput
              value={item.slug}
              dir="ltr"
              onChange={(slug) => onChange({ ...item, slug: slugify(slug) })}
            />
          </Field>
        </>
      )}
    />
  );
}
