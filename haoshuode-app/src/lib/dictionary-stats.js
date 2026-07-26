// Pure, environment-agnostic helpers over dictionary.json's shape -- no
// Node/fs APIs here, so this module is safe to import from both browser
// code (src/lib/i18n.js) and Node build scripts (scripts/word-refs.js).
// Keeping the counting logic in one place matters because the dictionary
// schema is nested (category -> subcategory -> words); duplicating this in
// two places would let them silently drift out of sync.

export function categoryWordCount(category) {
  if (category.subcategories) {
    return category.subcategories.reduce((sum, s) => sum + s.words.length, 0);
  }
  return category.words.length;
}

export function countDictionaryWords(dictionary) {
  return dictionary.categories.reduce((sum, c) => sum + categoryWordCount(c), 0);
}
