# Stahlberg Labs Website Engineering Guidelines

## Mandatory project standards

Always follow these project standards:

@docs/BRAND_VOICE.md
@docs/DESIGN_SYSTEM.md

## Project purpose

This repository is the official website starter used by Stahlberg Labs.

The goal is to create professional, modern, high-performance websites for clients while maintaining a consistent engineering standard without making every website look like the same template.

## Standard stack

Use:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Vercel for deployment
- Supabase only if really needed. Avoid use it. If really needed, ask before.
- MySQL for when some backend logic needed.

Do not introduce additional major dependencies without a clear technical reason.

## Core principles

Every website must be:

- responsive
- mobile-first
- accessible
- SEO-friendly
- performant
- visually professional
- easy to maintain
- componentized
- production-ready

Avoid generic AI-generated looking interfaces.

Avoid unnecessary animations, gradients, cards, shadows, icons, and decorative elements.

Design decisions must have purpose.

## Architecture

Use the following structure:

src/
  app/
  components/
    ui/
    sections/
  config/
  content/
  lib/

### components/ui

Contains reusable primitive components such as:

- Button
- Container
- Section
- Heading
- Input
- Badge
- Card

Components here must not contain client-specific content.

### components/sections

Contains page sections such as:

- Hero
- Services
- About
- Portfolio
- Testimonials
- FAQ
- Contact
- CTA
- Footer

Sections should receive content through props or configuration whenever practical.

### config

Contains website-level configuration such as:

- company information
- navigation
- contact details
- social links
- SEO defaults
- theme configuration

### content

All client-specific and customer-facing website copy MUST live under:

src/content/

Examples:

src/content/
  home.ts
  about.ts
  services.ts
  contact.ts
  faq.ts
  common.ts

Client-facing editorial content includes:

- headlines
- subheadlines
- paragraphs
- service descriptions
- benefit descriptions
- CTA labels
- FAQ questions and answers
- portfolio descriptions
- testimonials
- form helper text
- marketing messages
- SEO titles and descriptions when practical

Do NOT hardcode client-specific marketing copy inside:

- app pages
- layouts
- reusable components
- section components

Reusable UI and section components must receive content through props.

Preferred pattern:

app/page.tsx
    ↓
imports content from src/content/home.ts
    ↓
passes content to section components
    ↓
sections render the content

Example:

const homeContent = {
  hero: {
    title: "...",
    description: "...",
    primaryCta: "..."
  }
}

<HomeHero content={homeContent.hero} />

Do NOT write:

<HomeHero />

with client-specific copy hardcoded inside HomeHero.tsx.

Technical constants, URLs, contact information, feature flags,
integration IDs, and non-editorial configuration belong in src/config.

If unsure whether something belongs in config or content:

- wording/message → content
- technical value/configuration → config

## Client customization

Each client must have its own:

- brand identity
- typography
- colors
- visual personality
- content
- imagery
- page structure when appropriate

Reuse engineering patterns without making websites visually identical.

## Copywriting and brand voice

All customer-facing website copy must follow:

@docs/BRAND_VOICE.md

Creating, rewriting, reviewing, or substantially modifying client-facing
website copy MUST use the Stahlberg Labs copywriting workflow.

For any task involving:

- headlines
- descriptions
- CTA text
- landing-page copy
- service descriptions
- About content
- portfolio descriptions
- FAQ content
- marketing copy
- client-facing SEO copy

Claude MUST use the `write-landing-copy` skill.

The copywriting workflow must happen BEFORE implementing new sections
when those sections require new customer-facing copy.

Do not invent placeholder marketing copy while coding.

If copy is not yet available:

1. generate the copy using the copywriting workflow
2. store it under src/content/
3. then implement the UI

Never use generic placeholder copy in a production implementation.

The copywriter is responsible for messaging.
The web-designer is responsible for presentation.
The implementation agent is responsible for engineering.

Do not mix these responsibilities unnecessarily.

## Mandatory frontend design workflow

All new pages, websites, landing pages, and significant frontend
interfaces MUST use the `frontend-design` skill before implementation.

Frontend implementation must not begin with arbitrary visual decisions.

The design phase must first establish a clear visual direction based on:

- client brief
- target audience
- industry
- brand identity
- desired positioning
- docs/DESIGN_SYSTEM.md

The `frontend-design` skill is responsible for exploring and defining
the visual direction.

The Stahlberg Labs design system is responsible for maintaining
consistency and engineering discipline.

The design phase must consider:

- aesthetic direction
- typography
- color hierarchy
- layout composition
- visual hierarchy
- spacing
- section rhythm
- imagery
- interaction
- motion when appropriate
- responsive behavior
- CTA hierarchy

Avoid generic AI-generated website patterns.

Do not immediately default to:

- centered hero + gradient
- three feature cards
- excessive rounded cards
- purple/blue SaaS gradients
- glassmorphism
- random decorative icons
- excessive animations

Each client website must have a deliberate visual concept.

The frontend-design workflow should happen BEFORE customer-facing
components are implemented.

For minor maintenance changes that do not affect design,
invoking frontend-design is not required.

## Design system

Use design tokens for:

- colors
- typography
- spacing
- border radius
- shadows
- container sizes

Avoid random visual values throughout components.

## Responsive design

Always design and validate:

- mobile
- tablet
- desktop

Do not treat mobile responsiveness as a final cleanup step.

## Accessibility

Use semantic HTML.

Ensure:

- keyboard navigation
- visible focus states
- correct heading hierarchy
- accessible forms
- labels for form fields
- alt text for meaningful images
- sufficient contrast

## SEO

Every production website must have:

- title metadata
- meta description
- canonical configuration when appropriate
- Open Graph metadata
- sitemap
- robots configuration
- semantic page structure

Use structured data when relevant to the client's business.

Never promise search engine rankings.

## Performance

Prefer:

- Server Components when appropriate
- Next.js Image
- optimized fonts
- minimal client-side JavaScript
- lazy loading when useful

Avoid unnecessary dependencies.

## Security

Never commit:

- API keys
- passwords
- tokens
- Supabase service role keys
- private credentials

Secrets must use environment variables.

Never expose server-only credentials to client components.

## Development rules

Before considering implementation complete:

1. run lint
2. run TypeScript validation
3. run production build
4. check responsiveness
5. review accessibility
6. review SEO
7. check browser console for errors

Do not ignore build or lint errors.

## Communication

When implementing a feature:

1. understand the requirement
2. inspect existing architecture
3. reuse existing components where appropriate
4. implement the smallest clean solution
5. validate the result
6. summarize important changes

When requirements are ambiguous but non-critical, make a reasonable professional decision and explain it.

## Stahlberg Labs quality standard

A website must not be considered complete simply because it compiles.

It should look intentionally designed, work correctly, be maintainable, and be ready to present professionally to a paying client.