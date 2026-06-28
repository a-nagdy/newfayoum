import { Building2, ChartColumn, Shield, Users } from "lucide-react";
import { getFeatures } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

const iconMap = {
  shield: Shield,
  building: Building2,
  chart: ChartColumn,
  people: Users,
};

interface FeaturesSectionProps {
  locale: Locale;
  title: string;
}

export async function FeaturesSection({ locale, title }: FeaturesSectionProps) {
  const features = await getFeatures(locale);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <article
                key={feature.id}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {pickLocalized(feature.title, locale)}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {pickLocalized(feature.description, locale)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
