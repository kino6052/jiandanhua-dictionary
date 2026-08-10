# Transcript Segment Pipeline

Turns a Chinese audio file + its SRT subtitles into per-word MP3 flashcard
clips, each tagged with hanzi/pinyin/English metadata.

## Usage

1. Drop matching pairs into `input/` — same filename, `.mp3` + `.srt`:
   ```
   input/lesson01.mp3
   input/lesson01.srt
   input/lesson02.mp3
   input/lesson02.srt
   ```
2. Run:
   ```
   python3 scripts/run.py
   ```
3. Results land in `output/<name>/`:
   - `transcript.txt` — the intermediate C:/P:/E: transcript (see `FORMAT.md`)
   - `segments/<name>.001.mp3`, `.002.mp3`, ... — one clip per subtitle line,
     cut from the source audio, tagged via ffmpeg metadata with `title`,
     `pinyin`, and a `words` JSON array (`hanzi`/`pinyin`/`english` per word)

Any `.srt` in `input/` without a same-named `.mp3` is skipped (and vice versa).

## How it works

Two steps, chained by `scripts/run.py`:

1. **`build_transcript.py`** — reads the SRT, segments each line into
   Chinese words (`jieba`), looks up pinyin + an English gloss for each word
   (CC-CEDICT via `cedict_utils`, `pypinyin` as a fallback), and writes a
   transcript where each subtitle block becomes three lines:
   ```
   C: [的] [里雅斯特] [号]
   P: [de5] [li3 ya3 si1 te4] [hao4]
   E: ['s/of] [Trieste] [(ship suffix)]
   ```
   One bracket per word, aligned 1:1 across all three lines. Punctuation,
   numbers, and non-Chinese text (English names, acronyms) are left outside
   the brackets and ignored downstream.

2. **`segment-transcript.ts`** (run via `bun`) — reads that transcript and
   the original SRT timestamps, and uses `ffmpeg` to cut one MP3 per
   subtitle block, embedding the word list as metadata.

## Fixing bad words

CC-CEDICT sometimes picks the wrong sense for a common character (e.g. 说
as "to persuade" instead of "to say"), and `jieba` occasionally mis-splits
a word. When you spot one in `output/*/transcript.txt`:

- Wrong reading/gloss → add or edit an entry in `OVERRIDES` at the top of
  `scripts/build_transcript.py` (`"说": ("shuo1", "to say/speak")`).
- Wrong split (two words glued together, or one word cut in half) → add the
  correct multi-character word to `FORCE_WORDS`, or add a `(char1, char2)`
  pair to the `jieba.suggest_freq` loop to force a split.

Also check stderr after running — any block reporting `UNRESOLVED WORDS` has
a word with no CC-CEDICT entry at all; those are the most worth fixing.
Then just rerun `python3 scripts/run.py` — it reprocesses everything.

## Requirements

- Python 3 with `jieba`, `pypinyin`, `cedict_utils`:
  `pip install jieba pypinyin cedict_utils --break-system-packages`
- [`bun`](https://bun.sh) on `PATH`
- `ffmpeg` on `PATH`
