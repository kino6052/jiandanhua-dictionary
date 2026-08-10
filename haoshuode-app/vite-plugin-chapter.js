// Transforms src/content/*.yaml chapter files into per-language view objects
// shaped exactly like what vite-plugin-markdown.js produces (meta, vocab,
// bodyHtml, story, examples, exercise, answers), so the existing Preact
// components (Section, VocabGrid, GrammarBlock, ...) render either format
// without modification. Three extra fields ride alongside for the new
// TL;DR-summary, missing-translation-warning, and grammar-index UI:
// `tldrSummary`, `missingBlocks`, and `grammarRules`.
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
//     { type: 'info' | 'warning', subtype?: 'grammar', tag?: string, title?: {..}, ordered?: bool, items: [infoItem] }
//   ]
//
//   An infoItem is `{ text: {eng, rus, zh}, ordered?: bool, items?: [infoItem] }`
//   -- items nest recursively, so an info/warning block renders as a single
//   boxed unit (icon + optional title + a possibly nested list) instead of
//   the old markdown convention of ad-hoc nested `>>` blockquotes. `ordered`
//   switches that item's own nested list from a bullet list to a numbered
//   one; it has no effect without a nested `items` array.
//
//   `subtype: 'grammar'` on an `info` block (never `warning` -- those stay
//   for cautions/mistakes, not rules) marks it as a formal grammar rule
//   rather than a plain illustrative callout, and `tag` gives it a single
//   hierarchical string id (e.g. "adjectives/causative") so every tagged
//   rule across every chapter can eventually be compiled into one grammar
//   index programmatically. Tagged blocks are collected into the per-language
//   `grammarRules` array (`{ tag, title, html }`) in addition to rendering
//   inline in `bodyHtml` like any other info block.
//
// Only `prose` blocks carry `tldr`/`necessity` -- per the project's own rule,
// vocab/examples/exercise/answers/story/info/warning are reserved,
// self-justifying block types that don't need a rationale.
//
// Any i18n field missing a given language is simply omitted when rendering
// in that language (no fallback, no error) -- but the block's index is
// recorded in `missingBlocks` so the page can show a "content missing for
// section N" warning instead of silently shipping a gap.

import { parse as parseYaml } from 'yaml';
import { marked } from 'marked';
import { loadWordIndex, loadDictionaryWordCount, resolveWordRefs } from './scripts/word-refs.js';

const LANGS = ['eng', 'rus', 'zh'];

const INFO_BLOCK_ICONS = {
  info: 'ℹ️',
  warning: '⚠️',
};

function pick(i18n, lang) {
  return i18n && i18n[lang] !== undefined ? i18n[lang] : undefined;
}

// Renders one level of an info/warning block's nested items, recursing into
// child `items` arrays. Returns '' if every item at this level is missing
// the requested language. Reports incompleteness (rather than throwing or
// silently passing) via `onMissing`, mirroring how vocab/examples/etc. skip
// missing entries but still flag the block.
function renderInfoItems(items, lang, ordered, onMissing) {
  const rendered = [];
  for (const item of items) {
    const text = pick(item.text, lang);
    if (text === undefined) {
      onMissing();
      continue;
    }
    const childHtml = item.items && item.items.length
      ? renderInfoItems(item.items, lang, Boolean(item.ordered), onMissing)
      : '';
    rendered.push(`<li>${marked.parseInline(text)}${childHtml}</li>`);
  }
  if (rendered.length === 0) return '';
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${rendered.join('')}</${tag}>`;
}

function renderInfoBlock(block, lang, onMissing) {
  const hasTitle = block.title !== undefined;
  const title = hasTitle ? pick(block.title, lang) : undefined;
  if (hasTitle && title === undefined) onMissing();

  const listHtml = renderInfoItems(block.items ?? [], lang, Boolean(block.ordered), onMissing);
  if (title === undefined && !listHtml) return { html: '', title };

  const kind = block.type;
  const icon = INFO_BLOCK_ICONS[kind];
  const titleHtml = title !== undefined
    ? `<div class="${kind}-block-title">${marked.parseInline(title)}</div>`
    : '';
  const html = (
    `<div class="${kind}-block">` +
      `<span class="${kind}-block-icon" aria-hidden="true">${icon}</span>` +
      `<div class="${kind}-block-content">${titleHtml}${listHtml}</div>` +
    `</div>`
  );
  return { html, title };
}

export function buildForLang(chapter, lang) {
  const vocab = [];
  const story = [];
  const examples = [];
  const exercise = [];
  const answers = [];
  const proseHtmlParts = [];
  const tldrSummary = [];
  const missingBlocks = [];
  const grammarRules = [];

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
      case 'info':
      case 'warning': {
        let complete = true;
        const { html, title } = renderInfoBlock(block, lang, () => { complete = false; });
        if (!complete) missingBlocks.push(index);
        if (html) proseHtmlParts.push(html);
        if (block.type === 'info' && block.subtype === 'grammar' && html) {
          grammarRules.push({ tag: block.tag, title, html });
        }
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
    grammarRules,
  };
}

// Pure core of the transform: YAML string in, plain JS view object out. No
// filesystem or Vite access, so it can be unit-tested directly with plain
// input -> output assertions. `wordIndex`/`wordCount` are the only external
// inputs the transform needs, and are injected rather than loaded here.
export function transformChapterSource(src, { wordIndex = new Map(), wordCount } = {}) {
  const resolvedSrc = resolveWordRefs(src, wordIndex, wordCount);
  const chapter = parseYaml(resolvedSrc);

  const byLang = {};
  for (const lang of LANGS) byLang[lang] = buildForLang(chapter, lang);

  return { byLang };
}

export function chapterYamlPlugin({
  wordIndex = loadWordIndex(),
  wordCount = loadDictionaryWordCount(),
} = {}) {
  return {
    name: 'vite-plugin-chapter-yaml',
    transform(src, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null;

      const result = transformChapterSource(src, { wordIndex, wordCount });

      return {
        code: `export default ${JSON.stringify(result)};`,
        map: null,
      };
    },
  };
}

export default chapterYamlPlugin;
