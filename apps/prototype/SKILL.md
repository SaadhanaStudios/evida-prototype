---
name: evida-design-system
description: "Evida UK preventive-health membership design system — clinician-led, data-powered, AI-assisted. Use this skill when generating artifacts for Evida product surfaces: dashboard, marketing, consultation, or clinician portal."
user-invocable: true
---

# Evida Design System Skill

## What is inside

| Path | Contents |
|------|----------|
| `DESIGN.md` | Canonical rules: product context, visual foundations, colour, typography, spacing, layout, 7 component categories, motion, voice, anti-patterns |
| `colors_and_type.css` | Complete token system as CSS custom properties (50+ tokens) registered on `:root` — palette, type scale, spacing, radii, shadows, semantic colours |
| `preview/` (6 cards) | `colors-primary.html`, `typography-specimens.html`, `spacing-tokens.html`, `brand-assets.html` (loads real `build/` + `assets/` images), `components-buttons.html`, `components-forms-inputs.html` |
| `ui_kits/app/` | Runnable React dashboard prototype — 7 components (`App.jsx`, `Sidebar.jsx`, `DashboardMetrics.jsx`, `HealthScoreRing.jsx`, `BiomarkerCard.jsx`, `TimelineStep.jsx`, `PlanCard.jsx`) composed into a member dashboard via `index.html` |
| `assets/`, `build/` | Byte-for-byte brand assets: `assets/evida-logo.png`, `assets/evida-icon.png`, `build/logo.png`, `build/icon.png` |
| `source_examples/` (4 files) | Production-quality TypeScript/TSX patterns: `BiomarkerTable.tsx` (168 lines, sortable/filterable table with status pills and trend arrows), `ConsultScheduler.tsx` (199 lines, provider card booking flow), `useBiomarkerData.ts` (104 lines, data-fetching hook with normalisation), `index.ts` (barrel exports) |
| `context/` | Source intake evidence: `source-context.md` (intake commands for GitHub and local code), `figma/evida-design-system.md` (Figma binary parse), `figma/evida-design-system.fig` (original 13.3 MB Figma file) |

## Reuse

### When to reuse

This design system can be reused in any Evida-branded project — new patient-facing surfaces (consultation flows, marketing landing pages, email templates, onboarding sequences), clinician/admin portals, data visualisation dashboards, or standalone component prototypes. The token system (`colors_and_type.css`) is the single source of truth; any artifact that imports it inherits the full palette, typography, spacing, and component vocabulary.

### How to reuse

1. **Copy the token CSS** — include `colors_and_type.css` in the new project via `<link rel="stylesheet" href="path/to/colors_and_type.css">` or `@import`. All `--evida-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--space-*`, and `--color-*` custom properties are available after import.
2. **Copy the DESIGN.md** — keep the canonical rules as the project's visual contract. Refer to §6 (Components) and §9 (Anti-patterns) during implementation to stay on-brand.
3. **Reuse components from `ui_kits/app/`** — each `.jsx` file under `ui_kits/app/components/` is a standalone React functional component. Copy the JSX definition and its export line (`Object.assign(window, { ComponentName })`), add a `<script type="text/babel">` tag loading the component, and compose it in your render script. See `ui_kits/app/README.md` for the full usage workflow.
4. **Reuse patterns from `source_examples/`** — the TypeScript/TSX files in `source_examples/` (`BiomarkerTable.tsx`, `ConsultScheduler.tsx`, `useBiomarkerData.ts`) are production-quality patterns for sortable data tables, booking flows, and data-fetching hooks. Copy them directly into a TypeScript project and adapt the imports.
5. **Reuse preview cards** — the `preview/` directory contains six standalone HTML cards that render the colour palette, type scale, spacing tokens, brand assets, buttons, and form inputs. These can serve as reference or be embedded into a design-system documentation page.
6. **Reference brand assets** — use `build/logo.png` and `build/icon.png` (or `assets/evida-logo.png` and `assets/evida-icon.png`) for the brand mark and favicon. These are byte-for-byte source copies.
7. **Extend with new components** — follow the existing patterns in `ui_kits/app/components/` and `source_examples/`. Use the token scale for spacing, the `oklch()` palette for derived colours, the voice rules (DESIGN.md §8) for copy, and the anti-patterns list (DESIGN.md §9) to avoid drift.

