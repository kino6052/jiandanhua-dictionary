import dictionary from "../data/dictionary.json";
import { countDictionaryWords } from "./dictionary-stats.js";

export const LANG_CONFIG = {
  eng: { urlCode: "en", nativeLabel: "EN", htmlLang: "en" },
  rus: { urlCode: "ru", nativeLabel: "RU", htmlLang: "ru" },
  zh: { urlCode: "zh", nativeLabel: "中", htmlLang: "zh" },
};

const WORD_COUNT = countDictionaryWords(dictionary);

const UI = {
  eng: {
    introduction: "Introduction",
    lessons: "Lessons",
    reference: "Reference",
    back: "Back",
    next: "Next",
    tagline: "{count} words.\nReal Mandarin.\nNo overwhelm. ✌",
    subtitle: "the minimal Chinese language",
    heroSubtitle:
      "Real Mandarin, frozen to about {count} words. Nothing invented, nothing to unlearn — just enough to start speaking today.",
    heroBadge: "an interactive book",
    showAnswers: "Show answers",
    hideAnswers: "Hide answers",
    grammar: "Grammar",
    practice: "Practice Exercise",
    logoSub: "the minimal book",
    tldrTitle: "TL;DR",
    tldrWhy: "Why this matters:",
    tldrOverview: "Chapter overview",
    missingContent: "Some content isn't translated yet for section(s):",
    usedIn: "Used in:",
    notUsedYet: "Not used in any chapter yet",
  },
  rus: {
    introduction: "Введение",
    lessons: "Уроки",
    reference: "Справочник",
    back: "Назад",
    next: "Далее",
    tagline: "{count} слов.\nНастоящий мандарин.\nБез перегрузки. ✌",
    subtitle: "минимизированный китайский язык",
    heroSubtitle:
      "Настоящий мандарин, ограниченный примерно {count} словами. Ничего придуманного, нечего переучивать — ровно столько, чтобы заговорить уже сегодня.",
    heroBadge: "интерактивная книга",
    showAnswers: "Показать ответы",
    hideAnswers: "Скрыть ответы",
    grammar: "Грамматика",
    practice: "Практическое задание",
    logoSub: "минимизированная книга",
    tldrTitle: "Кратко",
    tldrWhy: "Почему это важно:",
    tldrOverview: "Обзор главы",
    missingContent: "Часть содержимого пока не переведена в разделе(ах):",
    usedIn: "Используется в:",
    notUsedYet: "Пока не используется ни в одной главе",
  },
  zh: {
    introduction: "导言",
    lessons: "课程",
    reference: "参考",
    back: "上一页",
    next: "下一页",
    tagline: "{count}个词。\n真正的普通话。\n轻松入门。✌",
    subtitle: "最小化的中文",
    heroSubtitle:
      "真正的普通话，精简到约{count}个词。没有虚构，无需纠正——刚好够你今天就开口说。",
    heroBadge: "互动教材",
    showAnswers: "显示答案",
    hideAnswers: "隐藏答案",
    grammar: "语法",
    practice: "练习",
    logoSub: "最小化教材",
    tldrTitle: "摘要",
    tldrWhy: "为什么重要：",
    tldrOverview: "本章概览",
    missingContent: "以下章节的内容尚未翻译：",
    usedIn: "使用于：",
    notUsedYet: "尚未在任何章节中使用",
  },
};

export function t(lang, key) {
  const value = UI[lang]?.[key] || UI.eng[key] || key;
  return typeof value === "string" ? value.replace(/\{count\}/g, WORD_COUNT) : value;
}
