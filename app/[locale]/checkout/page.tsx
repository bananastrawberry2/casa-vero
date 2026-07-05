"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { stripePromise } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    router.push(`/${locale}/cart`);
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i._id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          locale,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        setError(stripeError.message || "Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="container-page py-8 md:py-12 max-w-2xl">
      <h1 className="font-serif text-3xl text-stone-800 mb-8">
        {t("title")}
      </h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 bg-stone-50 rounded-xl overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-stone-800">{item.name}</p>
                <p className="text-sm text-stone-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium">
              {formatPrice(item.price * item.quantity, locale)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-2xl p-6 mb-8">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-600">Subtotal</span>
            <span className="font-medium">
              {formatPrice(subtotal, locale)}
            </span>
          </div>
          <div className="border-t border-stone-200 pt-2 flex justify-between font-medium text-base">
            <span>Total</span>
            <span>{formatPrice(subtotal, locale)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary w-full gap-2"
      >
        {loading ? t("processing") : t("pay_now")}
      </button>
    </div>
  );
}
