// Run with `bun test`. Each test feeds a plain-JS chapter object (or, for
// the end-to-end cases, a raw YAML string) into the pure transform and
// asserts on the exact output shape -- no mocking, no Vite, no filesystem.
import { describe, test, expect } from 'bun:test';
import { buildForLang, transformChapterSource } from './vite-plugin-chapter.js';

function chapter(blocks, extra = {}) {
  return { id: 'test-chapter', type: 'lesson', lessonNumber: 1, order: 1, blocks, ...extra };
}

describe('buildForLang: heading', () => {
  test('renders present language as an <h3>', () => {
    const out = buildForLang(chapter([{ type: 'heading', text: { eng: 'Tones' } }]), 'eng');
    expect(out.bodyHtml).toBe('<h3>Tones</h3>');
    expect(out.missingBlocks).toEqual([]);
  });

  test('records the block index when the language is absent, renders nothing', () => {
    const out = buildForLang(chapter([{ type: 'heading', text: { eng: 'Tones' } }]), 'zh');
    expect(out.bodyHtml).toBe('');
    expect(out.missingBlocks).toEqual([0]);
  });
});

describe('buildForLang: prose', () => {
  test('renders markdown body and lifts tldr/necessity into tldrSummary', () => {
    const out = buildForLang(
      chapter([{
        type: 'prose',
        text: { eng: 'Hello **world**' },
        tldr: { eng: 'Says hi' },
        necessity: { eng: 'Core' },
      }]),
      'eng',
    );
    expect(out.bodyHtml).toBe('<p>Hello <strong>world</strong></p>\n');
    expect(out.tldrSummary).toEqual([{ tldr: 'Says hi', necessity: 'Core' }]);
    expect(out.missingBlocks).toEqual([]);
  });

  test('flags the block missing when any of text/tldr/necessity is absent for the language', () => {
    const out = buildForLang(
      chapter([{ type: 'prose', text: { eng: 'Hi' }, tldr: {}, necessity: { eng: 'Core' } }]),
      'eng',
    );
    expect(out.missingBlocks).toEqual([0]);
    // What IS present for the language still renders/lifts.
    expect(out.bodyHtml).toBe('<p>Hi</p>\n');
    expect(out.tldrSummary).toEqual([{ tldr: undefined, necessity: 'Core' }]);
  });
});

describe('buildForLang: vocab/examples/story/exercise/answers', () => {
  test('vocab: skips items missing the language but keeps the rest', () => {
    const out = buildForLang(
      chapter([{
        type: 'vocab',
        items: [
          { term: 'mā', definition: { eng: 'mother' } },
          { term: 'mǎ', definition: {} },
        ],
      }]),
      'eng',
    );
    expect(out.vocab).toEqual([{ pinyin: 'mā', definition: 'mother', audioFile: undefined, ttsText: undefined }]);
    expect(out.missingBlocks).toEqual([0]);
  });

  test('examples vs story land in separate buckets', () => {
    const out = buildForLang(
      chapter([
        { type: 'examples', items: [{ pinyin: 'nǐ hǎo', translation: { eng: 'hello' } }] },
        { type: 'story', items: [{ pinyin: 'cóngqián', translation: { eng: 'once upon a time' } }] },
      ]),
      'eng',
    );
    expect(out.examples).toEqual([{ pinyin: 'nǐ hǎo', translation: 'hello', audioFile: undefined, ttsText: undefined }]);
    expect(out.story).toEqual([{ pinyin: 'cóngqián', translation: 'once upon a time', audioFile: undefined, ttsText: undefined }]);
  });

  test('exercise collects the plain i18n strings', () => {
    const out = buildForLang(chapter([{ type: 'exercise', items: [{ eng: 'Do X' }, { eng: 'Do Y' }] }]), 'eng');
    expect(out.exercise).toEqual(['Do X', 'Do Y']);
  });

  test('answers collects {text, audioFile, ttsText}', () => {
    const out = buildForLang(chapter([{ type: 'answers', items: [{ text: { eng: 'Because.' }, audioFile: 'a.mp3' }] }]), 'eng');
    expect(out.answers).toEqual([{ text: 'Because.', audioFile: 'a.mp3', ttsText: undefined }]);
  });
});

