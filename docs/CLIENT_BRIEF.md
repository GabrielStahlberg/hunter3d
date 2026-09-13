# Client Brief — Hunter3D

## Company

Name: Hunter3D

Industry:
3D printed products, with a primary focus on therapeutic, sensory and activity resources, while also allowing other 3D printed product categories.

Location:
Brazil

Primary language:
Portuguese (Brazil)

## Business

Hunter3D offers products manufactured using 3D printing.

The main product focus is therapeutic and sensory resources, but the catalog must support additional categories of 3D printed products without requiring changes to the website architecture.

The website will work primarily as a product catalog.

It is NOT an e-commerce platform.

The website does not process purchases, payments or orders.

When a visitor is interested in a product, the main conversion is starting a WhatsApp conversation with the seller.

The sale, negotiation, payment, delivery and any other commercial arrangements happen externally and are the seller's responsibility after the WhatsApp conversation begins.

## Target audience

Potential audiences include:

* occupational therapists
* other therapy professionals
* educators
* parents and caregivers
* professionals looking for therapeutic or sensory resources
* people interested in other 3D printed products available in the catalog

The interface should remain accessible and understandable to non-technical users.

## Website objective

Primary objective:

Present Hunter3D products in an attractive, organized and trustworthy digital catalog.

Primary conversion:

Start a WhatsApp conversation about a specific product.

Secondary conversions:

* explore products
* explore categories
* view product details
* contact the seller

## Core principle

Visitors should be able to:

1. quickly understand what Hunter3D offers
2. browse products easily
3. filter or search products
4. understand individual product details
5. see the price
6. view product photos
7. contact the seller through WhatsApp with minimal friction

## Pages

### Home

Should introduce the brand and present:

* Hero
* main value proposition
* the full product catalog (see "Catalog" below)
* short explanation of how purchasing works
* WhatsApp CTA
* contact information

Client decision: there is no separate "categories" section or curated
"featured products" preview on the home page. The full catalog — every
product, category filters and search — is embedded directly on the home
page right after the Hero, in a scrollable section anchored at `/#produtos`.
The product model has no `featured` concept at all — every product is
presented the same way in the catalog grid.

### Catalog

The catalog is not a separate page — it lives on the home page as the
`/#produtos` section (see "Home" above). There is no standalone `/produtos`
index route; only individual product pages have their own route.

Should provide:

* product grid, in a bounded-height scrollable area
* search
* category filters
* clear product cards
* empty-state behavior when filters return no results

### Product Detail

Route suggestion:

/produtos/[slug]

Each product should have:

* product name
* category
* price
* up to 3 images
* image carousel/gallery
* relevant additional information (material, dimensions, colors)
* availability when relevant
* WhatsApp CTA

Client decision: the product page has no descriptive text at all — no long
description, suggested-uses list, age guidance, safety information, or short
description. Name, category, price, photos and the optional specs above
(material, dimensions, colors, customization) are the only content shown.
Page title/meta description and structured-data description are generated
automatically from that same data (see `common.seo.productDescription` in
`src/content/common.ts`), not authored per product.

### Contact

Should provide the relevant seller contact channels.

## Product categories

The architecture must support dynamic categories based on product data.

Initial categories may include examples such as:

* Recursos terapêuticos
* Recursos sensoriais
* Atividades e jogos
* Organização
* Outros produtos 3D

These are initial categories and must be easy to rename, add or remove.

Do not hardcode filtering logic around a fixed category list.

## Product data

For V1, products must NOT use a database.

Products should be maintained as typed application data under:

src/content/products.ts

or an equivalent structure under src/content/.

Create a TypeScript Product model.

The product model should support at least:

* id
* slug
* name
* category
* price (optional — omitted for products with no fixed price, which show "Consultar valor" and skip the cart)
* images
* available

Optional fields may include when useful:

