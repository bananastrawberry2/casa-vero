"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Heart, ShoppingBag } from "lucide-react";
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
    ? urlFor(product.images[0]).width(600).height(700).url()
    : "/images/placeholder.svg";

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group">
      {/* Image container */}
      <div className="relative aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden mb-5">
        <Link href={`/${locale}/products/${product.slug.current}`}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-full">
            -{Math.round((1 - product.price / product.compareAtPrice!) * 100)}%
          </span>
        )}
        {product.featured && !hasDiscount && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-wood-600 text-white text-xs font-medium rounded-full">
            Νέο
          </span>
        )}

        {/* Quick actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                _id: product._id,
                name,
                price: product.price,
                image: imageUrl,
                slug: product.slug.current,
              });
            }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-wood-600 hover:text-white transition-all duration-200 shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-wood-600 hover:text-white transition-all duration-200 shadow-sm"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-stone-800 text-white px-5 py-2 text-sm rounded-full font-medium">
              Μη Διαθέσιμο
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <Link href={`/${locale}/products/${product.slug.current}`} className="block">
        <h3 className="font-serif text-lg text-stone-800 group-hover:text-wood-600 transition-colors duration-200 leading-snug">
          {name}
        </h3>

        {product.materials && product.materials.length > 0 && (
          <p className="text-stone-400 text-sm mt-1.5 line-clamp-1">
            {product.materials.join(" / ")}
          </p>
        )}

        <div className="flex items-center gap-2.5 mt-2">
          <span className="text-wood-600 font-semibold text-lg">
            {formatPrice(product.price, locale)}
          </span>
          {hasDiscount && (
            <span className="text-stone-400 text-sm line-through">
              {formatPrice(product.compareAtPrice!, locale)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
