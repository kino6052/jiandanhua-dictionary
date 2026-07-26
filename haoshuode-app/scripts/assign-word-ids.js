#!/usr/bin/env node
// Backfills a stable `id` slug onto every dictionary word that doesn't have
// one yet. The id is derived from the word's English gloss (not its pinyin
// term), so it stays stable even if the term itself is later renamed --
// that stability is what lets chapter content reference a word by id
// (see scripts/word-refs.js) instead of hardcoding the current spelling.
// Safe to re-run: existing ids are left untouched.

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_PATH = resolve(ROOT, 'src/data/dictionary.json');

function stripDiacritics(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function idFromDefinition(englishDefinition) {
  const withoutParens = englishDefinition.replace(/\([^)]*\)/g, '');
  const firstSense = withoutParens.split(/[,;]/)[0].trim();
  const withoutFiller = firstSense.replace(/^(to|a|an|the)\s+/i, '');
  const words = withoutFiller.split(/\s+/).filter(Boolean).slice(0, 3);
  return slugify(words.join(' '));
}

function idFromTerm(term) {
  return slugify(stripDiacritics(term));
}

function main() {
  const dictionary = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  const usedIds = new Set();
  let assigned = 0;

  function assignIds(word) {
    if (word.id) {
      usedIds.add(word.id);
      return word;
    }

    const base = idFromDefinition(word.definition.eng) || idFromTerm(word.term) || 'word';
    let candidate = base;
    let n = 2;
    while (usedIds.has(candidate)) {
      candidate = `${base}-${n}`;
      n += 1;
    }
    usedIds.add(candidate);
    assigned += 1;

    // Reinsert id right after term, for a readable, consistent key order.
    const { term, pos, definition, maps, ...rest } = word;
    return { term, id: candidate, pos, definition, maps, ...rest };
  }

  for (const category of dictionary.categories) {
    if (category.subcategories) {
      for (const sub of category.subcategories) {
        sub.words = sub.words.map(assignIds);
      }
    } else {
      category.words = category.words.map(assignIds);
    }
  }

  writeFileSync(DATA_PATH, JSON.stringify(dictionary, null, 2) + '\n', 'utf-8');
  console.log(`Assigned ${assigned} new word id(s); ${usedIds.size} total.`);
}

main();
