"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
        className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs font-medium">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden z-50">
          {["el", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() => switchTo(lang)}
              className={`w-full px-4 py-2 text-sm text-left transition-colors hover:bg-stone-50 ${
                lang === locale
                  ? "text-wood-600 font-medium bg-wood-50"
                  : "text-stone-700"
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
