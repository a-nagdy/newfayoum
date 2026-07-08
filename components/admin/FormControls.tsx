"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAdminToast } from "./AdminToast";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none focus:border-[#c8a85a]";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-400">{label}</span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  type = "text",
  dir,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <input
      type={type}
      value={value}
      dir={dir}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  dir,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  dir?: "ltr" | "rtl";
}) {
  return (
    <textarea
      value={value}
      dir={dir}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: { ar: string; en: string };
  onChange: (v: { ar: string; en: string }) => void;
  multiline?: boolean;
}) {
  const Input = multiline ? TextArea : TextInput;
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#1a2440]/40 p-4">
      <p className="text-sm font-semibold text-[#c8a85a]">{label}</p>
      <Field label="Arabic">
        <Input
          value={value.ar}
          dir="rtl"
          onChange={(ar) => onChange({ ...value, ar })}
        />
      </Field>
      <Field label="English">
        <Input
          value={value.en}
          dir="ltr"
          onChange={(en) => onChange({ ...value, en })}
        />
      </Field>
    </div>
  );
}

export function SaveButton({
  onSave,
  label = "Save changes",
  successMessage = "Changes saved successfully",
}: {
  onSave: () => Promise<void>;
  label?: string;
  successMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");
  const { showSuccess, showError } = useAdminToast();

  async function handleClick() {
    setStatus("loading");
    try {
      await onSave();
      setStatus("saved");
      showSuccess(successMessage);
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      setStatus("idle");
      const message =
        error instanceof Error ? error.message : "Failed to save changes";
      showError(message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className="inline-flex items-center gap-2 rounded-lg bg-[#c8a85a] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#b8964f] disabled:opacity-60"
    >
      {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === "saved" && <Check className="h-4 w-4" />}
      {status === "saved" ? "Saved" : label}
    </button>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      )}
    </div>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-white/20 bg-[#111827] accent-[#c8a85a]"
      />
      {label}
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export { inputClass };
