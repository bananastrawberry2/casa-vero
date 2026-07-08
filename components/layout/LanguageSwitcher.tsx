"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTo = (lang: string) => {
    router.push(pathname.replace(`/${locale}`, `/${lang}`));
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium uppercase tracking-wider transition-colors duration-500"
      >
        {locale === "el" ? "GR" : "EN"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden z-50">
          {["el", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() => switchTo(lang)}
              className={`w-full px-4 py-2.5 text-xs text-left transition-colors ${
                lang === locale
                  ? "text-wood-600 font-medium bg-wood-50"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {t(lang as "el" | "en")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
