"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const n = useTranslations("navigation");

  const links = [
    { href: "/products", label: "products" },
    { href: "/blog", label: "blog" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <footer className="bg-stone-900">
      {/* Main footer */}
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="font-serif text-2xl text-white tracking-wide"
            >
              CASA VERO
            </Link>
            <p className="mt-5 text-stone-400 text-sm leading-relaxed max-w-xs">
              {t("description")}
            </p>
            {/* Social placeholder */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-wood-600 hover:text-white transition-all duration-200 text-xs font-medium">
                f
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-wood-600 hover:text-white transition-all duration-200 text-xs font-medium">
                in
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-wood-600 hover:text-white transition-all duration-200 text-xs font-medium">
                ig
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white text-lg mb-5">
              {t("quick_links")}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="flex items-center gap-2 text-stone-400 text-sm hover:text-white transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-3 h-3 text-wood-500 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {n(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-white text-lg mb-5">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-wood-500" />
                <span>{t("address_line")}</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <Phone className="w-4 h-4 shrink-0 text-wood-500" />
                <span>+30 210 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <Mail className="w-4 h-4 shrink-0 text-wood-500" />
                <span>info@casavero.gr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-white text-lg mb-5">
              {t("newsletter")}
            </h3>
            <p className="text-stone-400 text-sm mb-4">
              Γίνε ο πρώτος που μαθαίνει για νέες αφίξεις και προσφορές.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-wood-600 text-white text-sm rounded-xl font-medium hover:bg-wood-700 transition-colors"
              >
                {t("newsletter_cta")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t("rights")}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-stone-300 transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-stone-300 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
