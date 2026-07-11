export const LANG_CONFIG = {
  eng: { urlCode: "en", nativeLabel: "EN", htmlLang: "en" },
  rus: { urlCode: "ru", nativeLabel: "RU", htmlLang: "ru" },
  zh: { urlCode: "zh", nativeLabel: "中", htmlLang: "zh" },
};

const UI = {
  eng: {
    introduction: "Introduction",
    lessons: "Lessons",
    reference: "Reference",
    back: "Back",
    next: "Next",
    tagline: "120 words.\nReal Mandarin.\nNo overwhelm. ✌",
    subtitle: "the minimal Chinese language",
    heroSubtitle:
      "Real Mandarin, frozen to about 120 words. Nothing invented, nothing to unlearn — just enough to start speaking today.",
    heroBadge: "an interactive book",
    showAnswers: "Show answers",
    hideAnswers: "Hide answers",
    grammar: "Grammar",
    practice: "Practice Exercise",
    logoSub: "the minimal book",
  },
  rus: {
    introduction: "Введение",
    lessons: "Уроки",
    reference: "Справочник",
    back: "Назад",
    next: "Далее",
    tagline: "120 слов.\nНастоящий мандарин.\nБез перегрузки. ✌",
    subtitle: "минимизированный китайский язык",
    heroSubtitle:
      "Настоящий мандарин, ограниченный примерно 120 словами. Ничего придуманного, нечего переучивать — ровно столько, чтобы заговорить уже сегодня.",
    heroBadge: "интерактивная книга",
    showAnswers: "Показать ответы",
    hideAnswers: "Скрыть ответы",
    grammar: "Грамматика",
    practice: "Практическое задание",
    logoSub: "минимизированная книга",
  },
  zh: {
    introduction: "导言",
    lessons: "课程",
    reference: "参考",
    back: "上一页",
    next: "下一页",
    tagline: "120个词。\n真正的普通话。\n轻松入门。✌",
    subtitle: "最小化的中文",
    heroSubtitle:
      "真正的普通话，精简到约120个词。没有虚构，无需纠正——刚好够你今天就开口说。",
    heroBadge: "互动教材",
    showAnswers: "显示答案",
    hideAnswers: "隐藏答案",
    grammar: "语法",
    practice: "练习",
    logoSub: "最小化教材",
  },
};

export function t(lang, key) {
  return UI[lang]?.[key] || UI.eng[key] || key;
}
