---

name: create-client-site
description: Creates or adapts a Stahlberg Labs client website from a client brief using the official architecture, brand voice, design system, copywriting workflow, reusable components, SEO standards, accessibility requirements, and quality process.
disable-model-invocation: true
------------------------------

Create or adapt this project for the client described in:

$ARGUMENTS

If no argument is supplied, use:

docs/CLIENT_BRIEF.md

Always follow:

* CLAUDE.md
* docs/DESIGN_SYSTEM.md
* docs/BRAND_VOICE.md
* the client brief provided in $ARGUMENTS

The website must follow the Stahlberg Labs engineering, design, copywriting, SEO, accessibility, and quality standards.

Do not consider the website complete only because it builds successfully.

---

# Process

## 1. Understand the client

Read the complete client brief before modifying the project.

Identify:

* business
* industry
* target audience
* geographic market
* website objective
* primary conversion
* services or products
* differentiators
* visual direction
* required pages
* required functionality
* required integrations
* available client assets
* missing client information

Understand what the visitor should:

1. understand
2. trust
3. remember
4. do next

Do not begin implementation before understanding the business and website objective.

---

## 2. Inspect the existing project

Before creating new files or components, inspect the current project.

Identify:

* existing architecture
* reusable components
* existing sections
* configuration files
* content files
* theme implementation
* dependencies
* existing SEO configuration
* existing design patterns

Prefer adapting existing Stahlberg Labs patterns instead of recreating equivalent functionality.

Do not preserve existing code only because it already exists.

If an existing implementation conflicts with the current client requirements or Stahlberg Labs standards, improve it.

---

## 3. Define information architecture

Determine the best website structure for the specific client.

Define:

* pages
* navigation
* page hierarchy
* section order
* primary CTA
* secondary CTAs
* conversion path

Do not blindly reuse the same page structure for every client.

Each section must have a clear purpose.

Ask internally whether each section helps answer at least one of:

* What does this business do?
* Is this relevant to me?
* Why should I trust this business?
* What will I get?
* Why should I choose this business?
* How does the process work?
* What should I do next?

Do not add sections only because they are commonly found on landing pages.

---

## 4. Mandatory frontend design phase

Before implementing the interface, use the `frontend-design` skill.

This phase is mandatory for new client websites.

The frontend-design workflow must use:

- the client brief
- docs/DESIGN_SYSTEM.md
- docs/BRAND_VOICE.md when messaging affects visual hierarchy
- existing client visual identity when available

Before writing frontend implementation code, establish a clear visual direction.

Determine:

- overall aesthetic concept
- visual personality
- typography
- color system
- spacing character
- border-radius character
- container behavior
- layout composition
- hero treatment
- imagery style
- section rhythm
- CTA hierarchy
- visual density
- motion approach when appropriate

The visual direction must reflect:

- client industry
- target audience
- desired positioning
- brand personality
- website objective

Do not make every Stahlberg Labs website look identical.

Reuse:

- engineering standards
- accessibility principles
- responsive patterns
- design discipline

Do NOT blindly reuse:

- the same Hero
- the same section composition
- the same visual style
- the same card layout
- the same decorative effects

The frontend-design phase must explicitly choose a visual direction
before implementation begins.

After the visual direction is established, continue with:

1. site configuration
2. copywriting
3. src/content architecture
4. implementation

Avoid generic AI-generated aesthetics.

Avoid unnecessary:

- gradients
- cards
- glassmorphism
- excessive rounded containers
- decorative icons
- animations
- visual effects
- shadows

Every visual decision must support the visual concept or usability.

---

## 5. Configure site information

Create or update centralized configuration under:

src/config/

Store technical and business configuration such as:

* company name
* domain
* contact information
* phone
* WhatsApp
* email
* address
* social networks
* navigation
* external URLs
* technical feature flags
* SEO defaults when appropriate
* integration configuration

Use configuration for values.

Use content files for wording.

Rule:

* technical value or configuration → src/config/
* customer-facing wording or message → src/content/

Do not mix the two unnecessarily.

---

## 6. Mandatory copywriting phase

Before implementing pages or sections that require customer-facing copy, complete the copywriting phase.

The copywriting phase is mandatory for:

