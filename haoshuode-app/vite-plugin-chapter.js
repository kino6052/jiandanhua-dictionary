// Transforms src/content/*.yaml chapter files into per-language view objects
// shaped exactly like what vite-plugin-markdown.js produces (meta, vocab,
// bodyHtml, story, examples, exercise, answers), so the existing Preact
// components (Section, VocabGrid, GrammarBlock, ...) render either format
// without modification. Two extra fields ride alongside for the new
// TL;DR-summary and missing-translation-warning UI: `tldrSummary` and
// `missingBlocks`.
//
// Chapter schema (see src/content/lesson-01.yaml for a full example):
//   id, type, lessonNumber, order, title: {eng, rus, zh}
//   summary: {eng, rus, zh}  -- optional whole-chapter overview, shown as the
//     first card in the TL;DR carousel, ahead of the per-paragraph entries.
//   blocks: [
//     { type: 'heading', text: {eng, rus, zh} }
//     { type: 'prose', text: {..}, tldr: {..}, necessity: {..} }
//     { type: 'vocab', items: [{ term, definition: {..}, audioFile?, ttsText? }] }
//     { type: 'examples' | 'story', items: [{ pinyin, translation: {..}, audioFile?, ttsText? }] }
//     { type: 'exercise', items: [{eng, rus, zh}] }
//     { type: 'answers', items: [{ text: {..}, audioFile?, ttsText? }] }
//   ]
//
// Only `prose` blocks carry `tldr`/`necessity` -- per the project's own rule,
// vocab/examples/exercise/answers/story are reserved, self-justifying block
// types that don't need a rationale.
//
// Any i18n field missing a given language is simply omitted when rendering
// in that language (no fallback, no error) -- but the block's index is
// recorded in `missingBlocks` so the page can show a "content missing for
// section N" warning instead of silently shipping a gap.

import { parse as parseYaml } from 'yaml';
import { marked } from 'marked';
import { loadWordIndex, resolveWordRefs } from './scripts/word-refs.js';

const LANGS = ['eng', 'rus', 'zh'];

function pick(i18n, lang) {
  return i18n && i18n[lang] !== undefined ? i18n[lang] : undefined;
}

function buildForLang(chapter, lang) {
  const vocab = [];
  const story = [];
  const examples = [];
  const exercise = [];
  const answers = [];
  const proseHtmlParts = [];
  const tldrSummary = [];
  const missingBlocks = [];

  const overallSummary = pick(chapter.summary, lang);
  if (overallSummary !== undefined) {
    tldrSummary.push({ tldr: overallSummary, necessity: undefined, isOverview: true });
  }

  chapter.blocks.forEach((block, index) => {
    switch (block.type) {
      case 'heading': {
        const text = pick(block.text, lang);
        if (text === undefined) { missingBlocks.push(index); break; }
        proseHtmlParts.push(`<h3>${text}</h3>`);
        break;
      }
      case 'prose': {
        const text = pick(block.text, lang);
        const tldr = pick(block.tldr, lang);
        const necessity = pick(block.necessity, lang);
        if (text === undefined || tldr === undefined || necessity === undefined) {
          missingBlocks.push(index);
        }
        if (text !== undefined) proseHtmlParts.push(marked.parse(text));
        if (tldr !== undefined || necessity !== undefined) {
          tldrSummary.push({ tldr, necessity });
        }
        break;
      }
      case 'vocab': {
        let complete = true;
        for (const item of block.items) {
          const definition = pick(item.definition, lang);
          if (definition === undefined) { complete = false; continue; }
          vocab.push({ pinyin: item.term, definition, audioFile: item.audioFile, ttsText: item.ttsText });
        }
        if (!complete) missingBlocks.push(index);
        break;
      }
      case 'examples':
      case 'story': {
        const bucket = block.type === 'story' ? story : examples;
        let complete = true;
        for (const item of block.items) {
          const translation = pick(item.translation, lang);
          if (translation === undefined) { complete = false; continue; }
          bucket.push({ pinyin: item.pinyin, translation, audioFile: item.audioFile, ttsText: item.ttsText });
        }
        if (!complete) missingBlocks.push(index);
        break;
      }
      case 'exercise': {
        let complete = true;
        for (const item of block.items) {
          const text = pick(item, lang);
          if (text === undefined) { complete = false; continue; }
          exercise.push(text);
        }
        if (!complete) missingBlocks.push(index);
        break;
      }
      case 'answers': {
        let complete = true;
        for (const item of block.items) {
          const text = pick(item.text, lang);
          if (text === undefined) { complete = false; continue; }
          answers.push({ text, audioFile: item.audioFile, ttsText: item.ttsText });
        }
        if (!complete) missingBlocks.push(index);
        break;
      }
      default:
        throw new Error(`Unknown chapter block type "${block.type}" in ${chapter.id}`);
    }
  });

  const title = pick(chapter.title, lang) ?? chapter.id;

  return {
    meta: {
      id: chapter.id,
      type: chapter.type,
      lessonNumber: chapter.lessonNumber,
      order: chapter.order,
      title,
      language: lang,
    },
    vocab,
    bodyHtml: proseHtmlParts.join('\n'),
    story,
    examples,
    exercise,
    answers,
    tldrSummary,
    missingBlocks,
  };
}

export default function chapterYamlPlugin() {
  const wordIndex = loadWordIndex();

  return {
    name: 'vite-plugin-chapter-yaml',
    transform(src, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null;

      const resolvedSrc = resolveWordRefs(src, wordIndex);
      const chapter = parseYaml(resolvedSrc);

      const byLang = {};
      for (const lang of LANGS) byLang[lang] = buildForLang(chapter, lang);

      return {
        code: `export default ${JSON.stringify({ byLang })};`,
        map: null,
      };
    },
  };
}
