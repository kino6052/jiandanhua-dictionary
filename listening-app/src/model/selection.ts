import type { Difficulty, Sample } from "./types";

export type Shuffle = <T>(xs: T[]) => T[];

export function defaultShuffle<T>(xs: T[]): T[] {
  const result = xs.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j] as T, result[i] as T];
  }
  return result;
}

export function filterPool(
  samples: Sample[],
  difficulty: Difficulty,
  contrast: string | "all",
): Sample[] {
  return samples.filter((s) => {
    if (s.difficulty !== difficulty) return false;
    if (contrast !== "all" && !s.contrasts.includes(contrast)) return false;
    return true;
  });
}

/**
 * Filters the pool then shuffles and takes up to `count` samples, with no
 * repeats within the resulting session (guaranteed since it draws from a
 * shuffled slice of the filtered pool itself).
 */
export function selectSession(
  samples: Sample[],
  difficulty: Difficulty,
  contrast: string | "all",
  count: number,
  shuffle: Shuffle = defaultShuffle,
): Sample[] {
  const pool = filterPool(samples, difficulty, contrast);
  return shuffle(pool).slice(0, count);
}
