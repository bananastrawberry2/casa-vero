"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const n = useTranslations("navigation");

  return (
    <footer className="bg-stone-900">
      <div className="container-page py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href={`/${locale}`} className="font-serif text-2xl text-white tracking-tight">
              CASA VERO
            </Link>
            <p className="mt-5 text-stone-400 text-sm leading-relaxed">{t("description")}</p>
            <div className="flex gap-3 mt-8">
              {["f", "ig", "in"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-white hover:text-stone-900 transition-all duration-300 text-xs font-medium">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6 tracking-wide">Γρήγορα Links</h4>
            <ul className="space-y-3">
              {["products", "blog", "about", "contact"].map((l) => (
                <li key={l}>
                  <Link href={`/${locale}/${l}`} className="text-stone-400 text-sm hover:text-white transition-colors">{n(l)}</Link>
                </li>
              ))}
              <li><Link href={`/${locale}/privacy`} className="text-stone-400 text-sm hover:text-white transition-colors">{t("privacy")}</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-stone-400 text-sm hover:text-white transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6 tracking-wide">Επικοινωνία</h4>
            <ul className="space-y-3 text-stone-400 text-sm">
              <li>Πατησίων 123</li>
              <li>Αθήνα, 104 34</li>
              <li>+30 210 123 4567</li>
              <li>info@casavero.gr</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-6 tracking-wide">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-5">Γίνε ο πρώτος που μαθαίνει για νέες αφίξεις.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input type="email" placeholder="Email σας" className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-wood-500 transition-colors" />
              <button type="submit" className="w-full px-5 py-3 bg-wood-600 text-white rounded-xl text-sm font-medium hover:bg-wood-700 transition-colors">Εγγραφή</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t("rights")}</p>
          <div className="flex gap-6">
            <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
