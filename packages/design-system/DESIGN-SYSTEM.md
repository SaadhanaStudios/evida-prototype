# Evida Design System

> The canonical visual language for the Evida digital ecosystem.
> **Source of truth for tokens:** [`tokens.css`](./tokens.css).
> **Derived from:** the live website [evida.uk](https://evida.uk) (Webflow), extracted 2026-06-13.

This document is the reference; `tokens.css` is the enforceable implementation. Both `apps/web` and `apps/prototype` consume `tokens.css` so they cannot drift. When the brand evolves, change `tokens.css` and update this doc — never hard-code brand values in an app.

---

## 1. Provenance

The website's coherent design lives in its published Webflow stylesheet (`evida-…webflow.shared.min.css`), **not** in the `apps/web` repo — the repo is a partial export whose base Webflow CSS is absent and whose inline styles diverge. This system was therefore extracted from the *live rendered site*, which is the authoritative, stable source. Webflow's internal variable names (`--_color-var---color-*`) are preserved as comments in `tokens.css` for re-reconciliation.

---

## 2. Colour

The palette is **warm and editorial** — cream backgrounds, olive/teal text, a single teal brand anchor, pale-yellow buttons, coral for alerts. This is the defining difference from the prototype's previous cool-grey/navy clinical palette.

| Token | Value | Role |
|-------|-------|------|
| `--evida-teal` | `#216A74` | Brand anchor — logo, brand chrome, teal button variant |
| `--evida-teal-primary` | `#138A7D` | Brighter teal for primary interactive accents |
| `--evida-teal-text` | `#1A555D` | Teal-tinted text (button labels, links) |
| `--evida-heading` | `#09332E` | Deep heading colour |
| `--evida-text` | `#2D2700` | Body text (olive) |
| `--evida-text-muted` | `rgba(45,39,0,.5)` | Secondary/caption text |
| `--evida-coral` | `#FF5A5F` | Alerts, flags, danger |
| `--evida-yellow` | `#FCE96F` | Secondary accent |
| `--evida-yellow-soft` | `#FEFAD8` | Soft yellow tint |
| `--evida-btn-bg` | `#FEF2A7` | Default button background (pale yellow) |
| `--evida-btn-hover` | `#FFFBE0` | Button hover background |
| `--evida-btn-primary` | `#FEF6C5` | Primary button background |
| `--evida-bg` | `#FEFBE7` | Page background (cream) |
| `--evida-bg-light` | `#FEFDF5` | Lighter background |
| `--evida-surface` | `#FDFBEF` | Card / component surface |
| `--evida-gray` / `--evida-gray-light` | `#575757` / `#DCD5A9` | Neutral / warm grey, borders |

**Application rules**
- Backgrounds are cream (`--evida-bg`), never cool grey or white-clinical.
- Teal is the only brand colour — used sparingly for anchor moments and the teal button variant.
- Buttons default to **pale yellow**, not solid teal. The teal-background button is a secondary variant (white text).
- Coral is reserved for alerts/flags — never decorative.

---

## 3. Typography

Three families, **light weights** (400 default; 300/500 for variation):

| Family | Token | Use |
|--------|-------|-----|
| **Geist** | `--evida-font-display` | Display & large headings (hero h1 = 60px, weight 400, tracking `-0.035em`) |
| **Literata** (serif) | `--evida-font-serif` | Editorial accent headings — used selectively for warmth |
| **Inter** | `--evida-font-body` | Body, UI, buttons (the workhorse) |

All three load via Google Fonts. Headings sit in teal/heading colours, are tightly tracked (`-0.035em`), and use `120%` line-height.

| Scale token | Size | Typical use |
|-------------|------|-------------|
| `--evida-text-display` | 60px | Hero |
| `--evida-text-h1` | 48px | Page title |
| `--evida-text-h2` | clamp(22→34px) | Section heading |
| `--evida-text-body` | 22px | Body copy |
| `--evida-text-label` | 16px | Labels, buttons |
| `--evida-text-small` | 14px | Captions, metadata |

> **Note for the app surface:** 22px body and 60px display are *marketing-site* scales. In dense app screens (dashboard, tables) the prototype may step the body down for legibility while keeping the families, colours, and weights — this is the one place "full visual match" bends to app ergonomics. Flag any such step-down in the prototype work for review.

---

## 4. Spacing, Radius, Shadow

**Spacing** (`--evida-space-*`): `8 · 16 · 24 · 48 · 80 · 120`.

**Radius** (`--evida-radius-*`): `sm 8 · btn 12 · md 16 · lg 24 · full 999`. The site is generously rounded — cards at 16–24px.

**Shadow** (`--evida-shadow-*`): near-flat. `sm = 0 2px 8px rgba(0,0,0,.03)`, `md` adds a 1px hairline ring. No heavy elevation.

---

## 5. Components

### Buttons
- **Default:** `--evida-btn-bg` (pale yellow) background, `--evida-teal-text` label, `--evida-radius-btn` (12px), padding `12px 20px`, Inter 16px, `transition: background-color var(--evida-transition)`. Hover → `--evida-btn-hover`.
- **Teal variant:** `--evida-teal` background, white text. Hover reverts text to teal.

### Cards / surfaces
- `--evida-surface` background, `--evida-radius-md`–`lg` (16–24px), `--evida-shadow-sm`. Flat and soft, generous padding.

### Headings
- Geist, weight 400, `--evida-heading` or `--evida-teal-text`, tracking `-0.035em`, leading `120%`. Literata serif for editorial section titles where warmth is wanted.

---

## 6. How each app consumes this

**`apps/web`** — `@import` `tokens.css` at the top of `src/app/globals.css`, then point the existing `@theme inline` colours at the `--evida-*` vars so Tailwind utilities and the canonical tokens share one set of values.

**`apps/prototype`** — `colors_and_type.css` `@import`s a synced mirror (`./tokens.css`, refreshed via `npm run sync-tokens`) plus the Geist/Inter/Literata web fonts, then maps the prototype's semantic token names (`--evida-fg`, `--evida-muted`, `--evida-navy`, etc.) onto the canon. A local mirror is required because the prototype deploys with root `apps/prototype/` and can't reach `packages/` at runtime; it's a derived copy, so the canon stays the single source.

Prototype class vocabulary (in `_app-shell.css` / `colors_and_type.css`):
- **Buttons:** `.btn` + `.btn-primary` (pale-yellow CTA), `.btn-teal` (teal/white CTA), `.btn-secondary` (outline), `.btn-ghost` (text); sizes `.btn-sm` / `.btn-lg` / `.btn-form`.
- **Headings:** base `<h1>–<h6>` adopt the display face (Geist) + lighter tracking automatically; inline weight/colour still win on dark surfaces.
- **Utilities:** `.text-serif` (Literata editorial accent), `.text-heading` (deep teal-green), the `.text-h1…h4` / `.text-data-*` scale, and token-driven `.status-pill` / `.stat-card` / `.flag-*` chips.

---

## 7. Migration gap (prototype → this system)

What changes when the prototype adopts this system:

| Aspect | Prototype (old) | This system (website) |
|--------|-----------------|------------------------|
| Page background | cool grey `#F7F8FA` | warm cream `#FEFBE7` |
| Body text | navy `#1A1D26` | olive `#2D2700` |
| Headings | Inter, bold | Geist 400, tight tracking |
| Accent | amber `#D4893B` | yellow `#FCE96F` + coral |
| Buttons | solid teal | pale yellow (teal = variant) |
| Type families | Inter + system + JetBrains Mono | Geist + Inter + Literata |
| Teal / coral | `#216A73` / `#FF5A5F` | `#216A74` / `#FF5A5F` (≈ already aligned) |

Voice, terminology, and accessibility rules from the prototype's existing handover material still apply — this system changes the *look*, not the *language*.
