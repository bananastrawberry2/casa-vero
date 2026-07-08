import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/sanity";

const BLOG_FALLBACK = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80";

export function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale();
  const lang = locale === "el" ? "el" : "en";
  const title = post.title[lang];
  const excerpt = post.excerpt?.[lang];
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).height(400).url()
    : BLOG_FALLBACK;

  return (
    <Link href={`/${locale}/blog/${post.slug.current}`} className="group block card-lift bg-white rounded-3xl overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6">
        <time className="text-xs text-stone-400 uppercase tracking-wider">{formatDate(post.publishedAt, locale)}</time>
        <h3 className="font-serif text-xl text-stone-800 group-hover:text-wood-600 transition-colors mt-2 mb-3 leading-snug">{title}</h3>
        {excerpt && <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">{excerpt}</p>}
        <span className="inline-flex items-center text-sm text-wood-600 font-medium mt-4 group-hover:gap-2 transition-all duration-200">
          Διαβάστε περισσότερα →
        </span>
      </div>
    </Link>
  );
}
