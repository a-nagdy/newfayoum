"use client";

import type { LocalizedString, Product, ProductCategory } from "@/lib/api/types";
import { newId, slugify, todayISO } from "@/lib/admin/utils";
import { validateProducts } from "@/lib/admin/validation";
import { CollectionManager } from "./CollectionManager";
import {
  CheckboxField,
  Field,
  LocalizedField,
  SelectField,
  TextInput,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";
import { GalleryUploadField } from "./GalleryUploadField";

const emptyAmenity = (): LocalizedString => ({ ar: "", en: "" });

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
      description="Real estate listings for Betak, products pages, and unit detail pages."
      apiPath="/api/products"
      initialItems={initialData}
      validate={(items) => {
        const result = validateProducts(items);
        return result.ok ? null : result.message;
      }}
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
        description: { ar: "", en: "" },
        gallery: [],
        amenities: [],
        floors: undefined,
        parkingSpaces: undefined,
        marketValue: undefined,
        mapUrl: "",
      })}
      renderForm={(item, onChange) => {
        const amenities = [
          ...(item.amenities ?? []),
          emptyAmenity(),
          emptyAmenity(),
        ].slice(0, Math.max(item.amenities?.length ?? 0, 1) + 1);

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
              label="Location"
              value={item.location}
              onChange={(location) => onChange({ ...item, location })}
            />
            <LocalizedField
              label="Description"
              value={item.description ?? { ar: "", en: "" }}
              onChange={(description) => onChange({ ...item, description })}
              multiline
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
            <ImageUploadField
              label="Main image"
              value={item.image}
              onChange={(image) => onChange({ ...item, image })}
            />
            <GalleryUploadField
              label="Gallery images"
              value={item.gallery ?? []}
              onChange={(gallery) => onChange({ ...item, gallery })}
            />
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
              <Field label="Floors">
                <TextInput
                  type="number"
                  value={String(item.floors ?? "")}
                  onChange={(v) =>
                    onChange({ ...item, floors: v ? Number(v) : undefined })
                  }
                />
              </Field>
              <Field label="Parking spaces">
                <TextInput
                  type="number"
                  value={String(item.parkingSpaces ?? "")}
                  onChange={(v) =>
                    onChange({
                      ...item,
                      parkingSpaces: v ? Number(v) : undefined,
                    })
                  }
                />
              </Field>
              <Field label="Market value (EGP)">
                <TextInput
                  type="number"
                  value={String(item.marketValue ?? "")}
                  onChange={(v) =>
                    onChange({
                      ...item,
                      marketValue: v ? Number(v) : undefined,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Map embed URL (Google Maps iframe src)">
              <TextInput
                value={item.mapUrl ?? ""}
                dir="ltr"
                onChange={(mapUrl) => onChange({ ...item, mapUrl })}
              />
            </Field>
            <div className="space-y-3 rounded-xl border border-white/10 bg-[#1a2440]/40 p-4">
              <p className="text-sm font-semibold text-[#c8a85a]">Amenities</p>
              {amenities.map((amenity, index) => (
                <LocalizedField
                  key={index}
                  label={`Amenity ${index + 1}`}
                  value={amenity}
                  onChange={(next) => {
                    const list = [...amenities];
                    list[index] = next;
                    onChange({
                      ...item,
                      amenities: list.filter((a) => a.ar.trim() || a.en.trim()),
                    });
                  }}
                />
              ))}
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
                label="Shared investment (Betak Share style)"
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
              <Field label="Funded (%)">
                <TextInput
                  type="number"
                  value={String(item.fundedPercent ?? "")}
                  onChange={(v) =>
                    onChange({
                      ...item,
                      fundedPercent: v ? Number(v) : undefined,
                    })
                  }
                />
              </Field>
            </div>
          </>
        );
      }}
    />
  );
}
