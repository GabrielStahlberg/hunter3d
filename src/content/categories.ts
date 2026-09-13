import type { Category } from "@/lib/types";

// Canonical category labels. The catalog filters itself only ever show
// categories that actually have products (see getCategoriesInUse in
// src/lib/products.ts) — removing a category's last product removes it
// from the filters automatically, no code changes needed.
export const categories: Category[] = [
  { slug: "dia-criancas", name: "Especial Dia das Crianças" },
  { slug: "recursos-terapeuticos", name: "Recursos terapêuticos" },
  { slug: "recursos-sensoriais", name: "Recursos sensoriais" },
  { slug: "colecao-comidinhas", name: "Coleção Comidinhas" },
  { slug: "chaveiros", name: "Chaveiros" },
  { slug: "utilidades", name: "Utilidades" },
  { slug: "decoracao", name: "Decoração" },
  { slug: "personalizados", name: "Personalizados" },
  { slug: "outros-produtos-3d", name: "Outros produtos 3D" }
];
