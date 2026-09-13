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
  category: string;
  // Omit entirely for a product with no fixed price (e.g. it depends on
  // customization) — the site shows "Consultar valor" and skips the cart,
  // since there's no amount to add up.
  price?: number;
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

export type CartItem = {
  slug: string;
  quantity: number;
  // Label of the selected PriceOption, when the product has priceOptions —
  // lets the same product have separate cart lines per option (e.g. one
  // line for "Unidade", another for "Kit completo").
  optionLabel?: string;
};
