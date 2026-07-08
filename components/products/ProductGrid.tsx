import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/sanity";

export function ProductGrid({
  products,
  emptyMessage,
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (!products.length) {
    return (
      <div className="text-center py-20">
        <p className="text-habitat-muted text-sm">
          {emptyMessage || "Δεν βρέθηκαν προϊόντα"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
