# 好话 (Hǎohuà) Language Specification

**Version 0.1 — Draft**

好话 ("good speech") is the smallest tier of the 简单话 family: a Toki-Pona-scale core of **124 real Mandarin words**, expressed with **completely valid Mandarin grammar**, written in the same pinyin orthography as 简单话.

It exists to answer one question: what is the smallest possible vocabulary that still lets you say anything a Toki Pona speaker can say — using only real, native Mandarin words and real, native Mandarin sentence structure?

好话 is a **strict subset of 简单话** (see [JAINDANHUA.md](JAINDANHUA.md)), which is itself a strict subset of full Mandarin. Nothing you learn in 好话 is wrong, non-standard, or has to be unlearned later — it is simply not yet everything. You only ever move forward: 好话 → 简单话 → Mandarin.

---

## 1. Relationship to Toki Pona

Toki Pona proves that a ~120-word vocabulary is sufficient for a fully functioning, fully expressive human language. 好话 borrows that proof of concept but rejects Toki Pona's method: Toki Pona is an invented language with its own grammar (predicate markers `li`, object markers `e`, context markers `la`, phrase-grouping `pi`) layered onto borrowed word-roots. Speaking it does not teach you to speak any natural language.

好话 takes the same *scope* — one word (or one tightly bound compound) per Toki Pona concept — but resolves every sentence with **actual Mandarin grammar**, using the small set of native Mandarin function words (是, 了, 吗, 的, 不, 也, 很...) that Mandarin's own grammar requires and that Toki Pona's grammar was specifically designed to avoid needing.

The practical consequence: everything you say in 好话 is instantly, unambiguously understood by any Mandarin speaker. There is no bridge to cross later — only vocabulary to add.

### Where Toki Pona's grammar particles go

Toki Pona's five purely grammatical markers have no 好话 equivalent, because Mandarin's native grammar already handles their job differently:

| Toki Pona particle | Job                         | How Mandarin handles it instead                      |
| ------------------- | ---------------------------- | ------------------------------------------------------ |
| `li`                 | marks the predicate           | word order alone (SVO) |
| `e`                  | marks the direct object       | word order alone (SVO) |
| `la`                 | marks a context/topic clause  | topic-comment order, or 的话 |
| `o`                  | marks vocative/imperative     | bare imperative verb, or 吧 |
| `pi`                 | groups a modifying phrase     | 的 (already in the 好话 word list) |
| `pu`                 | refers to the canonical Toki Pona book | not applicable — dropped entirely |

Because Mandarin's grammar does work that Toki Pona's particles were invented to do, 好话 needs a handful of small function words Toki Pona doesn't have at all: a copula (是), a perfective marker (了), a question marker (吗), and a few common adverbs (也, 很). These are listed in §4.

---

## 2. Orthography & Pinyin Rules

好话 uses the exact same orthographic rules as 简单话 (see [JAINDANHUA.md §1](JAINDANHUA.md)):

- **Romanized Pinyin with standard dictionary tone marks.** Tone sandhi (e.g. `nǐ hǎo` → spoken `ní hǎo`) is *not* written; the learner reads the dictionary-form tones while audio delivers the natural spoken form.
- **German-style hyphenation** binds compound word-blocks so word boundaries are explicit (e.g. `páxíng-dòngwù`, not `páxíng dòngwù`).
- **The Quote Partition**: onomatopoeia and non-Mandarin sounds are wrapped in quotation marks and not parsed as vocabulary — e.g. a dog's bark under `mu`/叫 is written `Gǒu jiào "wāng-wāng."`, not treated as a new word.
- **Measure words collapse to `个`.** 好话 has no separate classifier system; every countable noun uses `个` unless doing so would create genuine ambiguity.
- **Numbers beyond the core list are formed regularly** from `一, 两, 二, 号` and ordinary Mandarin number-formation rules — Toki Pona's number system (`wan, tu, luka...`) is not reproduced 1:1, since Mandarin's own decimal system is not simplifiable further without becoming a different, harder system.

---

## 3. Grammar

好话 makes **no grammatical simplifications**. Grammar is 100% standard Mandarin: SVO word order, 的/得/地 structural particles, 了/着/过 aspect marking, resultative and directional complements, topic-comment structure. This is a hard rule, not a target — see [JAINDANHUA.md §1, "Sacred Grammar."](JAINDANHUA.md)

What is *not* covered by the 122-word list is expressed by qualification and composition rather than new vocabulary — the same mechanism 简单话 uses at larger scale. For example: 好话 has no word for "door," because Toki Pona doesn't distinguish door from hole/opening (`lupa`) either — a door is expressed compositionally (`洞`, qualified by context) rather than by adding a new atomic word.

