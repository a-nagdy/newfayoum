"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils/format";

interface InvestmentCalculatorProps {
  locale: Locale;
}

export function InvestmentCalculator({ locale }: InvestmentCalculatorProps) {
  const t = useTranslations("calculator");
  const [propertyValue, setPropertyValue] = useState(2_000_000);
  const [shares, setShares] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(14);
  const [showResult, setShowResult] = useState(false);

  const estimatedReturn = useMemo(() => {
    const investment = (propertyValue / 100) * shares;
    return (investment * expectedReturn) / 100;
  }, [propertyValue, shares, expectedReturn]);

  const sliders = [
    {
      label: t("propertyValue"),
      value: propertyValue,
      min: 500_000,
      max: 10_000_000,
      step: 100_000,
      onChange: setPropertyValue,
      display: formatPrice(propertyValue, locale),
    },
    {
      label: t("shares"),
      value: shares,
      min: 1,
      max: 50,
      step: 1,
      onChange: setShares,
      display: String(shares),
    },
    {
      label: t("expectedReturn"),
      value: expectedReturn,
      min: 5,
      max: 25,
      step: 1,
      onChange: setExpectedReturn,
      display: `${expectedReturn}%`,
    },
  ];

  return (
    <section className="bg-primary py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-6">
        <div>
          <h2 className="mb-4 text-3xl font-bold">{t("title")}</h2>
          <p className="max-w-md leading-8 text-white/80">{t("description")}</p>
        </div>

        <div className="rounded-2xl border border-border bg-footer p-6 shadow-xl md:p-8">
          <div className="space-y-6">
            {sliders.map((slider) => (
              <div key={slider.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{slider.label}</span>
                  <span className="font-semibold text-secondary">
                    {slider.display}
                  </span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={slider.value}
                  onChange={(e) => slider.onChange(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15"
                />
              </div>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 rounded-xl border border-secondary/20 bg-secondary/10 p-4 text-center">
              <p className="mb-1 text-sm text-white/75">
                {t("estimatedReturn")}
              </p>
              <p className="text-2xl font-bold text-secondary">
                {formatPrice(estimatedReturn, locale)}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="mt-6 w-full rounded-lg bg-secondary py-3 text-sm font-bold text-black transition-colors hover:bg-secondary-hover"
          >
            {t("calculate")}
          </button>
        </div>
      </div>
    </section>
  );
}
