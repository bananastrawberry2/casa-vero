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
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(600).height(400).url()
    : "/images/placeholder.svg";

  return (
    <Link href={`/${locale}/blog/${post.slug.current}`} className="group block">
      <div className="relative aspect-[4/3] bg-habitat-light rounded-xl overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div>
        <p className="text-[11px] text-habitat-muted uppercase tracking-widest mb-2">
          {formatDate(post.publishedAt, locale)}
        </p>
        <h3 className="font-medium text-sm text-habitat-text group-hover:text-habitat-green transition-colors leading-snug mb-2">
          {title}
        </h3>
        {post.excerpt?.[lang] && (
          <p className="text-xs text-habitat-muted leading-relaxed line-clamp-2">
            {post.excerpt[lang]}
          </p>
        )}
      </div>
    </Link>
  );
}
