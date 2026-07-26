import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { parse as parseYaml } from 'yaml';

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
const allFiles = readdirSync(CONTENT_DIR);

// Markdown: one file per language, language given in frontmatter.
for (const file of allFiles.filter(f => f.endsWith('.md'))) {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
  const { data } = matter(raw);
  const lang = LANG_MAP[data.language] || 'en';
  routes.add(lang);
  if (data.id) routes.add(`${lang}/${data.id}`);
}

// Chapter YAML: one file covers all languages.
for (const file of allFiles.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))) {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
  const chapter = parseYaml(raw);
  for (const lang of Object.values(LANG_MAP)) {
    routes.add(lang);
    if (chapter.id) routes.add(`${lang}/${chapter.id}`);
  }
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
