"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-cream-bg min-h-screen">
        <div className="container-page py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-stone-400" />
          </div>
          <h1 className="font-serif text-3xl text-stone-800 mb-3">{t("empty")}</h1>
          <p className="text-stone-500 mb-8">Δεν έχετε προσθέσει προϊόντα ακόμα.</p>
          <Link href={`/${locale}/products`} className="inline-flex items-center px-8 py-3.5 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("empty_cta")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-bg min-h-screen">
      <div className="container-page py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-10">{t("title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-stone-100 card-lift">
                <Link href={`/${locale}/products/${item.slug}`} className="relative w-24 h-24 shrink-0 bg-stone-50 rounded-xl overflow-hidden">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/${locale}/products/${item.slug}`} className="font-medium text-stone-800 hover:text-wood-600 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-wood-600 font-medium mt-1">{formatPrice(item.price, locale)}</p>
                </div>

                <div className="flex items-center gap-1 bg-stone-50 rounded-xl p-1">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 rounded-lg hover:bg-white transition-all">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 rounded-lg hover:bg-white transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="font-semibold text-stone-800">{formatPrice(item.price * item.quantity, locale)}</p>
                </div>

                <button onClick={() => removeItem(item._id)} className="p-2 text-stone-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-stone-100 p-8 h-fit sticky top-28">
            <h2 className="font-serif text-xl text-stone-800 mb-6">Σύνοψη Παραγγελίας</h2>

            <div className="space-y-4 text-sm border-b border-stone-100 pb-6 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>{t("subtotal")}</span>
                <span className="font-medium text-stone-800">{formatPrice(subtotal, locale)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{t("shipping")}</span>
                <span className="text-emerald-600 font-medium">{t("shipping_free")}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-medium text-stone-800">{t("total")}</span>
              <span className="font-semibold text-xl text-stone-800">{formatPrice(subtotal, locale)}</span>
            </div>

            <Link href={`/${locale}/checkout`} className="block w-full py-3.5 bg-stone-800 text-white text-center rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-300">
              {t("checkout")}
            </Link>

            <Link href={`/${locale}/products`} className="block text-center text-sm text-stone-400 hover:text-stone-600 mt-4 transition-colors">
              {t("continue_shopping")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
