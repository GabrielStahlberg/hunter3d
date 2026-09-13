---
name: prepare-production
description: Runs the Stahlberg Labs production preflight checklist before a website is deployed.
disable-model-invocation: true
---

Prepare the current website for production.

Do not deploy automatically.

Validate:

1. lint
2. production build
3. TypeScript
4. environment variables
5. secrets
6. SEO metadata
7. sitemap
8. robots
9. accessibility basics
10. responsive implementation
11. navigation
12. external links
13. contact information
14. forms
15. error states
16. favicon and branding
17. Open Graph configuration
18. analytics configuration if required

Use the qa-reviewer and seo-reviewer agents when useful.

Do not mark the website ready if blocking issues remain.

Return a concise production checklist with PASS, FAIL, or NOT APPLICABLE for each relevant item.