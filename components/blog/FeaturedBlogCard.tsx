import Image from "next/image";
import { Clock, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/format";

interface FeaturedBlogCardProps {
  post: BlogPost;
  locale: Locale;
  featuredLabel: string;
  minReadLabel: string;
}

export function FeaturedBlogCard({
  post,
  locale,
  featuredLabel,
  minReadLabel,
}: FeaturedBlogCardProps) {
  const title = pickLocalized(post.title, locale);
  const excerpt = pickLocalized(post.excerpt, locale);
  const author = post.author ? pickLocalized(post.author, locale) : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-0 md:grid-cols-2"
      >
        <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[280px]">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="mb-4 inline-flex w-fit rounded-md bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary">
            {featuredLabel}
          </span>
          <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:text-[1.65rem] md:leading-snug">
            {title}
          </h2>
          <p className="mb-6 line-clamp-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            {author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                {author}
              </span>
            )}
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTimeMinutes} {minReadLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
