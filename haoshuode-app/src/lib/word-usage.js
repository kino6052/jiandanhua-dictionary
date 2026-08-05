import wordUsage from '../data/word-usage.json';

export function getUsageLabels(id) {
  const chapterIds = wordUsage.words[id] || [];
  return chapterIds.map((chapterId) => wordUsage.chapters[chapterId]?.label ?? chapterId);
}
