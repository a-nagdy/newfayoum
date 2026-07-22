"use client";

import type { BlogPost, BlogStat } from "@/lib/api/types";
import { newId, slugify, todayISO } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import {
  CheckboxField,
  Field,
  LocalizedField,
  TextInput,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

function emptyStat(): BlogStat {
  return { value: "", label: { ar: "", en: "" } };
}

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
        featured: false,
        author: { ar: "", en: "" },
        authorRole: { ar: "", en: "" },
        stats: [],
      })}
      renderForm={(item, onChange) => {
        const stats = [...(item.stats ?? []), emptyStat(), emptyStat(), emptyStat()].slice(
          0,
          3,
        );

        return (
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
              label="Author name"
              value={item.author ?? { ar: "", en: "" }}
              onChange={(author) => onChange({ ...item, author })}
            />
            <LocalizedField
              label="Author role"
              value={item.authorRole ?? { ar: "", en: "" }}
              onChange={(authorRole) => onChange({ ...item, authorRole })}
            />
            <LocalizedField
              label="Excerpt"
              value={item.excerpt}
              onChange={(excerpt) => onChange({ ...item, excerpt })}
              multiline
            />
            <LocalizedField
              label="Content (use ## for headings, > for quotes)"
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
            <CheckboxField
              label="Featured article (shown large on blog page)"
              checked={Boolean(item.featured)}
              onChange={(featured) => onChange({ ...item, featured })}
            />
            <div className="space-y-3 rounded-xl border border-white/10 bg-[#1a2440]/40 p-4">
              <p className="text-sm font-semibold text-[#c8a85a]">
                Article stats (optional, up to 3)
              </p>
              {stats.map((stat, index) => (
                <div key={index} className="grid gap-3 sm:grid-cols-[120px_1fr]">
                  <Field label={`Value ${index + 1}`}>
                    <TextInput
                      value={stat.value}
                      dir="ltr"
                      onChange={(value) => {
                        const next = [...stats];
                        next[index] = { ...next[index], value };
                        onChange({
                          ...item,
                          stats: next.filter(
                            (s) => s.value.trim() || s.label.ar.trim() || s.label.en.trim(),
                          ),
                        });
                      }}
                    />
                  </Field>
                  <LocalizedField
                    label={`Label ${index + 1}`}
                    value={stat.label}
                    onChange={(label) => {
                      const next = [...stats];
                      next[index] = { ...next[index], label };
                      onChange({
                        ...item,
                        stats: next.filter(
                          (s) => s.value.trim() || s.label.ar.trim() || s.label.en.trim(),
                        ),
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        );
      }}
    />
  );
}
