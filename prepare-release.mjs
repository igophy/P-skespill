#!/usr/bin/env node
// Validates the story and refreshes the offline release after content edits.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
execFileSync(process.execPath, [join(root, 'validate-content.mjs')], { stdio: 'inherit' });
function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : entry.isFile() ? [path] : [];
  });
}
const files = ['index.html', 'styles.css', 'game-data.js', 'app.js', 'manifest.webmanifest',
  ...filesIn(join(root, 'assets')).map(path => relative(root, path).replaceAll('\\', '/'))].sort();
const hash = createHash('sha256');
for (const name of files) hash.update(name).update('\0').update(readFileSync(join(root, name))).update('\0');
const cache = `fjellro-app-${hash.digest('hex').slice(0, 16)}`;
const assets = ['./', ...files.map(name => './' + name)];
const workerPath = join(root, 'sw.js');
const original = readFileSync(workerPath, 'utf8');
if (!/^const CACHE=.*;$/m.test(original) || !/^const ASSETS=.*;$/m.test(original)) {
  throw new Error('Fant ikke CACHE og ASSETS i sw.js. Behold disse erklæringene på egne linjer.');
}
const updated = original.replace(/^const CACHE=.*;$/m, `const CACHE=${JSON.stringify(cache)};`)
  .replace(/^const ASSETS=.*;$/m, `const ASSETS=${JSON.stringify(assets)};`);
if (updated !== original) writeFileSync(workerPath, updated);
console.log(`Publiseringsklar: ${cache}. ${assets.length} offline-ressurser er registrert.`);
