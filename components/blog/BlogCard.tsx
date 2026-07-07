import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Calendar } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/sanity";

export function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale();
  const lang = locale === "el" ? "el" : "en";
  const title = post.title[lang];
  const excerpt = post.excerpt?.[lang];
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).height(400).url()
    : "/images/placeholder.svg";

  return (
    <Link
      href={`/${locale}/blog/${post.slug.current}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] bg-stone-100 rounded-3xl overflow-hidden mb-5">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <Calendar className="w-3.5 h-3.5" />
          <time>{formatDate(post.publishedAt, locale)}</time>
        </div>
        <h3 className="font-serif text-xl text-stone-800 group-hover:text-wood-600 transition-colors duration-200 leading-snug pr-4">
          {title}
        </h3>
        {excerpt && (
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}
        <span className="inline-flex items-center text-wood-600 text-sm font-medium group-hover:gap-2 transition-all duration-200">
          Διαβάστε περισσότερα
          <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </Link>
  );
}
