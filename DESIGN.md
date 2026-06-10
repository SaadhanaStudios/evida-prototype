# Evida is a UK preventive-health membership Design System

> Category: Health & Wellness
> Surface: Web, iOS, Android, Dashboard
> Status: Active

Evida is a UK preventive-health membership: clinician-led, data-powered, AI-assisted. The Evida Protocol — **Track, Tailor, Act** — guides members from baseline assessment through personalised prevention to ongoing engagement.

---

## Source Context

This design system was generated from the following evidence:

- **Design brief:** Evida preventive-health membership, UK market. Clinician-led, data-powered, AI-assisted. Protocol: Track → Tailor → Act.
- **Brand assets:** Evida Logo.png and Evida Icon.png (preserved under `assets/` and `build/`).
- **Figma source:** `Evida Design System.fig` (13.3 MB binary — locally parsed at `context/figma/evida-design-system.md`; binary format prevented token extraction, so colour and type definitions were derived from brand and product context).
- **No linked GitHub repositories** or local code folders at time of generation.

The palette, typography, spacing, components, motion, and voice rules below were authored to match the product identity: a premium UK preventive-health membership that balances clinical authority with human warmth.

---

## 1. Visual Theme & Atmosphere

**Mood:** Clinical precision meets human warmth. The system should feel like a premium health service — trustworthy, data-informed, but never cold. Members should feel they are in expert hands while also feeling personally supported.

**Product context:** A membership platform where members track biomarkers (blood tests, wearables), consult with GPs and health coaches, and follow a personalised prevention plan. The primary surfaces are a dashboard (insights, trends, plan), a consultation interface (scheduling, call, follow-up), and marketing pages (acquisition, education).

**Design personality:**
- **Trustworthy** — clean typography, restrained palette, generous whitespace
- **Precise** — tabular numerics, clear hierarchy, data visualisations with purpose
- **Warm** — soft radii, human photography, warm accent moments
- **Authoritative** — clear call-to-value, clinical language when appropriate, expert credentials surfaced

**References:** Oura (data visualisation), Modern Health (warm clinical), Zocdoc (trustworthy booking), Nuffield Health (UK premium wellness).

---

## 2. Color

### Brand Palette

| Token | Value | OKLch | Usage |
|-------|-------|-------|-------|
| `--evida-teal` | `#216A73` | `oklch(45% 0.09 195)` | Primary brand colour — vitality, health, growth. Used for primary CTAs, active states, brand chrome. |
| `--evida-teal-light` | `#E0F5F4` | `oklch(94% 0.03 190)` | Tinted surface for teal-toned cards, badges, status backgrounds. |
| `--evida-teal-dark` | `#144045` | `oklch(29% 0.07 195)` | Deep variant for hover states, dark-mode primary. |
| `--evida-amber` | `#D4893B` | `oklch(62% 0.12 75)` | Accent — human warmth, energy, coaching highlights. |
| `--evida-amber-light` | `#FCF0DC` | `oklch(95% 0.04 85)` | Tinted surface for amber-toned callouts, badges. |
| `--evida-navy` | `#1B2A4A` | `oklch(22% 0.04 260)` | Deep anchor — clinical authority, trust. Used for headings, dark surfaces, footer. |
| `--evida-coral` | `#FF5A5F` | `oklch(63% 0.21 20)` | Warning/alert — test flags, critical notifications, urgent markers. |

### Neutral Palette

| Token | Value | OKLch | Usage |
|-------|-------|-------|-------|
| `--evida-white` | `#FFFFFF` | `oklch(100% 0 0)` | Background, cards. |
| `--evida-bg` | `#F7F8FA` | `oklch(97% 0.005 240)` | Page background. |
| `--evida-surface` | `#FFFFFF` | `oklch(100% 0 0)` | Card, modal, elevated surface. |
| `--evida-border` | `#E2E4E9` | `oklch(91% 0.006 250)` | Dividers, inputs, table borders. |
| `--evida-muted` | `#8B8FA0` | `oklch(60% 0.015 260)` | Secondary text, placeholder, disabled. |
| `--evida-fg` | `#1A1D26` | `oklch(18% 0.014 260)` | Primary text colour. |
| `--evida-fg-secondary` | `#4A4E5C` | `oklch(38% 0.015 260)` | Secondary text, captions. |

### Semantic Roles

| Role | Token | Light | Dark |
|------|-------|-------|------|
| Primary action | `--color-primary` | `--evida-teal` | `--evida-teal-light` |
| Primary hover | `--color-primary-hover` | `--evida-teal-dark` | `--evida-teal` |
| Danger | `--color-danger` | `--evida-coral` | `#F5A9A9` |
| Warning | `--color-warning` | `--evida-amber` | `--evida-amber-light` |
| Success | `--color-success` | `#2A9D7E` | `#6ECFB0` |
| Info | `--color-info` | `#4A8FE0` | `#8BB8F0` |
| Link | `--color-link` | `--evida-teal` | `--evida-teal-light` |

