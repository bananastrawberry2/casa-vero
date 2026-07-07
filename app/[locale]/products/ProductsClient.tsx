"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Grid3X3, List } from "lucide-react";
import type { Product, Category } from "@/lib/sanity";

export function ProductsClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const t = useTranslations("products");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const lang = locale === "el" ? "el" : "en";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category?.slug.current === selectedCategory
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const name = p.name[lang].toLowerCase();
        const materials = p.materials?.join(" ").toLowerCase() || "";
        return name.includes(q) || materials.includes(q);
      });
    }

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
        break;
      case "name_desc":
        result.sort((a, b) => b.name[lang].localeCompare(a.name[lang]));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sort, lang]);

  return (
    <div className="container-page py-12 md:py-16">
      {/* Breadcrumb */}
      <div className="text-sm text-stone-400 mb-8">
        <span className="text-stone-500 font-medium">{t("title")}</span>
        <span className="mx-2">—</span>
        <span className="text-stone-400">{filtered.length} προϊόντα</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="flex-1">
          {/* Sort and count bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-100">
            <p className="text-sm text-stone-500">
              {t("all_categories")}
              {selectedCategory && (
                <span className="ml-1 text-wood-600">
                  / {categories.find(c => c.slug.current === selectedCategory)?.title[lang]}
                </span>
              )}
            </p>
            <div className="flex items-center gap-3">
              <Grid3X3 className="w-4 h-4 text-wood-600" />
              <List className="w-4 h-4 text-stone-300" />
            </div>
          </div>

          <ProductGrid
            products={filtered}
            emptyMessage={t("no_results")}
          />
        </div>
      </div>
    </div>
  );
}
