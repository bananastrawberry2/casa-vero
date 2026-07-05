"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
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
    <div className="container-page py-8 md:py-12">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">
        {t("title")}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
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
          <ProductGrid
            products={filtered}
            emptyMessage={t("no_results")}
          />
        </div>
      </div>
    </div>
  );
}
