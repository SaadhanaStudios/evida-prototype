# Evida — Prototype Handover

> **Audience:** the engineering team rebuilding this prototype as a production app
> (React, native iOS/Android, or otherwise), plus the PM/clinical reviewers who
> need to confirm flows and edge cases.
>
> **What this prototype is:** a clickable, multi-screen HTML prototype of the
> Evida member app, used for UAT. It is **not** production code and is not meant
> to be reused line-for-line. Its value on handover is the *intent* it encodes:
> the data model, the screen flows, the states/edge-cases, the real copy, and
> the integration seams. This document maps all of that to a real build.

This doc is **build-agnostic**. Everything below transfers to React or native.
Where a component map matters (HTML class ↔ component name), that thin layer can
be added once the target stack is locked — say the word and it's a short
follow-up.

---

## 1. The data model is in code, not prose

The single source of truth for **all persisted member state** is
[`screens/store.js`](screens/store.js). Every screen reads and writes member
state exclusively through the `EvidaStore` module — there are **no raw
`localStorage` calls left in any product screen** (verified). The only other
file that touches `localStorage` is `screens/_uat.js`, which owns
**UAT-tooling-only** keys (`evida:uat:*`) that are explicitly *not* product data
and should not be carried into the app.

Read `store.js` top-to-bottom — it is short, commented, and each namespace is
annotated with the backend resource it stands in for. The summary:

| Namespace (`EvidaStore.*`) | Stored key (prototype) | Shape | Maps to (backend) |
|---|---|---|---|
| `wearables` | `evida:wearable:devices` | `Device[]` — `{ id?, name, brand?, connectedAt? }` | `GET/POST /me/devices` (Terra) |
| `booking` | `evida:booking:confirmed` | boolean (`'true'`) | `POST /consults` |
| `onboarding` | `evida:onboarding:completed` + `:tour` | timestamp + 1-based step int | `PATCH /me { onboardedAt }` (tour is client-only) |
| `questionnaire` | `evida:medical:questionnaire` | `{ meds, supps, family, lifestyle, completedAt }` | `PUT /me/questionnaire` |
| `account` | `evida:partial:account` + `:account:saved` | signup form fields | `POST /auth/signup` (partial = client-only resume) |
| `prefs` | `evida_notif_count`, `evida_dark_mode` | int + boolean | `PATCH /me/preferences` / `GET /me/notifications?unread` |

**For engineering:** treat each namespace as a resource and each method as an
endpoint contract. The getter/setter signatures *are* the request/response
shapes the prototype assumes. A few keys (`*:tour`, `*:partial:account`) are
deliberately client-only resume state — they document UX, not backend tables.

**Known cleanup for the rebuild (noted, not done — to preserve live UAT state):**
two preference keys use legacy underscore naming (`evida_notif_count`,
`evida_dark_mode`) while everything else uses colon namespacing. The *API* is
already consistent; only the stored strings differ. Normalise the keys during
the rebuild's data migration — there's no reason to carry the underscore
convention forward.

---

## 2. Screen inventory & flows

All screens live in `screens/`. `index.html` (project root) is the launcher.
Shared chrome and behaviour are factored out:

- `screens/_app-shell.css` — shared layout/shell styles
- `screens/colors_and_type.css` (root `colors_and_type.css`) — design tokens
- `screens/_nav-helpers.js` — nav sheet, toast, bottom-nav, notifications,
  dark mode, pull-to-refresh, swipe (loaded on every screen)
- `screens/store.js` — persisted state (loaded **before** `_nav-helpers.js`
  on every screen, because nav-helpers reads `EvidaStore.prefs`)
- `screens/_uat.js` — UAT state-explorer harness (tooling; strip for prod)

### Core flows

