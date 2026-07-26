// Resolves {{word:ID}} references in chapter content to the CURRENT pinyin
// term for that dictionary word. This is what lets a word's spelling (or
// definition) change in src/data/dictionary.json and have every chapter
// that references it by id pick up the new term automatically, instead of
// requiring a manual find-and-replace across lesson files.
//
// Used by vite-plugin-markdown.js, so it runs on every .md transform in
// both `bun run dev` and `bun run build`.

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DEFAULT_DATA_PATH = resolve(ROOT, 'src/data/dictionary.json');

const WORD_REF_RE = /\{\{word:([a-z0-9-]+)\}\}/g;

export function loadWordIndex(dataPath = DEFAULT_DATA_PATH) {
  const dictionary = JSON.parse(readFileSync(dataPath, 'utf-8'));
  const index = new Map();
  for (const category of dictionary.categories) {
    for (const word of category.words) {
      if (word.id) index.set(word.id, word.term);
    }
  }
  return index;
}

export function resolveWordRefs(text, index) {
  return text.replace(WORD_REF_RE, (full, id) => {
    if (!index.has(id)) {
      throw new Error(
        `Unknown word id "${id}" referenced as ${full}. Check src/data/dictionary.json (run scripts/assign-word-ids.js if it's a newly added word).`,
      );
    }
    return index.get(id);
  });
}
