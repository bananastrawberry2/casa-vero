"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h1 className="font-serif text-2xl text-stone-800 mb-2">
          {t("empty")}
        </h1>
        <Link href={`/${locale}/products`} className="btn-primary mt-4 inline-flex">
          {t("empty_cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-12">
      <h1 className="font-serif text-3xl text-stone-800 mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl"
            >
              {/* Image */}
              <Link
                href={`/${locale}/products/${item.slug}`}
                className="relative w-20 h-20 shrink-0 bg-stone-50 rounded-xl overflow-hidden"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/${locale}/products/${item.slug}`}
                  className="font-medium text-stone-800 hover:text-wood-600 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-wood-600 text-sm mt-1">
                  {formatPrice(item.price, locale)}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity - 1)
                  }
                  className="p-1 text-stone-400 hover:text-stone-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity + 1)
                  }
                  className="p-1 text-stone-400 hover:text-stone-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Total */}
              <div className="text-right min-w-[80px]">
                <p className="font-medium text-stone-800">
                  {formatPrice(item.price * item.quantity, locale)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item._id)}
                className="p-2 text-stone-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-stone-50 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-serif text-xl text-stone-800 mb-4">
            {t("title")}
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>{t("subtotal")}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>{t("shipping")}</span>
              <span className="text-emerald-600">{t("shipping_free")}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between font-medium text-stone-800 text-base">
              <span>{t("total")}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>
          </div>

          <form action={`/${locale}/checkout`} method="GET" className="mt-6">
            <button type="submit" className="btn-primary w-full">
              {t("checkout")}
            </button>
          </form>

          <Link
            href={`/${locale}/products`}
            className="block text-center text-sm text-stone-500 hover:text-stone-700 mt-4"
          >
            {t("continue_shopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
