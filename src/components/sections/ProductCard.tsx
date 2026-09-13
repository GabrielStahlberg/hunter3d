import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { ProductImage } from "@/components/ui/ProductImage";
import { AddToCartButton } from "@/components/sections/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getCategoryName, getStartingPrice } from "@/lib/products";
import { catalogContent } from "@/content/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const hasOptions = !!product.priceOptions?.length;
  const startingPrice = getStartingPrice(product);

  return (
    <div className="group overflow-hidden rounded border border-border bg-background">
      <Link
        href={`/produtos/${product.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage src={product.images[0]} alt={product.name} />
          {!product.available && (
            <div className="absolute left-3 top-3">
              <Badge>{catalogContent.unavailableBadge}</Badge>
            </div>
          )}
        </div>
        <div className={cn("p-4", startingPrice != null && "pb-0")}>
          <p className="text-xs font-medium text-primary">{getCategoryName(product.category)}</p>
          <Heading level={3} size={4} className="mt-1 text-lg group-hover:text-primary">
            {product.name}
          </Heading>
          <p className="mt-3 text-base font-medium text-foreground">
            {startingPrice == null ? (
              catalogContent.priceOnRequestLabel
            ) : (
              <>
                {hasOptions && <span className="mr-1 text-sm font-normal text-muted-foreground">{catalogContent.startingAtPrefix}</span>}
                {formatPrice(startingPrice)}
              </>
            )}
          </p>
        </div>
      </Link>

      {startingPrice != null && (
        <div className="p-4">
          <AddToCartButton product={product} className="w-full" />
        </div>
      )}
    </div>
  );
}
