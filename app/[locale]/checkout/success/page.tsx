"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container-page py-16 text-center">
      <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
      <h1 className="font-serif text-3xl text-stone-800 mb-4">
        {t("success_title")}
      </h1>
      <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto">
        {t("success_message")}
      </p>
      <Link href={`/${locale}`} className="btn-primary">
        {t("success_cta")}
      </Link>
    </div>
  );
}
