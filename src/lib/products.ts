import { categories } from "@/content/categories";
import { products } from "@/content/products";
import type { Category, Product } from "@/lib/types";

// Products in category order (as listed in src/content/categories.ts, by
// each product's primary/first category) — the "Todos" catalog view and
// anything else that lists every product groups them by category this way,
// instead of insertion order. A stable sort, so products sharing a primary
// category keep their existing relative order.
export function getAllProducts(): Product[] {
  const categoryOrder = new Map(categories.map((category, index) => [category.slug, index]));
  return [...products].sort((a, b) => {
    const aIndex = categoryOrder.get(getProductCategories(a)[0]) ?? categories.length;
    const bIndex = categoryOrder.get(getProductCategories(b)[0]) ?? categories.length;
    return aIndex - bIndex;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// Normalizes a product's category (single slug or several) into a list,
// so callers never have to check which shape it is.
export function getProductCategories(product: Product): string[] {
  return Array.isArray(product.category) ? product.category : [product.category];
}

// Only returns categories that currently have at least one product, so
// removing every product in a category removes it from the filters too —
// no hardcoded category list to maintain in the filter UI.
export function getCategoriesInUse(): Category[] {
  const slugsInUse = new Set(products.flatMap(getProductCategories));
  return categories.filter((category) => slugsInUse.has(category.slug));
}

export function getCategoryName(slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

// The category shown wherever a product can only display one (card label,
// breadcrumb, structured data) — the first entry when it has several.
export function getPrimaryCategoryName(product: Product): string {
  return getCategoryName(getProductCategories(product)[0]);
}

// Resolves the price for a given priceOptions selection, falling back to the
// product's base price when no option (or an unknown one) is given.
// Undefined means "no fixed price" — show "Consultar valor" instead.
export function getProductPrice(product: Product, optionLabel?: string): number | undefined {
  if (product.priceHidden) return undefined;
  if (!optionLabel) return product.price;
  return product.priceOptions?.find((option) => option.label === optionLabel)?.price ?? product.price;
}

// Lowest price a product can be bought at — the base price, or the cheapest
// priceOptions entry if any is cheaper (used for "a partir de" display).
// Undefined means the product has no fixed price at all (or it's hidden).
export function getStartingPrice(product: Product): number | undefined {
  if (product.priceHidden) return undefined;
  const prices = [product.price, ...(product.priceOptions?.map((option) => option.price) ?? [])].filter(
    (price): price is number => price != null,
  );
  return prices.length > 0 ? Math.min(...prices) : undefined;
}
