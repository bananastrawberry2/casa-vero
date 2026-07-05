import { getSanityData } from "@/sanity/client";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const page = await getSanityData<{
    content?: { el: unknown[]; en: unknown[] };
  }>(`*[_type == "page" && slug.current == "about"][0]`);

  const lang = locale === "el" ? "el" : "en";

  return (
    <div className="container-page py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">
          {locale === "el" ? "Σχετικά με Εμάς" : "About Us"}
        </h1>
        <div className="prose prose-stone max-w-none">
          <p className="text-stone-600 leading-relaxed text-lg">
            {locale === "el"
              ? "Η Casa Vero δημιουργεί χειροποίητα έπιπλα υψηλής ποιότητας, συνδυάζοντας την παραδοσιακή ξυλουργική με τη μοντέρνα αισθητική. Κάθε κομμάτι είναι φτιαγμένο με αγάπη και προσοχή στη λεπτομέρεια."
              : "Casa Vero creates high-quality handcrafted furniture, combining traditional woodworking with modern aesthetics. Every piece is made with love and attention to detail."}
          </p>
        </div>
      </div>
    </div>
  );
}
