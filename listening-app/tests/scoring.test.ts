import { describe, expect, test } from "bun:test";
import { bandFor, buildReport, scoreSample } from "../src/model/scoring";
import type { Sample } from "../src/model/types";

function makeSample(overrides: Partial<Sample> = {}): Sample {
  return {
    file: "audio/ni-hao.001.mp3",
    transcript: "ni-hao",
    syllables: ["ni", "hao"],
    syllableCount: 2,
    difficulty: "L1",
    hasTones: false,
    contrasts: [],
    ...overrides,
  };
}

describe("scoreSample", () => {
  test("computes earned/possible and extraPlays from playCount", () => {
    const sample = makeSample();
    const record = scoreSample(sample, "ni hao", 3, "sounds");
    expect(record.earned).toBe(2);
    expect(record.possible).toBe(2);
    expect(record.extraPlays).toBe(2); // 3 plays - 1 free = 2 extra
  });

  test("first play is free -> zero extraPlays", () => {
    const sample = makeSample();
    const record = scoreSample(sample, "ni hao", 1, "sounds");
    expect(record.extraPlays).toBe(0);
  });

  test("zero plays (never played) does not go negative", () => {
    const sample = makeSample();
    const record = scoreSample(sample, "ni hao", 0, "sounds");
    expect(record.extraPlays).toBe(0);
  });
});

describe("bandFor", () => {
  test("below 80 is red", () => {
    expect(bandFor(0)).toBe("red");
    expect(bandFor(79.9)).toBe("red");
  });

  test("80 to 90 inclusive-ish is yellow", () => {
    expect(bandFor(80)).toBe("yellow");
    expect(bandFor(85)).toBe("yellow");
    expect(bandFor(90)).toBe("yellow");
  });

  test("above 90 is green", () => {
    expect(bandFor(90.1)).toBe("green");
    expect(bandFor(100)).toBe("green");
  });
});

describe("buildReport", () => {
  test("aggregates earned/possible/extraPlays across records and applies the replay penalty once", () => {
    // Worked example from DESIGN.md §11.5
    const sampleA = makeSample({
      transcript: "ni3-hao3",
      syllables: ["ni3", "hao3"],
      syllableCount: 2,
    });
    const sampleB = makeSample({
      transcript: "qi-xi",
      syllables: ["qi", "xi"],
      syllableCount: 2,
    });

    const recordA = scoreSample(sampleA, "ni hao3", 3, "sounds_tones"); // 2 extra plays
    const recordB = scoreSample(sampleB, "qi xi", 1, "sounds_tones"); // 0 extra plays

    const report = buildReport([recordA, recordB]);

    expect(report.totalEarned).toBe(3.5);
    expect(report.totalPossible).toBe(4);
    expect(report.totalExtraPlays).toBe(2);
    expect(report.accuracyPct).toBe(87.5);
    expect(report.finalPct).toBe(85.5);
    expect(report.band).toBe("yellow");
    expect(report.message).toBe("Almost there.");
  });

  test("finalPct is floored at 0, never negative", () => {
    const sample = makeSample();
    const record = scoreSample(sample, "wrong wrong", 200, "sounds"); // huge extra-play penalty
    const report = buildReport([record]);
    expect(report.finalPct).toBe(0);
    expect(report.band).toBe("red");
  });

  test("empty session yields zeroed report without dividing by zero", () => {
    const report = buildReport([]);
    expect(report.totalPossible).toBe(0);
    expect(report.accuracyPct).toBe(0);
    expect(report.finalPct).toBe(0);
    expect(report.band).toBe("red");
  });
});
