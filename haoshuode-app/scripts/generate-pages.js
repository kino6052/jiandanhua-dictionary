import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT, 'src/content');
const DIST_DIR = resolve(ROOT, 'dist');

const LANG_MAP = { eng: 'en', rus: 'ru', zh: 'zh' };

// vite.config.js builds with base: './', so dist/index.html references its
// assets as "./assets/...". Each generated route page lives one or more
// directories deeper than dist/, so its copy of that markup needs the same
// references rewritten to climb back up to dist/ ("../assets/...",
// "../../assets/...", etc.) -- never an absolute "/assets/..." path, so the
// same dist/ output works unmodified from a domain root, a GitHub Pages
// project subpath, or a custom domain.
const rootHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

const routes = new Set();
const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
  const { data } = matter(raw);
  const lang = LANG_MAP[data.language] || 'en';
  routes.add(lang);
  if (data.id) routes.add(`${lang}/${data.id}`);
}

function htmlForDepth(depth) {
  if (depth === 0) return rootHtml;
  const prefix = '../'.repeat(depth);
  return rootHtml.replace(/(["'])\.\//g, `$1${prefix}`);
}

for (const route of routes) {
  const depth = route.split('/').length;
  const dir = join(DIST_DIR, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlForDepth(depth));
}

writeFileSync(join(DIST_DIR, '404.html'), rootHtml);

console.log(`Generated ${routes.size} route pages + 404.html`);
