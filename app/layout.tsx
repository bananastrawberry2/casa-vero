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
    "Ανακαλύψτε μοναδικά, χειροποίητα έπιπλα. Ποιοτική ξύλινη χειροποίητη επίπλωση για τον χώρο σας.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "Casa Vero",
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
