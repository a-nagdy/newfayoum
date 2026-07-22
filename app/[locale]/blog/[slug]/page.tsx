import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api/client";
import { pickLocalized } from "@/lib/api/types";
import { formatDate } from "@/lib/utils/format";
import { PageBackLink } from "@/components/shared/SectionHeader";
import { BlogCard } from "@/components/shared/BlogCard";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleParam(params);
  const t = await getTranslations("blog");
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) notFound();

  const allPosts = await getBlogPosts(locale);
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => {
      const postCat =
        pickLocalized(post.category, "en") || pickLocalized(post.category, "ar");
      const relatedCat =
        pickLocalized(p.category, "en") || pickLocalized(p.category, "ar");
      return relatedCat === postCat;
    })
    .slice(0, 2);

  const relatedFallback =
    related.length > 0
      ? related
      : allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const title = pickLocalized(post.title, locale);
  const content = pickLocalized(post.content, locale);
  const category = pickLocalized(post.category, locale);
  const author = post.author ? pickLocalized(post.author, locale) : null;
  const authorRole = post.authorRole
    ? pickLocalized(post.authorRole, locale)
    : null;

  return (
    <div className="bg-muted pb-16">
      <section className="bg-primary px-4 py-10 text-center text-white sm:py-12 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-sm font-medium text-secondary">{category}</p>
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-8 lg:px-6">
        <PageBackLink href="/blog" label={t("backToBlog")} />

        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {category}
              </span>
              <span>{formatDate(post.publishedAt, locale)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} {t("minRead")}
              </span>
            </div>

            {(author || authorRole) && (
              <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  {author && (
                    <p className="font-bold text-foreground">{author}</p>
                  )}
                  {authorRole && (
                    <p className="text-sm text-muted-foreground">{authorRole}</p>
                  )}
                </div>
              </div>
            )}

            <BlogArticleBody content={content} />

            {post.stats && post.stats.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {post.stats.map((stat) => (
                  <div
                    key={stat.value + pickLocalized(stat.label, locale)}
                    className="rounded-xl bg-muted px-4 py-6 text-center"
                  >
                    <p className="mb-1 text-2xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {pickLocalized(stat.label, locale)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      {relatedFallback.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 lg:px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            {t("related")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedFallback.map((item) => (
              <BlogCard
                key={item.id}
                post={item}
                locale={locale}
                minReadLabel={t("minRead")}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