---

## 4. The Word List (124 words)

### Pronouns & question words (6)
我 (wǒ) — I/me · 你 (nǐ) — you · 他 (tā) — he/she/it/they · 这 (zhè) — this · 那 (nà) — that · 什么 (shénme) — what

### Grammar & function words (12)
的 (de) — of/possessive · 是 (shì) — to be · 了 (le) — perfective marker · 吗 (ma) — question marker · 不 (bù) — not/no · 没 (méi) — not (negates 有; Mandarin never negates 有 with 不) · 个 (gè) — universal measure word · 也 (yě) — also · 很 (hěn) — very · 和 (hé) — and · 但是 (dànshì) — but/only · 或者 (huòzhě) — or

### Numbers (3)
一 (yī) — one · 两 (liǎng) — two · 号 (hào) — number/ordinal

### People & body (17)
人 (rén) — person · 女人 (nǚrén) — woman · 男人 (nánrén) — man · 父母 (fùmǔ) — parent · 头 (tóu) — head · 手 (shǒu) — hand/arm · 脚 (jiǎo) — foot/leg · 嘴 (zuǐ) — mouth · 鼻子 (bízi) — nose · 身体 (shēntǐ) — body · 皮肤 (pífū) — skin · 性 (xìng) — sex/sexuality

### Animals (6)
动物 (dòngwù) — animal/mammal · 鱼 (yú) — fish · 鸟 (niǎo) — bird · 虫子 (chóngzi) — bug/insect · 爬行动物 (páxíng-dòngwù) — reptile/amphibian

### Nature & elements (10)
地 (dì) — land/ground · 水 (shuǐ) — water · 火 (huǒ) — fire · 空气 (kōngqì) — air/wind · 太阳 (tàiyáng) — sun · 月亮 (yuèliàng) — moon · 植物 (zhíwù) — plant · 硬 (yìng) — hard/stone-like · 泥 (ní) — paste/semi-solid

### Colors (5)
颜色 (yánsè) — color · 红色 (hóngsè) — red · 黄色 (huángsè) — yellow · 蓝色 (lánsè) — blue · 黑色 (hēisè) — black · 白色 (báisè) — white

### Places & objects (14)
房子 (fángzi) — building/house · 市场 (shìchǎng) — market · 地板 (dìbǎn) — floor/surface · 洞 (dòng) — hole/opening/door · 东西 (dōngxi) — thing · 工具 (gōngjù) — tool/machine · 线 (xiàn) — line/rope/hair · 纸 (zhǐ) — flat object/paper · 盒子 (hézi) — container/box · 棍子 (gùnzi) — stick/rod · 钱 (qián) — money · 衣服 (yīfu) — clothing · 米饭 (mǐfàn) — grain/staple food · 水果 (shuǐguǒ) — fruit/vegetable

### Time & space (10)
时间 (shíjiān) — time · 上面 (shàngmiàn) — above · 下面 (xiàmiàn) — below · 前面 (qiánmiàn) — front · 后面 (hòumiàn) — back/behind · 里面 (lǐmiàn) — inside · 旁边 (pángbiān) — side/vicinity · 盐 (yán) — salt/spice/extra

### Verbs — motion, action, perception (30)
来 (lái) — come · 去 (qù) — go · 留 (liú) — stay/wait/remain · 离开 (líkāi) — leave/go away · 找 (zhǎo) — hunt/search · 看 (kàn) — see/look · 听 (tīng) — hear/listen/obey · 说 (shuō) — speak/language · 写 (xiě) — write/draw · 知道 (zhīdào) — know · 觉得 (juéde) — feel/think · 睡觉 (shuìjiào) — sleep · 吃 (chī) — eat/food · 玩 (wán) — play/fun · 爱 (ài) — love · 做 (zuò) — do/make/work · 用 (yòng) — use · 有 (yǒu) — have/contain · 在 (zài) — exist/be at · 给 (gěi) — give/send · 死 (sǐ) — die · 打 (dǎ) — hit/fight · 坏 (huài) — bad/broken · 开始 (kāishǐ) — begin/open · 完 (wán) — finish/end · 要 (yào) — want/need · 可以 (kěyǐ) — can/possible

### Adjectives & qualities (14)
好 (hǎo) — good · 大 (dà) — big/important · 小 (xiǎo) — small · 多 (duō) — many · 新 (xīn) — new · 冷 (lěng) — cold · 热 (rè) — hot/warm · 甜 (tián) — sweet/cute · 圆 (yuán) — round · 一样 (yíyàng) — same/similar · 不同 (bùtóng) — different · 奇怪 (qíguài) — strange

