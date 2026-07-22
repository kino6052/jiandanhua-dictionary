# Listening Training App — Design

A **static webapp** for Mandarin listening drills. You run training sessions: the app
plays an audio sample, you type what you heard in (simplified) pinyin, click **Verify**,
see your per-syllable result immediately, then move on. At the end you get a score, a
color-coded verdict, and a full review of every sample with your mistakes.

This document is **design only** — no implementation yet. It is the contract the code and
tests will be written against.

---

## 1. Goals / non-goals

**Goals**

- Pure phonetic listening practice — hear audio, transcribe to pinyin, get scored.
- Two exercise modes: **sounds-only** and **sounds + tones**.
- Configurable sessions: mode, difficulty, sound focus (contrast), number of samples.
- Immediate per-sample feedback, plus a full end-of-session report.
- Fully **static** — deployable to any file host / GitHub Pages, no backend.
- Clean **MVVM** split so the logic is testable **without a browser** (TDD on the view model).

**Non-goals (for now)**

- No persistence — nothing is stored between sessions (no history, no remembered settings, no accounts).
- No auto-progression of difficulty — you pick your level every time.
- No meaning/comprehension, no hanzi display, no translation. Sound only.
- No server-side directory listing — the file set is known via a generated manifest (§5).
- Producing the audio files themselves is out of scope; the app consumes whatever `.mp3`s exist.

---

## 2. Tech stack

