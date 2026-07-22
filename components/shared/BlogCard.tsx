import Image from "next/image";
import { Clock, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/format";

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
  minReadLabel: string;
}

export function BlogCard({ post, locale, minReadLabel }: BlogCardProps) {
  const title = pickLocalized(post.title, locale);
  const excerpt = pickLocalized(post.excerpt, locale);
  const category = pickLocalized(post.category, locale);
  const author = post.author ? pickLocalized(post.author, locale) : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-shadow hover:shadow-xl hover:shadow-primary/10">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col p-5">
          <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {category}
          </span>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground">
            {title}
          </h3>
          <p className="mb-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
            {author && (
              <span className="inline-flex items-center gap-1">
                <User className="h-3 w-3 text-primary" />
                {author}
              </span>
            )}
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTimeMinutes} {minReadLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
