import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT, 'src/content');
const DIST_DIR = resolve(ROOT, 'dist');

const LANG_MAP = { eng: 'en', rus: 'ru', zh: 'zh' };

const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

const routes = new Set();
const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
  const { data } = matter(raw);
  const lang = LANG_MAP[data.language] || 'en';
  routes.add(lang);
  if (data.id) routes.add(`${lang}/${data.id}`);
}

for (const route of routes) {
  const dir = join(DIST_DIR, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), indexHtml);
}

writeFileSync(join(DIST_DIR, '404.html'), indexHtml);

console.log(`Generated ${routes.size} route pages + 404.html`);
