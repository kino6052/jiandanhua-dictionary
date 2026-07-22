import { describe, expect, test } from "bun:test";
import { filterPool, selectSession } from "../src/model/selection";
import type { Sample } from "../src/model/types";

function makeSample(overrides: Partial<Sample>): Sample {
  return {
    file: `audio/${overrides.transcript ?? "x"}.001.mp3`,
    transcript: "x",
    syllables: ["x"],
    syllableCount: 1,
    difficulty: "L1",
    hasTones: false,
    contrasts: [],
    ...overrides,
  };
}

const identity = <T>(xs: T[]): T[] => xs.slice();

describe("filterPool", () => {
  test("filters by difficulty", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1" }),
      makeSample({ transcript: "b", difficulty: "L2" }),
    ];
    expect(filterPool(samples, "L1", "all")).toEqual([samples[0]!]);
  });

  test("filters by contrast", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1", contrasts: ["n_final"] }),
      makeSample({ transcript: "b", difficulty: "L1", contrasts: ["ng_final"] }),
    ];
    expect(filterPool(samples, "L1", "n_final")).toEqual([samples[0]!]);
  });

  test("'all' contrast bypasses the contrast filter", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1", contrasts: ["n_final"] }),
      makeSample({ transcript: "b", difficulty: "L1", contrasts: [] }),
    ];
    expect(filterPool(samples, "L1", "all")).toHaveLength(2);
  });

  test("difficulty band boundary: 9 syllables is L3, 10 syllables is L4", () => {
    const nineSyll = makeSample({ transcript: "nine", difficulty: "L3", syllableCount: 9 });
    const tenSyll = makeSample({ transcript: "ten", difficulty: "L4", syllableCount: 10 });
    const samples = [nineSyll, tenSyll];
    expect(filterPool(samples, "L3", "all")).toEqual([nineSyll]);
    expect(filterPool(samples, "L4", "all")).toEqual([tenSyll]);
  });
});

describe("selectSession", () => {
  test("draws only from the filtered pool", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1" }),
      makeSample({ transcript: "b", difficulty: "L2" }),
    ];
    const session = selectSession(samples, "L1", "all", 5, identity);
    expect(session).toEqual([samples[0]!]);
  });

  test("caps at count when pool is larger", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1" }),
      makeSample({ transcript: "b", difficulty: "L1" }),
      makeSample({ transcript: "c", difficulty: "L1" }),
    ];
    const session = selectSession(samples, "L1", "all", 2, identity);
    expect(session).toHaveLength(2);
  });

  test("returns whole pool (no error) when count exceeds pool size", () => {
    const samples = [makeSample({ transcript: "a", difficulty: "L1" })];
    const session = selectSession(samples, "L1", "all", 10, identity);
    expect(session).toHaveLength(1);
  });

  test("never repeats a sample within a session", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1" }),
      makeSample({ transcript: "b", difficulty: "L1" }),
      makeSample({ transcript: "c", difficulty: "L1" }),
    ];
    const session = selectSession(samples, "L1", "all", 3, identity);
    const uniqueFiles = new Set(session.map((s) => s.file));
    expect(uniqueFiles.size).toBe(session.length);
  });

  test("uses the injected shuffle function", () => {
    const samples = [
      makeSample({ transcript: "a", difficulty: "L1" }),
      makeSample({ transcript: "b", difficulty: "L1" }),
    ];
    const reverse = <T>(xs: T[]): T[] => xs.slice().reverse();
    const session = selectSession(samples, "L1", "all", 2, reverse);
    expect(session[0]!.transcript).toBe("b");
    expect(session[1]!.transcript).toBe("a");
  });
});
