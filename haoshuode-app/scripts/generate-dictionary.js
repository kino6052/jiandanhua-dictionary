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
  alphabetical: {
    eng: 'The Official Hao-shuo-de Dictionary',
    rus: 'Официальный словарь Hǎo-shuō-de',
    zh: 'Hǎo-shuō-de 官方词典',
  },
  categorical: {
    eng: 'The Official Hao-shuo-de Categorical Dictionary',
    rus: 'Официальный тематический словарь Hǎo-shuō-de',
    zh: 'Hǎo-shuō-de 官方分类词典',
  },
};

const INTRO = {
  alphabetical: {
    eng: 'This section presents the complete core vocabulary of Hao-shuo-de sorted alphabetically. Every definition contains part-of-speech designations, semantic boundaries, and compositional mappings matching the minimalist baseline established by Toki Pona.',
    rus: 'В этом разделе представлен полный базовый словарь Hǎo-shuō-de в алфавитном порядке. Каждая словарная статья содержит указание части речи, границы значения и соответствие минималистичной базе, заданной Toki Pona.',
    zh: '本节按字母顺序呈现 Hǎo-shuō-de 的完整核心词汇。每条词条都标注了词性、语义范围，以及与 Toki Pona 所确立的极简基准相对应的映射关系。',
  },
  categorical: {
    eng: 'This section presents the complete core vocabulary of Hao-shuo-de organized into logical, thematic categories rather than a standard alphabetical list. By grouping related terms together, this layout offers a clearer overview of the entire language, making it easier to study, compare, and navigate the vocabulary as a cohesive system.',
    rus: 'В этом разделе представлен полный базовый словарь Hǎo-shuō-de, организованный по логическим тематическим категориям, а не в виде обычного алфавитного списка. Группировка связанных терминов даёт более ясное представление обо всём языке и облегчает изучение, сравнение и навигацию по словарю как по единой системе.',
    zh: '本节按逻辑主题类别，而非传统的字母顺序列表，呈现 Hǎo-shuō-de 的完整核心词汇。将相关词汇归类在一起，能让你更清晰地纵览整个语言，也更容易学习、比较词汇，并把它当作一个整体系统来查阅。',
  },
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
  const allWords = data.categories
    .flatMap(c => c.words)
    .slice()
    .sort((a, b) => stripTones(a.term).localeCompare(stripTones(b.term)));

  let alphaBody = frontmatter({ id: 'dictionary', title: TITLES.alphabetical[lang], order: 1, lang });
  alphaBody += `\n${INTRO.alphabetical[lang]}\n\n`;
  alphaBody += '```dict\n';
  for (const w of allWords) alphaBody += dictLine(w, lang) + '\n';
  alphaBody += '```\n';
  writeFileSync(resolve(CONTENT_DIR, `dictionary${LANG_SUFFIX[lang]}.md`), alphaBody, 'utf-8');

  let catBody = frontmatter({ id: 'categorical-dictionary', title: TITLES.categorical[lang], order: 2, lang });
  catBody += `\n${INTRO.categorical[lang]}\n\n`;
  data.categories.forEach((cat, i) => {
    catBody += `## ${i + 1}. ${cat.title[lang]}\n\n`;
    catBody += '```dict\n';
    for (const w of cat.words) catBody += dictLine(w, lang) + '\n';
    catBody += '```\n\n---\n\n';
  });
  writeFileSync(resolve(CONTENT_DIR, `dictionary-categorical${LANG_SUFFIX[lang]}.md`), catBody, 'utf-8');
}

console.log(`Generated dictionary files for: ${LANGS.join(', ')}`);
