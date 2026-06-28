import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { getBlogPosts } from "@/lib/api/client";
import { BlogCard } from "@/components/shared/BlogCard";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations();
  const posts = await getBlogPosts(locale);

  return (
    <div className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            {t("blog.title")}
          </h1>
          <p className="text-muted-foreground">
            {locale === "ar"
              ? "آخر الأخبار والمقالات عن الاستثمار العقاري."
              : "Latest news and articles about real estate investment."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              minReadLabel={t("blog.minRead")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
