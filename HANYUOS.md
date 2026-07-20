# HanYuOS

**A unified operating system for learning Mandarin, built around a three-stage language ladder and a single shared data layer instead of a pile of disconnected apps.**

*Status: vision/architecture memo. This document exists to crystallize the idea before any of it is scoped into a build plan — expect gaps, and treat the open questions at the end as load-bearing, not decorative.*

---

## 1. Motivation: Why Existing Tools Aren't Enough

Every serious Mandarin learner ends up running the same shadow IT department: Pleco for lookups, Anki for spaced repetition, Language Reactor for subtitle-assisted video, LingQ for reading, a Discord or forum for community, a notes app for everything that doesn't fit anywhere else. None of these tools talk to each other. Vocabulary marked "known" in one has no bearing on what any other tool assumes you know. Progress lives in six different places, none of which agree.

Looking at the specific tools makes the shape of the problem clearer:

- **Pleco** is an excellent dictionary and reading aid, but that's structurally what it is — a lookup tool. It's built for the *end* of the learning process (fluent reading with occasional gaps), not the entry point, and it has nothing to say about how you get from zero to that point.
- **LingQ** treats every language it supports with the same generic pipeline. That works reasonably well for languages close to English. It does not work well for Mandarin, because Mandarin's hard parts — tonal phonetics, character literacy, a vocabulary whose logic doesn't map onto English — are structurally different from "a European language with different words." A least-common-denominator tool can't address a bottleneck it wasn't designed to see.
- **Language Reactor** is a browser extension. That's a ceiling, not a feature — it can enhance a video you're already watching, but it can't be the place where you decide what to watch, track what you've learned from it, or connect that progress to anything else you're doing.
- **Mandarin Blueprint** is strong on foundational teaching, but it's still bound to a conventional HSK-style progression — the whole vocabulary, characters and tones and grammar together, climbed in the traditional order.

The ideal isn't "one more app that does one more thing better." It's what Pleco already gets right for reading, or what 沙拉俄语 gets right for Russian: the feeling that an entire learning session — drilling, reading, listening, looking things up, talking to someone — can happen inside one place, without breaking flow to context-switch between five unrelated tools that don't know about each other.

## 2. Core Philosophy

**Eliminate fragmentation, not by building a bigger app, but by giving every learning activity a shared foundation.** Dictionaries, spaced repetition, media consumption, and community aren't separate products bolted together — they're different views onto the same underlying record of what a learner has done and knows.

**Open-source and community-driven.** This isn't a commercial product optimizing for engagement metrics or a subscription funnel. It's meant to evolve the way good open-source infrastructure evolves: organically, through people who need it building the piece they need and contributing it back.

**Architectural softness.** Nothing about the three-stage ladder or the module system should require getting every future decision right today. The system should be modular enough that new views, exercise types, and content pipelines can be registered later without re-architecting what already exists. Defer what can be deferred.

## 3. The Three-Stage Language Ladder

This is the spine of the whole system. Instead of one long, undifferentiated climb through HSK levels, HanYuOS moves a learner through three languages, each a controlled expansion of the one before it, each genuinely usable in its own right rather than a scaffold you discard.

Each stage is not just a vocabulary/grammar specification — it's a full teaching curriculum living inside the platform. Lessons are not an afterthought bolted on once the language design is finished; they're a first-class part of what HanYuOS ships for every stage, the same way listening drills and content libraries are (Sections 6–7). Hǎo-shuō-de's lesson sequence already exists as a working prototype elsewhere in this project — a chapter-by-chapter course teaching sentence structure, word formation, and vocabulary from zero, with audio pronunciation on every word and example — and is the model the Jiǎndānhuà and real-Mandarin lesson tracks should follow, not a one-off.

### Stage 1 — Hǎo-shuō-de (好说的)