| Screen | Purpose | Key states / transitions | Integration seam |
|---|---|---|---|
| `login.html` | Auth, multi-step signup, payment | sign-in ↔ signup (3 steps) ↔ payment; **resume signup** if `account.partial()` has an email; discount codes `EARLY100` / `NHS50` | **Auth** + **Stripe** (payment) |
| `onboarding.html` | First-run tour + setup tasks | 3-step tour (persisted via `onboarding.tourStep`); 5 setup tasks → on completion `onboarding.markCompleted()` → dashboard | `PATCH /me` |
| `dashboard.html` | Home / adaptive hub | 3 states: **pre-booking → post-booking → post-consult**, driven by `booking.isConfirmed()`; shows wearable stat cards if `wearables.list()` non-empty; celebration banner if onboarding completed <30s ago | aggregates all |
| `insights.html` | Biomarkers, wearable charts, questionnaire | connected vs no-device (`wearables.list()`); demo-connect writes a device; medical questionnaire complete/incomplete (`questionnaire.get()`) | **Terra** (wearables), **labs** (biomarkers) |
| `wearables.html` | Connect/disconnect devices | device list CRUD via `wearables.set()` | **Terra** |
| `booking.html` | Book a Baseline consult | scheduling flow → confirmation | **Booking / calendar** |
| `post-consult.html` | Results & prevention plan | results-ready view | **Labs / clinician** |
| `ask-evi.html` | AI assistant | conversational Q&A | **Ask Evi AI** (LLM) |
| `messages.html` | Member ↔ care-team messaging | thread view | Messaging backend |
| `documents.html` + `doc-*.html` | Document hub: blood test, lifestyle, physical health, questionnaire, upload/viewer | per-doc detail views | Document storage |
| `profile.html` | Member profile | shows connected devices (`wearables.list()`) | `GET /me` |
| `settings.html` | Preferences | dark mode, notifications (`prefs.*`) | `PATCH /me/preferences` |
| `faq.html` | Help / FAQ | static | — |

### State-explorer harness

`_uat.js` lets reviewers jump any screen to a named state (e.g. dashboard's
pre-booking / post-booking / post-consult) without manually clicking through the
flow. Each screen with states defines them in `window.__UAT_STATES`. This is a
**review aid** — useful for QA acceptance scripts, but it is tooling and its
`evida:uat:*` keys must not ship.

---

## 3. Integration seams (the "what's faked" list)

Everything the prototype simulates that needs a real backend:

1. **Auth** (`login.html`) — sign-in / signup are client-side; no real session.
   `account.save()` simulates account creation → `POST /auth/signup`.
2. **Payments / Stripe** (`login.html` → `handlePayment`) — payment is a
   `setTimeout` simulation; discount codes are hard-coded. Needs Stripe (or
   equivalent) with server-side price + discount validation.
3. **Wearables / Terra** (`wearables.html`, `insights.html`) — device connect is
   simulated; chart data is static arrays (`stepData`, `sleepData`, `hrData`).
   Needs Terra (or direct vendor) device-auth + real time-series.
4. **Labs / biomarkers** (`insights.html`, blood-test docs, `post-consult.html`)
   — biomarker values and reference ranges are static. Needs the lab provider
   integration + clinician review workflow.
5. **Booking** (`booking.html`) — slots are static. Needs real availability +
   calendar + `POST /consults`.
6. **Ask Evi AI** (`ask-evi.html`) — responses are scripted. Needs the LLM
   backend. **Brand constraint (see DESIGN.md):** AI *assists* clinicians, it
   never replaces them — no "AI doctor" framing, no clinical recommendations
   without a clinician step.
7. **Notifications** (`prefs.notifCount`) — badge count is a stored int. Needs
   `GET /me/notifications?unread` + push.
8. **Documents** (`documents.html`, `doc-*`) — viewer is static. Needs document
   storage + upload.

---

## 4. Conventions worth preserving in the rebuild

These are product/brand decisions encoded in the prototype that should survive
the rewrite (full detail in `DESIGN.md`):

- **Design tokens** — colour, type, spacing, radii, motion are all tokenised
  (`colors_and_type.css` / DESIGN.md). Port the token set, not the hex values.
- **Terminology is deliberate** — *Member* (not user/patient), *Evida Protocol*
  (Track → Tailor → Act), *biomarker*, *Prevention Plan*, *Check-in*. Copy in
  the prototype already follows this; keep it.
- **UK English + clinical sobriety** — personalised, colour, mmol/L; no
  fear-based copy; clinical surfaces stay sober (body font, no emoji).
- **Accessibility** — 44px hit targets, visible focus rings, no colour-only
  status. Re-verify in the real components.
- **Dark mode** — driven by `prefs.darkMode()` + a `dark-mode` class on
  `<html>`; initialised in `_nav-helpers.js`.

---

## 5. What NOT to carry over

- `_uat.js` and all `evida:uat:*` keys (review tooling).
- The legacy underscore key names (normalise — see §1).
- Static/demo data arrays and `setTimeout` simulations (replace with real APIs).
- Inline styles used for prototype speed — rebuild as tokenised components.
- The HTML/CSS/JS itself, as implementation. Use it as the **specification**:
  flows, states, copy, and `store.js` as the data contract.

---

*Generated as the final step of the prototype cleanup: state was first
centralised into `store.js` so this document could describe what exists rather
than predict it. If the build target gets decided, the one addition worth making
is a component map (prototype class → target component).*
