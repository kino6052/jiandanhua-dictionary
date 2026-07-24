### Core Philosophy & Architecture

- **Unified Learning Environment**
  - Single platform replaces disconnected tools (Pleco, Anki, Language Reactor, LingQ)
  - All learning activities share a common foundation
  - Eliminates context-switching between separate applications
- **Open-Source & Community-Driven**
  - Evolves organically through contributor needs
  - Not optimized for commercial engagement metrics
  - Community-built extensions and modules
- **Architectural Softness**
  - Modular system allowing new views, exercise types, and content pipelines to be registered later
  - No requirement to get every future decision right today

### Three-Stage Language Ladder

#### Stage 1: Hǎo-shuō-de (好说的)

- **Core Vocabulary**
  - ~120 real Mandarin words
  - Toki-Pona-scale miniature language
- **Complete Real Grammar**
  - Subject-Verb-Object structure
  - `shì` copula and `hěn` before predicate adjectives
  - `-de` as universal binding particle
- **Compositional Meaning Building**
  - New meanings from explicit hyphen-marked combinations (`hěn-dà-de`, `yǒu-lìliàng-de`)
  - No invented syntax; every sentence is real Mandarin
- **Single Classifier Rule**
  - Universal `gè` classifier
- **Purpose**
  - Get beginners producing correct, complete sentences from day one
  - Vocabulary small enough to hold entirely in working memory
  - Isolates sentence structure and core grammar from vocabulary size

#### Stage 2: Jiǎndānhuà (简单话)

- **Pareto-Filtered Vocabulary**
  - ~1,200–1,500 core atom words
  - Algorithmically selected from HSK corpus by speech/writing-commonality threshold
  - Decomposed compounds built from surviving filter words
- **Unmodified Standard Putonghua Grammar**
  - Never breaks native syntax
  - Only curates vocabulary and applies typographic scaffolding
- **Text Conventions**
  - Pinyin-only text with dictionary tone marks
  - Hyphenated word-blocks (German-compound-style) for unambiguous word boundaries
  - Quote Partition for onomatopoeia and transliterated loanwords
- **Semantic Monopoly**
  - One word per concept
  - Designated winners from synonym clusters (e.g., `dànshì` for "but")
  - Archived synonyms
- **Idiom Unrolling**
  - Classical chéngyǔ replaced with descriptive paraphrase (`huàshé-tiānzú` → `zuò-le-duōyú-de-shì`)
- **Kinship & Pronoun Equalization**
  - `bóbo` becomes `bàba-de-gēgē`
  - `nín` defaults to `nǐ`
- **Universal Classifier**
  - `gè` except where specific classifier resolves genuine ambiguity
- **Purpose**
  - Isolates listening and real-world usability from character literacy
  - Every sentence is valid, native-checkable Mandarin
  - Nothing learned is later unlearned; only extended

#### Stage 3: Real Mandarin (Putonghua)

- **Full HSK-and-Beyond Vocabulary**
- **Full Hanzi Literacy**
  - Framed as "assigning visual picture to word already used daily"
  - Cleanly separable from listening and speaking
- **Native-Speed Audio**
  - Tone sandhi, idiom, register, dialect variation
- **Small Bottleneck: Vocabulary Gap Filling**
  - Between Jiǎndānhuà's ~1,200–1,500 words and full native range
  - Native-speed idiom, register, dialect exposure
- **Large Bottleneck: Hanzi Literacy**
  - On separate, slower track
  - Not required for spoken Mandarin or most video content
- **Purpose**
  - Reading is deliberately the last thing the ladder asks for
  - Focus on what remains after listening and vocabulary bottlenecks are solved

### Data-Centric Architecture

- **Single Unified Data Layer**
  - Everything in one place with one schema per concern
  - Chat/forum content, SRS review state, media consumption logs, listening drill results, per-word familiarity scores, exam/gating history
- **All Features are Composable Views**
  - Flashcard reviewer, reading-assist overlay, listening drill generator, lesson player, community forum
  - Different lenses onto same underlying learner facts
- **Dynamic Module Registration**
  - New views, exercise types, modules registered against data layer as needed
  - No new bespoke subsystem or integration point required each time
- **Structural Consistency**
  - Looked-up word, listening drill tripped word, SRS-due word are same kind of record
  - Not three separate systems with different ideas of what learner knows

### Modular Extension & Add-on Framework

- **Small, Well-Defined Core**
  - Similar to Anki's add-on ecosystem
  - Community builds and shares extensions
