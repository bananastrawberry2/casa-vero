import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <div className="container-page py-8 md:py-12 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">
        {t("privacy")}
      </h1>
      <div className="prose prose-stone max-w-none">
        {locale === "el" ? (
          <>
            <h2>Πολιτική Απορρήτου</h2>
            <p>
              Στη Casa Vero, δίνουμε μεγάλη σημασία στην προστασία των
              προσωπικών σας δεδομένων. Η παρούσα πολιτική περιγράφει πώς
              συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα δεδομένα σας.
            </p>
            <h3>Συλλογή Δεδομένων</h3>
            <p>
              Συλλέγουμε μόνο τα απαραίτητα δεδομένα για την επεξεργασία των
              παραγγελιών σας: όνομα, email, διεύθυνση αποστολής και στοιχεία
              πληρωμής (μέσω Stripe).
            </p>
            <h3>Cookies</h3>
            <p>
              Χρησιμοποιούμε ελάχιστα cookies για τη λειτουργία του
              καταστήματος και για analytics.
            </p>
            <h3>Τρίτα Μέρη</h3>
            <p>
              Δεν πουλάμε ούτε μοιραζόμαστε τα δεδομένα σας με τρίτους, εκτός
              από τους απαραίτητους συνεργάτες πληρωμών (Stripe) και
              μεταφορικών εταιρειών.
            </p>
          </>
        ) : (
          <>
            <h2>Privacy Policy</h2>
            <p>
              At Casa Vero, we take your privacy seriously. This policy
              describes how we collect, use, and protect your data.
            </p>
            <h3>Data Collection</h3>
            <p>
              We only collect data necessary for processing your orders: name,
              email, shipping address, and payment information (via Stripe).
            </p>
            <h3>Cookies</h3>
            <p>
              We use minimal cookies for the operation of the store and
              analytics.
            </p>
            <h3>Third Parties</h3>
            <p>
              We do not sell or share your data with third parties, except for
              necessary payment partners (Stripe) and shipping companies.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
