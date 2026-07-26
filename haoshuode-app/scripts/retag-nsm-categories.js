#!/usr/bin/env node
// One-off migration: regroups dictionary.json's `categories` into a two-level
// hierarchy -- 15 NSM (Natural Semantic Metalanguage) top-level categories,
// each split into semantic subcategories -- instead of the old flat, ad-hoc
// semantic-field groups. The nesting exists specifically so redundancy and
// gaps are visible at a glance (e.g. "5 colour words but 0 taste words").
// Preserves every word object exactly as-is; only changes which bucket it
// lives in.

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_PATH = resolve(ROOT, 'src/data/dictionary.json');

const CATEGORY_TITLES = {
  substantives: {
    eng: 'Substantives -- People, Things, and Entities',
    rus: 'Субстантивы — люди, вещи и сущности',
    zh: '实体词——人、事物与存在',
  },
  determiners: {
    eng: 'Determiners -- This, That, Same, Other',
    rus: 'Детерминативы — этот, тот, тот же, другой',
    zh: '限定词——这、那、同、异',
  },
  quantifiers: {
    eng: 'Quantifiers -- Number and Amount',
    rus: 'Квантификаторы — число и количество',
    zh: '量词——数量与数目',
  },
  evaluators: {
    eng: 'Evaluators -- Good and Bad',
    rus: 'Оценочные слова — хорошо и плохо',
    zh: '评价词——好与坏',
  },
  descriptors: {
    eng: 'Descriptors -- Size, Colour, and Quality',
    rus: 'Дескрипторы — размер, цвет и качество',
    zh: '描述词——大小、颜色与性质',
  },
  'mental-predicates': {
    eng: 'Mental Predicates -- Knowing, Wanting, Feeling',
    rus: 'Ментальные предикаты — знать, хотеть, чувствовать',
    zh: '心理谓词——知、欲、感',
  },
  speech: {
    eng: 'Speech -- Saying and Writing',
    rus: 'Речь — говорение и письмо',
    zh: '言语——说与写',
  },
  actions: {
    eng: 'Actions, Motion, and Contact',
    rus: 'Действия, движение и контакт',
    zh: '动作、运动与接触',
  },
  'location-existence-possession': {
    eng: 'Location, Existence, and Possession',
    rus: 'Местоположение, существование и обладание',
    zh: '位置、存在与拥有',
  },
  'life-death': {
    eng: 'Life and Death',
    rus: 'Жизнь и смерть',
    zh: '生与死',
  },
  time: {
    eng: 'Time',
    rus: 'Время',
    zh: '时间',
  },
  space: {
    eng: 'Space',
    rus: 'Пространство',
    zh: '空间',
  },
  'logical-concepts': {
    eng: 'Logical Concepts and Grammatical Particles',
    rus: 'Логические понятия и грамматические частицы',
    zh: '逻辑概念与语法助词',
  },
  intensifier: {
    eng: 'Intensifier -- Very and More',
    rus: 'Интенсификатор — очень и больше',
    zh: '程度词——很与更',
  },
  similarity: {
    eng: 'Similarity -- Like, As, Way',
    rus: 'Подобие — как, подобно, образ действия',
    zh: '相似——像、如、法',
  },
};

