import { Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const settings = await getSiteSettings(locale);

  const quickLinks = [
    { href: "/", label: tNav("home") },
    { href: "/products", label: tNav("products") },
    { href: "/products", label: tNav("projects") },
    { href: "/blog", label: tNav("blog") },
    { href: "#contact", label: tNav("contact") },
  ];

  return (
    <footer id="contact" className="bg-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        <div>
        <Image
            src="/assets/LogoBetakSvg.svg"
            alt={settings.logoText}
            width={63}
            height={60}
            className="object-contain"
          />
          <p className="mb-6 max-w-sm text-sm leading-7 text-white/75">
            {pickLocalized(settings.footerDescription, locale)}
          </p>
          <div className="flex gap-3">
            {[
              { icon: Share2, href: settings.socialLinks.facebook },
              { icon: Globe, href: settings.socialLinks.instagram },
              { icon: Share2, href: settings.socialLinks.linkedin },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href ?? "#"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-black"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-secondary">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-secondary">
            {t("contactUs")}
          </h3>
          <ul className="mb-6 space-y-4 text-sm text-white/75">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-secondary" />
              <span dir="ltr">{settings.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-secondary" />
              <span>{settings.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{pickLocalized(settings.address, locale)}</span>
            </li>
          </ul>
          <a
            href={settings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("whatsapp")}
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row lg:px-6">
          <p>
            © {new Date().getFullYear()}{" "}
            {pickLocalized(settings.siteName, locale)}. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-secondary">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-secondary">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
