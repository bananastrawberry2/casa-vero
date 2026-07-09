interface ProductJsonLdProps {
  name: string; description?: string; image?: string; price: number;
  currency?: string; availability?: boolean; sku?: string; brand?: string;
}

export function ProductJsonLd({ name, description, image, price, currency = "EUR", availability = true, sku, brand = "Casa Vero" }: ProductJsonLdProps) {
  const json = {
    "@context": "https://schema.org", "@type": "Product", name, description, image, sku,
    brand: { "@type": "Brand", name: brand },
    offers: { "@type": "Offer", price, priceCurrency: currency, availability: availability ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

interface ArticleJsonLdProps { title: string; description?: string; image?: string; datePublished: string; author?: string; }

export function ArticleJsonLd({ title, description, image, datePublished, author = "Casa Vero" }: ArticleJsonLdProps) {
  const json = {
    "@context": "https://schema.org", "@type": "Article", headline: title, description, image, datePublished,
    author: { "@type": "Person", name: author },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function LocalBusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Casa Vero",
    url: "https://casa-vero-vrp3.vercel.app",
    telephone: "+302101234567",
    email: "info@casavero.gr",
    image: "https://casa-vero-vrp3.vercel.app/images/logo.png",
    description: "Χειροποίητα έπιπλα στην Αθήνα. Τραπέζια, καρέκλες, μπουφέδες, γραφεία, βιβλιοθήκες και διακοσμητικά.",
    priceRange: "€€",
    areaServed: ["GR", "CY"],
    hasMap: "https://maps.google.com/?q=Πατησίων+123+Αθήνα+104+34",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Πατησίων 123",
      addressLocality: "Αθήνα",
      addressRegion: "Αττική",
      postalCode: "104 34",
      addressCountry: "GR"
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "15:00" },
    ],
    location: {
      "@type": "Place",
      name: "Casa Vero",
      address: { "@type": "PostalAddress", streetAddress: "Πατησίων 123", addressLocality: "Αθήνα", postalCode: "104 34", addressCountry: "GR" },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org", "@type": "Organization", name: "Casa Vero",
    url: "https://casa-vero-vrp3.vercel.app",
    logo: "https://casa-vero-vrp3.vercel.app/logo.png",
    contactPoint: { "@type": "ContactPoint", telephone: "+30-210-123-4567", contactType: "customer service", availableLanguage: ["Greek", "English"] },
    address: { "@type": "PostalAddress", streetAddress: "Πατησίων 123", addressLocality: "Αθήνα", postalCode: "104 34", addressCountry: "GR" },
    sameAs: ["https://facebook.com/casavero", "https://instagram.com/casavero", "https://pinterest.com/casavero"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const json = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
