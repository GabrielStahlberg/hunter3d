import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductPurchaseOptions } from "@/components/sections/ProductPurchaseOptions";
import { BackToCatalogLink } from "@/components/sections/BackToCatalogLink";
import { getAllProducts, getCategoryName, getProductBySlug, getStartingPrice } from "@/lib/products";
import { site } from "@/config/site";
import { common } from "@/content/common";
import { productPageContent } from "@/content/product-page";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const canonicalUrl = `/produtos/${product.slug}`;
  const description = common.seo.productDescription(
    product.name,
    getCategoryName(product.category),
    getStartingPrice(product),
  );

  return {
    title: product.name,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: product.name,
      description,
      images: [`${site.url}${product.images[0]}`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${site.url}/produtos/${product.slug}`;

  const details: Array<{ label: string; value: string | string[] }> = [];
  if (product.material) details.push({ label: productPageContent.materialLabel, value: product.material });
  if (product.dimensions) {
    details.push({ label: productPageContent.dimensionsLabel, value: product.dimensions });
  }
  if (product.pieceCount) details.push({ label: productPageContent.pieceCountLabel, value: product.pieceCount });
  if (product.colors?.length) details.push({ label: productPageContent.colorsLabel, value: product.colors.join(", ") });

  const categoryName = getCategoryName(product.category);
  const startingPrice = getStartingPrice(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: common.seo.productDescription(product.name, categoryName, startingPrice),
    image: `${site.url}${product.images[0]}`,
    category: categoryName,
    // Omitted entirely (rather than a fabricated price) when the product has
    // no fixed price — schema.org doesn't require an Offer on a Product.
    ...(startingPrice != null && {
      offers: {
        "@type": "Offer",
        price: startingPrice,
        priceCurrency: "BRL",
        availability: product.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: productUrl,
      },
    }),
  };

  return (
    <Section as="div">
      <Container>
        <BackToCatalogLink label={productPageContent.backToCatalog} />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <p className="text-sm font-medium text-primary">{categoryName}</p>
            <Heading level={1} size={2} className="mt-1">
              {product.name}
            </Heading>

            <div className="mt-3">
              <ProductPurchaseOptions product={product} productUrl={productUrl} />
            </div>

            {details.length > 0 && (
              <div className="mt-6">
                <Heading level={2} size={4}>
                  {productPageContent.detailsHeading}
                </Heading>
                <dl className="mt-2 space-y-1.5 text-sm">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex gap-2">
                      <dt className="font-medium text-foreground">{detail.label}:</dt>
                      <dd className="text-muted-foreground">
                        {Array.isArray(detail.value) ? (
                          <span className="flex flex-col">
                            {detail.value.map((line) => (
                              <span key={line}>{line}</span>
                            ))}
                          </span>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.customizable && (
              <p className="mt-6 text-sm text-muted-foreground">{productPageContent.customizableNote}</p>
            )}
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </Section>
  );
}
