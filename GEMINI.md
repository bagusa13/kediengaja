# Project Guidelines: UI/UX & Quality Directives

## Design & UI/UX Intelligence (ui-ux-pro-max)
This project uses **ui-ux-pro-max** for all user interface, layout, typography, and styling decisions.
- Search command: `python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`
- Domain search: `python .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>`
- Stack best practices: `python .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>`

## Vector Iconography (lucide-icons)
This project uses **lucide-icons** for all UI icons.
- Skill guide: `.agents/skills/lucide-icons/SKILL.md`
- No emoji as navigation or structural icons; use crisp Lucide SVG icons.
- Ensure proper sizing (`w-4 h-4`, `w-5 h-5`) and `aria-hidden="true"` accessibility tags.

## Code Pragmatism & Anti-Bloat (ponytail)
This project applies **ponytail** (The Lazy Senior Developer ruleset):
- Skill guide: `.agents/skills/ponytail/SKILL.md`
- Apply the ladder: YAGNI -> existing code -> stdlib -> native platform features -> existing dependencies -> minimum clean code.
- No unrequested abstractions, no bloated boilerplate, no unnecessary libraries.

## SEO, OpenGraph & Structured Data (seo-schema-opengraph)
This project applies **seo-schema-opengraph** for top search rankings and social media sharing:
- Skill guide: `.agents/skills/seo-schema-opengraph/SKILL.md`
- Include complete `<head>` meta tags: title, description, canonical, robots, and OpenGraph / Twitter cards.
- Embed Schema.org JSON-LD for local business, reviews, prices, and FAQ rich snippets.

## Direct WhatsApp Booking & Conversion (whatsapp-booking-engine)
This project applies **whatsapp-booking-engine** to maximize visitor conversions:
- Skill guide: `.agents/skills/whatsapp-booking-engine/SKILL.md`
- Implement clean, responsive reservation forms with package selector, date picker, and pax count.
- Generate structured, pre-filled WhatsApp URLs (`https://wa.me/...`) for instant admin notification.
- Include a floating WhatsApp CTA badge with live status indicator.

<!-- antislop:start -->
## Anti-Slop Filter (antislop)
Follow the anti-slop guidelines to prevent generic, repetitive, or low-quality AI outputs in web UI, copy, and code:
- Core filter: `.agents/skills/antislop/SKILL.md`
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- Accessibility / Human: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`

Before starting UI work, confirm when anti-slop applies (during creation or review).
<!-- antislop:end -->