### Abstract & other (7)
名字 (míngzi) — name/word · 声音 (shēngyīn) — sound · 力量 (lìliang) — energy/power · 群 (qún) — group/community · 方法 (fāngfǎ) — way/method · 因为 (yīnwèi) — because · 叫 (jiào) — to call/animal sound (used with the Quote Partition)

---

## 5. Example Sentences

Every sentence below uses only the 124-word list above, standard Mandarin grammar, and 简单话's pinyin conventions: dictionary tone marks (no sandhi), and German-style hyphens binding each word-block so boundaries stay explicit. Word-internal hyphens join a word's own syllables (e.g. `pá-xíng-dòng-wù`); a hyphen also joins a measure-word block to what it modifies (e.g. `nà-ge`, `yī-ge`) and joins a modifier to `de` (e.g. `hóng-sè-de`). Note `yī` (一) keeps its dictionary-form first tone in writing even where speech applies sandhi (`yí-ge`, `yí-yàng`) — same rule as `nǐ hǎo` staying written even though it's spoken `ní hǎo`.

| 好话 (Hanzi) | 好话 (Pinyin) | English |
| --- | --- | --- |
| 我是人。 | Wǒ shì rén. | I am a person. |
| 你好吗？ | Nǐ hǎo ma? | Are you well? |
| 我要水，我也要米饭。 | Wǒ yào shuǐ, wǒ yě yào mǐ-fàn. | I want water, and I also want rice. |
| 那个动物很大，这个很小。 | Nà-ge dòng-wù hěn dà, zhè-ge hěn xiǎo. | That animal is very big, this one is very small. |
| 我看一个红色的鸟。 | Wǒ kàn yī-ge hóng-sè-de niǎo. | I see a red bird. |
| 他要去房子，但是他没有钱。 | Tā yào qù fáng-zi, dàn-shì tā méi-yǒu qián. | He wants to go to the house, but he has no money. |
| 我很热，你也很热吗？ | Wǒ hěn rè, nǐ yě hěn rè ma? | I'm very hot — are you also very hot? |
| 你的名字是什么？ | Nǐ-de míng-zi shì shén-me? | What is your name? |
| 这个和那个一样，不同的是颜色。 | Zhè-ge hé nà-ge yī-yàng, bù-tóng-de shì yán-sè. | This one and that one are the same; what's different is the color. |
| 我可以用工具做东西。 | Wǒ kě-yǐ yòng gōng-jù zuò dōng-xi. | I can use tools to make things. |
| 那个动物叫"汪汪"。 | Nà-ge dòng-wù jiào "wāng-wāng." | That animal goes "woof woof." |
| 我做了，但是坏了。 | Wǒ zuò le, dàn-shì huài le. | I did it, but it broke. |
| 我要睡觉，因为很热。 | Wǒ yào shuì-jiào, yīn-wèi hěn rè. | I want to sleep, because it's hot. |

While drafting these, two very common everyday words came up naturally and turned out to have no home in the 124-word list: 累 (tired) and 晚 (late). Neither maps to any single Toki Pona root, so neither made it in — a reminder that 好话 is scoped to Toki Pona's coverage, not to "everything a beginner needs." Filling gaps like these is exactly what 简单话, the next tier up, is for.

---

## 6. Provenance & Open Items

- 118 of the 124 words are already validated entries in the 简单话 source dictionary (`dictionary.raw.csv`). Six (爬行动物, 蓝色, 棍子, 地板, 没, 个) are real, standard Mandarin words not yet present in that dictionary and should be added. 没 and 个 were added after drafting the example sentences above — real Mandarin grammar cannot negate 有 with 不, and cannot count/specify a noun without a measure word, and Toki Pona's grammar needed neither, so the gap only surfaced once actual sentences were written.
- `seli` (Toki Pona: fire/heat/cook) is deliberately split into two 好话 words, 火 (fire) and 热 (hot) — Mandarin distinguishes these too naturally and too commonly to force them into one word, consistent with the rule established for 简单话: force separate atoms where Mandarin's own ontology splits a concept, even if the reference conlang doesn't.
- This is a first draft mapping (one Mandarin word per Toki Pona root, chosen by commonality and naturalness). Writing the example sentences already surfaced two more gaps (累 "tired", 晚 "late") — common everyday words with no Toki Pona equivalent. Full sentence-level validation against a larger Toki Pona corpus is the natural next step.
