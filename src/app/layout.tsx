import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { CartProvider } from "@/lib/cart-context";
import { site } from "@/config/site";
import { common } from "@/content/common";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: site.seo.titleTemplate,
    default: site.seo.defaultTitle,
  },
  description: common.description,
  keywords: [...site.seo.keywords],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.seo.defaultTitle,
    description: common.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: common.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.contact.email,
  sameAs: [site.contact.instagram.url],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${workSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            {common.skipToContent}
          </a>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
