import type { Category } from "@/lib/types";

// Canonical category labels. The catalog filters itself only ever show
// categories that actually have products (see getCategoriesInUse in
// src/lib/products.ts) — removing a category's last product removes it
// from the filters automatically, no code changes needed.
export const categories: Category[] = [
  { slug: "recursos-sensoriais", name: "Recursos sensoriais" },
  { slug: "halloween", name: "Halloween" },
  { slug: "natal", name: "Natal" },
  { slug: "trico", name: "Tricô" },
  { slug: "recursos-terapeuticos", name: "Recursos terapêuticos" },
  { slug: "chaveiros", name: "Chaveiros" },
  { slug: "utilidades", name: "Utilidades" },
  { slug: "variados", name: "Variados" }
];
