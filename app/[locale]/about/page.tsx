const ABOUT_IMG = "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "el" ? "el" : "en";

  const content = lang === "el" ? {
    title: "Η Ιστορία μας",
    hero: "Καλώς ήρθατε στη Casa Vero",
    p1: "Η Casa Vero γεννήθηκε από την αγάπη για την ξυλουργική τέχνη και την επιθυμία να δημιουργήσουμε έπιπλα που ξεχωρίζουν. Κάθε κομμάτι είναι φτιαγμένο στο χέρι από έμπειρους τεχνίτες, με υλικά επιλεγμένα με προσοχή και σεβασμό στο περιβάλλον.",
    p2: "Πιστεύουμε ότι τα έπιπλα δεν είναι απλά αντικείμενα — είναι κομμάτια της καθημερινότητάς μας, μέρος του χώρου μας και της προσωπικότητάς μας. Γι' αυτό δίνουμε έμφαση σε κάθε λεπτομέρεια, από την επιλογή του ξύλου μέχρι το τελικό φινίρισμα.",
    p3: "Η δέσμευσή μας είναι να σας προσφέρουμε έπιπλα που θα αγαπήσετε για χρόνια. Με γνώμονα την ποιότητα, τη λειτουργικότητα και την αισθητική, δημιουργούμε κομμάτια που ντύνουν τον χώρο σας με ζεστασιά και προσωπικότητα.",
    values: [
      { title: "Ποιότητα", desc: "Επιλέγουμε τα καλύτερα υλικά και συνεργαζόμαστε με έμπειρους τεχνίτες." },
      { title: "Σχεδιασμός", desc: "Συνδυάζουμε την παράδοση με τη μοντέρνα αισθητική για μοναδικά αποτελέσματα." },
      { title: "Βιωσιμότητα", desc: "Σεβόμαστε το περιβάλλον και χρησιμοποιούμε υπεύθυνες πρακτικές παραγωγής." },
    ]
  } : {
    title: "Our Story",
    hero: "Welcome to Casa Vero",
    p1: "Casa Vero was born from a love for woodworking and a desire to create furniture that stands out. Each piece is handcrafted by skilled artisans, using carefully selected materials with respect for the environment.",
    p2: "We believe furniture is not just objects — they are part of our daily lives, our space, and our personality. That's why we focus on every detail, from wood selection to the final finish.",
    p3: "Our commitment is to offer you furniture you will love for years. Guided by quality, functionality, and aesthetics, we create pieces that warm your space with character.",
    values: [
      { title: "Quality", desc: "We select the best materials and work with experienced craftsmen." },
      { title: "Design", desc: "We blend tradition with modern aesthetics for unique results." },
      { title: "Sustainability", desc: "We respect the environment and use responsible production practices." },
    ]
  };

  return (
    <div className="bg-cream-bg min-h-screen">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ABOUT_IMG})`, filter: "brightness(0.4)" }} />
        <div className="relative container-page z-10">
          <span className="text-wood-300 text-xs tracking-[0.3em] uppercase">Casa Vero</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-4">{content.hero}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">{content.title}</h2>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>{content.p1}</p>
            <p>{content.p2}</p>
            <p>{content.p3}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-stone-100">
            {content.values.map((v, i) => (
              <div key={i}>
                <div className="w-12 h-12 rounded-xl bg-wood-50 flex items-center justify-center mb-4">
                  <span className="text-wood-600 font-serif text-lg">{i + 1}</span>
                </div>
                <h3 className="font-serif text-lg text-stone-800 mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
