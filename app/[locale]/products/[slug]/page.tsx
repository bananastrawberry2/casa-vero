import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { client, getProductBySlug, urlFor } from "@/lib/sanity";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { AddToCartButton } from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { ProductJsonLd, OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { Product } from "@/lib/sanity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const name = product.name[locale === "el" ? "el" : "en"];
  const getPlainText = (blocks: unknown[] | undefined): string | undefined => {
    if (!blocks || !Array.isArray(blocks)) return undefined;
    return blocks
      .filter((b: any) => b._type === "block" && b.children)
      .flatMap((b: any) => b.children?.filter((c: any) => c._type === "span").map((c: any) => c.text) || [])
      .join(" ")
      .slice(0, 160);
  };

  return {
    title: `${name} | Casa Vero`,
    description: product.seo?.description || getPlainText(product.description?.[locale === "el" ? "el" : "en"]),
    openGraph: {
      title: name,
      description: product.seo?.description,
      images: product.images?.[0] ? [{ url: urlFor(product.images[0]).width(800).height(800).url() }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const lang = locale === "el" ? "el" : "en";

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  let related: Product[] = [];
  if (product.category?._id && client) {
    related = await client.fetch(
      `*[_type == "product" && category._ref == $catId && slug.current != $slug] | order(price asc) [0..3]{
        _id, name, slug, price, compareAtPrice, inStock, featured,
        images, materials, colors,
        category->{ _id, title, slug }
      }`,
      { catId: product.category._id, slug }
    );
  }

  const name = product.name[lang];
  const description = product.description?.[lang];
  const features = product.features?.map((f) => f[lang]) || [];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <>
    <div className="bg-cream-bg min-h-screen">
      <div className="container-page py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-stone-400 mb-8">
          <a href={`/${locale}`} className="hover:text-wood-600 transition-colors">Αρχική</a>
          <span className="mx-2">/</span>
          <a href={`/${locale}/products`} className="hover:text-wood-600 transition-colors">{t("title")}</a>
          <span className="mx-2">/</span>
          <span className="text-stone-600">{name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              {product.materials?.length ? (
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">{product.materials.join(" / ")}</p>
              ) : null}
              <h1 className="font-serif text-3xl md:text-5xl text-stone-800 leading-tight mb-4">{name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl text-wood-600 font-semibold">{formatPrice(product.price, locale)}</span>
                {hasDiscount && (
                  <span className="text-lg text-stone-400 line-through">{formatPrice(product.compareAtPrice!, locale)}</span>
                )}
                {hasDiscount && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                    -{Math.round((1 - product.price / product.compareAtPrice!) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Stock status */}
            {product.inStock ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Άμεσα Διαθέσιμο
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {t("out_of_stock")}
              </div>
            )}

            <AddToCartButton
              product={{
                _id: product._id,
                name,
                price: product.price,
                image: product.images?.[0] ? urlFor(product.images[0]).width(200).height(200).url() : "",
                slug: product.slug.current,
              }}
            />

            {/* Description */}
            {description && (
              <div className="prose prose-stone max-w-none">
                <PortableText value={description as any} />
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <div className="border-t border-stone-100 pt-6">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">{t("dimensions")}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.dimensions.width && (
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <span className="text-xs text-stone-400 block">Πλάτος</span>
                      <span className="text-lg font-medium text-stone-800">{product.dimensions.width}{product.dimensions.unit || "cm"}</span>
                    </div>
                  )}
                  {product.dimensions.height && (
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <span className="text-xs text-stone-400 block">Ύψος</span>
                      <span className="text-lg font-medium text-stone-800">{product.dimensions.height}{product.dimensions.unit || "cm"}</span>
                    </div>
                  )}
                  {product.dimensions.depth && (
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <span className="text-xs text-stone-400 block">Βάθος</span>
                      <span className="text-lg font-medium text-stone-800">{product.dimensions.depth}{product.dimensions.unit || "cm"}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div className="border-t border-stone-100 pt-6">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">{t("materials")}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m) => (
                    <span key={m} className="px-4 py-2 bg-stone-50 rounded-full text-sm text-stone-600">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="border-t border-stone-100 pt-6">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">{t("features")}</h3>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                      <svg className="w-4 h-4 text-wood-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="border-t border-stone-200 pt-14 mb-10">
              <h2 className="font-serif text-3xl text-stone-800">{t("related_products")}</h2>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>

    <OrganizationJsonLd />
    <BreadcrumbJsonLd
      items={[
        { name: t("title"), url: `/${locale}/products` },
        { name, url: `/${locale}/products/${product.slug.current}` },
      ]}
    />
    <ProductJsonLd
      name={name}
      description={product.seo?.description || name}
      image={product.images?.[0] ? urlFor(product.images[0]).width(800).height(800).url() : undefined}
      price={product.price}
      availability={product.inStock}
      sku={product._id}
    />
  </>
  );
}
