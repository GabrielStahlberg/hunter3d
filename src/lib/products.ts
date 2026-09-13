import { categories } from "@/content/categories";
import { products } from "@/content/products";
import type { Category, Product } from "@/lib/types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// Only returns categories that currently have at least one product, so
// removing every product in a category removes it from the filters too —
// no hardcoded category list to maintain in the filter UI.
export function getCategoriesInUse(): Category[] {
  const slugsInUse = new Set(products.map((product) => product.category));
  return categories.filter((category) => slugsInUse.has(category.slug));
}

export function getCategoryName(slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

// Resolves the price for a given priceOptions selection, falling back to the
// product's base price when no option (or an unknown one) is given.
// Undefined means "no fixed price" — show "Consultar valor" instead.
export function getProductPrice(product: Product, optionLabel?: string): number | undefined {
  if (!optionLabel) return product.price;
  return product.priceOptions?.find((option) => option.label === optionLabel)?.price ?? product.price;
}

// Lowest price a product can be bought at — the base price, or the cheapest
// priceOptions entry if any is cheaper (used for "a partir de" display).
// Undefined means the product has no fixed price at all.
export function getStartingPrice(product: Product): number | undefined {
  const prices = [product.price, ...(product.priceOptions?.map((option) => option.price) ?? [])].filter(
    (price): price is number => price != null,
  );
  return prices.length > 0 ? Math.min(...prices) : undefined;
}
