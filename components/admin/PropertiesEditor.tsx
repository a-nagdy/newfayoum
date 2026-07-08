"use client";

import type { Product, ProductCategory } from "@/lib/api/types";
import { newId, slugify, todayISO } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import {
  CheckboxField,
  Field,
  LocalizedField,
  SelectField,
  TextInput,
} from "./FormControls";

export function PropertiesEditor({
  initialData,
  categories,
}: {
  initialData: Product[];
  categories: ProductCategory[];
}) {
  const categoryOptions = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name.en || cat.name.ar || cat.slug,
  }));

  return (
    <CollectionManager
      title="Properties / Units"
      description="Real estate listings shown on the homepage and products pages."
      apiPath="/api/products"
      initialItems={initialData}
      getItemLabel={(item) => item.title.en || item.title.ar || item.slug}
      createItem={() => ({
        id: newId(),
        slug: "",
        title: { ar: "", en: "" },
        location: { ar: "", en: "" },
        price: 0,
        currency: "EGP",
        image: "",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        postedAt: todayISO(),
        categorySlug: categories[0]?.slug ?? "apartments",
        featured: false,
        isNew: false,
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
            label="Location"
            value={item.location}
            onChange={(location) => onChange({ ...item, location })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price (EGP)">
              <TextInput
                type="number"
                value={String(item.price)}
                onChange={(v) =>
                  onChange({ ...item, price: Number(v) || 0 })
                }
              />
            </Field>
            <SelectField
              label="Category"
              value={item.categorySlug}
              onChange={(categorySlug) => onChange({ ...item, categorySlug })}
              options={
                categoryOptions.length > 0
                  ? categoryOptions
                  : [{ value: "apartments", label: "apartments" }]
              }
            />
          </div>
          <Field label="Image URL">
            <TextInput
              value={item.image}
              dir="ltr"
              onChange={(image) => onChange({ ...item, image })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Bedrooms">
              <TextInput
                type="number"
                value={String(item.bedrooms ?? "")}
                onChange={(v) =>
                  onChange({ ...item, bedrooms: Number(v) || undefined })
                }
              />
            </Field>
            <Field label="Bathrooms">
              <TextInput
                type="number"
                value={String(item.bathrooms ?? "")}
                onChange={(v) =>
                  onChange({ ...item, bathrooms: Number(v) || undefined })
                }
              />
            </Field>
            <Field label="Area (sqm)">
              <TextInput
                type="number"
                value={String(item.area ?? "")}
                onChange={(v) =>
                  onChange({ ...item, area: Number(v) || undefined })
                }
              />
            </Field>
          </div>
          <Field label="Posted date">
            <TextInput
              type="date"
              value={item.postedAt}
              dir="ltr"
              onChange={(postedAt) => onChange({ ...item, postedAt })}
            />
          </Field>
          <div className="flex flex-wrap gap-4">
            <CheckboxField
              label="Featured on homepage"
              checked={Boolean(item.featured)}
              onChange={(featured) => onChange({ ...item, featured })}
            />
            <CheckboxField
              label="Mark as new"
              checked={Boolean(item.isNew)}
              onChange={(isNew) => onChange({ ...item, isNew })}
            />
            <CheckboxField
              label="Shared / Betak Share"
              checked={Boolean(item.isShared)}
              onChange={(isShared) => onChange({ ...item, isShared })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Expected return (%)">
              <TextInput
                type="number"
                value={String(item.expectedReturn ?? "")}
                onChange={(v) =>
                  onChange({
                    ...item,
                    expectedReturn: v ? Number(v) : undefined,
                  })
                }
              />
            </Field>
            <Field label="Monthly installment (EGP)">
              <TextInput
                type="number"
                value={String(item.monthlyInstallment ?? "")}
                onChange={(v) =>
                  onChange({
                    ...item,
                    monthlyInstallment: v ? Number(v) : undefined,
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