---

## 3. Typography

### Font Families

| Role | Stack |
|------|-------|
| Display / Heading | `'Inter', system-ui, -apple-system, sans-serif` |
| Body | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif` |
| Mono / Data | `'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, monospace` |

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Hero | `clamp(48px, 5vw, 72px)` | 700 | 1.1 | `-0.03em` | Landing page hero headline |
| H1 | `clamp(32px, 3vw, 48px)` | 700 | 1.2 | `-0.02em` | Page title |
| H2 | `clamp(24px, 2vw, 32px)` | 600 | 1.25 | `-0.015em` | Section heading |
| H3 | `20px` | 600 | 1.3 | `-0.01em` | Card title, subsection |
| H4 | `18px` | 600 | 1.35 | `0` | Minor heading |
| Body L | `18px` | 400 | 1.6 | `0` | Lead paragraph, dashboard intro |
| Body | `16px` | 400 | 1.55 | `0` | Default body text |
| Body S | `14px` | 400 | 1.5 | `0` | Secondary/caption text |
| Caption | `13px` | 500 | 1.4 | `0.01em` | Labels, metadata |
| Tiny | `12px` | 500 | 1.3 | `0.02em` | Badges, timestamps, legal |
| Data L | `32px` | 600 | 1.1 | `-0.02em` | Dashboard stat / metric (mono) |
| Data M | `24px` | 500 | 1.2 | `-0.01em` | Medium metric (mono) |
| Data S | `16px` | 500 | 1.3 | `0` | Inline data (mono) |

### Type Rules

- Display uses Inter (sans-serif) for clean, web-friendly headings; body stays on system sans for readability in data-dense contexts.
- Inter is available via Google Fonts. For self-hosted usage, download from `https://rsms.me/inter/` and place in `fonts/`.
- All numeric data in dashboard contexts uses `font-variant-numeric: tabular-nums`.
- Headings in clinical contexts (reports, biomarkers) use the body stack, not display — clinical = sober.
- Marketing/editorial pages may use display stack for headings freely.

---

## 4. Spacing

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2` | `2px` | Hairline, tight badge padding |
| `--space-4` | `4px` | Icon-gap, inner input padding |
| `--space-6` | `6px` | Tight label-spacing |
| `--space-8` | `8px` | Small gap, chip padding |
| `--space-12` | `12px` | Button padding, input-gap |
| `--space-16` | `16px` | Card padding, section gap |
| `--space-20` | `20px` | Dashboard card gap |
| `--space-24` | `24px` | Panel padding, form group gap |
| `--space-32` | `32px` | Section margin, modal padding |
| `--space-40` | `40px` | Major section gap |
| `--space-48` | `48px` | Page section padding |
| `--space-64` | `64px` | Hero padding |
| `--space-96` | `96px` | Full-page section gap |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Inputs, avatars, small badges |
| `--radius-md` | `8px` | Cards, buttons, modals |
| `--radius-lg` | `12px` | Feature cards, containers |
| `--radius-xl` | `16px` | Modals, panels |
| `--radius-full` | `9999px` | Pills, toggles, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle card separation |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Elevated card |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)` | Dropdown, tooltip |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.04)` | Modal backdrop |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.08), 0 10px 10px rgba(0,0,0,0.04)` | Drawer, overlay |

---

## 5. Layout & Composition

### Grid

- **Marketing pages:** 12-column grid, max-width `1200px`, 24px gutter, 16px page margin on mobile.
- **Dashboard:** Full-width fluid layout with a `280px` sidebar (collapsible to `64px` icon-only) and main content area with `32px` padding.
- **Mobile app:** Single-column, `16px` safe margins, bottom tab bar `64px` height.

### Page Structure

- **Header:** Product header with logo, navigation (or hamburger on mobile), user menu. Height `64px` on desktop, `56px` on mobile.
- **Sidebar (Dashboard):** Dark navy (`--evida-navy`) background, white icon/text, active state uses `--evida-teal`. Width `280px` expanded, `64px` collapsed.
- **Content area:** White/light background, card-based layout for dashboard widgets.
- **Footer (Marketing):** 3-column grid, navy background, white text, `--evida-teal` accent links.

### Information Density

- **Dashboard:** Medium density — one primary metric per card, 2–4 cards per row on desktop (grid `repeat(auto-fill, minmax(320px, 1fr))`).
- **Data tables:** Higher density — `48px` rows, compact cells, sticky header.
- **Mobile:** Single-card scroll, one screen per action.
- **Forms:** Left-aligned labels above inputs (stacked), generous `24px` spacing between groups.

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | `< 600px` | Single column, bottom nav |
| Tablet | `600–1024px` | 2-column card grid, sidebar as overlay |
| Desktop | `> 1024px` | Full dashboard layout, expanded sidebar |
| Wide | `> 1440px` | Max-width constrained, extra whitespace |

