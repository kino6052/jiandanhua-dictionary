# Hao-shuo-de Content Checklist

A living checklist of what this book needs to say, and where it currently stands. Modeled on the structure of the official Toki Pona book (_pu_): purpose/motivation essays → phonology → grammar built up lesson by lesson → theory of why the minimal vocabulary works → reference material (dictionary, phrasebook) → connected texts (stories/proverbs).

Check items off (`[x]`) as they land. Re-run the dictionary/lesson cross-reference (see the audit notes) whenever `src/data/dictionary.json` or a lesson's vocabulary changes — several findings below will go stale otherwise.

Numbering is strictly hierarchical: `5.1.17.1` is section 5, subsection 1, item 17, sub-item 1. Indentation mirrors the numbering depth — a bolded, un-checkboxed line is a group heading (subsection / chapter / bucket); indented checkbox lines underneath it are its direct children.

---

## 1. Purpose — Why and How

- **1.1 Why (motivation)**
  - [x] 1.1.1 Why Chinese specifically is hard for learners, and which part of that difficulty this book removes — `intro-1.md`
  - [x] 1.1.2 Precedent: minimal constructed languages work (Toki Pona) — `intro-2.md`
  - [ ] 1.1.3 Why _Mandarin_ rather than another source language (why not build the same idea on Spanish, Arabic, etc.) — not currently stated anywhere
  - [ ] 1.1.4 What the reader will be able to do at the end (a concrete "can-do" outcome statement — e.g. "read/produce N-word sentences about X, Y, Z"), stated up front rather than implied
  - [ ] 1.1.5 Who this book is _not_ for (e.g. not a substitute for a real-Mandarin fluency course, not HSK-aligned) — an honest scope disclaimer
- **1.2 How (mechanics of the method)**
  - [x] 1.2.1 Typographic conventions: solid compounds vs. hyphenated bound grammar vs. quoted untranslatables — `intro-3.md`
  - [x] 1.2.2 No prior Chinese knowledge assumed; lessons build sequentially — `intro-3.md`
  - [ ] 1.2.3 How to use the audio (`<audio-example>`) and progress-tracking features of the app itself — currently undocumented for the reader (only in developer README)
  - [ ] 1.2.4 A explicit "how to study" suggestion (e.g. recommended pace, how to use the exercises, when to revisit the dictionary)
  - [ ] 1.2.5 Cross-reference map: where a reader goes if confused (pinyin → appendix-pinyin; grammar term → which lesson; word → dictionary)

---

## 2. Pinyin

- [x] 2.1 Full initials inventory incl. the three confusable sets (j/q/x, zh/ch/sh/r, z/c/s) — `appendix-pinyin.md`
- [x] 2.2 Full finals inventory — `appendix-pinyin.md`
- [x] 2.3 Spelling quirks (yi/wu/yu stand-ins; silent ü after j/q/x/y) — `appendix-pinyin.md`
- [x] 2.4 Note on real-speech tone sandhi (3rd-tone sandhi, bù/yī changes) — `appendix-pinyin.md`
- [x] 2.5 The four tones + neutral tone, taught with mnemonics — `lesson-01.yaml`
- [ ] 2.6 A minimal-pairs drill section (mā/má/mǎ/mà-style sets) beyond the single worked example, so tone distinction is _practiced_, not just described
- [ ] 2.7 Syllable-structure explainer (initial + final + tone as the atomic unit) stated as a rule, not just demonstrated
- [ ] 2.8 `appendix-pinyin.md` has no Russian/Chinese translation — **translate** (only English exists)
- [ ] 2.9 Cross-link from `lesson-01` info-blocks back to the specific appendix-pinyin subsection each rule elaborates (currently only one link to the appendix as a whole)

---

## 3. Dictionary

- **3.1 Structural completeness**
  - [x] 3.1.1 Generated alphabetical listing — `dictionary.md` (130 words, eng/rus/zh parallel)
  - [x] 3.1.2 Categorical listing, 15 top-level categories with subcategories (and subsubcategories where warranted) rendered as a real collapsible nested tree straight from `dictionary.json` — `CategoricalDictionarySection.jsx`
  - [x] 3.1.3 Toki Pona gloss column on every entry
  - [x] 3.1.4 Stable `id` per word for `{{word:ID}}` referencing (build fails loudly on an unknown id)
- **3.2 Known vocabulary/dictionary mismatches — must resolve**

  Confirmed by cross-checking every lesson's vocab against `src/data/dictionary.json` (130 words, checked programmatically). These pinyin syllables are used as if they were dictionary words in lessons, but have **no entry** in `dictionary.json`:
  - [ ] 3.2.1 `kěyǐ` ("can/may," lesson-14) — not in dictionary. Either add it, or replace with an existing modality word (dictionary already has `néng`)
  - [ ] 3.2.2 `dǒng` ("understand," lesson-17) — not in dictionary. Nearest existing word is `zhīdào` ("know") — decide whether "understand" is a distinct primitive or should be expressed via `zhīdào`
  - [ ] 3.2.3 `dào` ("to, toward," lesson-16) — not in dictionary; only `lái`/`qù` exist under Motion. Lesson-16's "zài-qù-dào" construction depends on a word the dictionary doesn't define
  - [ ] 3.2.4 `wǎn` ("bowl," lesson-19) — not in dictionary
  - [ ] 3.2.5 `líkāi` ("to leave/depart," lesson-18) — not in dictionary
  - [ ] 3.2.6 `shēngyīn` ("sound/voice," lesson-11) — not in dictionary (lesson also independently covers animal sounds via `jiào`, so check whether this word is even needed)
  - [ ] 3.2.7 Numbers 3–9, 10, 100, 1000 (`èr`\*, `sān`...`jiǔ`, `shí`, `bǎi`, `qiān`) used throughout lesson-13 — dictionary's Quantifiers category only defines `yī` and `liǎng`. Decide the actual design: are all numbers meant to be dictionary primitives, or should 3+ be built compositionally from a smaller base (Toki-Pona-style)? Whichever answer, the dictionary and lesson-13 currently disagree.
    - [ ] 3.2.7.1 `èr` (math/serial "two") vs. `liǎng` (counting "two") is explicitly taught in lesson-13 as a real distinction — `èr` should very likely be a dictionary entry regardless of how the rest of the numbers are resolved.

- **3.3 Coverage/design questions worth deciding explicitly**
  - [ ] 3.3.1 Is 130 words the intended final size, or a target ceiling still being approached? (`appendix-minimality.yaml` argues for sufficiency in principle but doesn't commit to an exact final count; 5 words -- shēngyīn, zhēn, wèn, nǎlǐ, pà -- were added for `appendix-stories.yaml`, and niǎo/yú were removed again in favor of compositional phrasing (huì-fēi-de dòngwù, zài-shuǐ-lǐ-de dòngwù), see §8.28 -- net effect is a dictionary that's still being actively tuned, not a fixed ceiling)
  - [ ] 3.3.2 Category 9 (Life and Death) and Category 10 (Time) each have exactly **one** word (`sǐ`, `shíjiān`). Confirm this is intentional minimalism and not an oversight — e.g. no word for "to live/be alive" (only "to die"), no words for relative time (before/after/now/soon)
  - [ ] 3.3.3 No dedicated "sound/hear" vocabulary beyond `tīng` (hear) and `jiào` (to call/cry out) — confirm this is sufficient for lesson-11's animal-sounds content once `shēngyīn` is resolved (§3.2)
  - [ ] 3.3.4 Create Source-language 2 hao-shuo-de dictionary with at least 5000 entries

---

## 4. Theory — Why This Is Possible

