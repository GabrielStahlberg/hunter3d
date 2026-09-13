"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SearchIcon } from "@/components/ui/Icon";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { catalogContent } from "@/content/catalog";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

const PAGE_SIZE = 6;

// Remembers filters/pagination (and which product card was last clicked) for
// the length of the tab session, so following a product link and then
// returning lands back on that exact card — not a reset-to-defaults catalog.
const STORAGE_KEY = "hunter3d-catalog-state";

type StoredCatalogState = {
  activeCategory?: string | null;
  query?: string;
  visibleCount?: number;
  lastClickedSlug?: string | null;
};

function persistCatalogState(next: StoredCatalogState) {
  try {
    const current = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as StoredCatalogState;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...next }));
  } catch {
    // Storage may be unavailable (private mode, quota) — state just won't persist.
  }
}

type ProductsCatalogSectionProps = {
  products: Product[];
  categories: Category[];
};

export function ProductsCatalogSection({ products, categories }: ProductsCatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const topRef = useRef<HTMLDivElement>(null);
  const pendingScrollSlug = useRef<string | null>(null);

  // Restore whatever catalog state was saved before the visitor left this
  // page (e.g. to view a product), once, on mount.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as StoredCatalogState;
      if (saved.activeCategory !== undefined) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from sessionStorage on mount, not derived/cascading state
        setActiveCategory(saved.activeCategory);
      }
      if (saved.query !== undefined) {
        setQuery(saved.query);
      }
      if (saved.visibleCount) {
        setVisibleCount(saved.visibleCount);
      }
      if (saved.lastClickedSlug) {
        pendingScrollSlug.current = saved.lastClickedSlug;
        persistCatalogState({ lastClickedSlug: null });
      }
    } catch {
      // Ignore malformed or inaccessible storage — catalog just starts fresh.
    }
  }, []);

  // Once the restored state above has rendered enough products for the
  // previously-clicked card to exist, scroll straight to it. Runs after
  // every render (no deps) but only does anything while a scroll is pending.
  useEffect(() => {
    if (!pendingScrollSlug.current) return;
    const link = document.querySelector(`a[href="/produtos/${pendingScrollSlug.current}"]`);
    if (link) {
      link.scrollIntoView({ block: "center" });
      pendingScrollSlug.current = null;
    }
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasExpanded = visibleCount > PAGE_SIZE;

  function scrollToTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Changing the category or search resets pagination back to the first
  // page, so switching filters never leaves a stale "show N more" count.
  function selectCategory(slug: string | null) {
    setActiveCategory(slug);
    setVisibleCount(PAGE_SIZE);
    persistCatalogState({ activeCategory: slug, visibleCount: PAGE_SIZE });
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
    persistCatalogState({ query: value, visibleCount: PAGE_SIZE });
  }

  function loadMore() {
    const next = Math.min(visibleCount + PAGE_SIZE, filtered.length);
    setVisibleCount(next);
    persistCatalogState({ visibleCount: next });
  }

  function clearFilters() {
    setQuery("");
    setActiveCategory(null);
    setVisibleCount(PAGE_SIZE);
    persistCatalogState({ activeCategory: null, query: "", visibleCount: PAGE_SIZE });
  }

  // Delegated click handler: records which product card was followed so the
  // restore-on-mount effect above knows where to scroll back to.
  function handleGridClick(event: React.MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest("a[href^='/produtos/']");
    const slug = link?.getAttribute("href")?.replace("/produtos/", "");
    if (!slug) return;
    persistCatalogState({ activeCategory, query, visibleCount, lastClickedSlug: slug });
  }

  return (
    <Section id="produtos" className="border-t border-border">
      <Container>
        <div ref={topRef} className="scroll-mt-20" />
        <Heading level={2}>{catalogContent.title}</Heading>
        <p className="mt-2 max-w-md text-muted-foreground">{catalogContent.description}</p>

        <ul aria-label={catalogContent.categoryFilterLabel} className="mt-8 flex flex-wrap gap-3">
          <li>
            <button
              type="button"
              aria-current={!activeCategory ? "true" : undefined}
              onClick={() => selectCategory(null)}
              className={cn(
                "flex h-11 items-center rounded border-2 px-4 text-sm font-medium",
                !activeCategory
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary hover:text-primary",
              )}
            >
              {catalogContent.allCategoriesLabel}
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                aria-current={activeCategory === category.slug ? "true" : undefined}
                onClick={() => selectCategory(category.slug)}
                className={cn(
                  "flex h-11 items-center rounded border-2 px-4 text-sm font-medium",
                  activeCategory === category.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary hover:text-primary",
                )}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 max-w-sm">
          <label htmlFor="product-search" className="sr-only">
            {catalogContent.searchLabel}
          </label>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="product-search"
            type="search"
            placeholder={catalogContent.searchPlaceholder}
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            className="pl-10"
          />
        </div>

        <div className="mt-8" onClickCapture={handleGridClick}>
          {filtered.length > 0 ? (
            <>
              <ProductGrid products={visibleProducts} />
              {(hasMore || hasExpanded) && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {hasMore && (
                    <Button variant="secondary" size="lg" onClick={loadMore}>
                      {catalogContent.loadMoreCta}
                    </Button>
                  )}
                  {hasExpanded && (
                    <Button variant="secondary" size="lg" onClick={scrollToTop}>
                      {catalogContent.backToTopCta}
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="rounded border border-dashed border-border p-10 text-center">
              <Heading level={3} size={4}>
                {catalogContent.emptyState.title}
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">{catalogContent.emptyState.description}</p>
              <Button variant="secondary" size="md" className="mt-4" onClick={clearFilters}>
                {catalogContent.emptyState.cta}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
