"use client";

import type { InvestmentOpportunity, LocalizedString } from "@/lib/api/types";
import { newId, slugify } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import {
  CheckboxField,
  Field,
  LocalizedField,
  TextInput,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";
import { GalleryUploadField } from "./GalleryUploadField";

const emptyAmenity = (): LocalizedString => ({ ar: "", en: "" });

export function InvestmentsEditor({
  initialData,
}: {
  initialData: InvestmentOpportunity[];
}) {
  return (
    <CollectionManager
      title="Investment Opportunities"
      description="Betak Share cards and investment detail pages."
      apiPath="/api/investments"
      initialItems={initialData}
      getItemLabel={(item) => item.title.en || item.title.ar || item.slug}
      createItem={() => ({
        id: newId(),
        slug: "",
        title: { ar: "", en: "" },
        location: { ar: "", en: "" },
        image: "",
        totalValue: 0,
        expectedReturn: 14,
        minInvestment: 0,
        fundedPercent: 0,
        currency: "EGP",
        isNew: false,
        description: { ar: "", en: "" },
        gallery: [],
        amenities: [],
        bedrooms: 2,
        bathrooms: 1,
        area: 90,
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Total value (EGP)">
                <TextInput
                  type="number"
                  value={String(item.totalValue)}
                  onChange={(v) =>
                    onChange({ ...item, totalValue: Number(v) || 0 })
                  }
                />
              </Field>
              <Field label="Min. investment (EGP)">
                <TextInput
                  type="number"
                  value={String(item.minInvestment)}
                  onChange={(v) =>
                    onChange({ ...item, minInvestment: Number(v) || 0 })
                  }
                />
              </Field>
              <Field label="Expected return (%)">
                <TextInput
                  type="number"
                  value={String(item.expectedReturn)}
                  onChange={(v) =>
                    onChange({ ...item, expectedReturn: Number(v) || 0 })
                  }
                />
              </Field>
              <Field label="Funded (%)">
                <TextInput
                  type="number"
                  value={String(item.fundedPercent)}
                  onChange={(v) =>
                    onChange({ ...item, fundedPercent: Number(v) || 0 })
                  }
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Bedrooms">
                <TextInput
                  type="number"
                  value={String(item.bedrooms ?? "")}
                  onChange={(v) =>
                    onChange({ ...item, bedrooms: v ? Number(v) : undefined })
                  }
                />
              </Field>
              <Field label="Bathrooms">
                <TextInput
                  type="number"
                  value={String(item.bathrooms ?? "")}
                  onChange={(v) =>
                    onChange({ ...item, bathrooms: v ? Number(v) : undefined })
                  }
                />
              </Field>
              <Field label="Area (sqm)">
                <TextInput
                  type="number"
                  value={String(item.area ?? "")}
                  onChange={(v) =>
                    onChange({ ...item, area: v ? Number(v) : undefined })
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
            </div>
            <Field label="Map embed URL">
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
            <CheckboxField
              label="Show as new"
              checked={Boolean(item.isNew)}
              onChange={(isNew) => onChange({ ...item, isNew })}
            />
          </>
        );
      }}
    />
  );
}
