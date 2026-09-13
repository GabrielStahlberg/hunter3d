import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CTASection } from "@/components/sections/CTASection";
import { homeContent } from "@/content/home";
import { getAllProducts, getCategoriesInUse } from "@/lib/products";

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
      <Hero content={homeContent.hero} />
      <HowItWorks content={homeContent.howItWorks} />
      <ProductsCatalogSection products={products} categories={categories} />
      <CTASection content={homeContent.cta} />
    </>
  );
}
