import { pickLocalized } from "@/lib/api/types";
import type { BetakSharePageContent } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { Building2, ChartColumn, Shield, Users } from "lucide-react";

const pillIcons = [Building2, Shield, ChartColumn, Users];

interface BetakShareHeroProps {
  locale: Locale;
  content: BetakSharePageContent["hero"];
  featurePills: BetakSharePageContent["featurePills"];
}

export function BetakShareHero({
  locale,
  content,
  featurePills,
}: BetakShareHeroProps) {
  return (
    <section className="bg-primary py-16 text-white md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
        <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-secondary/90">
          {pickLocalized(content.badge, locale)}
        </span>
        <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {pickLocalized(content.title, locale)}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
          {pickLocalized(content.subtitle, locale)}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {featurePills.map((pill, i) => {
            const Icon = pillIcons[i % pillIcons.length];
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
              >
                <Icon className="h-4 w-4 text-secondary" />
                {pickLocalized(pill, locale)}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
