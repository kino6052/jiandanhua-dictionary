import { describe, expect, test } from "bun:test";
import { compareSample, parseSyllable, splitUserInput } from "../src/model/matching";

describe("parseSyllable", () => {
  test("splits base and trailing tone digit", () => {
    expect(parseSyllable("hao3")).toEqual({ base: "hao", tone: 3 });
  });

  test("no tone digit -> tone null", () => {
    expect(parseSyllable("hao")).toEqual({ base: "hao", tone: null });
  });

  test("is case-insensitive", () => {
    expect(parseSyllable("HAO3")).toEqual({ base: "hao", tone: 3 });
  });

  test("normalizes ü to v", () => {
    expect(parseSyllable("nv3")).toEqual({ base: "nv", tone: 3 });
    expect(parseSyllable("nü3")).toEqual({ base: "nv", tone: 3 });
  });

  test("trims whitespace", () => {
    expect(parseSyllable("  hao3  ")).toEqual({ base: "hao", tone: 3 });
  });
});

describe("splitUserInput", () => {
  test("splits on whitespace", () => {
    expect(splitUserInput("ni hao")).toEqual(["ni", "hao"]);
  });

  test("splits on dashes", () => {
    expect(splitUserInput("ni-hao")).toEqual(["ni", "hao"]);
  });

  test("tolerates mixed separators and repeated whitespace", () => {
    expect(splitUserInput("  ni  -hao   ma ")).toEqual(["ni", "hao", "ma"]);
  });

  test("empty input yields no syllables", () => {
    expect(splitUserInput("   ")).toEqual([]);
  });
});

describe("compareSample - sounds mode", () => {
  test("all correct", () => {
    const result = compareSample(["ni3", "hao3"], "ni hao", "sounds");
    expect(result).toEqual([
      { keySyllable: "ni3", userSyllable: "ni", soundCorrect: true, toneCorrect: null, earned: 1, possible: 1 },
      { keySyllable: "hao3", userSyllable: "hao", soundCorrect: true, toneCorrect: null, earned: 1, possible: 1 },
    ]);
  });

  test("tones on the key are ignored entirely", () => {
    // user typing the tone too should not matter in sounds mode
    const result = compareSample(["hao3"], "hao3", "sounds");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.earned).toBe(1);
  });

  test("wrong sound is a full mismatch", () => {
    const result = compareSample(["hao3"], "how", "sounds");
    expect(result[0]).toEqual({
      keySyllable: "hao3",
      userSyllable: "how",
      soundCorrect: false,
      toneCorrect: null,
      earned: 0,
      possible: 1,
    });
  });

  test("missing syllable (user typed fewer) is a mismatch", () => {
    const result = compareSample(["ni3", "hao3"], "ni", "sounds");
    expect(result[1]).toEqual({
      keySyllable: "hao3",
      userSyllable: null,
      soundCorrect: false,
      toneCorrect: null,
      earned: 0,
      possible: 1,
    });
  });

  test("extra syllables beyond the key length are ignored for scoring", () => {
    const result = compareSample(["ni3"], "ni hao ma", "sounds");
    expect(result).toHaveLength(1);
    expect(result[0]!.earned).toBe(1);
  });
});

describe("compareSample - sounds_tones mode", () => {
  test("sound and tone both correct earns full credit", () => {
    const result = compareSample(["hao3"], "hao3", "sounds_tones");
    expect(result[0]).toEqual({
      keySyllable: "hao3",
      userSyllable: "hao3",
      soundCorrect: true,
      toneCorrect: true,
      earned: 1,
      possible: 1,
    });
  });

  test("right sound, wrong tone earns half credit", () => {
    const result = compareSample(["hao3"], "hao2", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.toneCorrect).toBe(false);
    expect(result[0]!.earned).toBe(0.5);
  });

  test("right sound, missing tone earns half credit", () => {
    const result = compareSample(["hao3"], "hao", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.toneCorrect).toBe(false);
    expect(result[0]!.earned).toBe(0.5);
  });

  test("wrong sound, right tone earns half credit", () => {
    const result = compareSample(["hao3"], "how3", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(false);
    expect(result[0]!.toneCorrect).toBe(true);
    expect(result[0]!.earned).toBe(0.5);
  });

  test("wrong sound and wrong tone earns zero", () => {
    const result = compareSample(["hao3"], "how2", "sounds_tones");
    expect(result[0]!.earned).toBe(0);
  });

  test("key syllable without a tone digit is not tone-graded, worth full credit on sound alone", () => {
    const result = compareSample(["hao"], "hao", "sounds_tones");
    expect(result[0]).toEqual({
      keySyllable: "hao",
      userSyllable: "hao",
      soundCorrect: true,
      toneCorrect: null,
      earned: 1,
      possible: 1,
    });
  });

  test("key syllable without a tone digit, user adds one anyway -> still full credit from sound", () => {
    const result = compareSample(["hao"], "hao3", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.toneCorrect).toBe(null);
    expect(result[0]!.earned).toBe(1);
  });
});