* dimensions
* piece count (for kits/sets where a physical size isn't the point)
* additional price options (e.g. a full-kit price alongside the base/unit price)
* material
* color information
* customization information

Client decision: `description`, `shortDescription`, `suggestedUses`,
`ageGuidance`, `safetyInfo`, `featured` and `tags` were removed from the product
model — the catalog and product page carry no descriptive copy at all, only
name, category, price, photos and the optional specs above. Every product
appears in the catalog the same way; none is singled out as "featured".

Avoid unnecessary fields.

Images must support a maximum of 3 images per product initially.

## Product images

Prefer local product assets under:

public/products/

Recommended structure:

public/products/
product-slug/
01.webp
02.webp
03.webp

Use appropriate image optimization through Next.js.

Do not depend on random external image URLs.

## Product catalog

Product cards should clearly communicate:

* image
* product name
* category
* price
* action to view details

The catalog should support:

* category filtering
* text search

Filters should work without requiring a backend in V1.

## Product page

The individual product page must provide a stronger presentation than the catalog card.

Product imagery should be prominent.

When multiple images are available, provide a simple carousel or gallery.

Do not introduce a heavy carousel dependency unless necessary.

## WhatsApp integration

The primary product CTA should open WhatsApp.

CTA examples:

* Tenho interesse
* Quero saber mais
* Falar sobre este produto

The WhatsApp message should automatically contain the product name.

Example:

"Olá! Vi o produto [PRODUCT NAME] no site da Hunter3D e gostaria de saber mais."

When appropriate, include the product page URL in the generated message.

The WhatsApp number must be centralized in:

src/config/

Do not hardcode the phone number across multiple components.

## Contact information

Contact information must be centralized under src/config/.

Possible channels:

* WhatsApp
* Instagram
* email

Use placeholders when final information has not yet been supplied.

Clearly mark placeholders or missing client information.

Client decision: the footer only shows WhatsApp and Instagram as clickable
contact icons. Email is kept centralized in `src/config/site.ts` and used in
the site's structured data (JSON-LD), but is not displayed as a contact
option in the UI.

## Copywriting

All customer-facing copy must follow:

docs/BRAND_VOICE.md

Avoid generic AI-generated marketing phrases.

The website should explain clearly what the business offers without sounding exaggerated.

Do not invent:

* therapeutic outcomes
* medical claims
* certifications
* testimonials
* sales numbers
* professional qualifications
* customer results

Products may be described by their characteristics and intended/suggested uses, but the website must not claim that a product treats, cures or guarantees improvement of medical or developmental conditions unless explicitly supported by information supplied by the client.

## Visual direction

Desired characteristics:

* welcoming
* modern
* clean
* creative
* professional
* approachable
* visually appealing
* trustworthy

The website should connect with therapy and sensory-resource audiences without looking clinical or hospital-like.

It should also avoid becoming excessively childish, because the catalog may contain products for different audiences and categories.

Use the frontend-design workflow before implementation.

The visual identity should feel unique to Hunter3D.

Avoid generic SaaS aesthetics.

## Responsive design

The catalog is expected to receive significant mobile traffic.

Prioritize:

* easy product browsing
* comfortable touch targets
* readable product information
* simple filters
* quick WhatsApp access

Mobile UX is critical.

## SEO

Implement technical SEO for:

* home page
* catalog
* individual product pages

Individual product pages should have unique metadata generated from product data.

Use semantic URLs based on product slugs.

Do not make unsupported SEO ranking claims.

## Accessibility

Follow Stahlberg Labs accessibility standards.

Pay special attention to:

* image alt text
* carousel controls
* keyboard accessibility
* visible focus states
* buttons
* filters
* form controls
* text contrast

## V1 scope

V1 MUST NOT implement:

* user accounts
* administrator login
* database
* product CRUD
* checkout
* online payment
* order management
* inventory management
* customer accounts

Products will initially be manually maintained in the codebase.

## Approved exception — WhatsApp interest bag ("sacola")

The Stahlberg Labs default standard excludes shopping carts from V1-style
catalog sites, and that default still applies to every other project. For
Hunter3D specifically, the client requested and approved an exception:
a client-side "sacola" (bag) that lets a visitor collect multiple products
before contacting the seller, so the WhatsApp message lists everything at
once instead of one message per product.

This is explicitly NOT a shopping cart in the e-commerce sense. It must stay
within these limits:

* No backend, no database, no server-side persistence — state lives only in
  the visitor's browser (localStorage).
* No checkout, no payment, no order creation, no order/inventory management.
* No accounts — the bag is anonymous and local to the device/browser.
* Its only output is a pre-filled WhatsApp message listing the selected
  products, quantities, and an estimated total. Price, customization,
  shipping and final confirmation are still negotiated entirely over
  WhatsApp, exactly as with a single-product inquiry.
* An item can be added, its quantity changed, or removed — nothing more.

If a future project ever needs something similar, treat it as a new,
separate approval — this exception is scoped to Hunter3D only.

## Product management for V1

Create:

docs/PRODUCT_MANAGEMENT.md

This document must explain, in simple steps, how to:

* add a product
* edit a product
* remove a product
* add product images
* change the product price
* change a category
* mark a product as unavailable

Product management documentation must reference the actual implementation generated for the project.

## Mock products

V1 launched with mock products to demonstrate the product grid, categories,
search, filters, product detail pages, and the unavailable state. Mock
product information was clearly fictional/example content, easy to replace.

Client decision: the mock catalog has since been replaced with the client's
real products (names, prices, photos and specs) in `src/content/products.ts`
— see docs/PRODUCT_MANAGEMENT.md for how to keep maintaining it.

Do not invent testimonials or medical claims.

## Future phase — Admin

Do NOT implement the administrator system in V1.

However, structure the Product model and UI so a future migration from src/content/products.ts to a database is straightforward.

Possible future architecture:

Public website
→ Product service/repository
→ MySQL

Admin
→ authenticated /admin area
→ product CRUD
→ MySQL
→ external image/object storage when necessary

An obscure or hidden /admin URL alone must never be considered authentication.

The future admin interface must use real authentication and authorization.

## Technical constraints

Follow CLAUDE.md.

Standard stack:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Vercel

Do not use Supabase.

Do not introduce MySQL for V1.

Do not introduce unnecessary dependencies.

Prefer native/simple implementations when reasonable.

## Final objective

The site should feel like a real, polished product catalog — it now runs on the client's real Hunter3D products, names, prices and photos.
