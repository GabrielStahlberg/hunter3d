// Technical and business configuration for Hunter3D.
// Customer-facing wording belongs in src/content/, not here (see CLAUDE.md).

export const site = {
  name: "Hunter3D",
  legalName: "Hunter3D",
  // TODO: replace with the production domain once it is defined.
  url: "https://hunter3d.com.br",
  locale: "pt_BR",
  themeColor: "#FFFEF0",

  contact: {
    whatsapp: {
      number: "+5516997242101",
      enabled: true,
    },
    email: "buenoleticia99@gmail.com",
    instagram: {
      handle: "@stahlbergleticia",
      url: "https://www.instagram.com/stahlbergleticia/",
    },
  },

  seo: {
    titleTemplate: "%s | Hunter3D",
    defaultTitle: "Hunter3D — Catálogo de peças impressas em 3D",
    keywords: [
      "impressão 3D",
      "recursos terapêuticos",
      "recursos sensoriais",
      "materiais para terapia ocupacional",
      "atividades sensoriais",
      "produtos impressos em 3D",
    ],
  },
} as const;
