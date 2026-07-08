"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();

  return (
    <div className="bg-cream-bg min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="font-serif text-3xl text-stone-800 mb-4">{t("cancel_title")}</h1>
        <p className="text-stone-500 mb-8">{t("cancel_message")}</p>
        <Link href={`/${locale}/cart`} className="inline-flex px-8 py-3.5 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all">
          {t("cancel_cta")}
        </Link>
      </div>
    </div>
  );
}
