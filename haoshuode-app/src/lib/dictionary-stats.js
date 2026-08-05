// Pure, environment-agnostic helpers over dictionary.json's shape -- no
// Node/fs APIs here, so this module is safe to import from both browser
// code (src/lib/i18n.js) and Node build scripts (scripts/word-refs.js).
// Keeping the counting logic in one place matters because the dictionary
// schema is a recursive tree (a category node holds either `wordIds` or
// more nested category nodes in `children`); duplicating this walk in two
// places would let them silently drift out of sync.

export function categoryWordCount(node) {
  if (node.wordIds) return node.wordIds.length;
  return node.children.reduce((sum, child) => sum + categoryWordCount(child), 0);
}

export function countDictionaryWords(dictionary) {
  return Object.keys(dictionary.words).length;
}
