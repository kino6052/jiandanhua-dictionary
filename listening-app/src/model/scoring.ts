import { compareSample } from "./matching";
import type { Band, Mode, Report, Sample, SampleRecord } from "./types";

export function scoreSample(
  sample: Sample,
  answer: string,
  playCount: number,
  mode: Mode,
): SampleRecord {
  const syllables = compareSample(sample.syllables, answer, mode);
  const earned = syllables.reduce((sum, s) => sum + s.earned, 0);
  const possible = syllables.reduce((sum, s) => sum + s.possible, 0);

  return {
    sample,
    answer,
    playCount,
    extraPlays: Math.max(playCount - 1, 0),
    syllables,
    earned,
    possible,
  };
}

export function bandFor(finalPct: number): Band {
  if (finalPct > 90) return "green";
  if (finalPct >= 80) return "yellow";
  return "red";
}

const BAND_MESSAGES: Record<Band, string> = {
  red: "Keep trying.",
  yellow: "Almost there.",
  green: "You can increase the difficulty.",
};

export function buildReport(records: SampleRecord[]): Report {
  const totalEarned = records.reduce((sum, r) => sum + r.earned, 0);
  const totalPossible = records.reduce((sum, r) => sum + r.possible, 0);
  const totalExtraPlays = records.reduce((sum, r) => sum + r.extraPlays, 0);

  const accuracyPct = totalPossible > 0 ? (100 * totalEarned) / totalPossible : 0;
  const finalPct = Math.max(0, accuracyPct - totalExtraPlays);
  const band = bandFor(finalPct);

  return {
    records,
    totalEarned,
    totalPossible,
    totalExtraPlays,
    accuracyPct,
    finalPct,
    band,
    message: BAND_MESSAGES[band],
  };
}