- **Extension Categories**
  - AI speaking partners (scoped to current stage/vocabulary)
  - Handwriting recognizers (for Hanzi stage)
  - Content scrapers (curated native media integration)
  - Custom exercise packages (new drill types)
- **Shared Data Layer Access**
  - Third-party modules read/write against same learner record as first-party views
  - No separate database needed

### Gated Progression Model

#### Phase 1: Sound Discrimination

- **Raw Phonetic Capture**
  - Mapping sound to pinyin, no meaning involved
- **Syllable-Pool Generator**
  - Strings of real, common, semantically unrelated characters
  - Drawn from confusable phonetic contrast pairs (`n` vs `ng`, `ü` vs `ün`, `q` vs `x`)
  - Weighted toward learner's weak areas
- **No Semantic or Word-Level Patterns**
  - Generator doesn't check if adjacent characters form real words
  - Doesn't avoid placing contrast pairs next to each other
  - Forces brain to resolve acoustic signal
- **Exit Criteria**
  - Reliably map 10+ individual syllables correctly by ear

#### Phase 2: Word Retrieval in Nonsensical Sentences

- **Scrambled or Nonsensical Sentences**
  - Intentionally removes context/narrative crutches
  - Prevents guessing from context or narrative familiarity
- **Measures Real Acoustic Word-Recognition**
  - Not top-down guessing dressed as listening skill
- **Exit Criteria**
  - Verified acoustic word-recognition without semantic assistance

#### Phase 3: Comprehensive Meaning Synthesis

- **Real, Natural Sentences**
  - Only after acoustic capture and word-level retrieval verified
  - Extract actual meaning from natural language
- **Interactive Media Consumption Unlocks**
- **Reading (Hanzi) Treated as Capped Final Stage**
  - Not entry point

#### Diagnostic Loop / Target Reps System

- **Diagnostic Loop**
  - Listen to real content sentence-by-sentence
  - Write raw phonetic transcription with no regard for meaning
  - Compare against real transcript
- **Failure Classification**
  - **Acoustic Blurs:** Multiple words compressed into indistinct stream
  - **Phonetic Blind Spots:** Specific phonemes/tones consistently misheard
- **Target Reps**
  - **Sentence Shuffle:** Blur failures shuffled into random order (prevents narrative memory)
  - **Phonetic Minimal Pairs:** AI-generated lists of acoustically similar words targeting exact confusion
  - **AI Content Regeneration:** Entirely new content reusing failed words and structures
- **Generalizable Pattern**
  - Same diagnose → harvest → regenerate → re-test cycle for tone production, reading speed, grammar-pattern recognition

### Content & Media Management

- **Stage-Specific Content Libraries**
  - **Reading**
    - Pinyin for Hǎo-shuō-de and Jiǎndānhuà stages (hyphenated word-blocks, dictionary tone marks, Quote Partition)
    - Hanzi for real-Mandarin stage
  - **Video**
    - Available at every stage
    - Subtitle-assisted playback
    - Click-to-look-up and known/unknown tracking
- **Real Content, Not Graded Readers**
  - Because Hǎo-shuō-de and Jiǎndānhuà are complete, valid languages
  - Real-world stories, articles, media can be translated/dubbed into them
  - Not limited to artificial, learner-only content
- **Cross-Linked Media at Phrase Level**
  - Dictionary/text lookup surfaces every place across media library where word/phrase is spoken
  - Jumps directly to timestamped video segment
  - Word is defined AND heard in real contexts
- **Real-Mandarin Video Experience**
  - **Parallel Reading/Parallel Subtitles**
    - Dual-track display (Hanzi alongside pinyin, or target-language alongside reference translation)
  - **Convenient Pausing**
    - Built for mid-sentence stopping
  - **In-Flow Lookups and Card Additions**
    - Overlay on top of video
    - No navigation away from what's playing
- **Listening Comprehension Independent of Hanzi**
  - Learner can be deep in audio/listening while pre-literate
  - System doesn't treat as broken or incomplete state
- **Fast-Track to Native Content**
  - Structure unblocks learner into real, adult, native-level media as quickly as gating allows
  - Not kept in walled garden of graded readers indefinitely
- **Native Spaced Repetition**
  - System-wide, not separate Anki workflow
  - SRS state is record on shared data layer

### Misc

- MS OneNote-like note taking (semi structured with inner links to content as well as links to outside + ability to add images and preview for videos)
  - Should work well on the phone too
