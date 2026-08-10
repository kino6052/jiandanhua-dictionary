export type Difficulty = "L1" | "L2" | "L3" | "L4";

export type Mode = "sounds" | "sounds_tones";

/**
 * What counts as one scoring unit: an individual syllable (existing
 * behavior), or a whole word (a possibly multi-syllable cluster, scored
 * atomically -- see compareWords in matching.ts). Independent of `Mode`:
 * either granularity can be combined with either tone-strictness setting.
 */
export type Granularity = "syllable" | "word";

export interface Sample {
  file: string;
  fileName: string;
  transcript: string;
  syllables: string[];
  /**
   * Word-level answer key: each entry is the (possibly multi-syllable,
   * space-separated) pinyin for one word, e.g. "shi4 shang4". Used only in
   * "word" granularity mode. Falls back to one entry per syllable when the
   * source audio has no word-level metadata.
   */
  words: string[];
  syllableCount: number;
  difficulty: Difficulty;
  hasTones: boolean;
  contrasts: string[];
}

export interface Manifest {
  generatedAt: string;
  samples: Sample[];
}

/**
 * One scored unit's result. At "syllable" granularity this is literally one
 * syllable, with partial sound/tone credit. At "word" granularity the same
 * shape represents a whole word, scored atomically: soundCorrect doubles as
 * the pass/fail flag for the whole word and toneCorrect is left null (not
 * meaningful once a "unit" can span several syllables with independent
 * tones).
 */
export interface SyllableResult {
  keySyllable: string;
  userSyllable: string | null;
  soundCorrect: boolean;
  toneCorrect: boolean | null;
  earned: number;
  possible: number;
}

export interface SampleRecord {
  sample: Sample;
  answer: string;
  playCount: number;
  extraPlays: number;
  syllables: SyllableResult[];
  earned: number;
  possible: number;
}

export type Band = "red" | "yellow" | "green";

export interface Report {
  records: SampleRecord[];
  totalEarned: number;
  totalPossible: number;
  totalExtraPlays: number;
  accuracyPct: number;
  finalPct: number;
  band: Band;
  message: string;
}

export interface ContrastMatch {
  startsWith?: string[];
  endsWith?: string[];
  notEndsWith?: string[];
  notStartsWith?: string[];
}

export interface ContrastDef {
  description: string;
  match: ContrastMatch;
}

export type ContrastsFile = Record<string, ContrastDef>;
