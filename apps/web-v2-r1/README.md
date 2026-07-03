# @evida/web-v2 — Marketing site rebuild

> **Round-1 snapshot** — frozen copy of web-v2 as reviewed on 3 Jul 2026, for side-by-side comparison with the round-2 iteration. Runs on port 3002. Do not edit.

Ground-up rebuild of the Evida marketing site, built from the **July 3 website
review** (`../../Website review - notes.md`, whiteboard photo) and the **June 29
messaging framework** (`../../messaging-framework.md`). Lives alongside
`apps/web` (the current site) so the two can be reviewed side by side.

```bash
npm run dev    # http://localhost:3001  (current site runs on :3000)
npm run build
```

Deployable as its own Vercel project with Root Directory `apps/web-v2/`.

## What this build encodes (decisions → implementation)

| Decision (source) | Where |
|---|---|
| Site map: Home · Membership · How it works · Blog · About; persistent top-right Log in + primary CTA (whiteboard) | `Header.tsx`, `lib/site.ts` |
| Home = summary hub; each block anchors to its full page (whiteboard) | `app/page.tsx` |
| Pillars: **Data → Insight → Action** (replaces Track/Tailor/Act) | Home + Membership |
| Journey: 6 steps grouped 2-per-stage — Initial / first six months / Ongoing, pull-quote dividers between stages (whiteboard) | `app/how-it-works/page.tsx` |
| "No single data point tells the whole story" as editorial pull-quotes | `PullQuote.tsx`, used on Home / How-it-works / About |
| Alternating two-column layout, one consistent cream background (Too Healthy ref) | `TwoCol.tsx`, `globals.css` |
| Pricing: £27/mo headline, honest "billed annually at £320 (£26.67/mo)" | `lib/site.ts`, Membership hero, Home closing CTA |
| 90 min core GP time (45+45), 2×15 optional — lead with the 45s | Membership, How-it-works |
| No stock doctors / running-lady imagery — CSS product visuals instead | `ProductVisuals.tsx` |
| Contact in footer only; sitemap + help-style FAQ for SEO/AI crawlers | `Footer.tsx`, `app/sitemap.ts`, Membership FAQ |
| About = Why · History · Team · Extend (whiteboard) | `app/about/page.tsx` |
| Blog stays on-site with CTA; Substack for the newsletter | `app/blog/page.tsx` |

## Placeholders to replace before external sharing

- **About → Team**: three generic role cards, no real names/photos.
- **About → History**: narrative milestones written from context — verify.
- **Home → evidence quotes**: sourced from the existing blog post's references
  (Health Foundation, LondonWorld, Micro Habits) — confirm exact wording/licensing.
- **DashboardCard**: illustrative data ("Dr Shah", HbA1c values) — swap for real
  product screenshots when ready.
- **Links**: `go.evida.uk/baseline` (book) and `dev.evida.uk` (login) — confirm.
- **Sitemap base URL**: currently `https://evida.uk`.

## Stack

Next.js 16 (App Router, all static) · Tailwind CSS 4 · TypeScript ·
Fraunces (editorial display) + Inter (UI) · brand tokens in `globals.css`
(teal `#216A73`, coral `#FF5A5F`, cream `#FDFBEF`).
