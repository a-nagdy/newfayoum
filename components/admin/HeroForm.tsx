"use client";

import { useState } from "react";
import type { HeroContent } from "@/lib/api/types";
import {
  Field,
  LocalizedField,
  PageHeader,
  SaveButton,
  TextInput,
} from "./FormControls";

export function HeroForm({ initialData }: { initialData: HeroContent }) {
  const [data, setData] = useState(initialData);

  async function save() {
    const res = await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div>
      <PageHeader title="Hero Section" description="Homepage hero banner content." />
      <div className="max-w-3xl space-y-6">
        <LocalizedField
          label="Badge"
          value={data.badge}
          onChange={(badge) => setData({ ...data, badge })}
        />
        <LocalizedField
          label="Title"
          value={data.title}
          onChange={(title) => setData({ ...data, title })}
        />
        <LocalizedField
          label="Subtitle"
          value={data.subtitle}
          onChange={(subtitle) => setData({ ...data, subtitle })}
          multiline
        />
        <Field label="Background image URL">
          <TextInput
            value={data.backgroundImage}
            dir="ltr"
            onChange={(backgroundImage) =>
              setData({ ...data, backgroundImage })
            }
          />
        </Field>
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
