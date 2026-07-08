"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/api/types";
import { putApi } from "@/lib/admin/api-client";
import {
  Field,
  LocalizedField,
  PageHeader,
  SaveButton,
  TextInput,
} from "./FormControls";

export function SettingsForm({ initialData }: { initialData: SiteSettings }) {
  const [data, setData] = useState(initialData);

  async function save() {
    await putApi("/api/settings", data);
  }

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="Logo, contact info, footer content, and social links."
      />
      <div className="max-w-3xl space-y-6">
        <LocalizedField
          label="Site name"
          value={data.siteName}
          onChange={(siteName) => setData({ ...data, siteName })}
        />
        <Field label="Logo text">
          <TextInput
            value={data.logoText}
            onChange={(logoText) => setData({ ...data, logoText })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <TextInput
              value={data.phone}
              dir="ltr"
              onChange={(phone) => setData({ ...data, phone })}
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={data.email}
              dir="ltr"
              onChange={(email) => setData({ ...data, email })}
            />
          </Field>
        </div>
        <LocalizedField
          label="Address"
          value={data.address}
          onChange={(address) => setData({ ...data, address })}
        />
        <Field label="WhatsApp URL">
          <TextInput
            value={data.whatsappUrl}
            dir="ltr"
            onChange={(whatsappUrl) => setData({ ...data, whatsappUrl })}
          />
        </Field>
        <LocalizedField
          label="Footer description"
          value={data.footerDescription}
          onChange={(footerDescription) =>
            setData({ ...data, footerDescription })
          }
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {(["facebook", "instagram", "linkedin", "twitter"] as const).map(
            (key) => (
              <Field key={key} label={`${key} URL`}>
                <TextInput
                  value={data.socialLinks[key] ?? ""}
                  dir="ltr"
                  onChange={(value) =>
                    setData({
                      ...data,
                      socialLinks: { ...data.socialLinks, [key]: value },
                    })
                  }
                />
              </Field>
            ),
          )}
        </div>
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
