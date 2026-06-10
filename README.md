# Evida Design System

> UK preventive-health membership — clinician-led, data-powered, AI-assisted

**Tagline:** *A healthier you. Powered by data. Led by experts.*

---

## Product Overview

Evida is a UK preventive-health membership that helps members understand and improve their health through a structured protocol: **Track → Tailor → Act**.

- **Track:** Baseline blood tests (via Randox), comprehensive medical questionnaire, and wearable data (via Terra).
- **Tailor:** A 45-minute virtual GP consult with a GP and health coach producing a personalised prevention plan and clinical reports.
- **Act:** Ongoing engagement through a dashboard of health insights, plan follow-through, periodic check-ins, and biomarker tracking.

**Primary UI surfaces:**
- **Marketing site** — acquisition, education, membership sign-up (responsive web)
- **Member dashboard** — health insights, biomarker trends, plan progress, upcoming actions (web + mobile)
- **Consultation interface** — scheduling, virtual visit, post-consult follow-up (web + mobile)
- **Clinician portal** — member overview, test results, note-taking (web)

**Source evidence used to create this system:**
- Design brief describing the Evida Protocol and product model (see `context/source-context.md`)
- Brand assets: Evida Logo.png and Evida Icon.png (preserved as `assets/evida-logo.png`, `assets/evida-icon.png`, `build/logo.png`, `build/icon.png`)
- Figma source: `Evida Design System.fig` (binary — locally parsed at `context/figma/evida-design-system.md`; binary format prevented token extraction)
- No linked GitHub repositories or local code folders

---

## Package Contents

```
.
├── DESIGN.md                  # Canonical rules document — colors, type, components, voice
├── colors_and_type.css        # Reusable CSS custom properties + utility classes
├── README.md                  # This file — package guide
├── SKILL.md                   # Agent-usable skill definition (YAML frontmatter)
├── assets/
│   ├── evida-icon.png         # Brand icon (convenience alias)
│   └── evida-logo.png         # Brand logotype (convenience alias)
├── build/
│   ├── icon.png               # Runtime app icon (byte-for-byte preserved source)
│   └── logo.png               # Runtime logo asset (byte-for-byte preserved source)
├── preview/                   # Six reviewable HTML cards
│   ├── colors-primary.html
│   ├── typography-specimens.html
│   ├── spacing-tokens.html
│   ├── brand-assets.html
│   ├── components-buttons.html
│   └── components-forms-inputs.html
├── ui_kits/app/
│   ├── README.md              # Kit structure, usage, design notes, source basis
│   ├── index.html             # Runnable entry — loads colors_and_type.css + components
│   └── components/            # Seven modular component JSX files
│       ├── Sidebar.jsx
│       ├── DashboardMetrics.jsx
│       ├── HealthScoreRing.jsx
│       ├── BiomarkerCard.jsx
│       ├── TimelineStep.jsx
│       ├── PlanCard.jsx
│       └── App.jsx
├── source_examples/           # High-signal TypeScript source patterns
│   ├── BiomarkerTable.tsx     # Sortable/filterable biomarker data table
│   ├── ConsultScheduler.tsx   # Provider selection and booking flow
│   ├── useBiomarkerData.ts    # API data fetching hook
│   └── index.ts               # Barrel exports
├── fonts/                     # (reserved for future font file inclusion)
└── context/
    ├── source-context.md      # Original intake brief
    ├── figma/                 # Figma binary parse summary
    ├── github/                # (reserved for GitHub evidence)
    └── local-code/            # (reserved for local code evidence)
```

---

## Preview Manifest

| Preview Card | File | What to Inspect |
|---|---|---|
| Brand Palette | `preview/colors-primary.html` | All 7 brand colour swatches with hex + OKLch values, 6 neutral swatches, 6 semantic role colours, 3 status pill variants. |
| Typography Specimens | `preview/typography-specimens.html` | Full type scale (hero → tiny) for display and body stacks, mono data stack, combined dashboard example with biomarker metrics and status pills. |
| Spacing Tokens | `preview/spacing-tokens.html` | 13-step spacing scale (2–96px) with visual bars, 5 border radius tokens with sample boxes, 5 shadow elevation samples (xs → xl). |
| Brand Assets | `preview/brand-assets.html` | Evida logo and icon loaded from `build/logo.png` and `build/icon.png` via real `<img>` tags. Fallback placeholders if files fail to load. Also shows colour application on teal and navy backgrounds. |
| Button Components | `preview/components-buttons.html` | 4 button variants (primary, secondary, ghost, danger), 3 sizes (32/40/48px), disabled states, link button, dark background adaptation, CSS token map. |
| Form & Input Components | `preview/components-forms-inputs.html` | Input fields (default/focus/error/disabled), select dropdown, textarea, checkboxes, radio group, status pill variants (normal/borderline/high/pending/completed/scheduled). |

---

## Reuse Workflow

1. **Read DESIGN.md** — understand the visual principles, color tokens, typography, components, motion, and voice. The Source Context section at the top lists the evidence that generated each rule.
2. **Import colors_and_type.css** — link or inline into any new artifact to bind all token variables and utility classes. See `preview/components-buttons.html` and `preview/components-forms-inputs.html` for usage examples.
3. **Use preview/ cards** — open each in a browser to verify the system renders correctly before building.
4. **Reference ui_kits/app/** — inspect the composed member dashboard prototype for real layout patterns: navy sidebar, card-based metrics grid, health score ring, protocol timeline, prevention plan.
5. **Read source_examples/** — inspect TypeScript patterns for biomarker data tables, consultation scheduling, and API integration to understand how tokens map to real component code.
6. **Preserve brand assets** — use `build/logo.png` and `build/icon.png` (or `assets/` copies) for all logo displays. Do not redraw or substitute placeholders.
7. **For agent reuse:** load `SKILL.md` for the complete agent-usable skill definition with YAML frontmatter.

---

## Design System Highlights

- **Teal-primary palette** — `--evida-teal` (oklch 48% 0.10 190) as the single decisive accent, used at most twice per screen. Amber for warmth, navy for depth, coral for danger.
- **Clinical + warm balance** — cool neutral backgrounds (`#F7F8FA`) with amber warm accents, never beige/peach. Dark navy sidebar for authority.
- **Data typography** — `--font-mono` with `tabular-nums` for all dashboard metrics. Inter sans-serif for display headings, system UI sans-serif for body, mono-only for clinical data contexts.
- **Three-tier status system** — good (teal-tinted `#E0F5F4`), warning (amber-tinted `#FCF0DC`), danger (coral-tinted `#FDE8E8`) with corresponding pills and trend arrows.
- **Responsive dashboard grid** — `repeat(auto-fill, minmax(320px, 1fr))` for adaptive card layouts across mobile, tablet, and desktop.
- **UK English voice** — "Member" not "patient", "GP/Health Coach" not "doctor", "Biomarker" not "lab value", "Check-in" not "follow-up".

---

*Generated from design brief and brand assets. Last updated: 2026-06-03.*
