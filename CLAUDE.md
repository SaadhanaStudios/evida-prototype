# evida-prototype

Evida design system and prototypes. Turbo monorepo housing the marketing website (`apps/web`), component design system, and reusable reference implementations. Only what is specific to this repo; shared context lives one level up.

**If this is your workspace root:**
- `/home/ubuntaman/projects/AGENTS.md` — shared technical context
- `/home/ubuntaman/projects/second-brain/vault/user.md` — who Aman is
- `/home/ubuntaman/projects/second-brain/vault/soul.md` — how to work with him

## What this is

A Turbo monorepo with multiple prototypes and a design system. **`apps/web` is the live marketing website** (promoted from web-v2 on 2026-07-09). The **design system** lives at `apps/prototype/` and is reusable across Evida projects via its `DESIGN.md` canonical rules and `colors_and_type.css` token system. Prototypes use the Evida design-system skill (`apps/prototype/SKILL.md`) for visual guidance.

## Structure

```
apps/web/              ← THE live marketing website (Next.js). Replaces web-legacy.
apps/prototype/        ← Design system: tokens, rules, preview cards, source examples
apps/web-legacy/       ← Archived previous site. Do not edit.
apps/web-v2/           ← Archived staging version. Do not edit.
packages/              ← Shared libraries (if any)
```

## Commit convention

`feat(scope)`, `fix(scope)`, `chore(scope)`, `refactor(scope)` — all lowercase imperative. Examples: `feat(home): move JourneySvg to hero`, `refactor(design-system): adopt design tokens`, `fix(video): replace broken symlinks`.

## Run & verify

**Dev server:**
```bash
npm run dev    # Turbo starts all apps in apps/ that have dev scripts
```

**Build:**
```bash
npm run build  # Turbo builds all
npm run lint   # Turbo lints all
```

Individual apps: `cd apps/web && npm run dev` to work on just one.

## Before changing anything

- `apps/prototype/DESIGN.md` — canonical rules for all Evida visuals
- `apps/prototype/colors_and_type.css` — token system (custom properties). Update this first before shipping visual changes.
- Archive rule: move obsolete work to `archive/` or mark archived folders with a note. Never delete.

## Constraints

- **apps/web is the live product.** Edits to web-legacy or web-v2 are history only.
- Design system is token-driven: never hardcode hex or spacing units. Use CSS custom properties.
- All components must be demonstrated in `apps/prototype/preview/` before shipping to apps/web.
- The design system is reusable: changes to tokens or DESIGN.md affect every Evida project using `colors_and_type.css`.
