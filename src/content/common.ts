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
    cartMessage: (items: Array<{ name: string; quantity: number; price: number }>, total: number) => {
      const lines = items.map(
        (item, index) => `${index + 1}. ${item.name} (x${item.quantity}) — ${formatPrice(item.price * item.quantity)}`,
      );
      return [
        "Olá! Gostaria de saber mais sobre os produtos da minha sacola:",
        "",
        ...lines,
        "",
        `Total estimado: ${formatPrice(total)}`,
      ].join("\n");
    },
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

  cart: {
    iconLabel: (count: number) => (count > 0 ? `Sacola, ${count} ${count === 1 ? "item" : "itens"}` : "Sacola"),
    addLabel: "Adicionar à sacola",
    addedLabel: "Adicionado",
    unavailableLabel: "Indisponível",
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
