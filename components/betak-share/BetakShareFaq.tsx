"use client";

import type { Locale } from "@/i18n/routing";
import type { BetakShareFaq as BetakShareFaqItem } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface BetakShareFaqProps {
  locale: Locale;
  title: string;
  items: BetakShareFaqItem[];
}

export function BetakShareFaq({ locale, title, items }: BetakShareFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 lg:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">{title}</h2>
          <div className="divide-y divide-border">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-start"
                  >
                    <span className="font-semibold text-foreground">
                      {pickLocalized(item.question, locale)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {pickLocalized(item.answer, locale)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
