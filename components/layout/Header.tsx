"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "", label: "home" },
  { href: "/products", label: "products" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const locale = pathname.split("/")[1];
  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return pathname === full || (href !== "" && pathname.startsWith(full));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      {/* Top bar */}
      <div className="hidden md:block border-b border-stone-100">
        <div className="container-page flex items-center justify-between h-10 text-xs text-stone-400">
          <span>Χειροποίητα έπιπλα με παράδοση σε όλη την Ελλάδα</span>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href={`/${locale}/contact`} className="hover:text-stone-600 transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-serif text-2xl md:text-3xl text-wood-700 tracking-wide"
          >
            CASA VERO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={cn(
                  "text-sm tracking-wide transition-all duration-200 relative py-1",
                  isActive(href)
                    ? "text-wood-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-wood-500"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {t(label)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/products`}
              className="hidden md:flex p-2.5 text-stone-500 hover:text-wood-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="relative p-2.5 text-stone-500 hover:text-wood-600 transition-colors"
              aria-label={t("cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-wood-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 text-stone-500 hover:text-wood-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/95 backdrop-blur-sm">
          <nav className="container-page py-6 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-3 px-4 rounded-xl text-sm transition-all",
                  isActive(href)
                    ? "bg-wood-50 text-wood-700 font-medium"
                    : "text-stone-600 hover:bg-stone-50"
                )}
              >
                {t(label)}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
