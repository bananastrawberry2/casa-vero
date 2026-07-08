"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const n = useTranslations("navigation");

  return (
    <footer className="bg-habitat-dark text-white">
      <div className="container-page py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="font-serif text-2xl text-white tracking-tight">
              CASA VERO
            </Link>
            <p className="mt-4 text-stone-400 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all text-xs">
                f
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all text-xs">
                in
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all text-xs">
                ig
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-5">Χρήσιμα Links</h4>
            <ul className="space-y-3">
              {["products", "blog", "about", "contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${locale}/${link}`}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {n(link)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-stone-400 hover:text-white transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-stone-400 hover:text-white transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-5">Επικοινωνία</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>Πατησίων 123</li>
              <li>Αθήνα, 104 34</li>
              <li>+30 210 123 4567</li>
              <li>info@casavero.gr</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-5">Newsletter</h4>
            <p className="text-sm text-stone-400 mb-4">
              Γίνε ο πρώτος που μαθαίνει για νέες αφίξεις και προσφορές.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email σας"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-habitat-green focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-habitat-green text-white text-sm rounded-lg font-medium hover:bg-green-600 transition-colors uppercase tracking-wider"
              >
                Εγγραφή
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t("rights")}</p>
          <div className="flex gap-6">
            <span className="text-white/30">Αποδοχή Πληρωμών:</span>
            <span className="text-stone-400">Visa</span>
            <span className="text-stone-400">Mastercard</span>
            <span className="text-stone-400">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