// Subcategory titles, keyed "category/subcategory".
const SUB_TITLES = {
  'substantives/pronouns-interrogatives': { eng: 'Pronouns & Interrogatives', rus: 'Местоимения и вопросительные слова', zh: '代词与疑问词' },
  'substantives/people-kinship': { eng: 'People & Kinship', rus: 'Люди и родство', zh: '人与亲属' },
  'substantives/body': { eng: 'Body', rus: 'Тело', zh: '身体' },
  'substantives/animals': { eng: 'Animals', rus: 'Животные', zh: '动物' },
  'substantives/plants-natural-elements': { eng: 'Plants & Natural Elements', rus: 'Растения и природные стихии', zh: '植物与自然元素' },
  'substantives/food-drink': { eng: 'Food & Drink', rus: 'Еда и питьё', zh: '食物与饮品' },
  'substantives/tools-objects': { eng: 'Tools & Objects', rus: 'Инструменты и предметы', zh: '工具与物品' },
  'substantives/places-as-things': { eng: 'Places (as Things)', rus: 'Места (как вещи)', zh: '地方（作为事物）' },
  'substantives/abstract-substantives': { eng: 'Abstract Substantives', rus: 'Абстрактные субстантивы', zh: '抽象实体词' },

  'determiners/demonstratives': { eng: 'Demonstratives', rus: 'Указательные слова', zh: '指示词' },
  'determiners/sameness-difference': { eng: 'Sameness & Difference', rus: 'Тождество и различие', zh: '相同与差异' },

  'quantifiers/numbers-ordinals': { eng: 'Numbers & Ordinals', rus: 'Числа и порядковые числительные', zh: '数字与序数' },
  'quantifiers/amount': { eng: 'Amount', rus: 'Количество', zh: '数量' },
  'quantifiers/classifier': { eng: 'Classifier', rus: 'Счётное слово', zh: '量词' },

  'descriptors/colour': { eng: 'Colour', rus: 'Цвет', zh: '颜色' },
  'descriptors/temperature-taste': { eng: 'Temperature & Taste', rus: 'Температура и вкус', zh: '温度与味道' },
  'descriptors/physical-property': { eng: 'Physical Property', rus: 'Физическое свойство', zh: '物理属性' },
  'descriptors/size': { eng: 'Size', rus: 'Размер', zh: '大小' },
  'descriptors/other-quality': { eng: 'Other Quality', rus: 'Прочие качества', zh: '其他性质' },

  'mental-predicates/cognition': { eng: 'Cognition', rus: 'Познание', zh: '认知' },
  'mental-predicates/perception': { eng: 'Perception', rus: 'Восприятие', zh: '感知' },
  'mental-predicates/volition-affect': { eng: 'Volition & Affect', rus: 'Воля и чувства', zh: '意愿与情感' },

  'actions/motion': { eng: 'Motion', rus: 'Движение', zh: '运动' },
  'actions/manipulation-contact': { eng: 'Manipulation & Contact', rus: 'Манипуляция и контакт', zh: '操作与接触' },
  'actions/state-change-general': { eng: 'State-Change & General Action', rus: 'Изменение состояния и общее действие', zh: '状态变化与一般动作' },
  'actions/daily-activities': { eng: 'Daily Activities', rus: 'Повседневные занятия', zh: '日常活动' },
  'actions/naming-using': { eng: 'Naming & Using', rus: 'Называние и использование', zh: '命名与使用' },

  'location-existence-possession/existence-location': { eng: 'Existence & Location', rus: 'Существование и местоположение', zh: '存在与位置' },
  'location-existence-possession/possession-acquisition': { eng: 'Possession & Acquisition', rus: 'Обладание и приобретение', zh: '拥有与获得' },

  'space/relative-position': { eng: 'Relative Position', rus: 'Относительное положение', zh: '相对位置' },
  'space/place-nouns-prepositions': { eng: 'Place Nouns & Prepositions', rus: 'Существительные места и предлоги', zh: '地点名词与介词' },

  'logical-concepts/negation': { eng: 'Negation', rus: 'Отрицание', zh: '否定' },
  'logical-concepts/modality': { eng: 'Modality', rus: 'Модальность', zh: '情态' },
  'logical-concepts/conjunction': { eng: 'Conjunction', rus: 'Союзы', zh: '连接' },
  'logical-concepts/interrogatives': { eng: 'Interrogatives', rus: 'Вопросительные слова', zh: '疑问词' },
  'logical-concepts/grammatical-particles': { eng: 'Grammatical Particles', rus: 'Грамматические частицы', zh: '语法助词' },
};

