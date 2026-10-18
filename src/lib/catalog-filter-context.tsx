"use client";

import { createContext, useContext, useRef, useState } from "react";

// Lets PromoCarousel ask ProductsCatalogSection to jump to a category —
// entirely in memory, no query string involved, so the address bar always
// just reads "/" and a plain reload or "back" never re-applies a stale
// filter. `token` changes on every request (even to the same category) so
// the effect reading it re-fires even if the slug didn't change.
type CategoryRequest = { category: string; token: number };

type CatalogFilterContextValue = {
  categoryRequest: CategoryRequest | null;
  requestCategory: (category: string) => void;
};

const CatalogFilterContext = createContext<CatalogFilterContextValue | null>(null);

export function CatalogFilterProvider({ children }: { children: React.ReactNode }) {
  const [categoryRequest, setCategoryRequest] = useState<CategoryRequest | null>(null);
  const tokenRef = useRef(0);

  function requestCategory(category: string) {
    tokenRef.current += 1;
    setCategoryRequest({ category, token: tokenRef.current });
  }

  return (
    <CatalogFilterContext.Provider value={{ categoryRequest, requestCategory }}>
      {children}
    </CatalogFilterContext.Provider>
  );
}

export function useCatalogFilter(): CatalogFilterContextValue {
  const context = useContext(CatalogFilterContext);
  if (!context) throw new Error("useCatalogFilter must be used within a CatalogFilterProvider");
  return context;
}
