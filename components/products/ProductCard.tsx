"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag, Heart } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/sanity";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const t = useTranslations("products");
  const { addItem } = useCart();
  const lang = locale === "el" ? "el" : "en";
  const name = product.name[lang];
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).url()
    : "/images/placeholder.svg";

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group card-lift bg-white rounded-3xl overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Link href={`/${locale}/products/${product.slug.current}`}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            -{Math.round((1 - product.price / product.compareAtPrice!) * 100)}%
          </span>
        )}

        {/* Quick add button (appears on hover) */}
        <button
          onClick={() => addItem({ _id: product._id, name, price: product.price, image: imageUrl, slug: product.slug.current })}
          className="absolute bottom-4 left-4 right-4 z-10 bg-white text-stone-800 rounded-full py-3 text-xs font-medium tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:bg-stone-900 hover:text-white"
        >
          <ShoppingBag className="w-4 h-4" />
          {t("add_to_cart")}
        </button>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white">
          <Heart className="w-4 h-4" />
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-stone-800 text-white text-xs px-5 py-2 rounded-full font-medium">Μη Διαθέσιμο</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <Link href={`/${locale}/products/${product.slug.current}`}>
          <h3 className="font-serif text-lg text-stone-800 mb-1 leading-snug">{name}</h3>
        </Link>

        {product.materials?.length ? (
          <p className="text-xs text-stone-400 mb-3">{product.materials.join(" / ")}</p>
        ) : null}

        <div className="flex items-center gap-2.5">
          <span className="text-wood-600 font-semibold">{formatPrice(product.price, locale)}</span>
          {hasDiscount && <span className="text-stone-400 text-sm line-through">{formatPrice(product.compareAtPrice!, locale)}</span>}
        </div>
      </div>
    </div>
  );
}