| Concern | Choice |
| --- | --- |
| Language | TypeScript |
| Runtime / tooling | **Bun** (build script + `bun test`), mirroring the existing `listening/` tool |
| UI library | **Preact** (`h`) — **non-JSX**, via **`htm`** tagged templates (no JSX build step) |
| State | **`@preact/signals`** (`signal`, `computed`, `effect`) |
| Tests | `bun test` against the **view model only** — no DOM, no browser |
| Styling | Plain CSS (author's discretion); responsive for desktop **and** mobile |

Rationale: matches the user's stated stack (non-JSX Preact + signals + Bun + TS). The
sibling `haoshuode-app` uses Preact+Vite+JSX — this app deliberately goes lighter/no-JSX.

---

## 3. Folder structure

```
listening-app/
├── DESIGN.md                 # this file
├── package.json              # scripts: dev, build, build:manifest, test
├── tsconfig.json
├── index.html                # single entry; loads src/main.ts
├── contrasts.json            # pools.json-style config: sound-focus definitions (§7)
├── public/
│   └── audio/                # the .mp3 resources (filenames ARE the transcripts, §4)
│       ├── ni-hao.001.mp3
│       └── ...
├── src/
│   ├── main.ts               # mounts the view, wires it to a ViewModel instance
│   ├── model/                # ── the tested core (no DOM) ──
│   │   ├── types.ts          # Sample, SyllableResult, SampleRecord, etc.
│   │   ├── matching.ts       # pure: normalize + compare one answer to one key
│   │   ├── scoring.ts        # pure: per-sample + session scoring, verdict banding
│   │   ├── selection.ts      # pure: filter by difficulty/contrast, shuffle, pick N
│   │   └── viewModel.ts      # the ViewModel: signals + actions (the state machine)
│   └── view/                 # ── thin, untested render layer ──
│       ├── App.ts            # htm/preact tree that reads the ViewModel signals
│       └── components/       # SetupScreen, DrillScreen, ReportScreen, ...
├── scripts/
│   └── build-manifest.ts     # scans public/audio → src/manifest.generated.json (§6)
└── tests/
    ├── matching.test.ts
    ├── scoring.test.ts
    ├── selection.test.ts
    └── viewModel.test.ts
```

**Layering rule:** `model/` never imports from `view/`, never touches `window`, `document`,
`Audio`, or `fetch`. Everything time/IO/audio-related is injected (§10). This is what makes
the ViewModel unit-testable.

---

## 4. Resource format — the filename *is* the transcript

Each audio file encodes its own answer key in its name:

```
ni-hao.001.mp3
│      │   └── extension
│      └────── disambiguator index — IGNORED (lets duplicates coexist)
└───────────── transcript: pinyin syllables separated by "-"
```

Parsing rules:

- Strip the extension. Split the remaining name on `.` → `["ni-hao", "001"]`.
  The **first** segment is the transcript; every following segment is an ignored index.
- Split the transcript on `-` → syllables: `["ni", "hao"]`.
- A syllable may carry a **trailing tone digit** `1–5` (`hao3`). Tones are **optional** and
  may be present on some files/syllables and absent on others.
- Pinyin is written "simple": **`ü` is written `v`** (e.g. `nv` = nǚ/nü). No tone marks —
  tones are numbers only.

Derived per sample (computed at build time, §6):

- `syllables: string[]` — raw syllable tokens (may include tone digits).
- `syllableCount: number` — used for difficulty banding.
- `difficulty: "L1" | "L2" | "L3" | "L4"` — by count (§8).
- `contrasts: string[]` — which sound-focus pools this file belongs to (§7).

---

## 5. Difficulty

Difficulty is purely the **length of the sample** in syllables. You select it manually each
session; the app never remembers or auto-promotes.

| Level | Syllable count |
| --- | --- |
| **L1** | ≤ 4 |
| **L2** | 5–6 |
| **L3** | 7–10 |
| **L4** | 10–15 |

> Note the documented overlap at 10 (L3 = 7–10, L4 = 10–15). **Resolution:** bands are made
> disjoint in code as **L1 ≤4, L2 5–6, L3 7–9, L4 10–15**. Counts >15 are still bucketed into
> L4 (nothing is dropped). This is the one spot where the spec was ambiguous; flag if you want
> the boundary elsewhere.

---

## 6. Build script → manifest (`scripts/build-manifest.ts`)

Because the app is static, it can't list a directory at runtime. A Bun build script scans
`public/audio/`, parses each filename (§4), tags it with contrasts (§7), and writes a
`manifest.generated.json` the app fetches once on load.

Run it whenever audio is added: `bun run build:manifest`.

**Output shape:**

```jsonc
{
  "generatedAt": "2026-07-22T00:00:00Z",
  "samples": [
    {
      "file": "audio/ni-hao.001.mp3",   // path relative to the served root
      "transcript": "ni-hao",
      "syllables": ["ni", "hao"],
      "syllableCount": 2,
      "difficulty": "L1",
      "hasTones": false,                 // true if any syllable carries a tone digit
      "contrasts": ["n_final", "ng_final"]  // pools it matched (§7); [] if none
    }
  ]
}
```

The script is the single source of truth for parsing; the runtime never re-parses filenames.

---

## 7. Sound-focus config (`contrasts.json`) — pools.json-style

Mirrors the existing `listening/pools.json` idea. Defines named sound foci; adding a new
drill target is just editing this file. Each pool describes how to decide whether a syllable
"belongs" to it via simple matchers on the pinyin (no tone).

```jsonc
{
  "n_final": {
    "description": "Syllables ending in a plain -n final (contrast vs ng_final).",
    "match": { "endsWith": ["n"], "notEndsWith": ["ng"] }
  },
  "ng_final": {
    "description": "Syllables ending in -ng.",
    "match": { "endsWith": ["ng"] }
  },
  "q_initial": { "description": "q- initials.", "match": { "startsWith": ["q"] } },
  "x_initial": { "description": "x- initials.", "match": { "startsWith": ["x"] } }
}
```

- At build time each sample is tagged with every pool for which **at least one** of its
  syllables matches → `sample.contrasts`.
- In setup the user picks one contrast (or **All**). "All" = no contrast filter.
- The exact matcher vocabulary (`startsWith` / `endsWith` / `notEndsWith` / maybe `regex`)
  is small and lives in the build script; keep it dumb and data-driven like the pools file.

---

## 8. Architecture — MVVM

```
        ┌─────────────────────────────────────────┐
        │  View  (src/view, htm + preact)          │   NOT tested
        │  - renders from ViewModel signals        │
        │  - forwards user events to VM actions    │
        │  - owns the only <audio> element         │
        └───────────────▲───────────────┬──────────┘
              reads signals         calls actions
        ┌───────────────┴───────────────▼──────────┐
        │  ViewModel  (src/model/viewModel.ts)      │   ◄── unit tested (TDD)
        │  - signals = the entire UI state          │
        │  - actions = the only way state changes   │
        │  - a pure state machine (§9)              │
        └───────────────┬───────────────────────────┘
              delegates to pure helpers
        ┌───────────────▼───────────────────────────┐
        │  matching.ts · scoring.ts · selection.ts  │   ◄── unit tested (TDD)
        │  pure functions, no state                 │
        └────────────────────────────────────────────┘
```

**The ViewModel is a faithful, headless representation of the UI.** Every test asserts on VM
signals (what the view *would* show) and calls VM actions (what a click *would* do). The view
layer is a mechanical projection of the VM and is intentionally left untested.

---

## 9. ViewModel — state machine & spec

The whole session is one small state machine. `phase` drives which screen the view renders.

```
 setup ──startSession()──► drilling ──(all samples done)──► report ──reset()──► setup
                              │  ▲
                     verify() │  │ next()
                              ▼  │
                       (per-sample sub-phase: "answering" ⇄ "feedback")
```

### 9.1 State (signals)

**Setup (editable only while `phase === "setup"`):**

| Signal | Type | Notes |
| --- | --- | --- |
| `mode` | `"sounds" \| "sounds_tones"` | scoring mode (§11) |
| `difficulty` | `"L1"…"L4"` | filters sample pool by band |
| `contrast` | `string \| "all"` | pool name from `contrasts.json` |
| `count` | `number` | requested samples per session |

**Session (set by `startSession`, read-only after):**

| Signal | Type | Notes |
| --- | --- | --- |
| `phase` | `"setup"\|"drilling"\|"report"` | current screen |
| `queue` | `Sample[]` | the selected, shuffled subset (length ≤ `count`) |
| `index` | `number` | current position in `queue` |
| `records` | `SampleRecord[]` | one per attempted sample (accumulates) |

**Current sample (drilling):**

| Signal | Type | Notes |
| --- | --- | --- |
| `subPhase` | `"answering" \| "feedback"` | pre/post Verify for the current sample |
| `input` | `string` | raw text in the field |
| `playCount` | `number` | plays of the *current* sample (0 before first play) |
| `speed` | `number` | playback rate, e.g. `1`, `0.75` |
| `currentResult` | `SyllableResult[] \| null` | populated by `verify()` for feedback view |

### 9.2 Derived (computed)

- `currentSample = queue[index]`
- `progress = { position: index + 1, total: queue.length }`
- `canVerify = subPhase === "answering"` (Verify is always allowed, even with empty/partial input — empty just scores as all-mismatch)
- `isLastSample = index === queue.length - 1`
- `report` (only meaningful in `report` phase) — see §9.4.

### 9.3 Actions

| Action | Precondition | Effect |
| --- | --- | --- |
| `setMode/​setDifficulty/​setContrast/​setCount` | `phase==="setup"` | update the setup signal |
| `startSession()` | `phase==="setup"`, pool non-empty | select+shuffle+slice (§selection); set `queue`, `index=0`, `records=[]`, reset current-sample signals, `phase="drilling"`, `subPhase="answering"` |
| `play()` | `phase==="drilling"` | `playCount++`; (view reacts by playing audio — see §10). Pure w.r.t. VM: just a counter. |
| `setSpeed(r)` | `phase==="drilling"` | set `speed` |
| `updateInput(s)` | `subPhase==="answering"` | set `input` |
| `verify()` | `subPhase==="answering"` | compute `currentResult` via matching (§11) using `mode`; push a `SampleRecord` (answer, playCount, per-syllable results, earned/possible); `subPhase="feedback"` |
| `next()` | `subPhase==="feedback"` | if `isLastSample` → `phase="report"`; else `index++`, reset `input/playCount/currentResult`, `subPhase="answering"` |
| `reset()` | any | back to `phase="setup"` (setup signals retained; session signals cleared) |

**Invariants (good test targets):**

- You cannot `verify()` twice for the same sample (guarded by `subPhase`).
- `records.length` equals number of samples verified so far.
- Editing setup signals mid-session is a no-op (guarded by `phase`).
- `playCount` resets to 0 on every `next()` / `startSession()`.

### 9.4 SampleRecord & report

```ts
type SyllableResult = {
  keySyllable: string;     // e.g. "hao3"
  userSyllable: string | null; // null = missing (user typed fewer syllables)
  soundCorrect: boolean;
  toneCorrect: boolean | null; // null when tone not graded (sounds mode, or key has no tone)
  earned: number;          // points earned for this syllable (0, 0.5, or 1)
  possible: number;        // always 1
};

type SampleRecord = {
  sample: Sample;
  answer: string;          // raw user input
  playCount: number;
  extraPlays: number;      // max(playCount - 1, 0)
  syllables: SyllableResult[];
  earned: number;          // Σ syllable.earned
  possible: number;        // Σ syllable.possible === sample.syllableCount
};
```

`report` computed:

```ts
type Report = {
  records: SampleRecord[];       // full list, re-shown for review (with mismatches)
  totalEarned: number;           // Σ records.earned
  totalPossible: number;         // Σ records.possible (= total syllables in session)
  totalExtraPlays: number;       // Σ records.extraPlays
  accuracyPct: number;           // 100 * totalEarned / totalPossible
  finalPct: number;              // max(0, accuracyPct - totalExtraPlays)  // −1% per extra play
  band: "red" | "yellow" | "green";
  message: string;               // per band (§12)
};
```

---

## 10. Side-effect injection (keeps the VM headless)

The VM never imports `Audio`, `fetch`, `Math.random`, or `Date` directly. They are injected
so tests are deterministic:

```ts
interface Deps {
  shuffle: <T>(xs: T[]) => T[];   // default: Fisher–Yates w/ Math.random; test: identity or seeded
  now: () => number;              // if ever needed
}
```

- **Audio** is *not* in the VM at all. The view owns the single `<audio>` element; it observes
  `playCount`/`speed`/`currentSample` and plays accordingly. The VM's `play()` only bumps a
  counter — which is exactly the thing we score, and it's trivially testable.
- **Manifest loading** (`fetch` of `manifest.generated.json`) happens in `main.ts`; the parsed
  `Sample[]` is handed to the VM constructor. Tests construct the VM with an in-memory array.

---

## 11. Matching & scoring (pure, the heart of the tests)

### 11.1 Normalization (per syllable, both key & user)

- lowercase; trim; collapse internal whitespace.
- User input is split into syllables on **any run of whitespace and/or `-`** (both tolerated).
- `ü` → `v` normalization (accept either spelling; canonicalize to `v`).
- Separate each syllable into **base** (letters) + **tone** (trailing digit `1–5`, or none).

### 11.2 Alignment

- **Positional, by the key's syllables.** For a key of `n` syllables, compare positions
  `0…n-1`. Denominator for the sample = `n` (`possible` per syllable = 1).
- If the user typed **fewer** syllables, missing positions → `userSyllable = null`, full
  mismatch (earn 0).
- If the user typed **more**, the extras are ignored for scoring but shown in feedback as
  “extra: …”.

### 11.3 Per-syllable credit

Let `soundMatch = base(user) === base(key)`.

- **`sounds` mode:** tones are stripped from *both* sides before comparing.
  `earned = soundMatch ? 1 : 0`. `toneCorrect = null`.
- **`sounds_tones` mode:**
  - If the **key syllable has a tone digit** → split 0.5 / 0.5:
    - sound half: `soundMatch ? 0.5 : 0`
    - tone half: `tone(user) === tone(key) ? 0.5 : 0` (user omitting the tone ⇒ tone half lost)
    - `earned = soundHalf + toneHalf` (so right-sound/wrong-tone ⇒ **0.5** — partial credit, as specified).
  - If the **key syllable has no tone digit** → nothing to grade on tone; syllable is worth
    `soundMatch ? 1 : 0`, `toneCorrect = null`. (Keeps every syllable worth exactly 1 so the
    denominator stays "total syllables in the session".)

### 11.4 Session scoring

```
accuracyPct   = 100 * Σ earned / Σ possible          // Σ possible = total syllables
finalPct      = max(0, accuracyPct − Σ extraPlays)   // −1% per extra play, subtracted once at the end
```

- First play of each sample is free; **every replay** anywhere in the session costs −1%.
- Penalty is applied **once**, to the final percentage, when the session ends.

### 11.5 Worked example

Session, `sounds_tones` mode, two samples:

- `ni3-hao3` (2 syll, both toned). User types `ni hao3`, played 3× (2 extra).
  - `ni` vs `ni3`: sound ✓ (0.5) + tone ✗ (0) = **0.5**
  - `hao3` vs `hao3`: sound ✓ (0.5) + tone ✓ (0.5) = **1.0**
  - record earned 1.5 / 2.
- `qi-xi` (2 syll, no tones). User types `qi xi`, played 1× (0 extra).
  - both sound ✓, no tone grading → 1 + 1 = **2 / 2**.

Totals: earned 3.5 / possible 4 → accuracy 87.5%. Extra plays = 2 → final = 85.5% → **yellow**.

---

## 12. Screens & UX

Three screens, chosen by `phase`. Relaxed pacing — **no timers anywhere**.

**1) Setup** (`phase==="setup"`)
- Controls bound to setup signals: **Mode** (sounds / sounds+tones), **Difficulty** (L1–L4),
  **Focus** (contrast dropdown from `contrasts.json` + "All"), **Count** (number).
