"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/api/types";
import { pickLocalized } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";
import { BlogCard } from "@/components/shared/BlogCard";
import { FeaturedBlogCard } from "@/components/blog/FeaturedBlogCard";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";

interface BlogListingProps {
  posts: BlogPost[];
  locale: Locale;
  labels: {
    all: string;
    featured: string;
    minRead: string;
    empty: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSuccess: string;
  };
}

export function BlogListing({ posts, locale, labels }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const post of posts) {
      const key = pickLocalized(post.category, "en") || pickLocalized(post.category, "ar");
      const label = pickLocalized(post.category, locale);
      if (key && !seen.has(key)) seen.set(key, label);
    }
    return Array.from(seen.entries()).map(([key, label]) => ({ key, label }));
  }, [posts, locale]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => {
      const key =
        pickLocalized(post.category, "en") || pickLocalized(post.category, "ar");
      return key === activeCategory;
    });
  }, [posts, activeCategory]);

  const featured =
    filtered.find((post) => post.featured) ?? filtered[0] ?? null;
  const gridPosts = featured
    ? filtered.filter((post) => post.id !== featured.id)
    : filtered;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <CategoryPill
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          label={labels.all}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.key}
            active={activeCategory === category.key}
            onClick={() => setActiveCategory(category.key)}
            label={category.label}
          />
        ))}
      </div>

      {featured ? (
        <FeaturedBlogCard
          post={featured}
          locale={locale}
          featuredLabel={labels.featured}
          minReadLabel={labels.minRead}
        />
      ) : (
        <p className="py-12 text-center text-muted-foreground">{labels.empty}</p>
      )}

      {gridPosts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gridPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              minReadLabel={labels.minRead}
            />
          ))}
        </div>
      )}

      <BlogNewsletter
        title={labels.newsletterTitle}
        subtitle={labels.newsletterSubtitle}
        placeholder={labels.newsletterPlaceholder}
        buttonLabel={labels.newsletterButton}
        successMessage={labels.newsletterSuccess}
      />
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-white text-foreground border border-border hover:border-primary/40 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
