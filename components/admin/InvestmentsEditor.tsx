"use client";

import type { InvestmentOpportunity } from "@/lib/api/types";
import { newId, slugify } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import {
  CheckboxField,
  Field,
  LocalizedField,
  TextInput,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

export function InvestmentsEditor({
  initialData,
}: {
  initialData: InvestmentOpportunity[];
}) {
  return (
    <CollectionManager
      title="Investment Opportunities"
      description="Crowdfunding cards on the homepage."
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
          <ImageUploadField
            label="Investment image"
            value={item.image}
            onChange={(image) => onChange({ ...item, image })}
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
          <CheckboxField
            label="Show as new"
            checked={Boolean(item.isNew)}
            onChange={(isNew) => onChange({ ...item, isNew })}
          />
        </>
      )}
    />
  );
}
