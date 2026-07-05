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
    { value: "newest", label: t("sort_newest") },
    { value: "price_asc", label: t("sort_price_asc") },
    { value: "price_desc", label: t("sort_price_desc") },
    { value: "name_asc", label: t("sort_name_asc") },
    { value: "name_desc", label: t("sort_name_desc") },
  ];

  const filtersContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("search")}
          className="input-field pl-10"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-stone-800 mb-3">
          {t("all_categories")}
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              selectedCategory === ""
                ? "bg-wood-100 text-wood-700 font-medium"
                : "text-stone-600 hover:bg-stone-50"
            )}
          >
            {t("all_categories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug.current)}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                selectedCategory === cat.slug.current
                  ? "bg-wood-100 text-wood-700 font-medium"
                  : "text-stone-600 hover:bg-stone-50"
              )}
            >
              {cat.title[locale === "el" ? "el" : "en"]}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-sm font-medium text-stone-800 mb-3">
          {t("sort")}
        </h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field"
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
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg text-sm text-stone-600"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {t("filter")}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        {filtersContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg">{t("filter")}</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-stone-500"
              >
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
