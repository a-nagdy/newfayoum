import { getTranslations } from "next-intl/server";
import { getLocaleParam } from "@/lib/i18n/get-locale-param";
import { getBlogPosts } from "@/lib/api/client";
import { BlogListing } from "@/components/blog/BlogListing";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations("blog");
  const posts = await getBlogPosts(locale);

  return (
    <div className="bg-muted">
      <section className="bg-primary px-4 py-12 text-center text-white sm:py-16 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("pageTitle")}
          </h1>
          <p className="text-sm leading-7 text-white/75 sm:text-base">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
        <BlogListing
          posts={posts}
          locale={locale}
          labels={{
            all: t("allCategories"),
            featured: t("featured"),
            minRead: t("minRead"),
            empty: t("empty"),
            newsletterTitle: t("newsletterTitle"),
            newsletterSubtitle: t("newsletterSubtitle"),
            newsletterPlaceholder: t("newsletterPlaceholder"),
            newsletterButton: t("newsletterButton"),
            newsletterSuccess: t("newsletterSuccess"),
          }}
        />
      </div>
    </div>
  );
}