* hero headlines
* hero descriptions
* CTA text
* service descriptions
* benefit descriptions
* differentiators
* About content
* process descriptions
* portfolio descriptions
* FAQ content
* contact messages
* form helper text
* customer-facing SEO copy
* marketing messages

Use the `write-landing-copy` skill.

The copywriting workflow must follow:

* docs/BRAND_VOICE.md
* the client brief
* the website objective
* the target audience
* the conversion strategy

Do not invent placeholder marketing copy while implementing React components.

Do not write generic filler copy simply to complete a layout.

The copy must exist before the corresponding UI is considered implemented.

If additional copy becomes necessary later during development, use the copywriting workflow again before continuing that part of the implementation.

---

## 7. Create the content architecture

All client-specific editorial and customer-facing content MUST live under:

src/content/

Prefer files organized by page or responsibility.

Example:

src/content/
home.ts
services.ts
about.ts
projects.ts
faq.ts
contact.ts
common.ts

Not every project needs every file.

Create only what is useful for the project.

Examples of content that belongs in src/content/:

* headlines
* subheadlines
* paragraphs
* service descriptions
* benefits
* differentiators
* CTA labels
* FAQ questions and answers
* portfolio descriptions
* About copy
* marketing messages
* testimonial content
* form helper text

Reusable components must not contain client-specific marketing copy.

Preferred data flow:

src/content/
↓
app/page.tsx or page composition
↓
section component props
↓
UI rendering

Example:

src/content/home.ts

export const homeContent = {
hero: {
title: "...",
description: "...",
primaryCta: "..."
}
}

Then:

<Hero content={homeContent.hero} />

Do NOT create a reusable Hero component containing client-specific hardcoded text.

Do not duplicate the same copy across multiple components.

---

## 8. Build using reusable components

After the design direction and copy are defined, implement the website.

Reuse existing components before creating new ones.

Create new reusable components when they provide meaningful value for:

* maintainability
* consistency
* future reuse
* readability

Do not force component reuse when it damages the client's visual identity or creates unnecessary abstraction.

Follow the architecture defined in CLAUDE.md.

Use:

src/components/ui/

for reusable primitives.

Examples:

* Button
* Container
* Section
* Heading
* Input
* Badge
* Card

Use:

src/components/sections/

for website sections.

Examples:

* Hero
* Services
* About
* Portfolio
* Testimonials
* FAQ
* Contact
* CTA
* Footer

Section components should receive client-specific content through props whenever practical.

Do not rewrite copy during implementation.

Implementation consumes copy from src/content/.

The copywriter owns wording.

The web-designer owns presentation.

The implementation process owns engineering.

Keep those responsibilities separated whenever practical.

---

## 9. Responsive implementation

Responsive behavior is part of implementation, not a final cleanup step.

Design and validate:

* mobile
* tablet
* desktop

Review:

* navigation
* typography
* spacing
* content order
* images
* grids
* buttons
* forms
* cards
* long text
* CTAs
* touch targets

Do not assume that a desktop layout automatically translates well to mobile.

Prioritize mobile usability.

---

## 10. Accessibility implementation

Use semantic HTML.

Validate:

* heading hierarchy
* landmarks
* keyboard navigation
* visible focus states
* form labels
* field descriptions
* error states
* button semantics
* link semantics
* image alt text
* sufficient contrast
* usable touch targets
* reduced-motion behavior when animations exist

Accessibility must be considered during implementation.

Do not postpone accessibility until the final review.

---

## 11. SEO implementation

Implement the required technical SEO baseline.

Every production website should have, when applicable:

* page title metadata
* meta descriptions
* Open Graph metadata
* canonical configuration
* sitemap
* robots configuration
* semantic page structure
* descriptive links
* image alt text
* appropriate heading hierarchy

Use structured data when relevant.

Examples:

* LocalBusiness
* Organization
* ProfessionalService
* FAQPage
* BreadcrumbList

Do not add structured data that does not accurately describe the client.

Do not promise search engine rankings.

Customer-facing SEO wording must continue following:

docs/BRAND_VOICE.md

If significant SEO-related wording changes are required, use the copywriting workflow instead of rewriting marketing copy directly.

---

## 12. Performance review

