import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_PATH = resolve(ROOT, 'src/data/dictionary.json');
const CONTENT_DIR = resolve(ROOT, 'src/content');

const LANGS = ['eng', 'rus', 'zh'];
const LANG_SUFFIX = { eng: '', rus: '.rus', zh: '.zh' };

const TITLES = {
  eng: 'The Official Hao-shuo-de Dictionary',
  rus: 'Официальный словарь Hǎo-shuō-de',
  zh: 'Hǎo-shuō-de 官方词典',
};

const INTRO = {
  eng: 'This section presents the complete core vocabulary of Hao-shuo-de sorted alphabetically. Every definition contains part-of-speech designations, semantic boundaries, and compositional mappings matching the minimalist baseline established by Toki Pona.',
  rus: 'В этом разделе представлен полный базовый словарь Hǎo-shuō-de в алфавитном порядке. Каждая словарная статья содержит указание части речи, границы значения и соответствие минималистичной базе, заданной Toki Pona.',
  zh: '本节按字母顺序呈现 Hǎo-shuō-de 的完整核心词汇。每条词条都标注了词性、语义范围，以及与 Toki Pona 所确立的极简基准相对应的映射关系。',
};

function stripTones(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function dictLine(word, lang) {
  const base = `${word.term} | ${word.pos[lang]} | ${word.definition[lang]} |`;
  return word.maps ? `${base} ${word.maps}` : base;
}

function frontmatter({ id, title, order, lang }) {
  return `---\nid: ${id}\ntitle: "${title}"\ntype: dictionary\norder: ${order}\nlanguage: ${lang}\n---\n`;
}

const data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

for (const lang of LANGS) {
  const allWords = Object.values(data.words)
    .slice()
    .sort((a, b) => stripTones(a.term).localeCompare(stripTones(b.term)));

  let body = frontmatter({ id: 'dictionary', title: TITLES[lang], order: 1, lang });
  body += `\n${INTRO[lang]}\n\n`;
  body += '```dict\n';
  for (const w of allWords) body += dictLine(w, lang) + '\n';
  body += '```\n';
  writeFileSync(resolve(CONTENT_DIR, `dictionary${LANG_SUFFIX[lang]}.md`), body, 'utf-8');
}

console.log(`Generated alphabetical dictionary files for: ${LANGS.join(', ')}`);