describe('buildForLang: info/warning blocks', () => {
  test('info block renders as a single unit: icon + title + nested list', () => {
    const out = buildForLang(
      chapter([{
        type: 'info',
        title: { rus: 'Пример' },
        items: [
          { text: { rus: 'Zhōngguó -- Китай' }, items: [{ text: { rus: 'Слоги: Zhōng и guó' } }] },
        ],
      }]),
      'rus',
    );
    expect(out.bodyHtml).toBe(
      '<div class="info-block">' +
        '<span class="info-block-icon" aria-hidden="true">ℹ️</span>' +
        '<div class="info-block-content">' +
          '<div class="info-block-title">Пример</div>' +
          '<ul><li>Zhōngguó -- Китай<ul><li>Слоги: Zhōng и guó</li></ul></li></ul>' +
        '</div>' +
      '</div>',
    );
    expect(out.missingBlocks).toEqual([]);
  });

  test('warning block uses the warning icon/classes and renders without a title', () => {
    const out = buildForLang(
      chapter([{ type: 'warning', items: [{ text: { eng: 'Tones matter here.' } }] }]),
      'eng',
    );
    expect(out.bodyHtml).toBe(
      '<div class="warning-block">' +
        '<span class="warning-block-icon" aria-hidden="true">⚠️</span>' +
        '<div class="warning-block-content"><ul><li>Tones matter here.</li></ul></div>' +
      '</div>',
    );
  });

  test('ordered: true renders that level as <ol> instead of <ul>', () => {
    const out = buildForLang(
      chapter([{
        type: 'info',
        title: { eng: 'Steps' },
        ordered: true,
        items: [{ text: { eng: 'First' } }, { text: { eng: 'Second' } }],
      }]),
      'eng',
    );
    expect(out.bodyHtml).toContain('<ol><li>First</li><li>Second</li></ol>');
  });

  test('an item missing the language is skipped, siblings still render, block flagged missing', () => {
    const out = buildForLang(
      chapter([{
        type: 'info',
        title: { eng: 'Notes' },
        items: [{ text: { eng: 'kept' } }, { text: { rus: 'no english' } }],
      }]),
      'eng',
    );
    expect(out.bodyHtml).toContain('<li>kept</li>');
    expect(out.bodyHtml).not.toContain('no english');
    expect(out.missingBlocks).toEqual([0]);
  });

  test('title missing the language flags the block but items with content still render', () => {
    const out = buildForLang(
      chapter([{ type: 'info', title: { rus: 'Заголовок' }, items: [{ text: { eng: 'body' } }] }]),
      'eng',
    );
    expect(out.missingBlocks).toEqual([0]);
    expect(out.bodyHtml).not.toContain('info-block-title');
    expect(out.bodyHtml).toContain('<li>body</li>');
  });

  test('an entirely empty block for the language renders nothing and is flagged missing', () => {
    const out = buildForLang(
      chapter([{ type: 'info', title: { rus: 'Заголовок' }, items: [{ text: { rus: 'body' } }] }]),
      'eng',
    );
    expect(out.bodyHtml).toBe('');
    expect(out.missingBlocks).toEqual([0]);
  });

  test('item text supports inline markdown', () => {
    const out = buildForLang(
      chapter([{ type: 'info', items: [{ text: { eng: '**bold** and normal' } }] }]),
      'eng',
    );
    expect(out.bodyHtml).toContain('<li><strong>bold</strong> and normal</li>');
  });
});

describe('buildForLang: chapter summary -> tldrSummary overview', () => {
  test('summary becomes the first, overview-flagged tldrSummary entry', () => {
    const out = buildForLang(
      chapter(
        [{ type: 'prose', text: { eng: 'body' }, tldr: { eng: 'short' }, necessity: { eng: 'core' } }],
        { summary: { eng: 'Whole chapter in one line.' } },
      ),
      'eng',
    );
    expect(out.tldrSummary[0]).toEqual({ tldr: 'Whole chapter in one line.', necessity: undefined, isOverview: true });
    expect(out.tldrSummary[1]).toEqual({ tldr: 'short', necessity: 'core' });
  });
});

describe('buildForLang: unknown block type', () => {
  test('throws, naming the chapter id and the bad type', () => {
    expect(() => buildForLang(chapter([{ type: 'bogus' }]), 'eng')).toThrow(
      /Unknown chapter block type "bogus" in test-chapter/,
    );
  });
});

describe('transformChapterSource: end-to-end YAML -> byLang, with DI', () => {
  test('parses YAML, resolves {{word:..}}/{{dictionaryCount}} via injected data, builds every language', () => {
    const yaml = `
id: demo
type: lesson
lessonNumber: 1
order: 1
title:
  eng: "Demo"
blocks:
  - type: prose
    text:
      eng: "This dictionary has {{dictionaryCount}} words, e.g. {{word:mother}}."
    tldr:
      eng: "tldr"
    necessity:
      eng: "necessity"
`;
    const { byLang } = transformChapterSource(yaml, {
      wordIndex: new Map([['mother', 'mā']]),
      wordCount: 42,
    });

    expect(byLang.eng.bodyHtml).toContain('This dictionary has 42 words, e.g. mā.');
    expect(byLang.eng.meta).toEqual({
      id: 'demo', type: 'lesson', lessonNumber: 1, order: 1, title: 'Demo', language: 'eng',
    });
    // Requested but untranslated languages still come back, falling back to the id for the title.
    expect(byLang.rus.meta.title).toBe('demo');
    expect(byLang.zh.meta.title).toBe('demo');
  });

  test('an unresolvable {{word:..}} ref throws with the offending id named', () => {
    const yaml = `
id: demo
type: lesson
lessonNumber: 1
order: 1
title:
  eng: "Demo"
blocks:
  - type: heading
    text:
      eng: "{{word:missing}}"
`;
    expect(() => transformChapterSource(yaml, { wordIndex: new Map(), wordCount: 0 })).toThrow(
      /Unknown word id "missing"/,
    );
  });
});
