import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/sanity";
import { ProductGrid } from "@/components/products/ProductGrid";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "el" ? "el" : "en";

  const [category, result] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  const products = (result as any)?.products || [];
  const title = category.title[lang];

  return (
    <div className="container-page py-8 md:py-12">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">
        {title}
      </h1>
      {category.description?.[lang] && (
        <p className="text-stone-500 text-lg mb-8">
          {category.description[lang]}
        </p>
      )}
      <ProductGrid products={products} />
    </div>
  );
}
