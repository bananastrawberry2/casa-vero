import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Casa Vero - Χειροποίητα Έπιπλα",
    template: "%s | Casa Vero",
  },
  description:
    "Casa Vero — Χειροποίητα έπιπλα υψηλής ποιότητας. Ανακαλύψτε μοναδικές συλλογές από ξύλινα έπιπλα, τραπέζια, καρέκλες, μπουφέδες, γραφεία και διακοσμητικά. Δωρεάν μεταφορικά άνω των 100€. Παράδοση σε όλη την Ελλάδα.",
  robots: { index: true, follow: true },
  verification: { google: "ZKqgJ5f1UD2Ok-QvqV2aYotDkDAIxfnVrmbYfhU2Eb4" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "Casa Vero",
    title: "Casa Vero - Χειροποίητα Έπιπλα",
    description: "Ανακαλύψτε μοναδικά, χειροποίητα έπιπλα. Ποιοτική ξύλινη χειροποίητη επίπλωση για τον χώρο σας.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Vero - Χειροποίητα Έπιπλα",
    description: "Ανακαλύψτε μοναδικά, χειροποίητα έπιπλα για το σπίτι σας.",
  },
  alternates: {
    languages: {
      "el": "https://enchanting-stardust-bb9965.netlify.app/el",
      "en": "https://enchanting-stardust-bb9965.netlify.app/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
