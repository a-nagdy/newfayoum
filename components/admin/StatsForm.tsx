"use client";

import { useState } from "react";
import type { SiteStats } from "@/lib/api/types";
import { putApi } from "@/lib/admin/api-client";
import { Field, PageHeader, SaveButton, TextInput } from "./FormControls";

export function StatsForm({ initialData }: { initialData: SiteStats }) {
  const [data, setData] = useState(initialData);

  async function save() {
    await putApi("/api/stats", data);
  }

  return (
    <div>
      <PageHeader
        title="Statistics"
        description="Homepage stats bar numbers."
      />
      <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
        <Field label="Units sold">
          <TextInput
            type="number"
            value={String(data.unitsSold)}
            onChange={(v) =>
              setData({ ...data, unitsSold: Number(v) || 0 })
            }
          />
        </Field>
        <Field label="Clients">
          <TextInput
            type="number"
            value={String(data.clients)}
            onChange={(v) => setData({ ...data, clients: Number(v) || 0 })}
          />
        </Field>
        <Field label="Total investments (EGP)">
          <TextInput
            type="number"
            value={String(data.totalInvestments)}
            onChange={(v) =>
              setData({ ...data, totalInvestments: Number(v) || 0 })
            }
          />
        </Field>
        <Field label="Annual return (%)">
          <TextInput
            type="number"
            value={String(data.annualReturn)}
            onChange={(v) =>
              setData({ ...data, annualReturn: Number(v) || 0 })
            }
          />
        </Field>
      </div>
      <div className="mt-6">
        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