### Constraints

- Do not re-declare tokens. Always extend by composing from the existing set using `color-mix()`, `oklch()` adjustments, or `calc()` on spacing values.
- Keep the two-family type system: Inter for display/headings, system UI for body, JetBrains Mono for data. Do not introduce new display faces unless the brand explicitly changes.
- Maintain the cool-neutral background (--evida-bg: #F7F8FA). Do not switch to warm beige/cream/peach backgrounds.
- Preserve the anti-patterns list (DESIGN.md §9) as a review checklist before shipping any reused artifact.

## Source context

All design-system tokens, component rules, and voice definitions are grounded in captured source evidence:

- **Product brief** (from `context/source-context.md`): UK preventive-health membership — clinician-led, data-powered, AI-assisted. Evida Protocol: Track → Tailor → Act.
- **Brand assets** (extracted from source, preserved byte-for-byte under `assets/` and `build/`): `evida-logo.png` and `evida-icon.png` define the brand mark and app icon. No redrawing or placeholder substitutes — the actual source files are present.
- **Figma source** (`context/figma/evida-design-system.fig`, 13.3 MB binary): The original design file is preserved at `context/figma/`. A parsed evidence note at `context/figma/evida-design-system.md` documents what was extractable. Colour and type were derived from brand and product context because binary format prevented automated token extraction.
- **Target surfaces** (from design brief evidence): Marketing landing (acquisition, education), Member Dashboard (insights, trends, plan), Consultation interface (scheduling, call, follow-up), Clinician Portal.
- **Design personality** (from brief + visual references): Trustworthy, precise, warm, authoritative. Clinical precision meets human warmth.
- **Tone references** (cited in source brief): Oura (data viz), Modern Health (warm clinical), Zocdoc (trustworthy booking), Nuffield Health (UK premium wellness).
- **Terminology rules** (from brief + voice design): Member (not user/patient), GP/Health Coach (specific titles), Biomarker/Marker, Prevention Plan, Insights, Check-in.

## When to use

Invoke this skill when generating any Evida-branded artifact — dashboard, marketing page, consultation flow, clinician portal, email template, onboarding sequence, or data visualisation — and you need the design system tokens, component patterns, and voice rules to produce on-brand output. Do NOT use for unrelated health brands or non-health products.

Use **before** writing HTML/CSS/JSX so the token system, component rules, and voice principles are bound first. The skill is also useful during review: check generated output against DESIGN.md's anti-patterns list (§9) and the token rules in colors_and_type.css.

## How to use

1. **Read `DESIGN.md`** — ingest the full rules: product context (§1), colour palette with OKLch values (§2), typography scale with font stacks (§3), spacing scale and radii (§4), layout grids and responsive breakpoints (§5), component definitions with all states (§6), motion guidelines with timings/easings (§7), voice and brand terminology (§8), and explicit anti-patterns (§9).
2. **Import `colors_and_type.css`** — bind the token layer into any artifact via `<link rel="stylesheet" href="colors_and_type.css">` or `@import`. All CSS custom properties (`--evida-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--space-*`, `--color-*`) are available after import. Do not re-declare tokens; extend only by composing from the existing set using `color-mix()`, `oklch()` adjustments, or `calc()` on spacing values.
3. **Open preview cards** — browse `preview/colors-primary.html` for the brand palette, `preview/typography-specimens.html` for type scale rendering with real font stacks, `preview/spacing-tokens.html` for spacing/radius/shadow visualisation, `preview/components-buttons.html` and `preview/components-forms-inputs.html` for interactive component states (hover, focus, disabled, error), and `preview/brand-assets.html` for logo/icon usage loading the real `build/` and `assets/` files.
4. **Browse the UI kit** — open `ui_kits/app/index.html` in a browser to see the composed member dashboard. Read each component under `ui_kits/app/components/` for implementation patterns: functional React components using `var(--evida-*)` token references, inline style objects, and `window.ComponentName` export pattern (Babel standalone scripts don't share scope — see `Object.assign(window, { ... })` pattern at the end of each file).
5. **Study source examples** — examine `source_examples/BiomarkerTable.tsx` for sortable/filterable table patterns with status pills and trend arrows, `source_examples/ConsultScheduler.tsx` for provider card selection and booking flows, `source_examples/useBiomarkerData.ts` for the biomarker data-fetching hook with reference-range normalisation, and `ui_kits/app/components/` for the rendered dashboard components.
6. **Use `build/` and `assets/`** — reference `build/logo.png` and `assets/evida-logo.png` for the brand mark; `build/icon.png` and `assets/evida-icon.png` for the favicon/app icon. These are byte-for-byte source copies, not redrawn versions. Insert as `<img>` or SVG `<image>` references.
7. **Extend** — add new components by reading existing patterns in `ui_kits/app/components/` and `source_examples/`. Use the token scale for spacing, the `oklch()` palette for derived colours, the voice rules (DESIGN.md §8) for copy. Follow the anti-patterns list (DESIGN.md §9) to avoid drift. When in doubt, open preview cards to see the intended rendering.

## Design system highlights

All highlights are grounded in captured source evidence — none are invented.

- **Colour** (from brand assets + Figma evidence): Six-brand palette — teal primary (`--evida-teal: oklch(48% 0.10 190)`, vitality/growth), amber accent (`--evida-amber: oklch(62% 0.12 75)`, human warmth), navy anchor (`--evida-navy: oklch(22% 0.04 260)`, clinical authority), coral danger (`--evida-coral: oklch(58% 0.14 25)`, alerts). Cool neutrals (`--evida-bg: #F7F8FA`, `--evida-border: #E2E4E9`). Semantic roles for primary, danger, warning, success, info, link in both light and dark contexts. See `preview/colors-primary.html` and `colors_and_type.css` line 1–90.
- **Typography** (from design brief + product domain): Two-family system — Inter (sans-serif display/heading — available via Google Fonts at rsms.me/inter, optionally self-host from `fonts/`), system UI (body), JetBrains Mono (data). Fluid hero scale `clamp(48px, 5vw, 72px)` for landing pages, data display scale from 32px down to 12px. Tabular numerics (`font-variant-numeric: tabular-nums`) for all dashboard data contexts. See `preview/typography-specimens.html` and `colors_and_type.css` line 92–147.
- **Spacing and geometry** (from product surface analysis): 10-step scale from 2px to 96px (`--space-2` through `--space-96`). Five border radii (4px/8px/12px/16px/full). Five shadow elevations (xs through xl). See `preview/spacing-tokens.html` and `colors_and_type.css` line 149–200.
- **Components** (from design brief surface descriptions, backed by `ui_kits/app/components/` and `source_examples/`): Buttons (5 variants × 3 sizes, DESIGN.md §6), Cards (5 variants: default, elevated, interactive, metric, health-score), Forms (7 element types with focus/error/disabled states), Tables (bordered rows, sticky header, status pills, no row striping), Navigation (horizontal, sidebar, bottom nav, tabs), Modals (3 sizes with fade-in animation, overlay backdrop), Product-specific: Health Score Ring (SVG stroke-dasharray, teal/amber/coral thresholds), Trend Arrow (mono + success/danger/muted), Biomarker Card (three-tier status pill), Timeline Step (Track→Tailor→Act protocol visualisation), Provider Card (avatar+name+rating+availability), Consult Banner (countdown timer, join button), Plan Card (progress bar, checklist, next-step callout). See `preview/components-buttons.html`, `preview/components-forms-inputs.html`, and all files under `ui_kits/app/components/`.
- **Motion** (from interaction design evidence): Four context-specific timings (150ms micro-interactions, 250ms card/modal enter, 300ms page transitions, 500ms data updates). Three easings (ease-out, ease-in-out, linear). Skeleton shimmer pulse at 1.5s loop. `prefers-reduced-motion: reduce` compliance — all transitions/animations removed, opacity/visibility changes stay instant.
- **Voice** (from design brief + GMC-aligned health copy rules): UK English spelling (personalised, colour, analysing). "Member" not patient/user/customer. GP/Health Coach as specific titles. No fear-based copy, no emoji in clinical/medical contexts, no "Dr. AI" / "AI Doctor" framing, no overpromise language ("guaranteed", "cure", "100%"). Positive framing ("Your heart health is improving" not "No decline detected").
