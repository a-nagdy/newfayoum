"use client";

import { useState } from "react";
import type { HeroContent } from "@/lib/api/types";
import { putApi } from "@/lib/admin/api-client";
import {
  LocalizedField,
  PageHeader,
  SaveButton,
} from "./FormControls";
import { ImageUploadField } from "./ImageUploadField";

export function HeroForm({ initialData }: { initialData: HeroContent }) {
  const [data, setData] = useState(initialData);

  async function save() {
    await putApi("/api/hero", data);
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
        <ImageUploadField
          label="Background image"
          value={data.backgroundImage}
          onChange={(backgroundImage) =>
            setData({ ...data, backgroundImage })
          }
        />
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
