import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CartView } from "@/components/sections/CartView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cartContent } from "@/content/cart";

export const metadata: Metadata = {
  title: cartContent.seo.title,
  description: cartContent.seo.description,
  alternates: { canonical: "/carrinho" },
  robots: { index: false },
};

export default function CarrinhoPage() {
  return (
    <>
      <PageHeader title={cartContent.title} description={cartContent.description} />
      <Section>
        <Container>
          <CartView />
        </Container>
      </Section>
    </>
  );
}
