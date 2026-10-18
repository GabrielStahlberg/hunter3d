export type Category = {
  slug: string;
  name: string;
};

export type PriceOption = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  // A single category slug, or more than one when the product genuinely
  // belongs in several (e.g. a Halloween piece that's also part of the
  // Tricô line). The first one is treated as primary for single-category
  // display (card label, breadcrumb, structured data).
  category: string | string[];
  // Omit entirely for a product with no fixed price (e.g. it depends on
  // customization) — the site shows "Consultar valor" instead, since
  // there's no amount to display.
  price?: number;
  // Hides `price` from display (shows "Consultar valor" instead, same as
  // having no price) without losing the recorded value — flip back to
  // false to show it again.
  priceHidden?: boolean;
  // Additional ways to buy the same product at a different price (e.g. a
  // full kit vs. a single unit). `price` above stays the base/unit price.
  priceOptions?: PriceOption[];
  images: string[];
  available: boolean;
  // Mutually exclusive: a product shows whichever of these two is set —
  // a physical size, or a piece count for kits/sets where size isn't the point.
  // dimensions can be a single size, or a list when a product has multiple
  // distinctly-sized pieces (e.g. a set with a base and a separate lid).
  dimensions?: string | string[];
  pieceCount?: string;
  material?: string;
  colors?: string[];
  customizable?: boolean;
};
