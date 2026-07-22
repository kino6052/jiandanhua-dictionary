import type { ContrastMatch, ContrastsFile, Difficulty } from "./types";

export interface ParsedFilename {
  transcript: string;
  syllables: string[];
}

/**
 * Parses a resource filename into its transcript. The filename IS the
 * transcript: `<pinyin-syllables-dash-separated>.<ignored-index>.<ext>`.
 * e.g. "ni-hao.001.mp3" -> { transcript: "ni-hao", syllables: ["ni", "hao"] }
 *
 * Returns null if the filename has no recognizable transcript segment.
 */
export function parseFilename(filename: string): ParsedFilename | null {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const [transcript] = withoutExt.split(".");
  if (!transcript) return null;

  const syllables = transcript.split("-").filter((s) => s.length > 0);
  if (syllables.length === 0) return null;

  return { transcript, syllables };
}

/**
 * Difficulty band by syllable count. Bands are disjoint: L1 <=4, L2 5-6,
 * L3 7-9, L4 10-15 (and anything above 15 still buckets into L4).
 */
export function difficultyFor(syllableCount: number): Difficulty {
  if (syllableCount <= 4) return "L1";
  if (syllableCount <= 6) return "L2";
  if (syllableCount <= 9) return "L3";
  return "L4";
}

function stripTone(syllable: string): string {
  return syllable.toLowerCase().replace(/ü/g, "v").replace(/[1-5]$/, "");
}

function matchesOne(base: string, match: ContrastMatch): boolean {
  if (match.startsWith && !match.startsWith.some((p) => base.startsWith(p))) return false;
  if (match.notStartsWith && match.notStartsWith.some((p) => base.startsWith(p))) return false;
  if (match.endsWith && !match.endsWith.some((s) => base.endsWith(s))) return false;
  if (match.notEndsWith && match.notEndsWith.some((s) => base.endsWith(s))) return false;
  return true;
}

/**
 * A sample belongs to a contrast pool if AT LEAST ONE of its syllables
 * matches that pool's rule (tones stripped before matching).
 */
export function contrastsFor(syllables: string[], contrasts: ContrastsFile): string[] {
  const bases = syllables.map(stripTone);
  return Object.entries(contrasts)
    .filter(([, def]) => bases.some((base) => matchesOne(base, def.match)))
    .map(([name]) => name);
}

export function hasTones(syllables: string[]): boolean {
  return syllables.some((s) => /[1-5]$/.test(s));
}
