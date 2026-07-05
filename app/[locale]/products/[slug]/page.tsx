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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const name = product.name[locale === "el" ? "el" : "en"];

  // Extract plain text from Portable Text blocks for metadata
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

  // Related products from the same category
  const related = product.category?._id && client
    ? await client.fetch(
        `*[_type == "product" && category._ref == $catId && slug.current != $slug] | order(price asc) [0..3]{
          _id, name, slug, price, compareAtPrice, inStock, featured,
          images, materials, colors,
          category->{ _id, title, slug }
        }`,
        { catId: product.category._id, slug }
      )
    : [];

  const name = product.name[lang];
  const description = product.description?.[lang];
  const features = product.features?.map((f) => f[lang]) || [];

  return (
    <>
    <div className="container-page py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-stone-400 mb-8">
        <a href={`/${locale}/products`} className="hover:text-wood-600">
          {t("title")}
        </a>
        <span className="mx-2">/</span>
        <span className="text-stone-600">{name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3">
              {name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-wood-600 font-medium">
                {formatPrice(product.price, locale)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-stone-400 line-through">
                  {formatPrice(product.compareAtPrice, locale)}
                </span>
              )}
            </div>
          </div>

          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              {t("out_of_stock")}
            </span>
          )}

          <AddToCartButton
            product={{
              _id: product._id,
              name,
              price: product.price,
              image: product.images?.[0]
                ? urlFor(product.images[0]).width(200).height(200).url()
                : "",
              slug: product.slug.current,
            }}
          />

          {/* Description */}
          {description && (
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed">
              <PortableText value={description as any} />
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <div>
              <h3 className="font-medium text-stone-800 mb-2">
                {t("dimensions")}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm text-stone-600">
                {product.dimensions.width && (
                  <div>
                    <span className="text-stone-400">W:</span>{" "}
                    {product.dimensions.width}
                    {product.dimensions.unit || "cm"}
                  </div>
                )}
                {product.dimensions.height && (
                  <div>
                    <span className="text-stone-400">H:</span>{" "}
                    {product.dimensions.height}
                    {product.dimensions.unit || "cm"}
                  </div>
                )}
                {product.dimensions.depth && (
                  <div>
                    <span className="text-stone-400">D:</span>{" "}
                    {product.dimensions.depth}
                    {product.dimensions.unit || "cm"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Materials */}
          {product.materials && product.materials.length > 0 && (
            <div>
              <h3 className="font-medium text-stone-800 mb-2">
                {t("materials")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1 bg-stone-100 rounded-full text-sm text-stone-600"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div>
              <h3 className="font-medium text-stone-800 mb-2">
                {t("features")}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-stone-600">
                {features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="section-title mb-8">{t("related_products")}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>

    {/* JSON-LD */}
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
