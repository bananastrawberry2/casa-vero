"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const n = useTranslations("navigation");

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="font-serif text-2xl text-white"
            >
              CASA VERO
            </Link>
            <p className="mt-4 text-stone-400 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white text-lg mb-4">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2 text-sm">
              {["products", "blog", "about", "contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${locale}/${link === "home" ? "" : link}`}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {n(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-white text-lg mb-4">
              {t("contact_info")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t("address_line")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+30 210 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@furniture-shop.gr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-white text-lg mb-4">
              {t("newsletter")}
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-wood-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-wood-600 text-white text-sm rounded-lg hover:bg-wood-700 transition-colors shrink-0"
              >
                {t("newsletter_cta")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>{t("rights")}</p>
          <div className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
