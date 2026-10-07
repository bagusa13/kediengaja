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

## Dual-Experience Responsive Architecture (Mobile is Not a Shrunk Desktop)
This project enforces intentional art direction across viewports:
- **Core Axiom**: *Mobile is NOT a smaller desktop. Desktop and mobile are two deliberately art-directed compositions of the exact same brand.*
- **Shared Brand DNA**:
  - Brand identity (`Kediengaja`), typography family, warm-neutral color system (`#F8F7F3`, forest green, ink), component language, and interaction feel.
- **Compositional Independence**:
  - **Desktop (1024px–1920px)**: Horizontal narrative, multi-column grids, expansive landscape framing, side-by-side content, persistent navigation, generous breathing space.
  - **Mobile (360px–430px)**: Vertical narrative rhythm, reordered content, dedicated crop and focal points (e.g. centering Sindoro peak at 38%), simplified navigation (compact header + hamburger), concise copy length, stacked/hierarchical CTA pairs, thumb-friendly safe-area controls (compact circular WhatsApp).
- **Evaluation Question**: For every section, always ask: *“What is the most elegant, human composition for a 390px viewport?”* — never *“How do I squeeze the 1440px desktop layout down to 390px?”*

## Master Hero Lock (DO NOT MODIFY)
The Homepage Hero and Hero-to-Content transition are **FINAL, APPROVED, AND LOCKED**:
- **Video & Landscape Fit**: `public/video/kediengajaVideo.mp4`, full bleed, `object-[38%_center] sm:object-[center_35%]`. Untouched landscape extending cleanly to the bottom edge. Zero white fade / milky mask.
- **Desktop Layout**: Viewport height `lg:h-[100svh] lg:min-h-[720px]`, vertically centered with optical upward lift (`sm:-translate-y-8 lg:-translate-y-12`), left-aligned text in upper sky zone.
- **Section Boundary ("Skat")**: Apple-style 1px hairline divider (`border-b border-stone-300/60` and `border-t border-stone-300/70` with `shadow-[0_1px_4px_rgba(0,0,0,0.08)]`).
- **Mobile Layout**: `h-[88svh] xs:h-[90svh] min-h-[560px]`, top-aligned content (`pt-20`), compact weather metadata, editorial headline, stacked CTA pair with quiet secondary link, and compact circular WhatsApp floating button.
- **Lock Status**: STRICTLY LOCKED. Do NOT alter hero height, positioning, framing, text alignment, or transition styling.


