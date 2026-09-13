"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";
import { AddToCartButton } from "@/components/sections/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getProductPrice } from "@/lib/products";
import { common } from "@/content/common";
import { catalogContent } from "@/content/catalog";
import { productPageContent } from "@/content/product-page";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type ProductPurchaseOptionsProps = {
  product: Product;
  productUrl: string;
};

export function ProductPurchaseOptions({ product, productUrl }: ProductPurchaseOptionsProps) {
  const options = product.priceOptions ?? [];
  // undefined selection = the base/unit price.
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);

  const price = getProductPrice(product, selectedLabel);
  const displayName = selectedLabel ? `${product.name} (${selectedLabel})` : product.name;
  const whatsappMessage = common.whatsapp.productMessage(displayName, productUrl);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-2xl font-medium text-foreground">
          {price == null ? catalogContent.priceOnRequestLabel : formatPrice(price)}
        </p>
        {!product.available && <Badge>{catalogContent.unavailableBadge}</Badge>}
      </div>

      {options.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground">{productPageContent.priceOptionsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                aria-current={!selectedLabel}
                onClick={() => setSelectedLabel(undefined)}
                className={cn(
                  "flex h-11 items-center rounded border-2 px-4 text-sm font-medium",
                  !selectedLabel
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary hover:text-primary",
                )}
              >
                {productPageContent.baseOptionLabel} —{" "}
                {product.price != null ? formatPrice(product.price) : catalogContent.priceOnRequestLabel}
              </button>
            </li>
            {options.map((option) => (
              <li key={option.label}>
                <button
                  type="button"
                  aria-current={selectedLabel === option.label}
                  onClick={() => setSelectedLabel(option.label)}
                  className={cn(
                    "flex h-11 items-center rounded border-2 px-4 text-sm font-medium",
                    selectedLabel === option.label
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {option.label} — {formatPrice(option.price)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {product.available ? (
          <>
            <WhatsAppButton message={whatsappMessage} label={productPageContent.whatsappCta} size="lg" />
            {price != null && <AddToCartButton product={product} optionLabel={selectedLabel} size="lg" />}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">{productPageContent.unavailableNote}</p>
        )}
      </div>
    </div>
  );
}
