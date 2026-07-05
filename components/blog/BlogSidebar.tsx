"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import type { BlogPost } from "@/lib/sanity";

export function BlogSidebar({
  recentPosts,
}: {
  recentPosts: BlogPost[];
}) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const lang = locale === "el" ? "el" : "en";

  return (
    <aside className="space-y-8">
      {/* Recent posts */}
      <div>
        <h3 className="font-serif text-lg text-stone-800 mb-4">
          {t("recent_posts")}
        </h3>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => (
            <Link
              key={post._id}
              href={`/${locale}/blog/${post.slug.current}`}
              className="block group"
            >
              <p className="text-sm text-stone-700 group-hover:text-wood-600 transition-colors leading-snug">
                {post.title[lang]}
              </p>
              <time className="text-xs text-stone-400 mt-1 block">
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "el" ? "el-GR" : "en-US"
                )}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
