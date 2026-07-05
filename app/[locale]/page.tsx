import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, getCategories, getBlogPosts, urlFor } from "@/lib/sanity";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BlogCard } from "@/components/blog/BlogCard";
import { formatPrice } from "@/lib/utils";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const [featuredProducts, categories, blogPosts] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBlogPosts(),
  ]);

  const lang = locale === "el" ? "el" : "en";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-wood-900" />
        <div className="relative container-page py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {t("hero_title")}
            </h1>
            <p className="text-stone-300 text-lg md:text-xl mb-8 leading-relaxed">
              {t("hero_subtitle")}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-8 py-3.5 bg-wood-600 text-white rounded-lg font-medium hover:bg-wood-700 transition-colors"
            >
              {t("hero_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-page py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">{t("featured_products")}</h2>
            <p className="section-subtitle">{t("featured_subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden md:inline-flex text-wood-600 hover:text-wood-700 font-medium text-sm"
          >
            {t("view_all")} →
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="mt-8 text-center md:hidden">
          <Link href={`/${locale}/products`} className="btn-secondary">
            {t("view_all")}
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-stone-50 py-16 md:py-24">
          <div className="container-page">
            <h2 className="section-title text-center">{t("categories")}</h2>
            <p className="section-subtitle text-center">{t("featured_subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {categories.map((cat) => {
                const imageUrl = cat.image
                  ? urlFor(cat.image).width(600).height(400).url()
                  : null;
                return (
                  <Link
                    key={cat._id}
                    href={`/${locale}/products?category=${cat.slug.current}`}
                    className="group relative h-64 rounded-2xl overflow-hidden bg-stone-200"
                  >
                    {imageUrl && (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-serif text-2xl text-white">
                        {cat.title[lang]}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="container-page py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">{t("latest_blog")}</h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="hidden md:inline-flex text-wood-600 hover:text-wood-700 font-medium text-sm"
            >
              {t("view_all")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
