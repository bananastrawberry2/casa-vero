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
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTo = (lang: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 text-xs uppercase tracking-wider text-habitat-muted hover:text-habitat-text transition-colors"
      >
        <span className="w-4 h-3 inline-block border border-habitat-border">
          <span className={`block w-full h-full ${locale === "el" ? "bg-blue-700" : "bg-red-600"}`} />
        </span>
        {locale === "el" ? "GR" : "EN"}
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-28 bg-white border border-habitat-border rounded-lg shadow-md overflow-hidden z-50">
          {["el", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() => switchTo(lang)}
              className={`w-full px-4 py-2 text-xs text-left transition-colors hover:bg-habitat-light ${
                lang === locale
                  ? "text-habitat-green font-medium bg-habitat-light"
                  : "text-habitat-text"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-4 h-3 inline-block border border-habitat-border">
                  <span className={`block w-full h-full ${lang === "el" ? "bg-blue-700" : "bg-red-600"}`} />
                </span>
                {t(lang as "el" | "en")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
