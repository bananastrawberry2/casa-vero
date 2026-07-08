"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { stripePromise } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, subtotal } = useCart();
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
          items: items.map((i) => ({ id: i._id, name: i.name, price: i.price, quantity: i.quantity })),
          locale,
        }),
      });

      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) { setError(stripeError.message || "Something went wrong"); setLoading(false); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-bg min-h-screen">
      <div className="container-page py-8 md:py-12 max-w-2xl mx-auto">
        <Link href={`/${locale}/cart`} className="inline-flex items-center text-sm text-stone-400 hover:text-stone-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Επιστροφή
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-10">{t("title")}</h1>

        {/* Order items */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-6">
          <h2 className="text-sm font-medium text-stone-800 mb-4">Προϊόντα</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-stone-50" />}
                  <div>
                    <p className="text-sm text-stone-800">{item.name}</p>
                    <p className="text-xs text-stone-400">Ποσότητα: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">{formatPrice(item.price * item.quantity, locale)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8">
          <div className="space-y-3 text-sm border-b border-stone-100 pb-4 mb-4">
            <div className="flex justify-between text-stone-600">
              <span>Υποσύνολο</span>
              <span className="font-medium text-stone-800">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Μεταφορικά</span>
              <span className="text-emerald-600 font-medium">Δωρεάν</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-stone-800">Σύνολο</span>
            <span className="font-semibold text-xl text-stone-800">{formatPrice(subtotal, locale)}</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3.5 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Lock className="w-4 h-4" />
          {loading ? t("processing") : t("pay_now")}
        </button>

        <p className="text-xs text-stone-400 text-center mt-4">
          Ασφαλής πληρωμή μέσω Stripe. Τα στοιχεία σας είναι προστατευμένα.
        </p>
      </div>
    </div>
  );
}
