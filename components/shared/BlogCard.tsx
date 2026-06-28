import Image from "next/image";
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

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl hover:shadow-primary/10">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <span className="mb-3 inline-block rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold text-secondary">
            {category}
          </span>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span>
              {post.readingTimeMinutes} {minReadLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
