import { describe, expect, test } from "bun:test";
import {
  compareSample,
  compareWords,
  parseSyllable,
  splitUserInput,
  splitWordsInput,
} from "../src/model/matching";

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

describe("splitWordsInput", () => {
  test("splits on commas", () => {
    expect(splitWordsInput("zhe4, shi4 shang4, you3")).toEqual(["zhe4", "shi4 shang4", "you3"]);
  });

  test("tolerates extra whitespace around commas and words", () => {
    expect(splitWordsInput("  zhe4 ,  shi4  shang4 ,you3  ")).toEqual([
      "zhe4",
      "shi4  shang4",
      "you3",
    ]);
  });

  test("empty input yields no words", () => {
    expect(splitWordsInput("   ")).toEqual([]);
  });
});

describe("compareWords - sounds mode", () => {
  const keyWords = ["zhe4", "shi4 shang4", "you3"];

  test("all words correct, including a multi-syllable word", () => {
    const result = compareWords(keyWords, "zhe4, shi4 shang4, you3", "sounds");
    expect(result).toEqual([
      { keySyllable: "zhe4", userSyllable: "zhe4", soundCorrect: true, toneCorrect: null, earned: 1, possible: 1 },
      {
        keySyllable: "shi4 shang4",
        userSyllable: "shi4 shang4",
        soundCorrect: true,
        toneCorrect: null,
        earned: 1,
        possible: 1,
      },
      { keySyllable: "you3", userSyllable: "you3", soundCorrect: true, toneCorrect: null, earned: 1, possible: 1 },
    ]);
  });

  test("tones on the key are ignored in sounds mode", () => {
    const result = compareWords(["shi4 shang4"], "shi shang", "sounds");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.earned).toBe(1);
  });

  test("getting one syllable of a multi-syllable word wrong fails the whole word (atomic, no partial credit)", () => {
    const result = compareWords(["shi4 shang4"], "shi4 shang3", "sounds");
    // sounds mode ignores tones entirely, so shi4/shang3 both match on sound --
    // use a genuinely wrong sound to prove atomicity instead.
    const wrong = compareWords(["shi4 shang4"], "shi4 lang4", "sounds");
    expect(result[0]!.earned).toBe(1); // tone-only difference doesn't matter in sounds mode
    expect(wrong[0]!.earned).toBe(0); // one wrong syllable fails the whole word
  });

  test("a word with the wrong syllable count is a full mismatch", () => {
    const result = compareWords(["shi4 shang4"], "shi4", "sounds");
    expect(result[0]!.soundCorrect).toBe(false);
    expect(result[0]!.earned).toBe(0);
  });

  test("missing word (user typed fewer words) is a mismatch", () => {
    const result = compareWords(keyWords, "zhe4, shi4 shang4", "sounds");
    expect(result[2]).toEqual({
      keySyllable: "you3",
      userSyllable: null,
      soundCorrect: false,
      toneCorrect: null,
      earned: 0,
      possible: 1,
    });
  });

  test("extra words beyond the key length are ignored for scoring", () => {
    const result = compareWords(["zhe4"], "zhe4, shi4 shang4, you3", "sounds");
    expect(result).toHaveLength(1);
    expect(result[0]!.earned).toBe(1);
  });
});

describe("compareWords - sounds_tones mode", () => {
  test("whole word matches including every internal tone", () => {
    const result = compareWords(["shi4 shang4"], "shi4 shang4", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.earned).toBe(1);
  });

  test("one wrong tone inside a multi-syllable word fails the whole word", () => {
    const result = compareWords(["shi4 shang4"], "shi4 shang2", "sounds_tones");
    expect(result[0]!.soundCorrect).toBe(false);
    expect(result[0]!.earned).toBe(0);
  });

  test("a key syllable with no tone digit only requires sound to match, within a word", () => {
    const result = compareWords(["shi shang4"], "shi3 shang4", "sounds_tones");
    // first syllable "shi" has no tone in the key, so any/no user tone is fine;
    // second syllable "shang4" must match tone 4 exactly.
    expect(result[0]!.soundCorrect).toBe(true);
    expect(result[0]!.earned).toBe(1);
  });
});

describe("compareWords - order independence", () => {
  const keyWords = ["zhe4", "shi4 shang4", "you3"];

  test("words typed in a different order than the key are all still credited", () => {
    const result = compareWords(keyWords, "you3, zhe4, shi4 shang4", "sounds");
    expect(result.every((r) => r.earned === 1)).toBe(true);
    expect(result.reduce((sum, r) => sum + r.earned, 0)).toBe(3);
  });

  test("each key word reports which user word satisfied it, even out of position", () => {
    const result = compareWords(keyWords, "you3, zhe4, shi4 shang4", "sounds");
    expect(result[0]).toMatchObject({ keySyllable: "zhe4", userSyllable: "zhe4", earned: 1 });
    expect(result[2]).toMatchObject({ keySyllable: "you3", userSyllable: "you3", earned: 1 });
  });

  test("a scrambled order with one genuinely wrong word only loses credit for that word", () => {
    const result = compareWords(keyWords, "you3, zhe4, lang4 shang4", "sounds");
    const earnedTotal = result.reduce((sum, r) => sum + r.earned, 0);
    expect(earnedTotal).toBe(2); // zhe4 and you3 captured; "shi4 shang4" not found anywhere
  });

  test("a repeated key word needs a separate matching user word for each occurrence", () => {
    // Only one "hao3" supplied, but the key asks for it twice -- one user
    // word must not be allowed to satisfy both key slots.
    const result = compareWords(["hao3", "hao3"], "hao3", "sounds");
    const earnedTotal = result.reduce((sum, r) => sum + r.earned, 0);
    expect(earnedTotal).toBe(1);
  });

  test("supplying the repeated word twice captures both occurrences", () => {
    const result = compareWords(["hao3", "hao3"], "hao3, hao3", "sounds");
    const earnedTotal = result.reduce((sum, r) => sum + r.earned, 0);
    expect(earnedTotal).toBe(2);
  });

  test("extra/unmatched user words beyond the key are simply not counted", () => {
    const result = compareWords(["zhe4"], "you3, zhe4, shi4 shang4", "sounds");
    expect(result).toHaveLength(1);
    expect(result[0]!.earned).toBe(1);
  });
});