- Shows how many samples match the current filter; **Start** disabled if 0.

**2) Drill** (`phase==="drilling"`)
- Progress: “Sample {position} / {total}”.
- **Play** button (press to play; unlimited replays) + **speed** control. Deliberately minimal:
  no hanzi, no hints — just play/speed + the input field.
- Pinyin **input field** + **Verify**.
- After Verify (`subPhase==="feedback"`): reveal the correct transcript with **per-syllable
  highlighting** (sound/tone right/wrong, missing, extra), show plays-so-far, then **Next**
  (label “Finish” on the last sample).

**3) Report** (`phase==="report"`)
- Big **final %**, color band + message:
  - **< 80% → red** — “Keep trying.”
  - **80–90% → yellow** — “Almost there.”
  - **> 90% → green** — “You can increase the difficulty.”
    (Boundary convention: `<80` red; `80..=90` yellow; `>90` green. Confirm if you want strict `<`/`>` vs `≤`/`≥` at exactly 80/90.)
- Line: accuracy % and the extra-play deduction shown separately (e.g. “91.2% − 3 replays”).
- **Full list** of every sample re-shown with the user's answer vs. correct, mistakes, and
  per-sample play count (§9.4).
- **Restart** → `reset()` back to setup.

**Accessibility / responsive**
- Standard conventions: real `<button>`/`<label>`/`<input>`, focus moves to the input when a
  sample loads, **Enter submits** Verify (and Enter advances to Next on the feedback step),
  visible focus rings, ARIA live region announcing the per-sample result. Color band is never
  the *only* signal — it's paired with text.
