import type { Mode, SyllableResult } from "./types";

interface ParsedSyllable {
  base: string;
  tone: number | null;
}

/**
 * Normalizes one syllable token: lowercase, trim, ü->v, split trailing tone digit (1-5).
 */
export function parseSyllable(raw: string): ParsedSyllable {
  const cleaned = raw.trim().toLowerCase().replace(/ü/g, "v");
  const match = cleaned.match(/^([a-z]*)([1-5])?$/);
  if (!match) {
    return { base: cleaned, tone: null };
  }
  const [, base, tone] = match;
  return { base: base ?? "", tone: tone ? Number(tone) : null };
}

/**
 * Splits raw user input into syllable tokens. Whitespace and dashes are both
 * treated as separators and may mix freely.
 */
export function splitUserInput(input: string): string[] {
  return input
    .trim()
    .split(/[\s-]+/)
    .filter((s) => s.length > 0);
}

/**
 * Compares one user answer against one sample's key syllables, positionally.
 * Alignment is driven by the key: missing user syllables become mismatches,
 * extra user syllables beyond the key length are ignored for scoring.
 */
export function compareSample(
  keySyllables: string[],
  userInput: string,
  mode: Mode,
): SyllableResult[] {
  const userSyllables = splitUserInput(userInput);

  return keySyllables.map((keySyllable, i): SyllableResult => {
    const userRaw = userSyllables[i] ?? null;
    const key = parseSyllable(keySyllable);
    const user = userRaw !== null ? parseSyllable(userRaw) : null;

    const soundCorrect = user !== null && user.base === key.base && key.base.length > 0;

    if (mode === "sounds") {
      return {
        keySyllable,
        userSyllable: userRaw,
        soundCorrect,
        toneCorrect: null,
        earned: soundCorrect ? 1 : 0,
        possible: 1,
      };
    }

    // sounds_tones mode
    if (key.tone === null) {
      // Key carries no tone to grade against; syllable is worth full credit on sound alone.
      return {
        keySyllable,
        userSyllable: userRaw,
        soundCorrect,
        toneCorrect: null,
        earned: soundCorrect ? 1 : 0,
        possible: 1,
      };
    }

    const toneCorrect = user !== null && user.tone === key.tone;
    const earned = (soundCorrect ? 0.5 : 0) + (toneCorrect ? 0.5 : 0);
    return {
      keySyllable,
      userSyllable: userRaw,
      soundCorrect,
      toneCorrect,
      earned,
      possible: 1,
    };
  });
}

/**
 * Splits raw user input into word tokens for word-granularity mode: words
 * are comma-separated, and each word's own syllables stay space-separated
 * within its segment, e.g. "zhe4, shi4 shang4, you3".
 */
export function splitWordsInput(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Whether every syllable in `userSyllables` matches the corresponding
 * syllable in `keySyllables`, position-by-position, under the given mode.
 * Unequal lengths are always a mismatch -- there's no partial credit for
 * getting "some of the syllables in a word" right at word granularity.
 */
function allSyllablesMatch(
  keySyllables: ReturnType<typeof parseSyllable>[],
  userSyllables: ReturnType<typeof parseSyllable>[],
  mode: Mode,
): boolean {
  if (keySyllables.length !== userSyllables.length) return false;
  return keySyllables.every((key, i) => {
    const user = userSyllables[i]!;
    const soundOk = user.base === key.base && key.base.length > 0;
    if (mode === "sounds") return soundOk;
    if (key.tone === null) return soundOk; // nothing to grade the tone against
    return soundOk && user.tone === key.tone;
  });
}

/**
 * Compares one user answer against a sample's word-level key. Word mode is
 * a word-*identification* task, not a transcription-in-order task: order
 * doesn't matter, only which words were correctly captured and how many.
 * Each key word searches the user's comma-separated words for any
 * still-unconsumed match (in any position); once a user word satisfies a
 * key word it's consumed, so a repeated key word still needs a separate
 * matching user word for each occurrence. Each word is scored atomically
 * (see allSyllablesMatch): full credit only if every syllable in that word
 * matches, none otherwise. Unmatched key words and leftover/unmatched user
 * words are simply not counted, in either direction.
 */
export function compareWords(keyWords: string[], userInput: string, mode: Mode): SyllableResult[] {
  const userWords = splitWordsInput(userInput);
  const userSyllableSets = userWords.map((w) => splitUserInput(w).map(parseSyllable));
  const consumed = new Array<boolean>(userWords.length).fill(false);

  return keyWords.map((keyWord): SyllableResult => {
    const keySyllables = splitUserInput(keyWord).map(parseSyllable);

    let matchIndex = -1;
    for (let j = 0; j < userWords.length; j++) {
      if (consumed[j]) continue;
      if (allSyllablesMatch(keySyllables, userSyllableSets[j]!, mode)) {
        matchIndex = j;
        break;
      }
    }
    const matched = matchIndex !== -1;
    if (matched) consumed[matchIndex] = true;

    return {
      keySyllable: keyWord,
      userSyllable: matched ? userWords[matchIndex]! : null,
      soundCorrect: matched,
      toneCorrect: null,
      earned: matched ? 1 : 0,
      possible: 1,
    };
  });
}
