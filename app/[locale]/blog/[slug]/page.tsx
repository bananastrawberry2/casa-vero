import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { getBlogPostBySlug, getBlogPosts, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ArticleJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const title = post.title[locale === "el" ? "el" : "en"];
  return {
    title: `${title} | Casa Vero Blog`,
    description: post.seo?.description || post.excerpt?.[locale === "el" ? "el" : "en"],
    openGraph: {
      title, description: post.seo?.description, type: "article", publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const lang = locale === "el" ? "el" : "en";

  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const recentPosts = allPosts.filter((p) => p._id !== post._id);

  const title = post.title[lang];
  const content = post.content?.[lang];
  const imageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(600).url() : null;

  return (
    <>
    <div className="bg-cream-bg min-h-screen">
      <div className="container-page py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <article>
            {imageUrl && (
              <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-8">
                <Image src={imageUrl} alt={title} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" priority />
              </div>
            )}

            <time className="text-xs text-stone-400 uppercase tracking-widest">{formatDate(post.publishedAt, locale)}</time>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mt-3 mb-6 leading-tight">{title}</h1>

            {post.excerpt?.[lang] && (
              <p className="text-lg text-stone-500 leading-relaxed mb-8">{post.excerpt[lang]}</p>
            )}

            {content && (
              <div className="prose prose-stone max-w-none">
                <PortableText value={content as any} />
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-stone-100">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-stone-100 rounded-full text-xs text-stone-600">#{tag}</span>
                ))}
              </div>
            )}

            {post.relatedProducts && post.relatedProducts.length > 0 && (
              <section className="mt-12 pt-10 border-t border-stone-100">
                <h2 className="font-serif text-2xl text-stone-800 mb-6">{t("related_products")}</h2>
                <ProductGrid products={post.relatedProducts as any} />
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BlogSidebar recentPosts={recentPosts} />
            </div>
          </aside>
        </div>
      </div>
    </div>

    <OrganizationJsonLd />
    <ArticleJsonLd title={title} description={post.excerpt?.[lang] || title} image={imageUrl || undefined} datePublished={post.publishedAt} />
  </>
  );
}