- Layout works on **desktop and mobile** (single-column, large tap targets, no hover-only UI).

---

## 13. Testing strategy (TDD, view model only)

- Runner: **`bun test`**. **No DOM, no browser, no view import.** Tests import only `model/*`.
- Determinism via injected `shuffle`/`now` (§10); audio is never involved (only `playCount`).

Representative cases to write **first**:

- **matching.test.ts** — normalization (`v`/`ü`, whitespace vs `-`, case); positional align;
  missing vs extra syllables; sounds vs sounds+tones; right-sound/wrong-tone = 0.5; key-without-tone in tones mode.
- **scoring.test.ts** — `accuracyPct` aggregation; `finalPct` with extra-play deductions and
  the `max(0, …)` floor; band thresholds (79/80/90/91 boundary cases); the §11.5 worked example.
- **selection.test.ts** — difficulty banding incl. the L3/L4 boundary; contrast filter incl.
  "All"; no-repeat within a session; `count` larger than the pool (returns what exists).
- **viewModel.test.ts** — the state machine: setup→drill→report transitions; `verify()` guard
  (can't double-verify); `next()` resets `playCount`/`input`; setup edits ignored mid-session;
  `records`/`report` shape after a full scripted run.

---

## 14. Open questions (flag before build)

1. **Difficulty boundary at 10** — spec overlaps (L3 7–10, L4 10–15). Design uses disjoint
   **L3 7–9, L4 10–15**. OK?
2. **Band boundaries at exactly 80 / 90** — design treats `<80` red, `80–90` yellow, `>90`
   green (so 80.0 = yellow, 90.0 = yellow, 90.1 = green). Confirm the exact `≤`/`<` you want.
3. **Neutral tone** — represented as `5`, or as “no digit”? Affects tone grading when a file
   intends a neutral tone. Design currently treats “no digit on the key” as *not tone-graded*.
4. **Manifest location** — `src/manifest.generated.json` (imported/bundled) vs
   `public/manifest.generated.json` (fetched at runtime). Either works; leaning fetched so
   re-running the build script needs no rebundle.
```
