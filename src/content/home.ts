// Home page copy for Hunter3D.
// Follows docs/BRAND_VOICE.md — concrete, no invented therapeutic claims,
// conversational CTAs. Passed into section components via props; never
// hardcode this text inside components (see CLAUDE.md).

export const homeContent = {
  seo: {
    title: "Catálogo de peças impressas em 3D",
    description:
      "Recursos terapêuticos, sensoriais e outros produtos impressos em 3D. Veja o catálogo e fale direto pelo WhatsApp.",
  },

  hero: {
    title: "Peças em 3D para atividades terapêuticas, sensoriais e do dia a dia",
    description:
      "Um catálogo com recursos pensados para atividades terapêuticas e sensoriais, além de outros produtos impressos em 3D. Veja os detalhes de cada peça e fale direto com a gente pelo WhatsApp.",
  },

  howItWorks: {
    title: "Como funciona",
    steps: [
      {
        title: "Veja os produtos",
        description:
          "Navegue pelo catálogo, use os filtros por categoria ou busque pelo nome do produto.",
      },
      {
        title: "Chame no WhatsApp",
        description:
          "Fale direto com a gente para tirar dúvidas sobre o produto ou pedir personalizações.",
      },
      {
        title: "Combine os detalhes",
        description:
          "Forma de pagamento, prazo e entrega são combinados diretamente pelo WhatsApp.",
      },
    ],
  },

  cta: {
    title: "Ficou com alguma dúvida sobre um produto?",
    description: "Fale direto com a gente pelo WhatsApp.",
    primaryCta: { label: "Chamar no WhatsApp" },
  },
} as const;
