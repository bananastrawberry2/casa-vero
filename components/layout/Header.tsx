"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ShoppingBag } from "lucide-react";
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
  const { items } = useCart();

  const locale = pathname.split("/")[1];
  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return pathname === full || (href !== "" && pathname.startsWith(full));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-serif text-xl md:text-2xl text-wood-700 tracking-tight"
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
                  "text-sm tracking-wide transition-colors duration-200",
                  isActive(href)
                    ? "text-wood-600 font-medium"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {t(label)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label={t("cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-wood-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-stone-600"
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
        <div className="md:hidden border-t border-stone-100 bg-white">
          <nav className="container-page py-4 space-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-2 text-sm tracking-wide transition-colors",
                  isActive(href)
                    ? "text-wood-600 font-medium"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {t(label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
