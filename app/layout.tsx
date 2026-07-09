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
    "Casa Vero — Χειροποίητα έπιπλα στην Αθήνα. Ανακαλύψτε μοναδικές συλλογές από ξύλινα έπιπλα, τραπέζια, καρέκλες, μπουφέδες, γραφεία και διακοσμητικά. Δωρεάν μεταφορικά άνω των 100€ σε Αθήνα, Θεσσαλονίκη και όλη την Ελλάδα. Επισκεφθείτε το κατάστημά μας στα Πατήσια.",
  keywords: ["έπιπλα Αθήνα", "χειροποίητα έπιπλα", "ξύλινα έπιπλα", "τραπέζια φαγητού", "καρέκλες", "μπουφέδες", "γραφεία", "διακόσμηση σπιτιού", "Casa Vero", "επίπλωση", "έπιπλα Πατήσια"],
  robots: { index: true, follow: true },
  verification: { google: "ZKqgJ5f1UD2Ok-QvqV2aYotDkDAIxfnVrmbYfhU2Eb4" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "Casa Vero",
    title: "Casa Vero - Χειροποίητα Έπιπλα Αθήνα",
    description: "Χειροποίητα έπιπλα στην Αθήνα. Τραπέζια, καρέκλες, μπουφέδες, γραφεία. Δωρεάν μεταφορικά. Επισκεφθείτε το κατάστημά μας.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Vero - Χειροποίητα Έπιπλα",
    description: "Χειροποίητα έπιπλα στην Αθήνα. Δωρεάν μεταφορικά σε όλη την Ελλάδα.",
  },
  alternates: {
    languages: {
      "el": "https://casa-vero-vrp3.vercel.app/el",
      "en": "https://casa-vero-vrp3.vercel.app/en",
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
