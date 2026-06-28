"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center rounded-lg border border-border p-0.5 text-xs font-semibold">
      <button
        type="button"
        onClick={() => switchLocale("ar")}
        className={`rounded-md px-2 py-1 transition-colors ${
          locale === "ar"
            ? "bg-secondary text-black"
            : "text-primary/70 hover:text-primary"
        }`}
      >
        AR
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`rounded-md px-2 py-1 transition-colors ${
          locale === "en"
            ? "bg-secondary text-black"
            : "text-primary/70 hover:text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
}
