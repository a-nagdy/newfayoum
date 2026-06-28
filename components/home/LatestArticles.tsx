import { getBlogPosts } from "@/lib/api/client";
import type { Locale } from "@/i18n/routing";
import { BlogCard } from "@/components/shared/BlogCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface LatestArticlesProps {
  locale: Locale;
  title: string;
  viewAllLabel: string;
  minReadLabel: string;
}

export async function LatestArticles({
  locale,
  title,
  viewAllLabel,
  minReadLabel,
}: LatestArticlesProps) {
  const posts = (await getBlogPosts(locale)).slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          title={title}
          viewAllHref="/blog"
          viewAllLabel={viewAllLabel}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              minReadLabel={minReadLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
