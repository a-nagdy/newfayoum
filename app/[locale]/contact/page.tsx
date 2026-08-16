import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations("contactPage");
  const settings = await getSiteSettings(locale);

  return (
    <div className="bg-muted">
      <section className="bg-primary px-4 py-12 text-center text-white sm:py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-sm leading-7 text-white/75 sm:text-base">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-6 lg:py-16">
        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">{t("infoTitle")}</h2>

          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <span dir="ltr">{settings.phone}</span>
          </a>

          <a
            href={`mailto:${settings.email}`}
            className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <span dir="ltr">{settings.email}</span>
          </a>

          <p className="flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <span>{pickLocalized(settings.address, locale)}</span>
          </p>

          <a
            href={settings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            {t("whatsapp")}
          </a>
        </aside>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            {t("formTitle")}
          </h2>
          <ContactForm
            labels={{
              name: t("name"),
              email: t("email"),
              phone: t("phone"),
              subject: t("subject"),
              message: t("message"),
              submit: t("submit"),
              success: t("success"),
              error: t("error"),
              namePlaceholder: t("namePlaceholder"),
              emailPlaceholder: t("emailPlaceholder"),
              phonePlaceholder: t("phonePlaceholder"),
              subjectPlaceholder: t("subjectPlaceholder"),
              messagePlaceholder: t("messagePlaceholder"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
