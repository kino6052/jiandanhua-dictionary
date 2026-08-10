import { readFileSync } from 'fs';
import { transformChapterSource } from './vite-plugin-chapter.js';
import { loadWordIndex, loadDictionaryWordCount } from './scripts/word-refs.js';

const wordIndex = loadWordIndex();
const wordCount = loadDictionaryWordCount();

const src = readFileSync('src/content/lesson-06.yaml', 'utf-8');
const { byLang } = transformChapterSource(src, { wordIndex, wordCount });

for (const lang of ['eng', 'rus', 'zh']) {
  const v = byLang[lang];
  console.log(`--- ${lang} ---`);
  console.log('vocab:', v.vocab.length, 'examples:', v.examples.length, 'exercise:', v.exercise.length, 'answers:', v.answers.length);
  console.log('missingBlocks:', v.missingBlocks);
  console.log('grammarRules:', v.grammarRules.map(r => r.tag));
}
