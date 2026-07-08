"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "", label: "home" },
  { href: "/products", label: "products" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const locale = pathname.split("/")[1];
  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return pathname === full || (href !== "" && pathname.startsWith(full));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={cn(
              "font-serif text-2xl md:text-3xl tracking-tight transition-colors duration-500",
              scrolled ? "text-stone-800" : "text-white"
            )}
          >
            CASA VERO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={cn(
                  "text-sm tracking-widest uppercase transition-all duration-300 py-1 relative",
                  isActive(href)
                    ? scrolled ? "text-wood-600" : "text-white"
                    : scrolled ? "text-stone-500 hover:text-stone-800" : "text-white/70 hover:text-white"
                )}
              >
                {t(label)}
                {isActive(href) && (
                  <span className={cn(
                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                    scrolled ? "bg-wood-600" : "bg-white"
                  )} />
                )}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/cart`}
              className={cn(
                "relative p-2.5 transition-colors duration-500",
                scrolled ? "text-stone-600 hover:text-stone-800" : "text-white/80 hover:text-white"
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-wood-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "md:hidden p-2.5 transition-colors duration-500",
                scrolled ? "text-stone-600" : "text-white/80"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100">
          <nav className="container-page py-6 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 text-sm text-stone-700 hover:bg-stone-50 rounded-xl transition-colors"
              >
                {t(label)}
              </Link>
            ))}
            <div className="pt-3 px-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
