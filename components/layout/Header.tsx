"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag, Search, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/products", label: "products" },
  { href: "/categories/mpoufes", label: "Μπουφέδες" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

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
    <header className="bg-white border-b border-habitat-border sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden md:block bg-habitat-light">
        <div className="container-page flex items-center justify-between h-9">
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-4 text-[11px] text-habitat-muted tracking-wide">
            <Link href={`/${locale}/about`} className="hover:text-habitat-text transition-colors">About</Link>
            <Link href={`/${locale}/contact`} className="hover:text-habitat-text transition-colors">{t("contact")}</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Hamburger (mobile) */}
          <button
            className="md:hidden p-2 text-habitat-text"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h16M3 11h16M3 16h16"/>
            </svg>
          </button>

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-serif text-2xl md:text-3xl text-habitat-text tracking-tight"
          >
            CASA VERO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={cn(
                  "nav-link relative py-6",
                  isActive(href) && "nav-link-active"
                )}
              >
                {label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex w-10 h-10 items-center justify-center text-habitat-muted hover:text-habitat-text transition-colors rounded-full hover:bg-habitat-light">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link
              href={`/${locale}/cart`}
              className="relative w-10 h-10 flex items-center justify-center text-habitat-muted hover:text-habitat-text transition-colors rounded-full hover:bg-habitat-light"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-habitat-green text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-habitat-border bg-white">
          <nav className="container-page py-4 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 text-sm text-habitat-text hover:bg-habitat-light rounded-lg transition-colors"
              >
                {label.toUpperCase()}
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
