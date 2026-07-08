import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, getCategories, getBlogPosts, urlFor } from "@/lib/sanity";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BlogCard } from "@/components/blog/BlogCard";

const HERO_IMG = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80";

const categoryImages: Record<string, string> = {
  mpoufes: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
  default: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
};

const FEATURED_BG = "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const lang = locale === "el" ? "el" : "en";

  const [featuredProducts, categories, blogPosts] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBlogPosts(),
  ]);

  return (
    <div>
      {/* ─── HERO SECTION (full-screen, dramatic) ─────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            filter: "brightness(0.45)",
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute top-40 right-20 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute top-60 right-40 w-48 h-48 border border-white/5 rounded-full" />

        {/* Content */}
        <div className="relative container-page z-10">
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-2 glass text-white/90 text-xs tracking-[0.3em] uppercase rounded-full mb-8">
                {t("hero_tag")}
              </span>
            </div>

            <h1 className="animate-fade-up delay-100 text-6xl md:text-8xl lg:text-9xl text-white font-serif leading-[0.9] mb-8 text-shadow">
              Casa
              <br />
              <span className="italic font-light">Vero</span>
            </h1>

            <p className="animate-fade-up delay-200 text-lg md:text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
              {t("hero_subtitle")}
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-5">
              <Link
                href={`/${locale}/products`}
                className="group relative inline-flex items-center px-10 py-4 bg-white text-stone-900 rounded-full font-medium text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              >
                <span className="relative z-10">{t("hero_cta")}</span>
                <svg className="relative z-10 w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center px-10 py-4 glass text-white rounded-full font-medium text-sm tracking-wide hover:bg-white/20 transition-all duration-300"
              >
                {t("about_link")}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES GRID (large, image-rich) ────────── */}
      {categories.length > 0 && (
        <section className="container-page py-20 md:py-28">
          <div className="text-center mb-14">
            <span className="text-wood-500 text-xs tracking-[0.3em] uppercase font-medium">{t("collection")}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mt-4 mb-4">{t("categories")}</h2>
            <p className="text-stone-400 text-sm max-w-md mx-auto">Ανακαλύψτε τη συλλογή μας από χειροποίητα έπιπλα</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const img = cat.image
                ? urlFor(cat.image).width(800).height(1000).url()
                : categoryImages[cat.slug.current] || categoryImages.default;

              return (
                <Link
                  key={cat._id}
                  href={`/${locale}/products?category=${cat.slug.current}`}
                  className={`group relative overflow-hidden rounded-3xl card-lift ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  style={{ height: i === 0 ? "600px" : "320px" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Category name */}
                  <div className={`absolute ${i === 0 ? "bottom-10 left-10" : "bottom-6 left-6"} right-6`}>
                    <h3 className={`font-serif text-white ${i === 0 ? "text-4xl" : "text-xl"} mb-2`}>
                      {cat.title[lang]}
                    </h3>
                    {cat.description?.[lang] && i === 0 && (
                      <p className="text-white/60 text-sm">{cat.description[lang]}</p>
                    )}
                    <span className="inline-flex items-center text-white/80 text-xs tracking-widest uppercase mt-3 group-hover:gap-2 transition-all duration-300">
                      {locale === "el" ? "Ανακάλυψε" : "Discover"}
                      <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── FEATURED PRODUCTS ──────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-wood-500 text-xs tracking-[0.3em] uppercase font-medium">{t("our_pick")}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mt-4">
                {t("featured_products")}
              </h2>
            </div>
            <Link
              href={`/${locale}/products`}
              className="hidden md:inline-flex items-center text-sm text-stone-500 hover:text-wood-600 transition-colors group"
            >
              {t("view_all")}
              <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="mt-12 text-center md:hidden">
            <Link href={`/${locale}/products`} className="inline-flex items-center px-8 py-3.5 rounded-full border border-stone-300 text-stone-700 text-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300">
              {t("view_all")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PARALLAX BANNER ────────────────────────────── */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${FEATURED_BG})`, filter: "brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative container-page z-10">
          <div className="max-w-xl">
            <span className="text-wood-300 text-xs tracking-[0.3em] uppercase">Casa Vero</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6 leading-tight">
              {t("hero_title")}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t("hero_subtitle")}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-8 py-3.5 glass text-white rounded-full text-sm tracking-wide hover:bg-white/20 transition-all duration-300"
            >
              {t("hero_cta")}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BLOG ────────────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section className="container-page py-20 md:py-28">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-wood-500 text-xs tracking-[0.3em] uppercase font-medium">{t("latest_blog")}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mt-4">{t("latest_blog")}</h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="hidden md:inline-flex items-center text-sm text-stone-500 hover:text-wood-600 transition-colors group"
            >
              {t("view_all")}
              <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {blogPosts.slice(0, 3).map((post, i) => (
              <div key={post._id} className="animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── FEATURES STRIP ──────────────────────────────── */}
      <section className="bg-stone-900 text-white">
        <div className="container-page py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {[
              { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", title: t("features_title1"), desc: t("features_desc1") },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: t("features_title2"), desc: t("features_desc2") },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: t("features_title3"), desc: t("features_desc3") },
            ].map((f, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i < 2 ? "md:border-r border-stone-700" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-wood-600/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-wood-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h4 className="font-medium text-white mb-1 text-sm">{f.title}</h4>
                <p className="text-stone-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
