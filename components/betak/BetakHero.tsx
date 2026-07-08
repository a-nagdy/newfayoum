import Image from "next/image";
import { getBetakPageContent } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

interface BetakHeroProps {
  locale: Locale;
  unitsCount: number;
  unitsAvailableLabel: string;
}

export async function BetakHero({
  locale,
  unitsCount,
  unitsAvailableLabel,
}: BetakHeroProps) {
  const betak = await getBetakPageContent(locale);

  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden md:min-h-[380px]">
      <Image
        src={betak.backgroundImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="relative z-10 px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-black md:text-5xl">
          {pickLocalized(betak.title, locale)}
        </h1>
        <p className="mt-3 text-lg text-white/90 md:text-xl">
          {unitsCount} {unitsAvailableLabel}
        </p>
      </div>
    </section>
  );
}
