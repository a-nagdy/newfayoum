import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnalyticsScripts } from "@/components/tracking/AnalyticsScripts";
import { PageViewTracker } from "@/components/tracking/PageViewTracker";
import { routing } from "@/i18n/routing";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Always render at runtime so Hostinger env vars (Supabase) are available
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AnalyticsScripts />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <div
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex min-h-full flex-col bg-white text-primary"
      >
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
