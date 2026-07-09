// Copies the patient-app prototype (apps/prototype) into apps/web/public/app
// so the marketing site and the prototype deploy together as one app on Vercel.
// The prototype is reachable at /app (e.g. /app/screens/login.html).
// Called from next.config.ts (runs on every `next dev` / `next build`, incl. Vercel)
// and exposed as `npm run sync-app`. public/app is gitignored.
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const EXCLUDE = new Set(['node_modules', '.turbo', '.git', 'package.json', 'package-lock.json']);

export function syncPrototype() {
  const here = dirname(fileURLToPath(import.meta.url));
  const webRoot = resolve(here, '..');
  const protoRoot = resolve(webRoot, '..', 'prototype');
  const dest = join(webRoot, 'public', 'app');

  if (!existsSync(protoRoot)) {
    console.warn(`[sync-prototype] prototype not found at ${protoRoot} — skipping`);
    return;
  }

  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(protoRoot, dest, {
    recursive: true,
    filter: (src) => {
      const rel = src.slice(protoRoot.length + 1);
      if (!rel) return true;
      const top = rel.split(/[\\/]/)[0];
      return !EXCLUDE.has(top);
    },
  });
  console.log(`[sync-prototype] synced ${protoRoot} -> ${dest}`);
}

// Allow `node scripts/sync-prototype.mjs`
if (process.argv[1] && process.argv[1].endsWith('sync-prototype.mjs')) {
  syncPrototype();
}
