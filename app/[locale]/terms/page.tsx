import { getTranslations } from "next-intl/server";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <div className="container-page py-8 md:py-12 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">
        {t("terms")}
      </h1>
      <div className="prose prose-stone max-w-none">
        {locale === "el" ? (
          <>
            <h2>Όροι Χρήσης</h2>
            <p>
              Παρακαλούμε διαβάστε προσεκτικά τους όρους χρήσης πριν
              χρησιμοποιήσετε το κατάστημά μας.
            </p>
            <h3>Παραγγελίες</h3>
            <p>
              Όλες οι παραγγελίες υπόκεινται σε διαθεσιμότητα. Διατηρούμε το
              δικαίωμα να ακυρώσουμε οποιαδήποτε παραγγελία.
            </p>
            <h3>Αποστολές</h3>
            <p>
              Οι αποστολές γίνονται εντός 3-5 εργάσιμων ημερών. Τα μεταφορικά
              είναι δωρεάν για παραγγελίες άνω των 100€.
            </p>
            <h3>Επιστροφές</h3>
            <p>
              Δέχεστε επιστροφές εντός 14 ημερών από την παραλαβή, εφόσον τα
              προϊόντα είναι σε άριστη κατάσταση.
            </p>
          </>
        ) : (
          <>
            <h2>Terms of Service</h2>
            <p>
              Please read these terms carefully before using our store.
            </p>
            <h3>Orders</h3>
            <p>
              All orders are subject to availability. We reserve the right to
              cancel any order.
            </p>
            <h3>Shipping</h3>
            <p>
              Orders are shipped within 3-5 business days. Free shipping on
              orders over 100€.
            </p>
            <h3>Returns</h3>
            <p>
              We accept returns within 14 days of receipt, provided items are in
              perfect condition.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