Prefer:

* Server Components when appropriate
* optimized Next.js images
* optimized fonts
* minimal client-side JavaScript
* appropriate lazy loading
* efficient component boundaries
* minimal unnecessary dependencies

Avoid adding libraries when the same result can reasonably be achieved with the existing stack.

Review the project for:

* unnecessarily large dependencies
* unnecessary client components
* oversized images
* duplicated code
* excessive JavaScript
* unnecessary animations
* avoidable network requests

Performance must not be sacrificed only for decorative effects.

---

## 13. Security review

Never expose:

* API keys
* passwords
* tokens
* database credentials
* Supabase service-role keys
* private credentials

Secrets must use environment variables.

Never expose server-only credentials to client components.

If backend functionality exists, validate:

* input validation
* authorization
* authentication when applicable
* error handling
* secret management
* server/client boundaries

Do not introduce Supabase unless genuinely necessary.

If Supabase appears necessary and it has not already been explicitly approved, stop that architectural decision and request approval before introducing it.

Use MySQL for backend persistence when required by the project architecture, according to CLAUDE.md and project requirements.

Do not introduce a database simply because one could be useful.

---

## 14. Design review

Delegate the visual and UX review to:

web-designer

The web-designer must review:

* visual hierarchy
* typography
* spacing
* consistency
* responsive composition
* CTA prominence
* usability
* visual identity
* generic AI-looking patterns
* unnecessary decorative elements

The web-designer should not substantially rewrite customer-facing copy.

If significant wording changes are needed, use the copywriting workflow.

Address blocking design or UX issues.

---

## 15. SEO review

Delegate the SEO review to:

seo-reviewer

Review:

* metadata
* semantic HTML
* headings
* indexability
* sitemap
* robots
* internal links
* image alt text
* structured data opportunities
* local SEO opportunities when relevant

The SEO reviewer should not independently rewrite substantial customer-facing marketing copy.

If substantial copy changes are recommended, send them through the copywriting workflow.

Address blocking SEO issues.

---

## 16. Technical QA

Delegate final technical quality review to:

qa-reviewer

When available, validate:

* lint
* TypeScript
* production build

Also review:

* broken imports
* runtime errors
* browser console errors
* broken links
* duplicated code
* hardcoded client-specific content
* exposed secrets
* debug code
* TODOs
* accessibility risks
* responsive risks
* production-readiness problems

Address all blocking issues before considering the project complete.

---

## 17. Content architecture validation

Before finishing, explicitly verify that client-specific marketing content is not unnecessarily hardcoded inside:

* app pages
* layouts
* reusable UI components
* reusable section components

Verify that editorial content is primarily stored under:

src/content/

If customer-facing copy is found hardcoded where it should be centralized, refactor it before completion.

Do not mark the website production-ready while significant content architecture violations remain.

---

## 18. Final validation

Before considering the implementation complete:

1. run lint
2. run TypeScript validation
3. run production build
4. check mobile responsiveness
5. check tablet responsiveness
6. check desktop responsiveness
7. review accessibility
8. review SEO
9. review customer-facing copy
10. verify BRAND_VOICE compliance
11. verify src/content architecture
12. check browser console for errors
13. check for exposed secrets
14. check navigation and CTAs
15. check forms when present

Do not ignore build, lint, TypeScript, accessibility, SEO, or major content issues.

---

## 19. Final report

At the end, provide a concise report containing:

### Pages created or modified

List the relevant pages.

### Content

Summarize:

* copywriting work completed
* src/content files created or modified
* important messaging decisions

### Design

Summarize:

* visual direction
* typography
* color approach
* important UI decisions

### Components

List major reusable components created or modified.

### SEO

Summarize:

* metadata
* sitemap
* robots
* structured data
* relevant SEO decisions

### Quality

Report:

* lint status
* TypeScript status
* build status
* accessibility review
* responsive review
* QA verdict

### Client dependencies

List anything still required from the client, such as:

* final texts
* photographs
* logo files
* legal documents
* social links
* domain information
* credentials
* testimonials

### Production readiness

Finish with one of:

READY FOR PRODUCTION

or

NOT READY FOR PRODUCTION

If not ready, list exactly what is blocking production.
