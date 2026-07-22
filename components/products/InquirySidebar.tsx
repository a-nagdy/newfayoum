"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import type { Locale } from "@/i18n/routing";

interface InquirySidebarProps {
  locale: Locale;
  price: number;
  currency: string;
  unitTitle: string;
  phone: string;
  whatsappUrl: string;
  labels: {
    price: string;
    name: string;
    phone: string;
    email: string;
    send: string;
    whatsapp: string;
    call: string;
    success: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
  };
}

export function InquirySidebar({
  locale,
  price,
  currency,
  unitTitle,
  phone,
  whatsappUrl,
  labels,
}: InquirySidebarProps) {
  const [name, setName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const waBase = whatsappUrl.includes("wa.me")
    ? whatsappUrl.split("?")[0]
    : whatsappUrl;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const message = [
      locale === "ar" ? "استفسار عن وحدة:" : "Inquiry about unit:",
      unitTitle,
      `${labels.name}: ${name}`,
      `${labels.phone}: ${phoneValue}`,
      `${labels.email}: ${email}`,
    ].join("\n");

    const url = `${waBase}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <aside className="rounded-2xl border border-border bg-card p-5 shadow-lg lg:sticky lg:top-28">
      <p className="mb-1 text-sm text-muted-foreground">{labels.price}</p>
      <p className="mb-6 text-2xl font-bold text-primary sm:text-3xl">
        {formatPrice(price, locale, currency)}
      </p>

      {sent ? (
        <p className="rounded-xl bg-muted px-4 py-6 text-center text-sm font-medium text-primary">
          {labels.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <input
            required
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            placeholder={labels.phonePlaceholder}
            dir="ltr"
            className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={labels.emailPlaceholder}
            dir="ltr"
            className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary-light"
          >
            {labels.send}
          </button>
        </form>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={`${waBase}?text=${encodeURIComponent(
            locale === "ar"
              ? `مرحباً، أريد الاستفسار عن: ${unitTitle}`
              : `Hi, I want to inquire about: ${unitTitle}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          {labels.whatsapp}
        </a>
        <a
          href={telHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-white px-3 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4" />
          {labels.call}
        </a>
      </div>
    </aside>
  );
}
