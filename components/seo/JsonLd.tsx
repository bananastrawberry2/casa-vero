interface ProductJsonLdProps {
  name: string;
  description?: string;
  image?: string;
  price: number;
  currency?: string;
  availability?: boolean;
  sku?: string;
  brand?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "EUR",
  availability = true,
  sku,
  brand = "Casa Vero",
}: ProductJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  author?: string;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  author = "Casa Vero",
}: ArticleJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    author: { "@type": "Person", name: author },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Casa Vero",
    url: "https://casavero.gr",
    logo: "https://furniture-shop.gr/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+30-210-123-4567",
      contactType: "customer service",
      availableLanguage: ["Greek", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Πατησίων 123",
      addressLocality: "Αθήνα",
      postalCode: "104 34",
      addressCountry: "GR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
