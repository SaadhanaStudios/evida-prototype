# Evida — Monorepo

> UK preventive-health membership — clinician-led, data-powered, AI-assisted

## Apps

| App | Path | Description |
|-----|------|-------------|
| `@evida/web` | `apps/web/` | Next.js marketing + membership web app |
| `prototype` | `apps/prototype/` | Static HTML patient app prototype |

## Packages

| Package | Path | Description |
|---------|------|-------------|
| *(none yet)* | `packages/` | Shared tokens, components, and types will live here |

## Getting started

```bash
npm install        # install all workspace dependencies
npm run dev        # start all dev servers via Turborepo
npm run build      # build all apps
```

To work on a single app:

```bash
cd apps/web && npm run dev
```

## Deployment

Each app deploys as its own Vercel project with its root directory set to the app folder:

- **web** → root dir: `apps/web/`
- **prototype** → root dir: `apps/prototype/`
