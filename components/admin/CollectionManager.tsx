"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { putApi } from "@/lib/admin/api-client";
import { PageHeader, SaveButton } from "./FormControls";

interface CollectionManagerProps<T extends { id: string }> {
  title: string;
  description?: string;
  apiPath: string;
  initialItems: T[];
  getItemLabel: (item: T) => string;
  createItem: () => T;
  validate?: (items: T[]) => string | null;
  mergeOnSave?: (items: T[]) => unknown;
  renderForm: (
    item: T,
    onChange: (item: T) => void,
  ) => React.ReactNode;
}

export function CollectionManager<T extends { id: string }>({
  title,
  description,
  apiPath,
  initialItems,
  getItemLabel,
  createItem,
  validate,
  mergeOnSave,
  renderForm,
}: CollectionManagerProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialItems[0]?.id ?? null,
  );

  const selected = items.find((item) => item.id === selectedId) ?? null;

  function updateSelected(next: T) {
    setItems((current) =>
      current.map((item) => (item.id === next.id ? next : item)),
    );
  }

  function addItem() {
    const item = createItem();
    setItems((current) => [...current, item]);
    setSelectedId(item.id);
  }

  function deleteItem(id: string) {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id ?? null);
      }
      return next;
    });
  }

  async function save() {
    if (validate) {
      const error = validate(items);
      if (error) throw new Error(error);
    }

    await putApi(apiPath, mergeOnSave ? mergeOnSave(items) : items);
  }

  return (
    <div>
      <PageHeader title={title} description={description} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-3">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-white">
              {items.length} items
            </p>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1 rounded-lg bg-[#233a72] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#2f4d8f]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>

          <ul className="max-h-[520px] space-y-1 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-start text-sm transition-colors ${
                    selectedId === item.id
                      ? "bg-[#233a72] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <Pencil className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  <span className="truncate">{getItemLabel(item)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete"
                  className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1a2440]/40 p-5">
          {selected ? (
            <div className="space-y-5">
              {renderForm(selected, updateSelected)}
              <SaveButton onSave={save} />
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Add an item or select one from the list to edit.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