// term -> "category/subcategory". Every one of the dictionary's 128 terms
// must appear here exactly once (validated below). Categories with no
// natural split just use a single "/general" subcategory bucket, which is
// rendered without its own subheading (see generate-dictionary.js).
const TERM_PATH = {
  wǒ: 'substantives/pronouns-interrogatives', nǐ: 'substantives/pronouns-interrogatives',
  tā: 'substantives/pronouns-interrogatives', shénme: 'substantives/pronouns-interrogatives',

  rén: 'substantives/people-kinship', fùmǔ: 'substantives/people-kinship',
  nánrén: 'substantives/people-kinship', nǚrén: 'substantives/people-kinship', qún: 'substantives/people-kinship',

  bízi: 'substantives/body', jiǎo: 'substantives/body', kǒu: 'substantives/body',
  pífū: 'substantives/body', shēntǐ: 'substantives/body', shǒu: 'substantives/body', tóu: 'substantives/body',

  dòngwù: 'substantives/animals', chóngzi: 'substantives/animals', niǎo: 'substantives/animals',
  páxíngdòngwù: 'substantives/animals', yú: 'substantives/animals',

  zhíwù: 'substantives/plants-natural-elements', huǒ: 'substantives/plants-natural-elements',
  kōngqì: 'substantives/plants-natural-elements', rì: 'substantives/plants-natural-elements',
  yuè: 'substantives/plants-natural-elements',

  mǐfàn: 'substantives/food-drink', shuǐguǒ: 'substantives/food-drink',
  yán: 'substantives/food-drink', shuǐ: 'substantives/food-drink',

  gōngjù: 'substantives/tools-objects', gùnzi: 'substantives/tools-objects', hézi: 'substantives/tools-objects',
  ní: 'substantives/tools-objects', qián: 'substantives/tools-objects', xiàn: 'substantives/tools-objects',
  yīfu: 'substantives/tools-objects', dōngxi: 'substantives/tools-objects',

  jiā: 'substantives/places-as-things', shìchǎng: 'substantives/places-as-things',

  cí: 'substantives/abstract-substantives', xìng: 'substantives/abstract-substantives',
  lìliàng: 'substantives/abstract-substantives',

  zhè: 'determiners/demonstratives', nà: 'determiners/demonstratives',
  yīyàng: 'determiners/sameness-difference', bùtóng: 'determiners/sameness-difference',

  yī: 'quantifiers/numbers-ordinals', liǎng: 'quantifiers/numbers-ordinals', hào: 'quantifiers/numbers-ordinals',
  duō: 'quantifiers/amount', quánbù: 'quantifiers/amount',
  gè: 'quantifiers/classifier',

  hǎo: 'evaluators/general', huài: 'evaluators/general',

  báisè: 'descriptors/colour', hēisè: 'descriptors/colour', hóngsè: 'descriptors/colour',
  huángsè: 'descriptors/colour', lánsè: 'descriptors/colour', yánsè: 'descriptors/colour',
  rè: 'descriptors/temperature-taste', lěng: 'descriptors/temperature-taste', tián: 'descriptors/temperature-taste',
  yìng: 'descriptors/physical-property', yuán: 'descriptors/physical-property',
  dà: 'descriptors/size', xiǎo: 'descriptors/size',
  qíguài: 'descriptors/other-quality', xīn: 'descriptors/other-quality',

  zhīdào: 'mental-predicates/cognition', juéde: 'mental-predicates/cognition',
  kàn: 'mental-predicates/perception', tīng: 'mental-predicates/perception',
  yào: 'mental-predicates/volition-affect', ài: 'mental-predicates/volition-affect',

  shuō: 'speech/general', xiě: 'speech/general',

  qù: 'actions/motion', lái: 'actions/motion',
  dǎ: 'actions/manipulation-contact', mō: 'actions/manipulation-contact',
  gěi: 'actions/manipulation-contact', zhǎo: 'actions/manipulation-contact',
  biàn: 'actions/state-change-general', zuò: 'actions/state-change-general',
  chī: 'actions/daily-activities', shuìjiào: 'actions/daily-activities', wán: 'actions/daily-activities',
  děng: 'actions/daily-activities', kāishǐ: 'actions/daily-activities', wánchéng: 'actions/daily-activities',
  jiào: 'actions/naming-using', yòng: 'actions/naming-using',

  zài: 'location-existence-possession/existence-location', shì: 'location-existence-possession/existence-location',
  liú: 'location-existence-possession/existence-location',
  yǒu: 'location-existence-possession/possession-acquisition', dé: 'location-existence-possession/possession-acquisition',

  sǐ: 'life-death/general',

  shíjiān: 'time/general',

  hòumiàn: 'space/relative-position', lǐmiàn: 'space/relative-position', pángbiān: 'space/relative-position',
  qiánmiàn: 'space/relative-position', shàngmiàn: 'space/relative-position', xiàmiàn: 'space/relative-position',
  wài: 'space/relative-position',
  dìfāng: 'space/place-nouns-prepositions', dìbǎn: 'space/place-nouns-prepositions',
  cóng: 'space/place-nouns-prepositions', duì: 'space/place-nouns-prepositions',

  bù: 'logical-concepts/negation', méi: 'logical-concepts/negation',
  néng: 'logical-concepts/modality',
  hé: 'logical-concepts/conjunction', huòzhě: 'logical-concepts/conjunction',
  dànshì: 'logical-concepts/conjunction', yě: 'logical-concepts/conjunction', yīnwèi: 'logical-concepts/conjunction',
  wèishénme: 'logical-concepts/interrogatives', zěnme: 'logical-concepts/interrogatives',
  bǎ: 'logical-concepts/grammatical-particles', de: 'logical-concepts/grammatical-particles',
  le: 'logical-concepts/grammatical-particles', ma: 'logical-concepts/grammatical-particles',

  hěn: 'intensifier/general',

  fāngfǎ: 'similarity/general',
};

