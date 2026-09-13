---
name: write-landing-copy
description: Must be used whenever creating, rewriting, reviewing, or modifying customer-facing website copy, landing-page content, headlines, CTAs, service descriptions, About content, FAQs, portfolio descriptions, or marketing copy.
context: fork
agent: copywriter
background: false
user-invocable: false
---

Create or review the customer-facing website copy required by the current task.

Follow:

- CLAUDE.md
- docs/BRAND_VOICE.md
- the relevant client brief

## Process

### 1. Understand the visitor

Identify:

- target audience
- problem or need
- expected outcome
- objections
- desired conversion

### 2. Understand the business

Identify:

- services
- differentiators
- credibility signals
- positioning
- tone

### 3. Create or review the copy

Cover only sections relevant to the requested task.

Possible content includes:

- Hero
- Services
- Benefits
- Differentiators
- Process
- Portfolio
- About
- FAQ
- CTA
- Contact

### 4. Store content correctly

All client-specific editorial copy must live under:

src/content/

Prefer files such as:

- src/content/home.ts
- src/content/services.ts
- src/content/about.ts
- src/content/contact.ts

Do not hardcode client-specific copy inside reusable React components.

### 5. AI-language review

Remove:

- vague claims
- marketing clichés
- buzzwords
- excessive adjectives
- repetitive phrases
- generic agency language

### 6. Conversion review

Ensure relevant sections answer:

- What do you do?
- Is this for me?
- Why should I trust you?
- What will I get?
- How does it work?
- What should I do next?

### 7. Final quality check

The copy must:

- sound natural when read aloud
- match the client's identity
- support the page objective
- have clear calls to action
- avoid generic AI-style language