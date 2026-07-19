const fs = require('fs');
const matter = require('gray-matter');

const FENCE_TYPES = 'vocab|examples|exercise|answers|story|dict';
const HEADING_RE = /^##\s+(.+)$/gm;

function parseDict(raw, category) {
  return raw.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    const item = { term: parts[0] || '', pos: parts[1] || '', definition: parts[2] || '', maps: parts[3] || '' };
    if (category) item.category = category;
    return item;
  });
}

function check(file) {
  const src = fs.readFileSync(file, 'utf8');
  const { data: meta, content: rawContent } = matter(src);
  const content = rawContent.replace(/\r\n/g, '\n');
  const fenceRe = new RegExp('```(' + FENCE_TYPES + ')\\n([\\s\\S]*?)```', 'g');
  let currentCategory = null;
  let lastIndex = 0;
  let match;
  let dict = [];
  while ((match = fenceRe.exec(content)) !== null) {
    const [full, type, body] = match;
    const between = content.slice(lastIndex, match.index);
    const headingMatches = [...between.matchAll(HEADING_RE)];
    if (headingMatches.length > 0) currentCategory = headingMatches[headingMatches.length - 1][1].trim();
    lastIndex = match.index + full.length;
    if (type === 'dict') dict = dict.concat(parseDict(body, currentCategory));
  }
  const cats = new Set(dict.map(d => d.category).filter(Boolean));
  console.log(file, '| id:', meta.id, '| lang:', meta.language, '| entries:', dict.length, '| categories:', cats.size);
}

['src/content/dictionary.md', 'src/content/dictionary.rus.md', 'src/content/dictionary.zh.md',
 'src/content/dictionary-categorical.md', 'src/content/dictionary-categorical.rus.md', 'src/content/dictionary-categorical.zh.md']
  .forEach(check);
