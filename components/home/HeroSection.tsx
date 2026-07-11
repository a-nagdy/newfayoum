import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getHeroContent } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

interface HeroSectionProps {
  locale: Locale;
  ctaLabel: string;
}

export async function HeroSection({ locale, ctaLabel }: HeroSectionProps) {
  const hero = await getHeroContent(locale);

  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[500px] lg:min-h-[560px]">
      <Image
        src={hero.backgroundImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 text-center text-white sm:py-16 md:py-24">
        <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-black">
          {pickLocalized(hero.badge, locale)}
        </span>
        <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
          {pickLocalized(hero.title, locale)}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
          {pickLocalized(hero.subtitle, locale)}
        </p>
        <Link
          href="/products"
          className="inline-flex rounded-lg bg-secondary px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-secondary-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
