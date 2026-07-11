const modules = import.meta.glob('../content/*.md', { eager: true });

const TYPE_ORDER = { intro: 0, lesson: 1, proverbs: 2, dictionary: 3, appendix: 4 };

const allSections = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => {
    const oa = TYPE_ORDER[a.meta.type] ?? 99;
    const ob = TYPE_ORDER[b.meta.type] ?? 99;
    if (oa !== ob) return oa - ob;
    return (a.meta.order || 0) - (b.meta.order || 0);
  });

const byLang = {};
for (const s of allSections) {
  const lang = s.meta.language || 'eng';
  if (!byLang[lang]) byLang[lang] = [];
  byLang[lang].push(s);
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
