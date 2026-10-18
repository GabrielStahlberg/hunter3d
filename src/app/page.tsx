import type { Metadata } from "next";
import { PromoCarousel } from "@/components/sections/PromoCarousel";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { CTASection } from "@/components/sections/CTASection";
import { homeContent } from "@/content/home";
import { getAllProducts, getCategoriesInUse } from "@/lib/products";
import { CatalogFilterProvider } from "@/lib/catalog-filter-context";

export const metadata: Metadata = {
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const categories = getCategoriesInUse();
  const products = getAllProducts();

  return (
    <>
      <CatalogFilterProvider>
        <PromoCarousel />
        <ProductsCatalogSection products={products} categories={categories} />
      </CatalogFilterProvider>
      <CTASection content={homeContent.cta} />
    </>
  );
}
