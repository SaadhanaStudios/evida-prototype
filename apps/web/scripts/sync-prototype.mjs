// Copies the patient-app prototype (apps/prototype) into apps/web/public/app
// so the marketing site and the prototype deploy together as one app.
// The prototype is reachable at /app (e.g. /app/screens/booking.html).
// Runs automatically before `dev` and `build`. public/app is gitignored.
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, '..');
const protoRoot = resolve(webRoot, '..', 'prototype');
const dest = join(webRoot, 'public', 'app');

if (!existsSync(protoRoot)) {
  console.error(`[sync-prototype] prototype not found at ${protoRoot}`);
  process.exit(1);
}

const EXCLUDE = new Set(['node_modules', '.turbo', '.git', 'package.json', 'package-lock.json']);

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
