"use client";

import type { Feature } from "@/lib/api/types";
import { newId } from "@/lib/admin/utils";
import { CollectionManager } from "./CollectionManager";
import { LocalizedField, SelectField } from "./FormControls";

const iconOptions = [
  { value: "shield", label: "Shield — Secure" },
  { value: "building", label: "Building — Properties" },
  { value: "chart", label: "Chart — Returns" },
  { value: "people", label: "People — Shared ownership" },
];

export function FeaturesEditor({ initialData }: { initialData: Feature[] }) {
  return (
    <CollectionManager
      title="Why Choose Us"
      description="Feature cards on the homepage."
      apiPath="/api/features"
      initialItems={initialData}
      getItemLabel={(item) => item.title.en || item.title.ar || "Feature"}
      createItem={() => ({
        id: newId(),
        icon: "shield",
        title: { ar: "", en: "" },
        description: { ar: "", en: "" },
      })}
      renderForm={(item, onChange) => (
        <>
          <SelectField
            label="Icon"
            value={item.icon}
            onChange={(icon) =>
              onChange({ ...item, icon: icon as Feature["icon"] })
            }
            options={iconOptions}
          />
          <LocalizedField
            label="Title"
            value={item.title}
            onChange={(title) => onChange({ ...item, title })}
          />
          <LocalizedField
            label="Description"
            value={item.description}
            onChange={(description) => onChange({ ...item, description })}
            multiline
          />
        </>
      )}
    />
  );
}
