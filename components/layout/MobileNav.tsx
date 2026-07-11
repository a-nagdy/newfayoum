"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  startInvestingLabel: string;
}

export function MobileNav({ links, startInvestingLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menu = open ? (
    <div
      id="mobile-nav-panel"
      className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-primary sm:top-[80px] lg:hidden"
    >
      <nav className="px-6 py-4">
        <ul>
          {links.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-5 text-lg font-medium text-white transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
              {index < links.length - 1 && (
                <div className="h-px bg-white/15" />
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/betak-share"
          onClick={() => setOpen(false)}
          className="mt-8 flex w-full items-center justify-center rounded-full bg-secondary px-6 py-4 text-base font-bold text-white transition-colors hover:bg-secondary-hover"
        >
          {startInvestingLabel}
        </Link>
      </nav>
    </div>
  ) : null;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}
