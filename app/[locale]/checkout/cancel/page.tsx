"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();

  return (
    <div className="container-page py-16 text-center">
      <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h1 className="font-serif text-3xl text-stone-800 mb-4">
        {t("cancel_title")}
      </h1>
      <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto">
        {t("cancel_message")}
      </p>
      <Link href={`/${locale}/cart`} className="btn-primary">
        {t("cancel_cta")}
      </Link>
    </div>
  );
}
