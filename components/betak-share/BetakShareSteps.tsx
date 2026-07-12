import { pickLocalized } from "@/lib/api/types";
import type { BetakShareStep } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

interface BetakShareStepsProps {
  locale: Locale;
  title: string;
  steps: BetakShareStep[];
}

export function BetakShareSteps({ locale, title, steps }: BetakShareStepsProps) {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.id} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {pickLocalized(step.title, locale)}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {pickLocalized(step.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
