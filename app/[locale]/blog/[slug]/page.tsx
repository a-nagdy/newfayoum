import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import { formatDate } from "@/lib/utils/format";
import { PageBackLink } from "@/components/shared/SectionHeader";
import { BlogCard } from "@/components/shared/BlogCard";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const t = await getTranslations();
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) notFound();

  const allPosts = await getBlogPosts(locale);
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const title = pickLocalized(post.title, locale);
  const content = pickLocalized(post.content, locale);
  const category = pickLocalized(post.category, locale);

  return (
    <article className="bg-white py-10">
      <div className="mx-auto max-w-4xl px-4 lg:px-6">
        <PageBackLink href="/blog" label={t("blog.backToBlog")} />

        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>

        <span className="mb-4 inline-block rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold text-secondary">
          {category}
        </span>
        <h1 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <div className="mb-8 flex gap-4 text-sm text-muted-foreground">
          <span>{formatDate(post.publishedAt, locale)}</span>
          <span>
            {post.readingTimeMinutes} {t("blog.minRead")}
          </span>
        </div>

        <div className="max-w-none break-words leading-8 text-muted-foreground">
          <p>{content}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            {t("blog.related")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <BlogCard
                key={item.id}
                post={item}
                locale={locale}
                minReadLabel={t("blog.minRead")}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