- [x] 4.1 Aristotle's categories close the logical space of predicates — `appendix-minimality.yaml`
- [x] 4.2 NSM (Wierzbicka/Goddard) ~65 semantic primes as cross-linguistic evidence — `appendix-minimality.yaml`
- [x] 4.3 Primitive vs. composite word distinction, with worked examples — `appendix-minimality.yaml`
- [x] 4.4 Explains why real-Mandarin grammar (vs. Toki Pona's invented grammar) constrains word choice — `appendix-minimality.yaml`
- [x] 4.5 Three falsifiable claims + falsification conditions (completeness, tier accuracy, Putonghua-fit) — `appendix-minimality.yaml`
- [ ] 4.6 A worked "stress test": take a genuinely hard concept (e.g. an abstract noun, a legal/technical term) live, on the page, through the decomposition process end-to-end, so the reader sees the method work in real time rather than being told it works
- [ ] 4.7 Address the numbers gap from §3.2 head-on: is arbitrary precision expressible at all under the minimality theory, or is it explicitly out of scope?
- [ ] 4.8 A short "limits of this method" section — what this book's approach _cannot_ express cleanly (poetry, technical registers, etc.), for intellectual honesty
- [ ] 4.9 No Russian/Chinese check needed — already fully parallel (yaml block schema)

---

## 5. Lessons — Systematic Grammar/Vocabulary Coverage

Audited against the dictionary's 15 categories and the core grammar machinery actually used across lesson content.

- **5.1 Category coverage (does every dictionary category get taught somewhere?)**
  - [x] 5.1.1 Substantives — Pronouns & Interrogatives (lesson-05, lesson-08)
  - [x] 5.1.2 Substantives — Places/Plants/Body/People/Food/Animals/Tools (lessons 2, 4, 7, 12, 18, 19 collectively)
  - [x] 5.1.3 Determiners — Demonstratives (lesson-02: zhè/nà + gè)
  - [x] 5.1.4 Determiners — Sameness & Difference (lesson-17: bùtóng, yīyàng)
  - [x] 5.1.5 Quantifiers — Classifier `gè` (lesson-02)
  - [ ] 5.1.6 Quantifiers — Numbers & Ordinals: **inconsistent** — see §3.2, lesson-13 uses undictionaried numbers
  - [x] 5.1.7 Quantifiers — Amount (lesson-07/13: duō, quánbù)
  - [x] 5.1.8 Evaluators — Good/Bad (lesson-04: hǎo; lesson-07: huài)
  - [x] 5.1.9 Descriptors — Colour (lesson-15), Size (lesson-04), Temperature (lesson-17: lěng; `rè`/`tián` not confirmed taught anywhere — **check**), Physical Property (`yìng`/`yuán` — **not confirmed taught anywhere, check**), Other Quality (lesson-11: qíguài? xīn — **verify**)
  - [x] 5.1.10 Mental Predicates — Volition/Cognition/Perception (lessons 6, 14: yào, juéde, zhīdào, tīng, kàn — **verify `ài` and `kàn` each get an explicit lesson, not just dictionary/story appearances**)
  - [x] 5.1.11 Speech (lesson-06: shuō; xiě taught in lesson-02)
  - [x] 5.1.12 Actions/Motion/Contact (lessons 6, 9, 14, 16: chī, zuò, lái, qù, biàn, gěi; **dǎ, mō, zhǎo, wánchéng not confirmed to get explicit lesson coverage — check**)
  - [x] 5.1.13 Location/Existence/Possession (lesson-03: shì; lesson-05: possessive -de/yǒu — **confirm `zài` as "exist/be located" vs. `zài` as coverb "at" are both taught, they're easy to conflate**)
  - [ ] 5.1.14 Life and Death (`sǐ`) — **no lesson found covering this word at all**, and now mechanically confirmed unused anywhere in the book (§8.27.1.5)
  - [ ] 5.1.15 Time (`shíjiān`) — taught only as a vocabulary item in lesson-12; **no lesson on expressing when something happens** (no tense markers exist by design, but relative/absolute time expression — "today," "yesterday," "at 3 o'clock" — has no home)
  - [x] 5.1.16 Space (lesson-16: relative position + `cóng`/`duì`/`dìfāng`/`tái`)
  - [x] 5.1.17 Logical Concepts & Particles (lesson-06: le; lesson-08: ma; lesson-09: bǎ via causative in lesson-07; lesson-17: hé/yě/dànshì; lesson-08: wèishénme/zěnme; lesson-14: néng)
    - [ ] 5.1.17.1 `méi` (negation, paired with `bù`) — **confirm it gets explicit contrastive treatment** (bù vs. méi is a classic Mandarin trap; lesson-06 mentions `le` but the survey didn't confirm a méi-vs-bù explainer)
  - [x] 5.1.18 Intensifier `hěn` (lesson-04, lesson-07)
  - [x] 5.1.19 Similarity `fāngfǎ` (lesson-10, as "method/way")
- **5.2 Core grammar machinery — checklist independent of individual words**
  - [x] 5.2.1 Reading unit = syllable, not letter (lesson-01)
  - [x] 5.2.2 Tone as meaning-bearing (lesson-01)
  - [x] 5.2.3 Punctuation-as-grammar: solid compounds / hyphen-bound grammar / quoted untranslatables (lesson-01)
  - [x] 5.2.4 Word-combination as the primary word-formation strategy (intro-2, lesson-02)
  - [x] 5.2.5 Number-neutral nouns, no plural marking (lesson-02, lesson-03)
  - [x] 5.2.6 Fixed SVO word order, no case marking (lesson-03)
  - [x] 5.2.7 Copula `shì` for noun predicates (lesson-03)
  - [x] 5.2.8 Adjective-copula `hěn` (required, non-literal "very") (lesson-04)
  - [x] 5.2.9 `-de` for possession and for binding modifiers to nouns (lesson-04, lesson-05)
  - [x] 5.2.10 Pronouns as ordinary (number-neutral) nouns (lesson-05)
  - [x] 5.2.11 Verb tenselessness + perfective `le` (lesson-06)
  - [x] 5.2.12 Category-shifting by context (chī = eat/food) (lesson-06)
  - [x] 5.2.13 Compositional adjectives (yǒu lìliàng = strong) (lesson-07)
  - [x] 5.2.14 Adjectives as adverbs (hěn duō) (lesson-07)
  - [x] 5.2.15 Causative `bǎ...biàn [Adj]` (lesson-07)
  - [x] 5.2.16 Wh-questions in-situ (lesson-08)
  - [x] 5.2.17 Yes/no questions via `ma` (lesson-08)
  - [x] 5.2.18 A-bù-A / A-méi-A reduplication questions (lesson-08)
  - [x] 5.2.19 Coverb structure (Subject + Coverb Phrase + Verb) (lesson-09)
  - [x] 5.2.20 Coverb-as-main-predicate (lesson-09)
  - [x] 5.2.21 Proper names in quotes as pre-nominal adjectives (lesson-10)
  - [x] 5.2.22 Greetings, imperatives, animal sounds, reduplicated blessings (lesson-11)
  - [x] 5.2.23 Modifier stacking via chained `-de` (lesson-12)
  - [x] 5.2.24 Full number system + `liǎng` vs `èr` + ordinal `dì-` (lesson-13, pending §3.2/§5.1 dictionary reconciliation)
  - [x] 5.2.25 Auxiliary/pre-verbs (yào/kěyǐ/zhīdào/kāishǐ) (lesson-14, pending `kěyǐ` dictionary status)
  - [x] 5.2.26 Inchoative `kāishǐ` + state-change `biàn` (lesson-14)
  - [x] 5.2.27 Topic/condition-fronting as the `la`-equivalent (lesson-15)
  - [x] 5.2.28 Locative nouns + zài (static) vs. dào (motion) (lesson-16, pending `dào` dictionary status)
  - [x] 5.2.29 Perspective marker (duì...lái shuō), conjunctions hé/yě/dànshì (lesson-17)
  - [ ] 5.2.30 **Negation of nouns/existence** (`méi yǒu` — "there isn't") — not confirmed to have explicit lesson coverage; commonly a separate rule from verbal `bù` negation
  - [ ] 5.2.31 **Comparison / comparatives** ("bigger than," "the biggest") — no lesson found covering comparison at all; this is a structurally important gap since Mandarin comparison (`bǐ`) needs a coverb the dictionary doesn't currently have
  - [ ] 5.2.32 **Expressing time/frequency** (today, now, always, sometimes) — no lesson; ties to the Time-category gap in §5.1
  - [ ] 5.2.33 **Plurals/definiteness workarounds beyond `gè`** — e.g. how to actually say "some things" vs "the thing" vs "things in general" is implied across lessons but never consolidated into one explicit rule
  - [x] 5.2.34 ~~A cumulative review/reference lesson~~ — **done**: `appendix-grammar.yaml` pulls all 29 confirmed grammar patterns into one quick-reference page, grouped by function, the way appendix-pinyin does for phonology; see §8.29. (A separate, narrower ask — an in-narrative "what you've learned" recap inside lesson-20 itself — is still open, see §8.23.1.9.)
- **5.3 Structural/production gaps across lessons 1–20**
  - [ ] 5.3.1 Lessons 6–20 (18 of 20 lessons) have **no Russian or Chinese translation** — English only
  - [x] 5.3.2 ~~Lessons 6–20 dropped tone diacritics (plain "wo" instead of "wǒ")~~ — **tone diacritics restored across lessons 6–20 and proverbs.md**, cross-checked against `dictionary.json`
  - [ ] 5.3.3 Lessons 6–20 still have no `<audio-example>` tags — inconsistent with lessons 1–5's polish level (diacritics alone don't unlock read-aloud audio)
  - [ ] 5.3.4 `lesson-02.yaml` has no exercise/answers block (every neighboring lesson has one)
  - [ ] 5.3.5 `lesson-17.md` has no exercise/answers block
  - [ ] 5.3.6 Two incompatible content schemas coexist: lesson-01/02 + appendix-minimality use the new YAML block-schema (with `tldr`/`necessity`, `info` blocks); lesson-07–20 still use the old frontmatter + fenced-code-block markdown. **Migrate lessons 3–20 to the YAML schema** (also unlocks `info`/`warning` blocks for those lessons' worked examples, which currently render as plain prose) — **lessons 3–6 done** (`lesson-03.yaml`–`lesson-06.yaml`); 7–20 remain
  - [ ] 5.3.7 lesson-09 answer #2 ("ta gei lai-ta-de-difang-de dongxi") is still ungrammatical filler; lesson-15's rougher answer-key sentences are also still unproofread — **lesson-13's "di-sang-ge" typo is now fixed** (→ "dì-sān-ge", matching its own vocab list and the "third thing" prompt) as part of the diacritics pass
  - [x] 5.3.8 ~~lesson-11 inconsistently mixes toned and untoned pinyin within a single file~~ — resolved by the diacritics-restoration pass; the whole file is now consistently toned
  - [ ] 5.3.9 lessons 18–20 switch format again (vocab+story only, no exercise/answers) — decide if this is the intended "Part 2" format per lesson-20's own framing, and if so, document that format shift explicitly rather than leaving it implicit

---

## 6. Phrase Book

**Status: does not exist yet.** No `phrasebook*` file was found anywhere in `src/content/`. This is a whole missing section, per the Toki Pona book's own "useful phrases" chapter as precedent.

- [ ] 6.1 Decide scope: a phrasebook here can only use the ~130-word (currently 130, pending §3.2 fixes) dictionary — every phrase must be checked against actual vocabulary, not invented on the spot
- [ ] 6.2 Greetings & social opener/closers (hello, goodbye, thank you, sorry, please)
- [ ] 6.3 Basic needs (I want X, I need X, where is X, how much/many)
- [ ] 6.4 Asking for help / expressing trouble (I don't understand, please repeat, I am lost) — blocked on the `dǒng` ("understand") dictionary gap from §3.2
- [ ] 6.5 Numbers in practical use (time, money, quantities) — blocked on the numbers gap from §3.2/§5.2
- [ ] 6.6 Small talk (weather, feelings, family) — reuses vocab from lessons 4, 5, 11, 17
- [ ] 6.7 Emergency/safety phrases — check whether current vocabulary can even express these (e.g. "help," "danger," "sick" have no obvious dictionary word yet)
- [ ] 6.8 Decide format: standalone content file(s) vs. an appendix vs. woven into late lessons as "capstone" material
- [ ] 6.9 eng/rus/zh from day one (don't repeat the lessons-6–20 translation debt)

---

## 7. Stories

- [x] 7.1 First narrative arc: "Uncle Mawijo" hunting trip — `lesson-18.md`
- [x] 7.2 Continuation: Sili cooks, Mawijo returns — `lesson-19.md`
- [x] 7.3 Closing/epilogue narrative addressing the reader directly — `lesson-20.md`
- [x] 7.4 Proverbs/aphorisms as short-form connected text — `proverbs.md` (18 entries)
- [ ] 7.5 Stories 18–20 have no Russian/Chinese translation and no `<audio-example>` tags — same debt as §5.3
- [ ] 7.6 Only one narrative arc exists (3 installments). Consider at least one more independent story so "story" isn't synonymous with "the Mawijo/Sili arc" — variety matters for a phrasebook-adjacent reading-practice goal
- [ ] 7.7 No comprehension exercises attached to any story (lessons 18–20 have vocab+story but no exercise/answers, per §5.3) — add "what happened," "true/false," or translation-back exercises per story
- [ ] 7.8 `proverbs.md` has no Russian/Chinese translation
- [ ] 7.9 Consider a short dialogue-form story (two speakers) at some point — all current stories are third-person narration; dialogue would exercise questions/answers (lesson-08) and greetings (lesson-11) in context
- [ ] 7.10 Cross-check every word used in the stories against the dictionary the same way §3.2 did for lessons — the story survey flagged `líkāi` and `wǎn` as undictionaried; a full pass hasn't been done on lessons 18–20's remaining vocabulary beyond what was already sampled
- [x] 7.11 A second, independent set of connected texts now exists beyond the Mawijo/Sili arc — `appendix-stories.yaml`, ten classic public-domain fairy tales/fables retold using only the dictionary's ~130 words, addressing the "only one narrative arc" concern in §7.6 for variety (though these are retellings, not an original arc). Each tale is a numbered heading followed by a numbered, `{{word:ID}}`-referenced sentence list; see §8.28. Two animals (a flying animal and a "meowing" animal, plus a generic "swimming animal") have no dedicated dictionary word and are built compositionally instead (huì-fēi-de dòngwù; jiào "miāo-miāo" de dòngwù; zài-shuǐ-lǐ-de dòngwù) — niǎo (bird) and yú (fish) were removed from the dictionary in favor of always demonstrating this compositional technique

---

## 8. Per-Chapter Detailed Checklists

Every file currently in `src/content/`. Each chapter nests up to three grouped sub-checklists (a bucket is omitted if it has no items for that chapter):

- **N.1 Content & Pedagogy** — does the chapter's exposition, examples, and explanations actually teach the idea clearly. This is the master concern; most items live here.
- **N.2 Production Quality** — is the chapter's file technically polished: diacritics, `<audio-example>` tags, translation, schema, proofreading. Cross-cutting versions of these concerns live in §5.3/§9; only chapter-specific instances are repeated here.
- **N.3 Assessment** — does the chapter have exercises/answers/comprehension checks, and do they test the right things.

`[x]` = the audit confirms this point is covered; `[ ]` = not confirmed present, or confirmed missing.

- **8.1 intro-1.md — "Why is Chinese so hard?"**
  - **8.1.1 Content & Pedagogy**
    - [x] 8.1.1.1 Names the specific difficulty precisely: character memorization is not itself the bottleneck
    - [x] 8.1.1.2 Identifies the four simultaneously-new systems a beginner faces (script, tone, grammar, vocabulary)
    - [ ] 8.1.1.3 Explains _why_ learning all four at once causes overload (an explicit cognitive-load framing, not just an assertion)
    - [x] 8.1.1.4 Names "separation of concerns" as the organizing principle, borrowed explicitly from engineering
    - [x] 8.1.1.5 States precisely which one variable this book shrinks (vocabulary) and which three stay real (pinyin-as-script, tone, real Mandarin grammar)
    - [ ] 8.1.1.6 Gives at least one concrete, relatable example of the four-concerns overload — not just the abstract claim
    - [ ] 8.1.1.7 Distinguishes "hard to learn" from "hard to use once learned," setting expectations for what this book does and doesn't fix
    - [ ] 8.1.1.8 Previews that the complexity removed here is _replaced by real material_ later, not fantasy-invented — sets up intro-2/appendix-minimality
    - [ ] 8.1.1.9 Avoids overclaiming: doesn't promise fluency, only a lower-friction on-ramp
    - [ ] 8.1.1.10 Ends with a clear hook into intro-2's Toki Pona precedent
    - [ ] 8.1.1.11 States the target reader's starting point explicitly (zero Chinese background assumed)
  - **8.1.2 Production Quality**
    - [x] 8.1.2.1 Uses at least one audio-example/word to ground the abstract argument in something audible

- **8.2 intro-2.md — "How small can a language be?"**
  - **8.2.1 Content & Pedagogy**
    - [x] 8.2.1.1 Names Toki Pona explicitly with creator and approximate word count for credibility
    - [x] 8.2.1.2 Explains Toki Pona's core technique: combining a few words to express complex ideas
    - [x] 8.2.1.3 Gives the car → "moving box" worked example in full
    - [x] 8.2.1.4 States what's borrowed from Toki Pona (vocabulary-size discipline) vs. what isn't (its invented grammar)
    - [x] 8.2.1.5 States the current dictionary size via the live `{{dictionaryCount}}` value
    - [ ] 8.2.1.6 Explains _why_ keeping grammar 100% real Mandarin (rather than simplified/invented) matters for transfer to real Chinese
    - [x] 8.2.1.7 Gives at least one full example sentence built from combined/simple words
    - [ ] 8.2.1.8 Distinguishes "small vocabulary" from "simple language" explicitly — small ≠ simplistic
    - [ ] 8.2.1.9 Notes the tradeoff minimality introduces (longer descriptive phrases stand in for missing dedicated words) so the reader isn't surprised later
    - [ ] 8.2.1.10 Anchors the claim beyond Toki Pona alone (NSM/semantic primes), or explicitly defers that to appendix-minimality
    - [ ] 8.2.1.11 Previews that the theoretical "why is this even possible" grounding comes later
    - [ ] 8.2.1.12 Ends with a forward-pointer into intro-3's orthographic conventions

- **8.3 intro-3.md — "How this book works"**
  - **8.3.1 Content & Pedagogy**
    - [x] 8.3.1.1 States the solid-compound convention with a real example (dòngwù)
    - [x] 8.3.1.2 States the hyphen convention with a real example (zhè-ge) and what it signals
    - [ ] 8.3.1.3 Mentions the quoted-untranslatable convention at least in passing, before lesson-01 elaborates it, so it isn't a cold surprise
    - [x] 8.3.1.4 Confirms explicitly: no prior Mandarin/Chinese knowledge required
    - [x] 8.3.1.5 States lessons build strictly sequentially — no chapter skippable without loss
    - [ ] 8.3.1.6 Tells the reader what to do when they hit an unfamiliar word (dictionary/appendix cross-reference habit)
    - [ ] 8.3.1.7 Describes the audio/pronunciation feature and how to use it
    - [ ] 8.3.1.8 Describes what an exercise/answer block is for and how to use it (attempt before peeking)
    - [ ] 8.3.1.9 Sets pacing expectations (roughly how many lessons, how long each takes)
    - [ ] 8.3.1.10 States that tone marks (diacritics, not numbers) are the convention used throughout, before lesson-01 relies on that assumption
    - [ ] 8.3.1.11 Signals this is the last "meta" chapter before real content starts
    - [ ] 8.3.1.12 Gives a one-line combined index of all three conventions (compound / hyphen / quote) so they're memorable as a set

- **8.4 lesson-01.yaml — "Sounds and Symbols"**
  - **8.4.1 Content & Pedagogy**
    - [x] 8.4.1.1 States plainly that pinyin is read syllable-by-syllable, not letter-by-letter
    - [x] 8.4.1.2 Gives the Zhōngguó syllable-break worked example
    - [x] 8.4.1.3 Introduces each of the four tones with a tone-mark shape and an intuitive analogy
    - [x] 8.4.1.4 Introduces the neutral tone and explicitly contrasts it with the four full tones
    - [x] 8.4.1.5 Demonstrates tone-as-meaning with a true minimal-pair set (mā/má/mǎ/mà)
    - [x] 8.4.1.6 States this book uses dictionary/citation tone, and that real-speech sandhi is deliberately deferred
    - [x] 8.4.1.7 Points explicitly to the pinyin appendix rather than trying to cover all phonemes here
    - [x] 8.4.1.8 Covers the "letters that lie" pronunciation traps (q, x, yun) with real guidance, not just spelling
    - [x] 8.4.1.9 States and exemplifies the solid-compound rule
    - [x] 8.4.1.10 States and exemplifies the hyphen rule across all three sub-patterns (particle, measure word, adjective transform)
    - [x] 8.4.1.11 States and exemplifies the quoted-untranslatable rule with both a proper-noun and an onomatopoeia example
    - [ ] 8.4.1.12 Explicitly ties the punctuation rules to _why it matters going forward_ ("this is how you'll spot word boundaries in every solid block of Hao-shuo-de text from here on") rather than leaving the payoff implicit

- **8.5 lesson-02.yaml — "Words"**
  - **8.5.1 Content & Pedagogy**
    - [x] 8.5.1.1 States explicitly that compound words are memorized as wholes, not decoded live
    - [x] 8.5.1.2 Gives at least two worked compound examples with parts named (dōngxi, nǚrén)
    - [x] 8.5.1.3 States explicitly there are no invented neologisms in the system
    - [x] 8.5.1.4 Explains the alternative when a new meaning is needed (hyphenated grammar route)
    - [x] 8.5.1.5 States number-neutrality of nouns as an explicit rule
    - [x] 8.5.1.6 Introduces `gè` as the default/general measure word
    - [x] 8.5.1.7 Introduces the zhè/nà + gè demonstrative pattern in a full example sentence
    - [ ] 8.5.1.8 Explains _why_ measure words exist at all (nouns aren't directly countable in Mandarin) — the "why," not just the "what"
    - [x] 8.5.1.9 Introduces `-de` turning a verb into a noun with a worked example (xiě-de dōngxi)
    - [x] 8.5.1.10 Distinguishes bound (hyphenated) vs. free-standing particles with one example of each
    - [ ] 8.5.1.11 Shows the lesson-01 punctuation conventions working together in one live sentence, so the reader sees the system as a whole for the first time
    - [x] 8.5.1.12 Introduces enough vocabulary via the vocab block to support the exercises

- **8.6 lesson-03.yaml — "Sentences"**
  - **8.6.1 Content & Pedagogy**
    - [x] 8.6.1.1 States the fixed Subject-Verb-Object order as an explicit rule
    - [ ] 8.6.1.2 States there is no grammatical case marking, contrasted explicitly with a case system the reader may know (e.g. Russian noun cases)
    - [x] 8.6.1.3 Introduces copula `shì` with the Subject+shì+Noun pattern and a full example
    - [ ] 8.6.1.4 Explains when `shì` is required vs. omitted (not used before adjectives) — sets up lesson-04's `hěn` instead of leaving it a surprise
    - [x] 8.6.1.5 Revisits number-neutral nouns in the context of full sentences (generic vs. specific reference)
    - [x] 8.6.1.6 Shows how quantity interacts with the noun phrase (duō dropping `-ge`)
    - [ ] 8.6.1.7 Gives at least one negative-sentence example so negation isn't entirely deferred
    - [ ] 8.6.1.8 Notes explicitly that questions come later (lesson-08), so the reader isn't left wondering how to ask one
    - [x] 8.6.1.9 Uses only vocabulary already introduced, or introduces new words via a vocab block
    - [ ] 8.6.1.10 Distinguishes topic from subject at least briefly, since Mandarin topicalizes often (even though the full rule waits for lesson-15)
    - [x] 8.6.1.11 Gives enough example sentences (5-6) to show SVO holds across different verb/object types
  - **8.6.3 Assessment**
    - [x] 8.6.3.1 Exercises specifically test sentence construction, not just vocabulary recall

- **8.7 lesson-04.yaml — "Nouns and Adjectives"**
  - **8.7.1 Content & Pedagogy**
    - [ ] 8.7.1.1 States explicitly that adjectives function as stative verbs, not a separate class needing "to be"
    - [x] 8.7.1.2 Introduces `hěn` as grammatically required even when "very" isn't the intended meaning
    - [ ] 8.7.1.3 Explains _why_ `hěn` is needed (bare adjectives read as implicit comparisons in Mandarin)
    - [ ] 8.7.1.4 Contrasts `hěn`-predication with the `shì`-copula from lesson-03 so the two aren't conflated
    - [x] 8.7.1.5 Introduces `-de` binding an adjective onto a following noun, worked example (hěn-xiǎo-de dìfāng)
    - [ ] 8.7.1.6 Shows predicative (Subject hěn Adjective) and attributive (Adjective-de Noun) side-by-side for direct contrast
    - [x] 8.7.1.7 Gives example sentences across at least 3 distinct adjectives/semantic categories (size, evaluation, quality)
    - [x] 8.7.1.8 Cross-references the Descriptors/Evaluators dictionary categories via the actual words used
    - [x] 8.7.1.9 Reinforces the hyphen convention specifically for adjective+`-de`+noun
    - [ ] 8.7.1.10 Notes adjective negation (bù + adjective) at least briefly, so it isn't a silent gap
  - **8.7.3 Assessment**
    - [ ] 8.7.3.1 Exercises require producing both predicative and attributive adjective sentences, not just one pattern

- **8.8 lesson-05.yaml — "You and I"**
  - **8.8.1 Content & Pedagogy**
    - [x] 8.8.1.1 States pronouns behave exactly like ordinary nouns grammatically
    - [x] 8.8.1.2 Confirms pronouns are number-neutral like other nouns
    - [x] 8.8.1.3 Introduces possession via `-de` with worked examples for both wǒ-de and nǐ-de
    - [ ] 8.8.1.4 Explicitly reconciles possession-`-de` with the adjective-binding-`-de` from lesson-04 — same particle, different-looking use, spelled out as one rule
    - [x] 8.8.1.5 Gives an example combining possession with a noun from an earlier lesson
    - [ ] 8.8.1.6 Introduces a third-person reference (tā) or explicitly states it's deferred and where it will appear
    - [ ] 8.8.1.7 Sets expectations about gender-neutral third person (if/when introduced) before a reader is confused by it in a story
    - [x] 8.8.1.8 Shows a full sentence combining subject pronoun + verb + possessed object
    - [x] 8.8.1.9 Reinforces number-neutral noun handling in a pronoun context
    - [x] 8.8.1.10 Uses vocabulary from at least two earlier lessons, demonstrating cumulative build-up
    - [ ] 8.8.1.11 Notes explicitly whether any formal/informal "you" distinction exists (or its deliberate absence), since Russian speakers expect one
  - **8.8.3 Assessment**
    - [ ] 8.8.3.1 Exercises test both pronoun use and possessive construction, not just one

- **8.9 lesson-06.yaml — "Dongzuo (Verbs)"**
  - **8.9.1 Content & Pedagogy**
    - [x] 8.9.1.1 States explicitly that verbs carry no tense marking
    - [ ] 8.9.1.2 Explains how time is understood without tense (context/time words) — flags the dependency on a time-expression lesson that doesn't yet exist (§5.2)
    - [x] 8.9.1.3 Introduces perfective `le` with a clear before/after example pair
    - [ ] 8.9.1.4 Clarifies `le` marks completion/change-of-state, not simple past — an explicit common-mistake warning
    - [x] 8.9.1.5 Demonstrates category-shifting by context (chī as verb vs. noun) with two contrasting examples
    - [ ] 8.9.1.6 Gives a general rule for how word position signals which category a word is functioning as, not just the one example
    - [x] 8.9.1.7 Introduces 4-6 new action verbs via the vocab block
    - [x] 8.9.1.8 Gives example sentences combining new verbs with previously taught nouns/pronouns
    - [ ] 8.9.1.9 Distinguishes stative "adjective-verbs" (lesson-04's `hěn` pattern) from true action verbs here, so the categories don't merge in the reader's mind
    - [ ] 8.9.1.10 States clearly where verb negation (bù vs. méi) is handled — currently unaddressed here or anywhere else (§5.2 gap)
  - **8.9.2 Production Quality**
    - [ ] 8.9.2.1 Restores tone diacritics and audio to this lesson's actual content — diacritics done project-wide (§5.3.2); `<audio-example>` tags specifically are still missing here
  - **8.9.3 Assessment**
    - [ ] 8.9.3.1 Exercises and answer key proofread for grammaticality

- **8.10 lesson-07.md — "More Adjectives & State Changes"**
  - **8.10.1 Content & Pedagogy**
    - [x] 8.10.1.1 Introduces compositional adjectives (yǒu lìliàng = "have power" → "strong")
    - [ ] 8.10.1.2 Gives a second compositional-adjective example beyond yǒu lìliàng to show the pattern generalizes
    - [x] 8.10.1.3 Introduces adjectives functioning as adverbs (hěn duō)
    - [ ] 8.10.1.4 Explains why no separate adverb-marking suffix is needed for this to work
    - [x] 8.10.1.5 Introduces the causative `bǎ...biàn [Adjective]` construction with a before/after meaning explanation
    - [ ] 8.10.1.6 Explains what `bǎ` itself does grammatically (object-fronting) since it has no one-word gloss
    - [ ] 8.10.1.7 Distinguishes the causative construction from lesson-04's plain stative `hěn`-Adjective sentences with a direct contrast
    - [x] 8.10.1.8 Gives at least two full causative example sentences with different adjectives
    - [x] 8.10.1.9 Names the construction explicitly ("The Causative Rule") for later reference
    - [ ] 8.10.1.10 States what word class the adjective becomes once transformed by `bǎ...biàn` (a full transitive verb)
  - **8.10.2 Production Quality**
    - [ ] 8.10.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.10.3 Assessment**
    - [ ] 8.10.3.1 Exercises require producing the causative construction from a plain-adjective prompt, not just recognizing it

- **8.11 lesson-08.md — "Questions and Answers"**
  - **8.11.1 Content & Pedagogy**
    - [x] 8.11.1.1 Introduces wh-questions with shénme staying in-situ, contrasted explicitly with English fronting
    - [x] 8.11.1.2 Gives at least two different wh-word examples (what, why or how) in full sentences
    - [x] 8.11.1.3 Introduces yes/no questions via sentence-final `ma`
    - [ ] 8.11.1.4 States explicitly that `ma` cannot combine with an already-question-word sentence (prevents a common learner error)
    - [x] 8.11.1.5 Introduces A-bù-A / A-méi-A reduplication as an alternative yes/no form
    - [ ] 8.11.1.6 Explains when to use bù- vs. méi- in the reduplication form, tying to the still-unaddressed bù/méi distinction (§5.2)
    - [ ] 8.11.1.7 Explains how yes/no answers work at all in Mandarin (repeat or negate the verb — there's no direct "yes"/"no" word)
    - [ ] 8.11.1.8 Gives a full question+answer pair for _each_ question type introduced, not just the wh-type
    - [x] 8.11.1.9 Introduces wèishénme and zěnme as distinct interrogatives with separate examples
    - [ ] 8.11.1.10 Cross-references how these forms will resurface functionally (e.g. every lesson's own exercises are framed as questions)
  - **8.11.2 Production Quality**
    - [ ] 8.11.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.11.3 Assessment**
    - [x] 8.11.3.1 Exercises require producing all three question types

- **8.12 lesson-09.md — "Prepositions & Coverbs"**
  - **8.12.1 Content & Pedagogy**
    - [ ] 8.12.1.1 Explains the coverb concept generally (words that look like prepositions but behave like verbs syntactically), not just via examples
    - [x] 8.12.1.2 States the coverb sentence template explicitly: Subject + Coverb Phrase + Verb + Object
    - [x] 8.12.1.3 Introduces gěi with a full example
    - [ ] 8.12.1.4 Explicitly distinguishes this lesson's `zài` (coverb) from `zài` as an existential/location verb (lesson-03/16 overlap), to prevent the two uses merging
    - [x] 8.12.1.5 Introduces yòng with a full example
    - [x] 8.12.1.6 Introduces yīnwèi, noting its more conjunction-like behavior vs. the other three coverbs
    - [x] 8.12.1.7 Explains coverb-as-main-predicate with a dedicated example (no other verb present)
    - [ ] 8.12.1.8 Gives an example stacking two coverb phrases in one sentence
    - [ ] 8.12.1.9 Explicitly reconciles this lesson's `zài` with the Location/Existence dictionary category
    - [ ] 8.12.1.10 Distinguishes coverbs here from the causative `bǎ` of lesson-07 — both precede the verb but do different jobs
  - **8.12.2 Production Quality**
    - [ ] 8.12.2.1 Restores diacritics/audio (diacritics done project-wide, §5.3.2; `<audio-example>` tags still missing) and proofreads the malformed answer #2 (§5.3.7)
  - **8.12.3 Assessment**
    - [x] 8.12.3.1 Exercises require producing sentences with at least two different coverbs

- **8.13 lesson-10.md — "Proper Names & Geography"**
  - **8.13.1 Content & Pedagogy**
    - [x] 8.13.1.1 States that quoted proper nouns are NOT dictionary words and won't appear there, reinforcing lesson-01's quote rule
    - [x] 8.13.1.2 Gives the "Zhongguo" rén worked example, explaining the pre-nominal-adjective role
    - [ ] 8.13.1.3 Gives a second proper-noun example (a person's name or another place) to generalize the pattern beyond one instance
    - [x] 8.13.1.4 Introduces vocabulary for asking/talking about names and places (fāngfǎ)
    - [ ] 8.13.1.5 Explains how to ask someone's or something's name using the question machinery from lesson-08
    - [ ] 8.13.1.6 Addresses pronunciation/tone-marking for foreign/proper names, since they aren't native tone-marked pinyin
    - [ ] 8.13.1.7 Distinguishes borrowed/foreign proper names from native Chinese place names, if both are meant to be expressible
    - [ ] 8.13.1.8 Gives a full example locating something via a quoted place name plus spatial vocabulary (forward-reference to lesson-16 if needed)
    - [ ] 8.13.1.9 Reinforces the difference between a quoted proper name and a hyphenated common-noun phrase, since both use special punctuation
    - [ ] 8.13.1.10 States any capitalization convention for quoted names, applied consistently
  - **8.13.2 Production Quality**
    - [ ] 8.13.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.13.3 Assessment**
    - [x] 8.13.3.1 Exercises require both producing and parsing sentences with quoted proper names

- **8.14 lesson-11.md — "Greetings and Feelings"**
  - **8.14.1 Content & Pedagogy**
    - [x] 8.14.1.1 Introduces a standard greeting exchange (Nǐ hǎo ma? + a typical reply) as a complete mini-dialogue
    - [x] 8.14.1.2 Explains bare-verb imperatives (dropped subject) as the way commands/requests are formed
    - [x] 8.14.1.3 Gives at least two imperative examples
    - [x] 8.14.1.4 Introduces animal-sound vocabulary via jiào + quoted onomatopoeia, reinforcing the quote convention
    - [ ] 8.14.1.5 Gives a second animal-sound example to generalize the pattern beyond one instance
    - [x] 8.14.1.6 Introduces reduplicated-adjective blessings (hǎo-hǎo-de rì)
    - [ ] 8.14.1.7 Explains reduplication-for-intensity/warmth as a general pattern, not just one fixed idiom, with a second example
    - [ ] 8.14.1.8 Resolves the `shēngyīn` dictionary gap (§3.2) before this lesson is considered finished
    - [x] 8.14.1.9 Introduces emotion vocabulary (juéde) with a full example
  - **8.14.2 Production Quality**
    - [ ] 8.14.2.1 Fixes the internal tone-mark inconsistency within the file — resolved by the diacritics-restoration pass (§5.3.8); left unchecked here pending a deliberate pass to reconcile this per-chapter duplicate with §5.3.8
    - [ ] 8.14.2.2 Restores full diacritics/audio consistently throughout — diacritics done (§5.3.2); `<audio-example>` tags still missing
  - **8.14.3 Assessment**
    - [ ] 8.14.3.1 Exercises cover greetings, imperatives, and the animal-sound/reduplication patterns as separate skills, not one blended task

- **8.15 lesson-12.md — "Modification Stacking"**
  - **8.15.1 Content & Pedagogy**
    - [x] 8.15.1.1 States explicitly that multiple `-de`-bound modifiers can chain before one head noun
    - [x] 8.15.1.2 Gives a worked example with at least two stacked modifiers
    - [ ] 8.15.1.3 Explains _why_ no separate particle (like Toki Pona's `pi`) is needed here — ties back to how `-de` already scopes correctly
    - [ ] 8.15.1.4 Clarifies whether modifier order matters semantically, with a contrastive example if so
    - [ ] 8.15.1.5 Distinguishes this stacking from the single-modifier pattern in lesson-04, framed as a natural extension rather than a new rule
    - [ ] 8.15.1.6 Gives an example where removing one modifier changes the meaning, showing the stacking is meaningful, not decorative
    - [x] 8.15.1.7 Introduces/reinforces enough vocabulary (zhíwù, shēntǐ, shíjiān, děng) to build genuinely complex phrases
    - [ ] 8.15.1.8 Notes ambiguity risk with long modifier chains and how context resolves it
    - [ ] 8.15.1.9 Gives a deliberately complex "hardest sentence yet" example, showing the ceiling of what's expressible so far
    - [ ] 8.15.1.10 Cross-references where this construction resurfaces later (stories, later lessons)
  - **8.15.2 Production Quality**
    - [ ] 8.15.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.15.3 Assessment**
    - [ ] 8.15.3.1 Exercises require producing a phrase with at least two stacked modifiers, not one

- **8.16 lesson-13.md — "Shùzì (Numbers and Order)"**
  - **8.16.1 Content & Pedagogy**
    - [ ] 8.16.1.1 Resolves the numbers-vs-dictionary design question (§3.2) before teaching numbers 3+ as if the system were settled
    - [x] 8.16.1.2 Introduces yī and liǎng each with its own example sentence
    - [x] 8.16.1.3 States the liǎng-vs-èr rule explicitly (counting objects vs. math/serial) with contrastive examples
    - [x] 8.16.1.4 Introduces the ordinal prefix dì- with a full example (dì-yī = "first")
    - [ ] 8.16.1.5 Explains explicitly how numbers combine with measure words (Number + gè + Noun), tying back to lesson-02
    - [x] 8.16.1.6 Introduces the "precise up to 2, duō beyond" cap, framed as a deliberate minimality design choice, not an omission
    - [x] 8.16.1.7 Gives worked examples across at least three distinct quantities (small precise number, "many," an ordinal)
    - [ ] 8.16.1.8 Explains hào's specific usage (numbering/dates) rather than just listing it
    - [ ] 8.16.1.9 Tells the reader what interim workaround to use for numbers currently outside the resolved vocabulary
  - **8.16.2 Production Quality**
    - [ ] 8.16.2.1 Fixes the "di-sang-ge" typo and proofreads the rest of the answer key — the typo itself is now fixed (→ "dì-sān-ge", §5.3.7); the rest of the answer key is still unproofread
    - [ ] 8.16.2.2 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.16.3 Assessment**
    - [x] 8.16.3.1 Exercises test both cardinal and ordinal number production

- **8.17 lesson-14.md — "Pre-Verbs & Auxiliaries"**
  - **8.17.1 Content & Pedagogy**
    - [ ] 8.17.1.1 Resolves the `kěyǐ` dictionary gap (§3.2) before this lesson is considered finished
    - [ ] 8.17.1.2 States the general auxiliary-verb template (Auxiliary + Main Verb) explicitly, not just via examples
    - [x] 8.17.1.3 Introduces yào ("want to/will") with a full example
    - [ ] 8.17.1.4 Distinguishes zhīdào's auxiliary/pre-verb use here from its plain "know" use elsewhere, explicitly
    - [x] 8.17.1.5 Introduces kāishǐ as inchoative/gradual-onset marker with a matching example
    - [x] 8.17.1.6 Introduces biàn as the general state-change verb
    - [ ] 8.17.1.7 Gives a side-by-side kāishǐ-vs-biàn example so the reader can tell which applies when
    - [ ] 8.17.1.8 States explicitly whether auxiliaries can stack, or that they don't in this system
    - [ ] 8.17.1.9 Reconciles biàn's two appearances (plain state-change verb here vs. the causative pivot in lesson-07)
    - [ ] 8.17.1.10 Gives at least one negated-auxiliary example (bù yào), since negation is otherwise uncentralized
  - **8.17.2 Production Quality**
    - [ ] 8.17.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.17.3 Assessment**
    - [x] 8.17.3.1 Exercises require producing sentences with at least two different auxiliaries

- **8.18 lesson-15.md — "Colors and la"**
  - **8.18.1 Content & Pedagogy**
    - [ ] 8.18.1.1 Names the shared -sè ("color") suffix pattern explicitly across all color words, not just presenting five separate items
    - [x] 8.18.1.2 Gives at least three color examples in full sentences
    - [x] 8.18.1.3 Explains the topic/condition-fronting pattern ([Context], [Main Statement]) as the functional `la` replacement
    - [x] 8.18.1.4 Gives a with/without-fronted-context contrast showing the meaning difference
    - [ ] 8.18.1.5 States explicitly that no dedicated particle marks the topic (unlike Toki Pona's la) — fronting/pause alone carries it
    - [ ] 8.18.1.6 Distinguishes topic-fronting here from the default SVO subject position (lesson-03), so the reader can tell a topic from a subject
    - [ ] 8.18.1.7 Gives an example combining a color adjective inside a topic-fronted sentence, tying both concepts together
    - [x] 8.18.1.8 Cross-references the Descriptors/Colour dictionary category
    - [ ] 8.18.1.9 States plainly whether colors beyond the five taught exist or must be composed, so vocabulary limits are transparent
  - **8.18.2 Production Quality**
    - [ ] 8.18.2.1 Proofreads and improves the noticeably rougher answer-key sentences
    - [ ] 8.18.2.2 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.18.3 Assessment**
    - [x] 8.18.3.1 Exercises test both color-adjective production and topic-fronting construction

- **8.19 lesson-16.md — "Spatial Nouns"**
  - **8.19.1 Content & Pedagogy**
    - [ ] 8.19.1.1 Resolves the `dào` dictionary gap (§3.2) before this lesson is considered finished
    - [ ] 8.19.1.2 States the locative-noun pattern generally (noun + relative-position word), not just via examples
    - [x] 8.19.1.3 Gives at least four of the six relative-position words each in a distinct full sentence
    - [x] 8.19.1.4 Introduces zài for static location with a clear "X is located at Y" example
    - [x] 8.19.1.5 Introduces dào for motion-toward, explicitly contrasted against zài in a minimal-pair-style pair
    - [x] 8.19.1.6 Explains the zài-qù-dào compound and what each piece contributes
    - [ ] 8.19.1.7 Reconciles this lesson's zài with lesson-09's coverb zài and lesson-03's location/existence content into one coherent picture
    - [ ] 8.19.1.8 Gives an example locating one object relative to another using two chained relative-position words
    - [x] 8.19.1.9 Introduces cóng ("from") explicitly with its own example, tying to the Space dictionary category
    - [ ] 8.19.1.10 Gives a combined "from place X to place Y" example, cross-referencing lesson-10's proper-place-name content
  - **8.19.2 Production Quality**
    - [ ] 8.19.2.1 Restores diacritics/audio and consistent tone-marking — diacritics now restored consistently throughout (§5.3.2); left unchecked here pending a deliberate reconciliation pass, and `<audio-example>` tags are still missing
  - **8.19.3 Assessment**
    - [x] 8.19.3.1 Exercises test both static-location and motion-toward sentence production

- **8.20 lesson-17.md — "Particles and Perspective"**
  - **8.20.1 Content & Pedagogy**
    - [x] 8.20.1.1 Introduces duì...lái shuō ("from X's perspective") with a full worked example
    - [x] 8.20.1.2 Introduces hé for conjoining subjects/nouns
    - [x] 8.20.1.3 Introduces yě for sequencing multiple predicates on one subject, with an example showing the sequencing effect
    - [ ] 8.20.1.4 Distinguishes hé (noun-conjunction) from yě (predicate-sequencing) explicitly, since both read as loosely "and"-like to an English speaker
    - [ ] 8.20.1.5 Resolves the `dǒng`-adjacent vocabulary and the "shangmian-de ai" ("God") gloss against the dictionary (§3.2), and reconsiders whether a deity concept belongs in this lesson's scope
    - [ ] 8.20.1.6 Gives a duì...lái shuō example embedded in a full opinion/statement, showing natural use
    - [x] 8.20.1.7 Introduces dànshì ("but") with a contrastive example
    - [ ] 8.20.1.8 Explicitly reconciles this lesson's connectors with the Logical Concepts dictionary category
    - [ ] 8.20.1.9 Cross-references how these connectors will reappear in the upcoming stories (lessons 18-20)
  - **8.20.2 Production Quality**
    - [ ] 8.20.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.20.3 Assessment**
    - [ ] 8.20.3.1 **Add the missing exercise/answers block** so these constructions are actually practiced, not just read (§5.3.5)
    - [ ] 8.20.3.2 (Once added) exercises require producing at least one sentence per connector

- **8.21 lesson-18.md — "Hunting Adventure"**
  - **8.21.1 Content & Pedagogy**
    - [ ] 8.21.1.1 Resolves the `líkāi` dictionary gap (§3.2)
    - [ ] 8.21.1.2 States the story's premise clearly enough that a comprehension exercise could be written from it (who/where/what happens)
    - [x] 8.21.1.3 Gives a vocabulary block sufficient to read the story without outside help
    - [ ] 8.21.1.4 Makes at least three prior-lesson grammar points visibly identifiable within the narrative (e.g. `le`, coverbs, spatial nouns), so the story functions as cumulative review
    - [ ] 8.21.1.5 Introduces the character Mawijo with enough context that a first-time reader isn't confused cold
    - [ ] 8.21.1.6 Ends with enough of a hook that lesson-19's continuation feels motivated (verify the current ending achieves this)
    - [x] 8.21.1.7 Uses animal/nature vocabulary from earlier lessons in context, reinforcing it
    - [ ] 8.21.1.8 Keeps sentence complexity within what's been taught so far, rather than introducing ungrounded new grammar mid-story
    - [x] 8.21.1.9 Provides line-by-line glosses
    - [ ] 8.21.1.10 Confirms the glosses teach (literal word-for-word breakdown) rather than only giving a fluent translation
  - **8.21.2 Production Quality**
    - [ ] 8.21.2.1 Restores diacritics/audio for read-aloud value — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.21.3 Assessment**
    - [ ] 8.21.3.1 **Adds a comprehension exercise/answers block** (currently missing, §7.7)

- **8.22 lesson-19.md — "Cooking Adventure"**
  - **8.22.1 Content & Pedagogy**
    - [ ] 8.22.1.1 Resolves the `wǎn` dictionary gap (§3.2)
    - [ ] 8.22.1.2 Recaps lesson-18's context in at least one line so a reader can follow without re-reading it
    - [ ] 8.22.1.3 Introduces the second character (Sili) clearly, including her relationship to Mawijo
    - [x] 8.22.1.4 Gives a vocabulary block sufficient to read the story unaided
    - [x] 8.22.1.5 Demonstrates domestic-action vocabulary (clean, wash, cook) in complete sentences
    - [ ] 8.22.1.6 Makes at least three prior-lesson grammar points visibly identifiable within the narrative
    - [ ] 8.22.1.7 Shows an affectionate greeting exchange between the two characters, tying back to lesson-11
    - [ ] 8.22.1.8 Keeps grammar within what's already taught, or explicitly glosses anything genuinely new
    - [ ] 8.22.1.9 Sets up lesson-20's closing tone so the transition into an epilogue feels natural
    - [ ] 8.22.1.10 Confirms glosses are literal/teaching glosses, not just fluent translations
  - **8.22.2 Production Quality**
    - [ ] 8.22.2.1 Restores diacritics/audio — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
  - **8.22.3 Assessment**
    - [ ] 8.22.3.1 **Adds a comprehension exercise/answers block** (currently missing, §7.7)

- **8.23 lesson-20.md — "The Frontier"**
  - **8.23.1 Content & Pedagogy**
    - [ ] 8.23.1.1 Clarifies what "Part 2" concretely refers to — build it, link it, or adjust the lesson's framing so it doesn't promise unbuilt content
    - [x] 8.23.1.2 States plainly that the taught-grammar portion of the book is complete at this point
    - [x] 8.23.1.3 Points explicitly to the dictionary as the next resource
    - [ ] 8.23.1.4 Gives the reader a concrete "what to do next" (re-read stories, use the phrase book once built, revisit appendix-minimality)
    - [x] 8.23.1.5 Maintains narrative continuity with lessons 18-19's characters/setting
    - [x] 8.23.1.6 Uses only vocabulary/grammar already established, introducing nothing new
    - [ ] 8.23.1.7 Reflects back on the four-concerns framing from intro-1, closing the loop the book opened
    - [ ] 8.23.1.8 Avoids overpromising fluency outcomes the 20 lessons don't actually deliver
    - [ ] 8.23.1.9 **Provides a "what you've learned" recap** of all ~19 grammar points as a capstone — nothing else in the book does this (§5.2.34)
    - [x] 8.23.1.10 Ends with genuine encouragement/next-steps rather than only a narrative goodbye
  - **8.23.2 Production Quality**
    - [ ] 8.23.2.1 Restores diacritics/audio if any Hao-shuo-de text appears — diacritics done project-wide (§5.3.2); `<audio-example>` tags still missing here
    - [ ] 8.23.2.2 Adds Russian/Chinese translation

- **8.24 appendix-pinyin.md — "The Pinyin System"**
  - **8.24.1 Content & Pedagogy**
    - [x] 8.24.1.1 Full initials table organized by the three confusable groups (j/q/x, zh/ch/sh/r, z/c/s), each with an English-approximation cue
    - [x] 8.24.1.2 Full finals table
    - [ ] 8.24.1.3 Confirms every final actually used across the 130-word dictionary is covered (not yet cross-checked)
    - [x] 8.24.1.4 Explains the yi/wu/yu bare-vowel stand-in spelling rule with examples
    - [x] 8.24.1.5 Explains the silent-ü-spelled-as-u rule after j/q/x/y with examples
    - [x] 8.24.1.6 Covers third-tone sandhi with a worked example
    - [x] 8.24.1.7 Covers bù/yī tone-change rules in connected speech with worked examples
    - [ ] 8.24.1.8 States explicitly that these sandhi rules are NOT applied in the book's citation-tone convention, cross-referencing lesson-01's design choice
    - [ ] 8.24.1.9 Gives a "common mistake" callout for each confusable initial group, not just a table entry
    - [ ] 8.24.1.10 Cross-links back to the lesson-01 sections that reference this appendix, so navigation is bidirectional
    - [ ] 8.24.1.11 Considers whether the two markdown tables should become structured vocab-like blocks for schema consistency, or explicitly justifies keeping raw tables
  - **8.24.2 Production Quality**
    - [ ] 8.24.2.1 Includes at least one audio example per confusable-sound group so the distinction is actually audible

- **8.25 appendix-minimality.yaml — "Why Minimality Works"**
  - **8.25.1 Content & Pedagogy**
    - [x] 8.25.1.1 States Aristotle's ten categories and how they close the logical space of predicates
    - [x] 8.25.1.2 Introduces NSM/semantic primes (~65, Wierzbicka/Goddard) with their cross-linguistic evidentiary weight
    - [x] 8.25.1.3 Distinguishes true primitives (hǎo, yǒu, zhè) from practically-lexicalized composites (dòngwù, gōngjù) with clear criteria
    - [x] 8.25.1.4 Gives the full "learn" = dé zhīdào-de decomposition worked end-to-end
    - [x] 8.25.1.5 Explains why real-Mandarin grammar constrains word-choice more tightly than Toki Pona's invented grammar
    - [x] 8.25.1.6 States the three falsifiable claims (completeness, tier accuracy, Putonghua-fit), each with its falsification condition
    - [ ] 8.25.1.7 **Adds the "stress test"**: a genuinely hard/abstract term decomposed live, end-to-end (currently missing, §4.6)
    - [ ] 8.25.1.8 **Adds an explicit "limits of this method"** section (currently missing, §4.8)
    - [ ] 8.25.1.9 Directly addresses the numbers-system gap (§3.2/§5.2): is arbitrary numeric precision in-scope for the minimality claim, or explicitly excluded?
    - [ ] 8.25.1.10 Cross-references intro-2's Toki Pona precedent explicitly, closing that loop
    - [ ] 8.25.1.11 Defines every technical term (category, prime, primitive, composite) in-line on first use — this is the most conceptually dense chapter in the book
  - **8.25.3 Assessment**
    - [x] 8.25.3.1 Keeps the open-ended reflection exercise with no answer key, and explains why that's appropriate here

- **8.26 proverbs.md — "Hao-shuo-de Proverbs"**
  - **8.26.1 Content & Pedagogy**
    - [ ] 8.26.1.1 States the section's purpose explicitly (cultural/idiomatic capstone, cumulative vocabulary review) rather than presenting an unexplained list
    - [ ] 8.26.1.2 Cross-checks all 18 proverbs' vocabulary against the dictionary, resolving any undictionaried words found
    - [x] 8.26.1.3 Gives both a literal, word-for-word gloss and an idiomatic English-equivalent for each proverb
    - [ ] 8.26.1.4 Groups/orders proverbs thematically (self, relationships, money, etc.) rather than as an unordered list, for memorability
    - [ ] 8.26.1.5 Notes which proverbs are original Hao-shuo-de sayings vs. translated familiar English proverbs
    - [ ] 8.26.1.6 Ties at least a few proverbs back to specific grammar points taught earlier, as a review mechanism
    - [ ] 8.26.1.7 Explains any cultural context a proverb needs to land (where the literal gloss alone doesn't make it click)
    - [ ] 8.26.1.8 Cross-references lesson-11's animal-sound/reduplication patterns if any proverb uses them
    - [ ] 8.26.1.9 Flags any proverb that could double as a phrase-book entry (§6), cross-linking if so
    - [ ] 8.26.1.10 Tells the reader how to use this section (e.g. "revisit after finishing all lessons" vs. "dip in anytime")
  - **8.26.2 Production Quality**
    - [ ] 8.26.2.1 Adds audio examples, since proverbs are meant to be memorized/spoken
    - [ ] 8.26.2.2 Adds Russian/Chinese translation

- **8.27 dictionary.md / dictionary-categorical.md**
  - **8.27.1 Content & Pedagogy**
    - [x] 8.27.1.1 Every one of the 130 words has a complete eng/rus/zh definition
    - [x] 8.27.1.2 Every word carries a Toki Pona gloss for comparison
    - [ ] 8.27.1.3 **Every word used across all 20 lessons + stories + proverbs actually has a dictionary entry** — the master check that §3.2's specific gaps roll up into; currently fails for at least 7 known words
    - [x] 8.27.1.4 The 15-category/subcategory grouping is internally consistent
    - [ ] 8.27.1.5 Confirms the categorical grouping's category names match the Aristotelian framing used in appendix-minimality (not yet explicitly cross-checked)
    - [x] 8.27.1.6 Every category has at least one word explicitly illustrated in a lesson or the theory chapter, so no category feels abstract/unillustrated — **now mechanically checked via word-usage.json: every category clears this except Life-and-Death** (its only word, sǐ/die, is confirmed unused anywhere — Time's only word, shíjiān, is actually fine, contrary to the earlier §3.3 suspicion)
  - **8.27.2 Production Quality**
    - [x] 8.27.2.1 **The reverse check — every dictionary word's usage across lessons/proverbs/appendix — is now automated and mechanically verified**, not just spot-audited: lessons reference words by id (`{{word:ID}}`/`{{Word:ID}}`, see `scripts/word-refs.js`) instead of hardcoding pinyin, and `scripts/generate-word-usage.js` scans every chapter's raw source for those references, producing `src/data/word-usage.json` (word id → chapter list). The dictionary UI (`CategoricalDictionarySection.jsx`, `DictionarySection.jsx`) shows "Used in: ..." per word, or a flagged "not used in any chapter yet" — as of this pass (after `appendix-stories.yaml`/`appendix-grammar.yaml`, and after niǎo/yú were removed in favor of compositional phrasing), **117/130 words are used somewhere; 13 are not** (moon/yuè, air/kōngqì, nose/bízi, foot/jiǎo, skin/pífū, hand/shǒu, container/hézi, paste/ní, sex/xìng, color/yánsè, round/yuán, finish/wánchéng, die/sǐ)
    - [x] 8.27.2.2 Alphabetical and categorical listings stay in sync (both generated from the same source)
    - [x] 8.27.2.3 Stable `id`s exist for every word so `{{word:ID}}` references never break — **word ids were renamed from English-gloss slugs (e.g. `good`) to numbered-pinyin slugs (e.g. `hao3`; multi-syllable words get one digit per syllable, e.g. `dong4wu4`; neutral-tone words stay bare, e.g. `de`/`le`/`ma`)**, which also makes tone-differing homophones (dà "big" `da4` vs. dǎ "hit" `da3`) naturally distinct ids instead of colliding
    - [x] 8.27.2.4 Part-of-speech labeling present and consistent for every entry
    - [x] 8.27.2.5 Pinyin tone marks correct and consistent (single source-of-truth spelling per word)
    - [x] 8.27.2.6 Every word's `id` is stable by construction — it's the word's own key in `dictionary.json`'s `words` map, so adding a new word can never disturb an existing id
    - [x] 8.27.2.7 Dictionary is never hand-edited directly; generation process is documented in README

- **8.28 appendix-stories.yaml — "Ten Short Stories"**
  - **8.28.1 Content & Pedagogy**
    - [x] 8.28.1.1 Ten distinct, recognizable, public-domain tales (Little Red Riding Hood, the two little pigs, Goldilocks, the tortoise and the hare, the boy who cried wolf, the ugly duckling, Jack and the beanstalk, the emperor's new clothes, the ant and the grasshopper, the fisherman and the golden fish), each retold in 7-10 short sentences
    - [x] 8.28.1.2 Every sentence stays strictly inside the ~130-word dictionary, verified mechanically: every `{{word:ID}}` reference must resolve against `dictionary.json` or the build throws (see `scripts/word-refs.js`)
    - [x] 8.28.1.3 Concepts with no dictionary word (a wolf, a bed, a king, "to buy," "again") are routed around compositionally rather than invented on the spot, consistent with Lesson 2's own rule
    - [x] 8.28.1.4 A short opening note explains the vocabulary constraint before the reader meets any story, and each story gets its own numbered heading plus its own `tldr`/`necessity` pair for the TL;DR carousel
    - [ ] 8.28.1.5 No comprehension exercises or vocabulary-recall questions per story — purely reading material, matching stories 18-20's own "no exercise" precedent (§5.3.9) rather than lessons' pattern
    - [ ] 8.28.1.6 Doesn't yet name which specific fairy tale each retelling is based on inside the chapter itself (relies on the reader recognizing it, or on this checklist/README) — consider adding a one-line attribution per story
  - **8.28.2 Production Quality**
    - [x] 8.28.2.1 5 new dictionary words were added specifically to support this chapter (shēngyīn, zhēn, wèn, nǎlǐ, pà) with full eng/rus/zh definitions and tone-number ids; the in-chapter "New Words" note explains the rationale for each — see §3.3.1
    - [x] 8.28.2.2 Fully trilingual (eng/rus/zh) from day one — the Hao-shuo-de sentences themselves are language-invariant (same `{{word:ID}}` tokens), only the English/Russian/Chinese glosses differ per line
    - [x] 8.28.2.3 Uses the YAML block schema exclusively (heading + prose blocks per story, no `story`-type blocks) — the `story`/`vocab`/`examples`/`exercise`/`answers` block types all flatten into one chapter-wide array regardless of position, which breaks per-tale ordering/demarcation for a multi-story chapter; heading+prose blocks concatenate in document order instead, which is what a reader actually needs here
    - [ ] 8.28.2.4 No `<audio-example>` tags or audio playback per sentence, unlike lessons 1-2's prose — a deliberate scope cut for this pass, not yet revisited

- **8.29 appendix-grammar.yaml — "Grammar Patterns Reference"**
  - **8.29.1 Content & Pedagogy**
    - [x] 8.29.1.1 Directly resolves §5.2.34: all 29 confirmed grammar patterns from §5.2.1-5.2.29 are pulled into one page, grouped by function (word formation, sentence core, modification, verbs/aspect, causative, questions, coverbs, numbers, topic/connectors, speech acts) instead of by lesson number
    - [x] 8.29.1.2 Every entry gives a formula, a short trilingual explanation, a worked `{{word:ID}}`-referenced example, and the lesson it was first taught in, so the reader can always go back to the fuller original explanation
    - [x] 8.29.1.3 Closes with an explicit "not yet covered" note naming the four still-open grammar gaps (§5.2.30-33: negated existence, comparison, time/frequency, plurals beyond gè) rather than silently omitting them, matching the project's practice of naming gaps instead of papering over them
    - [ ] 8.29.1.4 Doesn't cross-link back to the _specific_ lesson section each pattern elaborates (only names the lesson number), mirroring the same bidirectional-navigation gap already flagged for appendix-pinyin at §2.9/§8.24.1.10
  - **8.29.2 Production Quality**
    - [x] 8.29.2.1 Fully trilingual (eng/rus/zh) from day one, YAML block schema throughout (heading + info blocks per pattern, matching the "New Words" info-block style already established in `appendix-stories.yaml`)
    - [x] 8.29.2.2 Every `{{word:ID}}` reference verified to resolve against `dictionary.json` (build-throws-on-unknown-id check, same mechanism as §8.28.1.2)

---

## 9. Cross-Cutting Process Checklist

- [ ] 9.1 Resolve all §3.2 vocabulary/dictionary mismatches before doing large-scale translation work on lessons 6–20 (no point translating words that might get renamed/removed)
- [ ] 9.2 Pick one content schema (YAML block schema, per lesson-01/02/appendix-minimality) and migrate everything else to it — unblocks `info`/`warning` blocks project-wide and unifies `tldr`/`necessity` metadata (lessons 3–6 migrated; 7–20, appendix-pinyin, and proverbs still pending)
- [x] 9.3 ~~Restore tone diacritics~~ across lessons 6–20 and proverbs.md — done; `<audio-example>` tags across those same files are still not added (separate, still-open half of this item)
- [ ] 9.4 Translate lessons 6–20, appendix-pinyin, and proverbs into Russian and Chinese
- [ ] 9.5 Add exercise/answers blocks to lesson-02 and lesson-17
- [ ] 9.6 Add comprehension exercises to lessons 18–20
- [ ] 9.7 Proofread all answer keys for lessons 6–20 (typos/ungrammatical filler found in at least three files)
- [ ] 9.8 Build the phrase book (§6) — entirely new content
- [ ] 9.9 Decide and document the numbers design (§3.2/§5.2) — this single decision unblocks lesson-13, the dictionary, and the phrase book simultaneously
- [x] 9.10 **Every chapter now references dictionary vocabulary by id (`{{word:ID}}`/`{{Word:ID}}`) instead of hardcoding pinyin** — `dictionary.json` is the single source of truth for spelling; a word's spelling can change in one place and every chapter picks it up automatically, and usage is exactly, mechanically trackable (`scripts/generate-word-usage.js` → `src/data/word-usage.json`, surfaced in the dictionary UI). Gap words not yet in the dictionary (kěyǐ, dào, líkāi, the numbers, etc., §3.2) are still hardcoded literal text since they have no id to reference — resolving §3.2 also brings them into this system. (`shēngyīn` used to be one of these examples; it's now a real dictionary entry, added for §8.28)
- [x] 9.11 A worked example of this book's own minimality claim now exists outside the theory chapter: `appendix-stories.yaml` retells ten well-known tales using only dictionary vocabulary, functioning as an informal, larger-scale version of the "stress test" §4.6/§8.25.1.7 still asks for (though a single hard _concept_ decomposed live is still missing — these are narratives, not a decomposition walkthrough)

## 10 Misc

- [ ] Add search across the site
- [ ] Add video chapter
- [ ] Add online translator
- [ ] Chapter 5 should list all prepositions
- [] remove tamen
- [] reorganize checklist theory / practice / implementation details