A Toki-Pona-scale core: roughly 120 words, completely real Mandarin vocabulary and completely real Mandarin grammar (Subject-Verb-Object, the `shì` copula, `hěn` before predicate adjectives, `-de` as the universal binding particle), with no invented syntax anywhere. What's small is the vocabulary, not the grammar — a deliberate contrast with Toki Pona itself, which simplifies by inventing its own particle system (`li`, `e`, `o`, `pi`). Hǎo-shuō-de borrows Toki Pona's *discipline* (freeze the vocabulary, and there's nothing left to distract you from the grammar) without borrowing the artificial language underneath it. Every sentence a learner produces at this stage is a real, grammatical Mandarin sentence — just built from a tiny, fixed set of roots, and built compositionally: new meaning comes from explicit, hyphen-marked combination (`hěn-dà-de`, `yǒu-lìliàng-de`), never from silently minting new solid-looking words the way real Chinese vocabulary itself historically did.

This stage exists to solve a different problem than Jiǎndānhuà solves. It's not about volume of real-world usability — it's about getting a total beginner producing correct, complete Mandarin sentences from day one, with a vocabulary small enough to hold entirely in working memory.

### Stage 2 — Jiǎndānhuà (简单话)

Real Mandarin, at scale, with the noise engineered out. Where Hǎo-shuō-de is deliberately toy-sized, Jiǎndānhuà is a serious bridge language: a Pareto-filtered subset of roughly 1,200–1,500 "core atom" words, selected algorithmically from the HSK corpus by a speech/writing-commonality threshold, with everything below threshold decomposed into compounds built from words that survive the filter. The grammar is **completely unmodified, unaltered standard Putonghua** — Jiǎndānhuà's core rule is that it never breaks native syntax, only curates vocabulary and applies typographic scaffolding on top of it:

- **Pinyin-only text**, dictionary tone marks retained, tone sandhi handled by synchronized native-speed audio rather than the written form — you read the pristine lexical identity, you hear the real acoustic one.
- **Hyphenated word-blocks**, German-compound-style, so word boundaries are never ambiguous in a language whose native orthography doesn't have spaces.
- **The Quote Partition** — onomatopoeia and transliterated loanwords wrapped in quotes so a reader's brain flags them as raw acoustic units, not vocabulary to parse.
- **Semantic monopoly**: one word per concept. Synonym clusters (`kěshì`/`bùguò`/`rán'ér` for "but") get one designated winner (`dànshì`); the others are archived.
- **Idiom unrolling**: classical four-character chéngyǔ are stripped and replaced with descriptive paraphrase (`huàshé-tiānzú` → `zuò-le-duōyú-de-shì`).
- **Kinship flattening and pronoun equalization**: `bóbo` becomes `bàba-de-gēgē`; the honorific `nín` defaults to `nǐ`.
- Classifiers collapse to the universal `gè` except where a specific classifier resolves genuine ambiguity — directly inherited from the same design instinct behind Hǎo-shuō-de's own single-classifier rule, just applied at ten times the vocabulary scale.

Critically: **every Jiǎndānhuà sentence is valid, native-checkable Mandarin.** Nothing learned in Jiǎndānhuà is later unlearned in real Chinese — it's only ever extended. That constraint is what separates this stage from "another Toki-Pona-style conlang using Chinese words," which was seriously considered and rejected for exactly the reason it wouldn't actually function as a bridge.

### Stage 3 — Real Mandarin (Putonghua)

Full HSK-and-beyond vocabulary, full Hanzi literacy, native-speed audio with tone sandhi, idiom, register, and dialect variation. By the time a learner arrives here from Jiǎndānhuà, the framing is explicit: **this is not a new language.** They already speak fluent Mandarin grammar and possess a large, correctly-used vocabulary. Learning Hanzi at this stage is "assigning a visual picture to a word you already use every day" rather than a fourth simultaneous front in the war conventional courses force learners to fight (writing, reading, listening, and speaking, all at once, from day one).

What actually remains at this point is worth being precise about, because it's smaller and more separable than it looks from outside. Listening comprehension — the hardest, most uniform bottleneck in conventional Mandarin study — is already solved; that's what the entire gated progression in Section 6 was for, and it was completed during Jiǎndānhuà, not deferred to here. What's left splits into two bottlenecks of very different size:

- A **small** bottleneck: vocabulary. Filling the gap between Jiǎndānhuà's ~1,200–1,500 curated words and full native range, plus native-speed idiom, register, and dialect exposure.
- A **large** bottleneck: Hanzi literacy — but one that's cleanly separable from everything else, because **Hanzi is not required to understand spoken Mandarin or most video content.** A learner can be fully functional in real, native, messy Mandarin conversation and media while still building character literacy on its own, slower track. Reading is deliberately the *last* thing this ladder asks for, not because it's unimportant, but because nothing else actually depends on it.

### Why three stages and not one gradient

Each stage is a genuinely separate concern, in the software sense: Hǎo-shuō-de isolates *sentence structure and core grammar* from vocabulary size. Jiǎndānhuà isolates *listening and real-world usability* from character literacy and lexical noise. Real Mandarin is what's left once those two bottlenecks are already solved. Conventional instruction collapses all three into one simultaneous climb. HanYuOS's bet is that separating them — the way you'd separate concerns in a hard software system rather than attacking a tangled monolith head-on — is what actually gets people up the mountain.

## 4. Data-Centric Architecture

The single most important structural decision: **HanYuOS is a database with views on top of it, not a collection of apps that happen to share a login.**

The comparison worth naming explicitly is Lark (or Notion, or most "all-in-one workspace" tools) — and specifically what's wrong with them. Those tools bolt together chat, docs, and dashboards as separately-engineered products glued by a shared shell. The result is always a pile of ad-hoc, siloed views that don't actually share a data model, just a login screen and a sidebar.

HanYuOS instead follows an ERP-style paradigm:

- **A single, unified, deliberately "bare-bone" data layer** holds everything: chat/forum content, SRS review state, media consumption logs, listening drill results, per-word familiarity scores, exam/gating history — all of it, in one place, with one schema per concern rather than six incompatible ones.
- **Every feature is a composable view over that layer**, not an independent subsystem with its own private storage. The flashcard reviewer, the reading-assist overlay, the listening drill generator, the lesson player, the community forum — these are all just different lenses onto the same underlying facts about a learner and the content they're engaging with.
- New views, exercise types, and modules get **registered dynamically** against the data layer as they're needed, instead of requiring a new bespoke subsystem and a new integration point every time. This is the concrete expression of "architectural softness" from Section 2: the schema has to be right; the views on top of it can proliferate freely.

The practical payoff: a word you looked up while reading, a word that tripped you in a listening drill, and a word due for SRS review are, structurally, *the same kind of record* — not three separate systems that each have their own idea of what you know.

## 5. Modular Extension & Add-on Framework

The plugin model here is deliberately closer to Anki's add-on ecosystem than to a typical SaaS integration marketplace: a small, well-defined core, with the community building and sharing extensions against it rather than everything shipping from a central team.

Concrete extension categories already worth naming:

- **AI speaking partners** — conversational practice scoped to whatever stage/vocabulary a learner is currently gated into.
- **Handwriting recognizers** — relevant once a learner reaches the Hanzi stage.
- **Content scrapers** — pulling in curated native media and running it through the vocabulary-familiarity layer.
- **Custom exercise packages** — new drill types built by anyone, registered as views the same way first-party ones are.

Because everything sits on the shared data layer from Section 4, a third-party module doesn't need its own database — it reads and writes against the same learner record every first-party view does.

## 6. The Gated Progression Model

Advancing through the system isn't opt-in or self-paced by feeling — it's gated by passing granular skill checks, so a learner can't accumulate a large passive vocabulary sitting on top of a listening comprehension gap they've never actually closed (the single most common failure mode in conventional Mandarin study).

The clearest worked-out example of this gating is listening, and it's grounded in a working methodology and an existing prototype rather than being purely aspirational:

**Phase 1 — Sound Discrimination (the primary bottleneck).** Before any vocabulary or meaning enters the picture, the learner drills raw phonetic capture: mapping sound to pinyin, nothing else. The mechanism is a syllable-pool generator — an existing working prototype in this project — that produces strings of real, common, but *semantically unrelated* characters drawn from confusable phonetic contrast pairs (`n` vs `ng`, `ü` vs `ün`, `q` vs `x`), weighted toward whichever contrast a learner is currently weak on. The generator explicitly does not check whether adjacent characters accidentally form a real word and does not avoid placing contrast pairs next to each other — the entire point is to deny the brain any semantic or word-level pattern to lean on, so it's forced to actually resolve the acoustic signal. A learner exits Phase 1 once they can reliably map 10+ individual syllables correctly, purely by ear.

**Phase 2 — Word Retrieval, in deliberately nonsensical sentences.** Once individual syllables are solid, the drill scales up to full sentences — but the sentences are intentionally scrambled or nonsensical rather than natural. This is a deliberate, load-bearing design choice, not a shortcut: a natural sentence lets a learner's brain "cheat" by guessing the back half from context or narrative familiarity, which produces the false sense of listening comprehension conventional media-immersion methods are actually training. Nonsensical word strings remove that crutch entirely, so what's being measured and trained is real acoustic word-recognition, not top-down guessing dressed up as listening skill.

**Phase 3 — Comprehensive Meaning Synthesis, and Reading.** Only once acoustic capture and word-level retrieval are both verified does a learner move to real, natural sentences and start extracting actual meaning — and only at this point does interactive media consumption unlock. Reading (Hanzi) is treated as the capped, final stage of the whole progression, not the entry point real Mandarin instruction traditionally makes it.

Underneath Phases 1–2 sits a more general diagnostic protocol worth generalizing across the whole system, not just listening — call it the **Diagnostic Loop / Target Reps System**:

1. **Diagnostic Loop:** listen to real content sentence-by-sentence, write a raw phonetic transcription with no regard for meaning, then compare against the real transcript. Failures get classified as either **Acoustic Blurs** (multiple words compressed into one indistinct stream) or **Phonetic Blind Spots** (specific phonemes/tones consistently misheard).
2. **Target Reps:** harvested failures get fed back into training, not passively re-reviewed. Blur failures get shuffled into random order (the **Sentence Shuffle**) so the brain can't lean on narrative memory during review. Blind-spot failures get expanded into **Phonetic Minimal Pairs** — AI-generated lists of acoustically similar words targeting the exact confusion — and drilled directly. Finally, an AI generates **entirely new content** reusing the failed words and structures, verifying the fix generalizes rather than being memorized for one specific clip.

This loop is a strong candidate for a first-class, system-wide view rather than a listening-specific tool — the same diagnose → harvest → regenerate → re-test cycle plausibly applies to tone production, reading speed, or grammar-pattern recognition later.

## 7. Content & Media Management

Once a learner is unlocked into content consumption (Phase 3 above, or immediately for anyone entering directly at the Jiǎndānhuà or real-Mandarin stage), the system needs to do what Language Reactor and LingQ do — assisted reading with click-to-look-up, per-word known/unknown tracking, curated content discovery — but as a native part of the OS rather than a bolted-on browser extension or a separate subscription product.

Every stage has its own content library, in two forms:

- **Reading**, in pinyin for the Hǎo-shuō-de and Jiǎndānhuà stages (matching those stages' own text conventions — hyphenated word-blocks, dictionary tone marks, the Quote Partition for names and loanwords), and in Hanzi once a learner reaches the real-Mandarin stage.
- **Video**, at every stage, with subtitle-assisted playback and the same click-to-look-up and known/unknown tracking as the reading library, sharing the same underlying vocabulary-familiarity records from Section 4.

**Real content, not graded readers.** This is the single biggest advantage of Hǎo-shuō-de and Jiǎndānhuà being complete, genuinely valid languages rather than simplified educational approximations: because every sentence in either language is real, correct Mandarin, real-world stories, articles, and media can actually be translated and dubbed *into* them, rather than requiring purpose-written "graded reader" content invented specifically for learners. A learner at the Hǎo-shuō-de stage isn't limited to twee stories about going to the market — they can encounter an actual translated/dubbed version of real writing or real audio-visual content, rendered honestly within that stage's vocabulary and grammar constraints. That's a fundamentally different experience from the artificial, learner-only content every graded-reader system produces, and it's only possible because these are real languages, not simplified stand-ins.

**Cross-linked media, at the phrase level.** Because reading, video, and the dictionary all sit on the same unified data layer, a dictionary or text lookup for a word or phrase can surface every place across the entire media library where that exact word or phrase actually gets spoken — jumping straight to the timestamped video segment, not just a definition. This is the same idea 沙拉俄语 uses for Russian, generalized across the whole platform rather than scoped to one course: a word isn't just defined, it's *heard*, in as many real contexts as the library contains.

**The real-Mandarin video experience specifically.** Once a learner reaches Stage 3, video consumption needs to support genuinely messy, native content — and the interface has to keep up without breaking flow:

- **Parallel reading / parallel subtitles** — dual-track display (e.g. Hanzi alongside pinyin, or target-language alongside a reference translation) available while watching, not just a single subtitle line.
- **Convenient pausing**, built for a learner who needs to stop mid-sentence, not just a standard playback control bolted onto a video player.
- **In-flow lookups and card additions** — looking up a word or adding it to the SRS deck happens as an overlay on top of the video itself, never a navigation away from what's playing. Breaking flow to switch apps is exactly the fragmentation problem from Section 1; the video player is not exempt from that principle just because it's the most advanced stage.

Two further design commitments here, both direct responses to the frustrations in Section 1:

- **Listening comprehension is handled independently of character literacy.** A learner can be deep into audio/listening progression while still pre-literate in Hanzi, without the system treating that as a broken or incomplete state — this is what "reading is the capped final stage" actually means in practice for the content layer, not just the gating layer.
- **Fast-track to native content, on purpose.** The system is structured to unblock a learner into real, adult, native-level media as quickly as their gating allows — not to keep them inside a walled garden of graded readers indefinitely. The whole three-stage ladder exists to get someone into that content sooner, safely, rather than later, unsupported.
- Spaced repetition is **native and system-wide** (per Section 4 — SRS state is just another record on the shared data layer), not a separate Anki export/import workflow bolted on afterward.

---

## Open Questions

This document is explicitly a starting point, not a spec. The following are unresolved and worth treating as such rather than quietly deciding by default:

- **How does a learner move between the three language-stage "worlds"?** Is advancement from Hǎo-shuō-de to Jiǎndānhuà gated the same way listening phases are (a verifiable exam), or does it work differently since it's a much bigger jump in vocabulary and scope?
- **How much of the gated progression model (Section 6) is listening-specific vs. generalizable?** The Diagnostic Loop / Target Reps pattern seems structurally reusable, but that's a hypothesis, not something built yet.
- **What's the actual data schema at the core of Section 4?** "Unified data layer" is a principle, not yet a design — the first real technical work here is probably nailing that schema down, since every view depends on it being right.
- **Community/practice structure.** Some kind of speaking-practice or community-accountability layer is likely necessary (conventional wisdom, and this project's own earlier drafts, both point at that), but the specific shape of it — structured club-style meetings vs. something more organic — is unresolved and shouldn't be assumed from an earlier draft that didn't survive review.
- **Scope of "Stage 3."** Real Mandarin doesn't have the tight, engineered design the first two stages have by construction — what, specifically, does HanYuOS *add* at that stage beyond "now use Pleco and native media," given the whole point up to here was not needing five separate tools?
