import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/api/client";
import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations("nav");
  const settings = await getSiteSettings(locale);

  const links = [
    { href: "/", label: t("home") },
    { href: "/betak", label: t("betak") },
    { href: "/betak-share", label: t("betakShare") },
    { href: "/units", label: t("units") },
    { href: "/blogs", label: t("blogs") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary text-white  shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link
          href="/"
          className="text-2xl font-black tracking-wider text-secondary"
        >
          {settings.logoText}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium text-primary/80 sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-secondary" />
            <span dir="ltr">{settings.phone}</span>
          </a>
          <Link
            href="#"
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-secondary-hover"
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </header>
  );
}
