import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, getCategories, getBlogPosts, urlFor } from "@/lib/sanity";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BlogCard } from "@/components/blog/BlogCard";

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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-wood-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-wood-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />

        <div className="relative container-page w-full py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full tracking-wider uppercase mb-6">
              Χειροποίητα Έπιπλα
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 tracking-tight">
              {t("hero_title")}
            </h1>
            <p className="text-stone-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-light">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center px-8 py-4 bg-wood-600 text-white rounded-full font-medium hover:bg-wood-700 transition-all duration-300 shadow-lg shadow-wood-900/20"
              >
                {t("hero_cta")}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Η Ιστορία μας
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-wood-600 text-sm tracking-widest uppercase font-medium">
              Συλλογή
            </span>
            <h2 className="section-title text-4xl md:text-5xl mt-2">
              {t("featured_products")}
            </h2>
            <p className="section-subtitle">{t("featured_subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden md:inline-flex items-center text-wood-600 hover:text-wood-700 font-medium text-sm transition-colors group"
          >
            {t("view_all")}
            <span className="ml-2 group-hover:ml-3 transition-all duration-200">→</span>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="mt-10 text-center md:hidden">
          <Link href={`/${locale}/products`} className="btn-secondary">
            {t("view_all")}
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-stone-100/50 py-20 md:py-28">
          <div className="container-page">
            <div className="text-center mb-14">
              <span className="text-wood-600 text-sm tracking-widest uppercase font-medium">
                Κατηγορίες
              </span>
              <h2 className="section-title text-4xl md:text-5xl mt-2">
                {t("categories")}
              </h2>
              <p className="section-subtitle">Ανακαλύψτε τη συλλογή μας</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((cat, index) => {
                const imageUrl = cat.image
                  ? urlFor(cat.image).width(600).height(800).url()
                  : null;
                return (
                  <Link
                    key={cat._id}
                    href={`/${locale}/products?category=${cat.slug.current}`}
                    className={`group relative overflow-hidden rounded-3xl ${
                      index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                    }`}
                    style={{ height: index === 0 ? "500px" : "400px" }}
                  >
                    {imageUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-wood-200 to-wood-300" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-serif text-2xl text-white mb-2">
                        {cat.title[lang]}
                      </h3>
                      {cat.description?.[lang] && (
                        <p className="text-white/70 text-sm max-w-md">
                          {cat.description[lang]}
                        </p>
                      )}
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
        <section className="container-page py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-wood-600 text-sm tracking-widest uppercase font-medium">
                Ιστολόγιο
              </span>
              <h2 className="section-title text-4xl md:text-5xl mt-2">
                {t("latest_blog")}
              </h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="hidden md:inline-flex items-center text-wood-600 hover:text-wood-700 font-medium text-sm transition-colors group"
            >
              {t("view_all")}
              <span className="ml-2 group-hover:ml-3 transition-all duration-200">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          {blogPosts.length > 3 && (
            <div className="mt-10 text-center md:hidden">
              <Link href={`/${locale}/blog`} className="btn-secondary">
                {t("view_all")}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Feature strip */}
      <section className="border-t border-stone-200 bg-white">
        <div className="container-page py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-wood-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-wood-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <h4 className="font-medium text-stone-800 mb-1">Δωρεάν Μεταφορικά</h4>
              <p className="text-stone-500 text-sm">Για παραγγελίες άνω των 100€</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-wood-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-wood-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="font-medium text-stone-800 mb-1">Ποιότητα Εγγύηση</h4>
              <p className="text-stone-500 text-sm">Χειροποίητα με αγάπη</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-wood-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-wood-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h4 className="font-medium text-stone-800 mb-1">Εύκολες Επιστροφές</h4>
              <p className="text-stone-500 text-sm">Εντός 14 ημερών</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
