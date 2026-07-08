import type { Locale } from "@/i18n/routing";

export function formatPrice(amount: number, locale: Locale, currency = "EGP") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(
    value,
  );
}

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatCompactMillions(value: number, locale: Locale) {
  const millions = value / 1_000_000;
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    maximumFractionDigits: 0,
  }).format(millions);
  return `+${formatted}M`;
}

export function formatBetakPrice(amount: number, locale: Locale) {
  const fmt = (n: number, digits: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    }).format(n);

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = fmt(millions, millions >= 10 ? 0 : 1);
    return locale === "ar" ? `${formatted} مليون ج.م` : `${formatted}M EGP`;
  }

  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    const formatted = fmt(thousands, 0);
    return locale === "ar" ? `${formatted} ألف ج.م` : `${formatted}K EGP`;
  }

  return formatPrice(amount, locale);
}

export function formatMonthlyPrice(amount: number, locale: Locale) {
  const formatted = new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-EG",
  ).format(amount);
  return locale === "ar" ? `${formatted} ج.م / شهر` : `${formatted} EGP / mo`;
}
