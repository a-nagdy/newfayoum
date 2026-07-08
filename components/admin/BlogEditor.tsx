"use client";

import type { BlogPost } from "@/lib/api/types";
import { newId, slugify, todayISO } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import { Field, LocalizedField, TextInput } from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

export function BlogEditor({ initialData }: { initialData: BlogPost[] }) {
  return (
    <CollectionManager
      title="Blog Posts"
      description="Articles for the blog listing and detail pages."
      apiPath="/api/blog"
      initialItems={initialData}
      getItemLabel={(item) => item.title.en || item.title.ar || item.slug}
      createItem={() => ({
        id: newId(),
        slug: "",
        title: { ar: "", en: "" },
        excerpt: { ar: "", en: "" },
        content: { ar: "", en: "" },
        image: "",
        category: { ar: "", en: "" },
        publishedAt: todayISO(),
        readingTimeMinutes: 5,
      })}
      renderForm={(item, onChange) => (
        <>
          <LocalizedField
            label="Title"
            value={item.title}
            onChange={(title) => {
              const slug = item.slug || slugify(title.en || title.ar);
              onChange({ ...item, title, slug });
            }}
          />
          <Field label="Slug">
            <TextInput
              value={item.slug}
              dir="ltr"
              onChange={(slug) => onChange({ ...item, slug: slugify(slug) })}
            />
          </Field>
          <LocalizedField
            label="Category"
            value={item.category}
            onChange={(category) => onChange({ ...item, category })}
          />
          <LocalizedField
            label="Excerpt"
            value={item.excerpt}
            onChange={(excerpt) => onChange({ ...item, excerpt })}
            multiline
          />
          <LocalizedField
            label="Content"
            value={item.content}
            onChange={(content) => onChange({ ...item, content })}
            multiline
          />
          <ImageUploadField
            label="Featured image"
            value={item.image}
            onChange={(image) => onChange({ ...item, image })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Published date">
              <TextInput
                type="date"
                value={item.publishedAt}
                dir="ltr"
                onChange={(publishedAt) => onChange({ ...item, publishedAt })}
              />
            </Field>
            <Field label="Reading time (minutes)">
              <TextInput
                type="number"
                value={String(item.readingTimeMinutes)}
                onChange={(v) =>
                  onChange({
                    ...item,
                    readingTimeMinutes: Number(v) || 1,
                  })
                }
              />
            </Field>
          </div>
        </>
      )}
    />
  );
}
