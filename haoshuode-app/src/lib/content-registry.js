const modules = import.meta.glob('../content/*.md', { eager: true });

const TYPE_ORDER = { intro: 0, lesson: 1, proverbs: 2, dictionary: 3, appendix: 4 };

export const sections = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => {
    const oa = TYPE_ORDER[a.meta.type] ?? 99;
    const ob = TYPE_ORDER[b.meta.type] ?? 99;
    if (oa !== ob) return oa - ob;
    return (a.meta.order || 0) - (b.meta.order || 0);
  });

export function buildToc(sections) {
  return sections.map(s => ({
    id: s.meta.id,
    type: s.meta.type,
    tocLabel: s.meta.type === 'lesson'
      ? `${s.meta.lessonNumber} · ${s.meta.title}`
      : s.meta.title,
  }));
}
