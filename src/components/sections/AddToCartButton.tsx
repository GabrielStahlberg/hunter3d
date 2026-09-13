"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { common } from "@/content/common";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type AddToCartButtonProps = {
  product: Product;
  optionLabel?: string;
  size?: "md" | "lg";
  className?: string;
};

export function AddToCartButton({ product, optionLabel, size = "md", className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!product.available) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>{common.cart.unavailableLabel}</span>
    );
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product.slug, 1, optionLabel);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded border border-border font-medium text-foreground transition-colors hover:border-primary hover:text-primary",
        size === "lg" ? "h-12 px-6 text-base" : "h-11 px-5 text-sm",
        justAdded && "border-primary text-primary",
        className,
      )}
    >
      {justAdded ? common.cart.addedLabel : common.cart.addLabel}
    </button>
  );
}
