import { routing, type Locale } from "@/i18n/routing";

export async function getLocaleParam(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (routing.locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return routing.defaultLocale;
}
