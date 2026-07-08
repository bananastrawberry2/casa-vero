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
      {/* Welcome bar */}
      <div className="bg-habitat-light border-b border-habitat-border">
        <div className="container-page py-2.5 text-center">
          <p className="text-xs text-habitat-muted tracking-wide">
            Χειροποίητα έπιπλα — Δωρεάν μεταφορικά για παραγγελίες άνω των 100€
          </p>
        </div>
      </div>

      {/* Category Grid (like Habitat) */}
      {categories.length > 0 && (
        <section className="container-page py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => {
              const imageUrl = cat.image
                ? urlFor(cat.image).width(600).height(600).url()
                : null;
              return (
                <Link
                  key={cat._id}
                  href={`/${locale}/products?category=${cat.slug.current}`}
                  className="category-card aspect-square flex flex-col items-center justify-center p-6 text-center"
                >
                  {imageUrl ? (
                    <div
                      className="w-full h-full absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                  ) : (
                    <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-wood-100 to-wood-200" />
                  )}
                  <div className="relative z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
                    <h3 className="text-xs md:text-sm font-medium text-habitat-text tracking-widest uppercase">
                      {cat.title[lang]}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Products - "Εμπνευστείτε" */}
      <section className="container-page pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">{t("featured_products")}</h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden md:inline-flex text-xs tracking-widest uppercase text-habitat-text hover:text-habitat-green transition-colors border-b border-habitat-text hover:border-habitat-green pb-0.5"
          >
            {t("view_all")}
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <div className="mt-10 text-center md:hidden">
          <Link href={`/${locale}/products`} className="btn-secondary text-xs">
            {t("view_all")}
          </Link>
        </div>
      </section>

      {/* Feature banners */}
      <section className="bg-habitat-light border-y border-habitat-border">
        <div className="container-page py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-5 h-5 text-habitat-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-habitat-text mb-1 tracking-wide">Δωρεάν Μεταφορικά</h4>
              <p className="text-xs text-habitat-muted">Για παραγγελίες άνω των 100€</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-5 h-5 text-habitat-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-habitat-text mb-1 tracking-wide">Ποιότητα & Εγγύηση</h4>
              <p className="text-xs text-habitat-muted">Χειροποίητα με αγάπη & προσοχή</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-5 h-5 text-habitat-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-habitat-text mb-1 tracking-wide">Εύκολες Επιστροφές</h4>
              <p className="text-xs text-habitat-muted">Εντός 14 ημερών</p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Text Section (like Habitat) */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-habitat-text mb-6 leading-tight">
            Καλώς ήρθατε στη <span className="italic">Casa Vero</span>
          </h2>
          <p className="text-habitat-muted text-sm md:text-base leading-relaxed mb-6">
            Δημιουργούμε χειροποίητα έπιπλα υψηλής ποιότητας, εμπνευσμένα από την παράδοση και προσαρμοσμένα στη μοντέρνα αισθητική.
            Κάθε κομμάτι είναι φτιαγμένο με αγάπη, προσοχή στη λεπτομέρεια και σεβασμό στα υλικά.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div>
              <h4 className="font-serif text-lg text-habitat-text mb-2">Παράδοση & Τέχνη</h4>
              <p className="text-xs text-habitat-muted leading-relaxed">
                Χρησιμοποιούμε παραδοσιακές τεχνικές ξυλουργικής και επιλέγουμε τα υλικά μας με βάση ηθικά κριτήρια.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-habitat-text mb-2">Μοντέρνα Αισθητική</h4>
              <p className="text-xs text-habitat-muted leading-relaxed">
                Κάθε σχέδιο είναι προσεκτικά μελετημένο για να συνδυάζει την κλασική κομψότητα με τη σύγχρονη γραμμή.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-habitat-text mb-2">Ποιότητα Ζωής</h4>
              <p className="text-xs text-habitat-muted leading-relaxed">
                Πιστεύουμε ότι το να ζεις καλά είναι πάνω απ' όλα να ζεις με τον τρόπο σου, σε έναν χώρο που σε εκφράζει.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="bg-habitat-light border-t border-habitat-border py-16 md:py-20">
          <div className="container-page">
            <div className="flex items-center justify-between mb-10">
              <h2 className="section-title mb-0">{t("latest_blog")}</h2>
              <Link
                href={`/${locale}/blog`}
                className="hidden md:inline-flex text-xs tracking-widest uppercase text-habitat-text hover:text-habitat-green transition-colors border-b border-habitat-text hover:border-habitat-green pb-0.5"
              >
                {t("view_all")}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