---

## 6. Components

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--evida-teal` | White | None | `--evida-teal-dark` |
| Secondary | Transparent | `--evida-fg` | `--evida-border` | `--evida-bg` |
| Ghost | Transparent | `--evida-fg` | None | `--evida-bg` |
| Danger | `--evida-coral` | White | None | Darken 10% |
| Link | Transparent | `--evida-teal` | None | Underline |

**Heights:** `40px` (default), `48px` (large), `32px` (small).  
**Radius:** `--radius-md` (8px).  
**Padding:** `12px 24px` default, `8px 16px` small, `16px 32px` large.

### Cards

- **Default:** White background, `--radius-md` (8px), `--shadow-xs`, `16px` padding.
- **Elevated:** Same with `--shadow-sm`, used for feature content.
- **Interactive:** Hover state with `--shadow-md` and slight `translateY(-2px)`.
- **Metric card:** Top label in `--muted`, large data value (`--font-mono`, `--space-32` size), optional trend indicator.
- **Health score card:** Teal left border (`4px`), score in top-right corner, progress bar.

### Forms

- **Input:** Height `40px`, `--radius-sm`, `--border` border, `12px 16px` padding. Focus state: `--evida-teal` ring (2px), no border change.
- **Label:** `14px` bold, `8px` below label.
- **Select:** Same as input with custom chevron.
- **Checkbox/Radio:** Custom styled, `20px` bounding box, `--evida-teal` checked state.
- **Validation:** Inline error message below input in `--evida-coral`, red border.
- **Range slider:** Teal track to the left, grey to the right, round thumb `20px`.

### Tables

- **Header:** `--evida-bg` background, `14px` bold, `48px` height, sticky top.
- **Row:** `48px` height, hover state on rows.
- **Cell:** `16px` padding horizontal, `12px` vertical.
- **No row striping** — bordered rows only (`--evida-border` bottom).
- **Status pill:** `6px` padding horizontal, `4px` vertical, `--radius-sm`, coloured text on tinted bg.

### Navigation

- **Primary (desktop):** Horizontal bar, `40px` item height, active state has `2px` teal bottom border.
- **Sidebar (dashboard):** Vertical nav, `44px` item height, icon + label, `8px` radius on hover, teal left border on active.
- **Mobile bottom nav:** Fixed `64px` bar, 4–5 icons with labels, active state teal.
- **Tabs:** Horizontal, `36px` height, active tab has bottom indicator in `--evida-teal`.

### Modals

- **Overlay:** Fixed full-screen, `rgba(0,0,0,0.5)` backdrop, `--shadow-xl`.
- **Container:** `--radius-xl` (16px), max-width `560px` (default) / `720px` (large) / `400px` (small), `--space-32` padding.
- **Header:** Heading + close icon.
- **Footer:** Right-aligned actions with minimum `8px` gap.
- **Animation:** Fade in overlay (`200ms`), scale up container (`300ms` ease-out).

### Product-Specific Components

- **Health Score Ring:** Circular progress indicator — svg stroke-dasharray driven, teal for good, amber for moderate, coral for attention.
- **Trend Arrow:** Up/down/flat indicator in mono + `--color-success` / `--color-danger` / `--muted`.
- **Biomarker Card:** Tiny card showing biomarker name, value, unit, trend, and status pill (normal / borderline / high).
- **Timeline Step:** Vertical timeline node with icon, title, date, status, and optional action button.
- **Provider Card:** Avatar + name + speciality + rating + next-available badge.
- **Consult Banner:** Large banner for upcoming/active consult with provider photo, countdown timer, join button.
- **Plan Card:** Prevention plan summary with completion progress, 3–5 action items, next step callout.

---

## 7. Motion & Interaction

### Durations & Easings

| Context | Duration | Easing | Purpose |
|---------|----------|--------|---------|
| UI micro-interactions | `150ms` | `ease-out` | Hover, focus, tap |
| Card/modal enter | `250ms` | `ease-out` | Card entry, modal open |
| Page transitions | `300ms` | `ease-in-out` | Route changes, drawer |
| Data updates | `500ms` | `ease-out` | Counter animation, chart transitions |
| Loading skeleton | `1.5s` loop | `linear` | Pulse shimmer |

### Hover & Focus

- All interactive elements have a visible hover state.
- Focus rings use `2px` solid `--evida-teal` with `2px` offset.
- Disabled elements at `opacity: 0.4`, no hover effect.
- Links have `underline` on hover, no underline by default.

### Loading

- **Initial load:** Centered spinner in `--evida-teal`.
- **Data fetch:** Skeleton cards matching the final layout shape, with a `pulse` shimmer animation.
- **Action loading:** Button shows inline spinner, text hidden, width preserved.

### Reduced Motion

- Respect `prefers-reduced-motion: reduce`: remove all transitions, animations, and parallax. Keep opacity/visibility changes instant.

---

## 8. Voice & Brand

### Tagline

"A healthier you. Powered by data. Led by experts."

### Tone

| Context | Tone | Example |
|---------|------|---------|
| Marketing | Aspirational, warm, confident | "Your health is your most valuable asset. Let's protect it together." |
| Dashboard | Precise, calm, helpful | "Your HbA1c is trending in a healthy direction." |
| Notifications | Direct, actionable, personal | "Your next blood test is due on 14 June. Book now." |
| Error | Apologetic, specific, helpful | "We couldn't load your latest results. Please refresh or contact support." |
| Clinical | Professional, clear, sober | "Your results show elevated LDL cholesterol. Your GP has been notified." |

### Terminology

- **Member** (not user, patient, customer) — "Our members get personalised prevention plans."
- **Evida Protocol** (capitalised, always the three-step model) — "The Evida Protocol starts with Track."
- **GP / Health Coach** (not doctor, practitioner, coach generically) — specific titles.
- **Biomarker** / **Marker** (not lab value, test result, metric) — "Your key biomarkers are stable."
- **Prevention Plan** / **Personalised Plan** (not programme, regime) — "Your Prevention Plan is ready."
- **Insights** (not findings, revelations, suggestions) — "Your weekly insights are available."
- **Check-in** (not consult, follow-up, meeting) — for the periodic GP/coach touchpoints.

### Capitalisation

- Title case: "Your Prevention Plan", "Book a Blood Test", "Track Your Biomarkers"
- Sentence case: Everything else, including buttons ("View insights", "Complete questionnaire")
- Headlines in marketing: Title case
- Dashboard section titles: Sentence case

### Do's

- Use "we" and "you" — "We analyse your blood data so you can focus on what matters."
- Use positive framing — "Your heart health is improving" not "No decline detected"
- Use UK English spelling — personalised, colour, analysing, programme, HbA1c, mmol/L

### Don'ts

- Never use fear-based copy ("If you don't act…")
- Never use casual slang ("gonna", "wanna", "hey!")
- Never overpromise ("guaranteed", "cure", "100%")
- Never use emoji in clinical/medical contexts

---

## 9. Anti-patterns

### Visual

- ❌ Dark background with white text for clinical/data surfaces — keep dashboards light.
- ❌ Generic stock photography of smiling people in white coats — use real provider photos or abstain.
- ❌ Purple/violet gradient backgrounds — Evida is teal + amber, not purple.
- ❌ Rounded cards with left coloured border accent (`<div class="card"><div class="accent-border">`) — use full-card treatment or nothing.
- ❌ Roboto or Arial as a display face — display stack uses Inter (sans-serif). Body stack (system sans) is acceptable for data-dense dashboard contexts but Inter is preferred for headings.
- ❌ Hand-drawn SVG humans / illustrations — use photography or clean data-viz.
- ❌ Aggressive shadows on dashboard cards — subtle separation only.
- ❌ Warm beige/cream/peach page backgrounds — Evida uses cool neutrals (`#F7F8FA`).
- ❌ Emoji as feature icons — use the Evida icon or labelled stubs.
- ❌ Fake metrics or data in dashboards — use labelled placeholders ("—") when real data isn't available.

### Interaction

- ❌ Auto-playing video or audio on dashboard pages.
- ❌ Disabling browser back button — route changes should push state.
- ❌ Scroll-jacking (smooth-scroll overrides) — let the browser control scroll.
- ❌ Infinite scroll on clinical data — paginate or show all with clear count.
- ❌ Unrequested notifications — permission-first, not opt-out.
- ❌ Submit buttons that remain active during form submission — disable until response.

### Content

- ❌ "Dr. AI" / "AI Doctor" framing — AI assists clinicians, it doesn't replace them.
- ❌ Claims of "preventing" diseases — frame as "reducing risk" or "early detection".
- ❌ Making clinical recommendations without a clinician consult step.
- ❌ Displaying biomarker data without context or reference ranges.
- ❌ Copy that assumes all members are the same age or health status.

### Code

- ❌ Inline styles in production components — use CSS custom properties and utility classes.
- ❌ Accessibility failures: missing labels, insufficient contrast, no focus indicators.
- ❌ Using `px` for typography in responsive contexts — use `rem` or `clamp()`.
- ❌ Hard-coded brand colours outside of token system.
