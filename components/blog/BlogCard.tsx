import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
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
      <div className="relative aspect-[3/2] bg-stone-50 rounded-2xl overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-2">
        <time className="text-sm text-stone-400">
          {formatDate(post.publishedAt, locale)}
        </time>
        <h3 className="font-serif text-xl text-stone-800 group-hover:text-wood-600 transition-colors leading-snug">
          {title}
        </h3>
        {excerpt && (
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
