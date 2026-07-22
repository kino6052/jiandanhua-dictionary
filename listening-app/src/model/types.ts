export type Difficulty = "L1" | "L2" | "L3" | "L4";

export type Mode = "sounds" | "sounds_tones";

export interface Sample {
  file: string;
  transcript: string;
  syllables: string[];
  syllableCount: number;
  difficulty: Difficulty;
  hasTones: boolean;
  contrasts: string[];
}

export interface Manifest {
  generatedAt: string;
  samples: Sample[];
}

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
