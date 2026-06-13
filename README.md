# Evida — Design & Prototype Workspace

> UK preventive-health membership — clinician-led, data-powered, AI-assisted
>
> **Purpose of this repo:** this is the design and prototype workspace for the Evida digital ecosystem. All design decisions, flows, and copy are finalised here before handover to the engineering team to build in production.

---

## What is Evida?

Evida is a UK preventive-health membership built around the **Evida Protocol: Track → Tailor → Act**.

- **Track** — Baseline blood tests (via Randox), a comprehensive medical questionnaire, and wearable data (via Terra), combined into a single health record.
- **Tailor** — AI-assisted analysis plus a 45-minute GP + health coach consultation, producing personalised insights and a prevention plan.
- **Act** — Ongoing engagement through a member dashboard: biomarker trends, plan progress, periodic check-ins, and a GP-monitored AI assistant.

**Brand language:** *Member* (not user/patient), *Evida Protocol*, *Biomarker*, *Prevention Plan*, *Check-in*. UK English throughout (personalised, colour, mmol/L).

---

## Repo structure

This is a **Turborepo monorepo** using npm workspaces.

```
.
├── apps/
│   ├── prototype/          Patient app — static HTML prototype (design spec)
│   └── web/                Marketing & membership site — Next.js 16
├── packages/               Empty — reserved for shared tokens/components
├── turbo.json              Build/dev/lint pipeline
├── package.json            Root workspace manifest (npm@11)
└── package-lock.json
```

### `apps/prototype/` — Patient app prototype

A multi-screen, fully interactive static HTML prototype of the Evida member app. Built for UAT and design sign-off; **not production code**. Its value on handover is the intent it encodes: screen flows, edge-case states, real copy, the data model, and integration seams.

**21 screens** covering the full member journey:

| Screen | Purpose |
|--------|---------|
| `login.html` | Auth: sign-in, sign-up (3-step), email verify, payment |
| `onboarding.html` | First-run welcome tour + setup checklist |
| `dashboard.html` | Adaptive home hub (3 states: pre/post-booking, post-consult) |
| `booking.html` | Book a Baseline: test selection → GP slot → review & pay → confirmation |
| `questionnaire.html` | Medical history questionnaire (3 steps) |
| `insights.html` | Biomarker data, wearable charts, health trends |
| `post-consult.html` | Consultation results, prevention plan, biomarkers, reminders |
| `ask-evi.html` | AI health assistant chat |
| `wearables.html` | Connect/disconnect wearable devices |
| `documents.html` + `doc-*.html` | Document hub + detail viewers (blood test, lifestyle, physical health, questionnaire, uploads) |
| `messages.html` | Member ↔ care-team messaging |
| `profile.html` | Member profile |
| `settings.html` | Preferences: dark mode, notifications |
| `search.html` | Search |
| `faq.html` | Help & FAQ |
| `contact.html` | Contact / support |

**Shared modules** (all in `screens/`):

| File | Role |
|------|------|
| `store.js` | `EvidaStore` — all persisted member state via localStorage. This is the data model and API contract. |
| `_app-shell.css` | Shared layout and shell styles |
| `_nav-helpers.js` | Nav sheet, toast, bottom-nav, notifications, dark mode, pull-to-refresh, swipe gestures |
| `_uat.js` | UAT gear panel — 4 journey presets for demo/review. Strip for production. |
| `_evi.js` | Ask Evi AI assistant behaviour |
| `../colors_and_type.css` | Design tokens: all colour, type, spacing, radius, shadow, motion |

**URL state** — every screen with navigable internal state updates the URL live (`?step=`, `?tab=`, `?flow=`, `#panel`), making it shareable and deep-linkable. See [`SCREENS.md`](apps/prototype/SCREENS.md) for the full URL reference.

**For engineering handover** — read [`HANDOVER.md`](apps/prototype/HANDOVER.md) for a full breakdown of: the data model (`store.js` namespace → backend endpoint mapping), all integration seams (what's faked and what replaces it), conventions to preserve, and what *not* to carry forward.

---

### `apps/web/` — Marketing & membership site

The public Evida website: marketing pages, membership information, blog, and contact. Built to be handed off to engineering alongside the patient app prototype.

**Tech stack:** Next.js 16, TypeScript, Tailwind CSS 4, GSAP (animations), Turbopack.

**Pages:**

| Route | Purpose |
|-------|---------|
| `/` | Home / hero |
| `/how-it-works` | The Evida Protocol explained |
| `/membership` | Pricing and membership details |
| `/about-us` | Team and mission |
| `/posts` | Blog index |
| `/post/[slug]` | Blog post detail |
| `/contact-us` | Contact form |
| `/privacy-policy` | Legal |

---

## Design system

The design system is defined in [`apps/prototype/DESIGN.md`](apps/prototype/DESIGN.md) and implemented as CSS custom properties in [`apps/prototype/colors_and_type.css`](apps/prototype/colors_and_type.css).

Key design decisions:
- **Teal-primary palette** — `--evida-teal` (`#216A73`) as the single decisive accent, used at most twice per screen. Amber for warmth, navy for authority, coral for alerts.
- **Clinical + warm balance** — cool neutral backgrounds with amber warm accents. Never beige/peach.
- **Data typography** — `--font-mono` with `tabular-nums` for all dashboard metrics.
- **Responsive** — mobile-first, 560px content max-width, fluid cards.
- **Dark mode** — full token set mapped for dark, driven by `EvidaStore.prefs.darkMode()`.

---

## Getting started

```bash
# Install all workspace dependencies from repo root
npm install

# Run the Next.js web app in development
cd apps/web && npm run dev

# Open the prototype — it's static HTML, no build step
open apps/prototype/index.html
# or serve it locally:
npx serve apps/prototype
```

From repo root via Turborepo:

```bash
npm run build    # builds @evida/web (prototype has no build step)
npm run dev      # starts @evida/web dev server
```

---

## Deployment

Each app is its own Vercel project, with the **Root Directory** set to the app folder:

| App | Vercel root directory |
|-----|-----------------------|
| Patient app prototype | `apps/prototype/` |
| Marketing site | `apps/web/` |

The prototype deploys as a static site (no framework, `cleanUrls: true`). The marketing site deploys as a Next.js app.

---

## Handover checklist

When handing off to the engineering team:

- [ ] `HANDOVER.md` — walk the team through integration seams and the data model
- [ ] `DESIGN.md` — design system rules and token reference
- [ ] `SCREENS.md` — full URL and screen index, with UAT quick-links
- [ ] `store.js` — the data model and API contract
- [ ] Strip `_uat.js` and all `evida:uat:*` localStorage keys from the production build
- [ ] Normalise two legacy underscore keys (`evida_notif_count`, `evida_dark_mode`) — see `HANDOVER.md §1`
