import Image from "next/image";
import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

interface TestimonialsSectionProps {
  locale: Locale;
  title: string;
}

export async function TestimonialsSection({
  locale,
  title,
}: TestimonialsSectionProps) {
  const testimonials = await getTestimonials(locale);

  return (
    <section className="border-t border-border bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
              <div className="mb-4 flex gap-1 text-secondary">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mb-6 text-sm leading-7 text-muted-foreground">
                &ldquo;{pickLocalized(item.quote, locale)}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-secondary/30">
                  <Image
                    src={item.avatar}
                    alt={pickLocalized(item.name, locale)}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {pickLocalized(item.name, locale)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pickLocalized(item.role, locale)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
