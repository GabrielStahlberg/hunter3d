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

  cta: {
    title: "Ficou com alguma dúvida sobre um produto?",
    description: "Fale direto com a gente pelo WhatsApp.",
    primaryCta: { label: "Chamar no WhatsApp" },
  },
} as const;