const CATEGORY_ORDER = [
  'substantives', 'determiners', 'quantifiers', 'evaluators', 'descriptors',
  'mental-predicates', 'speech', 'actions', 'location-existence-possession',
  'life-death', 'time', 'space', 'logical-concepts', 'intensifier', 'similarity',
];

function main() {
  const dictionary = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

  const allWords = [];
  for (const category of dictionary.categories) {
    const words = category.words || category.subcategories?.flatMap((s) => s.words) || [];
    for (const word of words) allWords.push(word);
  }

  const seen = new Set();
  for (const word of allWords) {
    if (!(word.term in TERM_PATH)) {
      throw new Error(`No NSM path mapping for term "${word.term}" (id: ${word.id})`);
    }
    if (seen.has(word.term)) throw new Error(`Duplicate term encountered: "${word.term}"`);
    seen.add(word.term);
  }
  for (const term of Object.keys(TERM_PATH)) {
    if (!seen.has(term)) {
      throw new Error(`TERM_PATH has mapping for "${term}" but it's not in the dictionary`);
    }
  }

  // category -> subcategory -> words[]
  const tree = {};
  for (const key of CATEGORY_ORDER) tree[key] = {};

  for (const word of allWords) {
    const [cat, sub] = TERM_PATH[word.term].split('/');
    if (!tree[cat][sub]) tree[cat][sub] = [];
    tree[cat][sub].push(word);
  }

  dictionary.categories = CATEGORY_ORDER.filter((cat) => Object.keys(tree[cat]).length > 0).map((cat) => {
    const subKeys = Object.keys(tree[cat]);
    const subcategories = subKeys.map((sub) => ({
      key: sub,
      title: sub === 'general' ? null : SUB_TITLES[`${cat}/${sub}`],
      words: tree[cat][sub],
    }));
    return {
      title: CATEGORY_TITLES[cat],
      subcategories,
    };
  });

  writeFileSync(DATA_PATH, JSON.stringify(dictionary, null, 2) + '\n', 'utf-8');

  let totalWords = 0;
  const summary = dictionary.categories.map((c) => {
    const n = c.subcategories.reduce((sum, s) => sum + s.words.length, 0);
    totalWords += n;
    return `${c.title.eng} (${c.subcategories.length} sub, ${n} words)`;
  });
  console.log(`Retagged ${totalWords} words into ${dictionary.categories.length} NSM categories:`);
  console.log(summary.join('\n'));
}

main();
