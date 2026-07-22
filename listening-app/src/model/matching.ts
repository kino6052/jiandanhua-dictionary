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
