"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ShoppingCartIcon } from "@/components/ui/Icon";
import { common } from "@/content/common";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/carrinho"
      aria-label={common.cart.iconLabel(totalItems)}
      className="relative flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:border-primary hover:text-primary"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-primary-foreground">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
