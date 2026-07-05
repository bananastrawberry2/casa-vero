"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { urlFor } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/sanity";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const name = product.name[locale === "el" ? "el" : "en"];
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).url()
    : "/images/placeholder.svg";

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/${locale}/products/${product.slug.current}`}
      className="group block"
    >
      <div className="relative aspect-square bg-stone-50 rounded-2xl overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-stone-800 text-white px-4 py-1.5 text-sm rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            -
            {Math.round(
              (1 - product.price / product.compareAtPrice!) * 100
            )}
            %
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-serif text-lg text-stone-800 group-hover:text-wood-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-wood-600 font-medium">
            {formatPrice(product.price, locale)}
          </span>
          {hasDiscount && (
            <span className="text-stone-400 text-sm line-through">
              {formatPrice(product.compareAtPrice!, locale)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
