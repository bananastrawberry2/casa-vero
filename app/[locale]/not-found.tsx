import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "not_found" });

  return (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-6xl text-stone-200 mb-4">404</h1>
      <h2 className="font-serif text-2xl text-stone-800 mb-2">
        {t("title")}
      </h2>
      <p className="text-stone-500 mb-8">{t("message")}</p>
      <Link href={`/${locale}`} className="btn-primary">
        {t("cta")}
      </Link>
    </div>
  );
}
