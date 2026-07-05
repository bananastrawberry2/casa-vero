import { getProducts, getCategories } from "@/lib/sanity";
import { ProductsClient } from "./ProductsClient";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductsClient products={products} categories={categories} />
  );
}
