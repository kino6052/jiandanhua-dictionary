const mdModules = import.meta.glob('../content/*.md', { eager: true });
const chapterModules = import.meta.glob('../content/*.{yaml,yml}', { eager: true });

const TYPE_ORDER = { intro: 0, lesson: 1, proverbs: 2, dictionary: 3, appendix: 4 };
const LANGS = ['eng', 'rus', 'zh'];

// Markdown sections are already language-specific (one file per language).
// Chapter (YAML) modules instead export one view per language from a single
// source file -- same `id`, present in every language's section list.
const singleLangSections = Object.values(mdModules).map(m => m.default);
const multiLangSections = Object.values(chapterModules).map(m => m.default);

const byLang = {};
for (const lang of LANGS) byLang[lang] = [];

for (const s of singleLangSections) {
  const lang = s.meta.language || 'eng';
  if (!byLang[lang]) byLang[lang] = [];
  byLang[lang].push(s);
}

for (const chapter of multiLangSections) {
  for (const lang of LANGS) {
    byLang[lang].push(chapter.byLang[lang]);
  }
}

for (const lang of Object.keys(byLang)) {
  byLang[lang].sort((a, b) => {
    const oa = TYPE_ORDER[a.meta.type] ?? 99;
    const ob = TYPE_ORDER[b.meta.type] ?? 99;
    if (oa !== ob) return oa - ob;
    return (a.meta.order || 0) - (b.meta.order || 0);
  });
}

export const AVAILABLE_LANGS = Object.keys(byLang).sort();

export function getSections(lang) {
  return byLang[lang] || byLang.eng || [];
}

export function buildToc(sections) {
  return sections.map(s => ({
    id: s.meta.id,
    type: s.meta.type,
    tocLabel: s.meta.type === 'lesson'
      ? `${s.meta.lessonNumber} · ${s.meta.title}`
      : s.meta.title,
  }));
}
