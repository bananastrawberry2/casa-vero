"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/sanity";

interface FiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sort: string;
  onSortChange: (s: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sort,
  onSortChange,
}: FiltersProps) {
  const t = useTranslations("products");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Νεότερα" },
    { value: "price_asc", label: "Τιμή: Χαμηλή → Υψηλή" },
    { value: "price_desc", label: "Τιμή: Υψηλή → Χαμηλή" },
    { value: "name_asc", label: "Όνομα: Α-Ω" },
    { value: "name_desc", label: "Όνομα: Ω-Α" },
  ];

  const filtersContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-habitat-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Αναζήτηση προϊόντων..."
          className="w-full pl-10 pr-4 py-2.5 bg-habitat-light border border-habitat-border rounded-lg text-sm text-habitat-text placeholder:text-habitat-muted focus:outline-none focus:ring-1 focus:ring-habitat-green transition-all"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-habitat-text font-medium mb-3">
          Κατηγορίες
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              selectedCategory === ""
                ? "bg-habitat-green text-white"
                : "text-habitat-text hover:bg-habitat-light"
            )}
          >
            Όλες οι Κατηγορίες
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug.current)}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                selectedCategory === cat.slug.current
                  ? "bg-habitat-green text-white"
                  : "text-habitat-text hover:bg-habitat-light"
              )}
            >
              {cat.title[locale === "el" ? "el" : "en"]}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-habitat-text font-medium mb-3">
          Ταξινόμηση
        </h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-habitat-light border border-habitat-border rounded-lg text-sm text-habitat-text focus:outline-none focus:ring-1 focus:ring-habitat-green transition-all"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-habitat-light border border-habitat-border rounded-lg text-sm text-habitat-text"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Φίλτρα
      </button>

      <aside className="hidden md:block w-64 shrink-0">
        {filtersContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-habitat-text">Φίλτρα</h3>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-habitat-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            {filtersContent}
          </div>
        </div>
      )}
    </>
  );
}
