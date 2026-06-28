import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-md font-bold text-primary transition-colors hover:text-secondary-hover"
        >
          {viewAllLabel}
          <ArrowRight className="h-4 w-4 rtl:rotate-180 text-primary" />
        </Link>
      )}
    </div>
  );
}

export function PageBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary-hover"
    >
      <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
      {label}
    </Link>
  );
}
