"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Heart } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/sanity";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const { addItem } = useCart();
  const lang = locale === "el" ? "el" : "en";
  const name = product.name[lang];
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).url()
    : "/images/placeholder.svg";

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group product-card">
      {/* Image */}
      <div className="relative aspect-square bg-habitat-light overflow-hidden">
        <Link href={`/${locale}/products/${product.slug.current}`}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Sale badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase">
            -{Math.round((1 - product.price / product.compareAtPrice!) * 100)}%
          </span>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-habitat-dark text-white text-xs px-4 py-1.5 rounded-sm font-medium tracking-wide uppercase">
              Μη Διαθέσιμο
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <Link href={`/${locale}/products/${product.slug.current}`}>
          {product.materials && product.materials.length > 0 && (
            <p className="text-[11px] text-habitat-muted tracking-wide uppercase mb-1 hover:text-habitat-green transition-colors">
              {product.materials.join(", ")}
            </p>
          )}
          <h3 className="font-medium text-sm text-habitat-text leading-snug hover:text-habitat-green transition-colors mb-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-habitat-text">
            {formatPrice(product.price, locale)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-habitat-muted line-through">
              {formatPrice(product.compareAtPrice!, locale)}
            </span>
          )}
        </div>

        <button
          onClick={() =>
            addItem({
              _id: product._id,
              name,
              price: product.price,
              image: imageUrl,
              slug: product.slug.current,
            })
          }
          className="w-full mt-4 py-2.5 text-xs tracking-widest uppercase font-medium rounded-full border border-habitat-border text-habitat-text hover:bg-habitat-green hover:text-white hover:border-habitat-green transition-all duration-300"
        >
          Προσθήκη στο Καλάθι
        </button>
      </div>
    </div>
  );
}
