"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug, getProductPrice } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { whatsappHref } from "@/lib/whatsapp";
import { common } from "@/content/common";
import { cartContent } from "@/content/cart";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductImage } from "@/components/ui/ProductImage";
import { TrashIcon } from "@/components/ui/Icon";

export function CartView() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  const lines = items.flatMap((item) => {
    const product = getProductBySlug(item.slug);
    return product ? [{ item, product }] : [];
  });

  if (lines.length === 0) {
    return (
      <div className="rounded border border-dashed border-border p-10 text-center">
        <Heading level={2} size={4}>
          {cartContent.emptyState.title}
        </Heading>
        <p className="mt-2 text-sm text-muted-foreground">{cartContent.emptyState.description}</p>
        <Button href="/#produtos" className="mt-6">
          {cartContent.emptyState.cta}
        </Button>
      </div>
    );
  }

  // Products with no fixed price never offer an "adicionar à sacola" button
  // (see AddToCartButton/ProductPurchaseOptions), so every line here has a
  // real price in practice — the ?? 0 is just a type-safety fallback.
  const total = lines.reduce(
    (sum, { item, product }) => sum + (getProductPrice(product, item.optionLabel) ?? 0) * item.quantity,
    0,
  );

  const message = common.whatsapp.cartMessage(
    lines.map(({ item, product }) => ({
      name: item.optionLabel ? `${product.name} (${item.optionLabel})` : product.name,
      quantity: item.quantity,
      price: getProductPrice(product, item.optionLabel) ?? 0,
    })),
    total,
  );

  return (
    <div>
      <ul className="divide-y divide-border border-y border-border">
        {lines.map(({ item, product }) => {
          const price = getProductPrice(product, item.optionLabel) ?? 0;
          const displayName = item.optionLabel ? `${product.name} (${item.optionLabel})` : product.name;
          return (
            <li key={`${item.slug}:${item.optionLabel ?? ""}`} className="flex flex-wrap items-center gap-4 py-5 sm:flex-nowrap">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
                <ProductImage src={product.images[0]} alt={product.name} sizes="80px" />
              </div>

              <div className="min-w-0 flex-1">
                <Link href={`/produtos/${product.slug}`} className="font-medium text-foreground hover:text-primary">
                  {displayName}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{formatPrice(price)}</p>
                {!product.available && <p className="mt-1 text-sm text-destructive">{cartContent.unavailableNote}</p>}
              </div>

              <QuantityStepper
                quantity={item.quantity}
                onChange={(quantity) => updateQuantity(item.slug, quantity, item.optionLabel)}
                label={displayName}
              />

              <p className="w-24 shrink-0 text-right text-sm font-medium text-foreground">
                {formatPrice(price * item.quantity)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.slug, item.optionLabel)}
                aria-label={`${cartContent.removeLabel}: ${displayName}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-destructive"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-col items-end gap-1">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium text-foreground">{cartContent.totalLabel}</span>
          <span className="text-xl font-medium text-foreground">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-muted-foreground">{cartContent.totalNote}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <Button href="/#produtos" variant="secondary">
            {cartContent.continueShoppingCta}
          </Button>
          <button type="button" onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive">
            {cartContent.clearCta}
          </button>
        </div>
        <Button href={whatsappHref(message)} external size="lg">
          {cartContent.checkoutCta}
        </Button>
      </div>
    </div>
  );
}
