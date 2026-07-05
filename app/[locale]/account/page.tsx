import { getTranslations } from "next-intl/server";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navigation" });

  return (
    <div className="container-page py-8 md:py-12">
      <div className="max-w-md mx-auto text-center">
        <h1 className="font-serif text-3xl text-stone-800 mb-4">
          {t("account")}
        </h1>
        <p className="text-stone-500">
          {locale === "el"
            ? "Ο λογαριασμός χρήστη θα είναι διαθέσιμος σύντομα."
            : "User account will be available soon."}
        </p>
      </div>
    </div>
  );
}
