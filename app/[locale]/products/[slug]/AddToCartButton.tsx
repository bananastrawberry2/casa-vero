"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface AddToCartProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
}

export function AddToCartButton({ product }: AddToCartProps) {
  const t = useTranslations("products");
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="btn-primary w-full gap-2"
    >
      <ShoppingBag className="w-5 h-5" />
      {t("add_to_cart")}
    </button>
  );
}
