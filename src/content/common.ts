import { formatPrice } from "@/lib/format";

export const common = {
  description:
    "Catálogo de peças impressas em 3D da Hunter3D: recursos terapêuticos, sensoriais e outros produtos, com contato direto pelo WhatsApp.",
  skipToContent: "Pular para o conteúdo",

  footer: {
    contactHeading: "Contato",
    rights: "Todos os direitos reservados.",
    disclaimer:
      "As informações de cada produto descrevem suas características e usos sugeridos. Combinações de preço, prazo e entrega são feitas diretamente pelo WhatsApp.",
  },

  whatsapp: {
    genericMessage: "Olá! Vim do site da Hunter3D e queria saber mais.",
    productMessage: (productName: string, url?: string) =>
      url
        ? `Olá! Vi o produto ${productName} no site da Hunter3D e gostaria de saber mais. ${url}`
        : `Olá! Vi o produto ${productName} no site da Hunter3D e gostaria de saber mais.`,
    ctaLabel: "Chamar no WhatsApp",
    bubbleMessage: "Olá. Como posso ajudar?",
  },

  seo: {
    // Fallback used for product pages, which have no bespoke description —
    // built only from real product data (name, category, price), no invented copy.
    // price is omitted for products with no fixed price (value depends on customization).
    productDescription: (productName: string, categoryName: string, price?: number) =>
      price != null
        ? `${productName} — ${categoryName}, ${formatPrice(price)}. Fale pelo WhatsApp para saber mais.`
        : `${productName} — ${categoryName}. Consulte o valor pelo WhatsApp.`,
  },

  notFound: {
    title: "Página não encontrada",
    description: "A página que você está procurando não existe ou foi movida.",
    cta: "Voltar ao início",
  },

  productNotFound: {
    title: "Produto não encontrado",
    description: "Esse produto não existe ou não está mais disponível.",
    cta: "Ver todos os produtos",
  },
} as const;
