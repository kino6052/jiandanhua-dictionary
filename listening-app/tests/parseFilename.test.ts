import { describe, expect, test } from "bun:test";
import {
  contrastsFor,
  difficultyFor,
  hasTones,
  parseFilename,
} from "../src/model/parseFilename";
import type { ContrastsFile } from "../src/model/types";

describe("parseFilename", () => {
  test("splits transcript into dash-separated syllables", () => {
    expect(parseFilename("ni-hao.001.mp3")).toEqual({
      transcript: "ni-hao",
      syllables: ["ni", "hao"],
    });
  });

  test("ignores the disambiguator index", () => {
    expect(parseFilename("ni-hao.017.mp3")).toEqual({
      transcript: "ni-hao",
      syllables: ["ni", "hao"],
    });
  });

  test("handles a single syllable with no dash", () => {
    expect(parseFilename("hao3.001.mp3")).toEqual({
      transcript: "hao3",
      syllables: ["hao3"],
    });
  });

  test("handles tone digits embedded in syllables", () => {
    expect(parseFilename("ni3-hao3.001.mp3")).toEqual({
      transcript: "ni3-hao3",
      syllables: ["ni3", "hao3"],
    });
  });

  test("handles a filename with no index segment", () => {
    expect(parseFilename("ni-hao.mp3")).toEqual({
      transcript: "ni-hao",
      syllables: ["ni", "hao"],
    });
  });

  test("returns null for an empty transcript", () => {
    expect(parseFilename(".001.mp3")).toBeNull();
  });
});

describe("difficultyFor", () => {
  test("L1 for <=4 syllables", () => {
    expect(difficultyFor(1)).toBe("L1");
    expect(difficultyFor(4)).toBe("L1");
  });

  test("L2 for 5-6 syllables", () => {
    expect(difficultyFor(5)).toBe("L2");
    expect(difficultyFor(6)).toBe("L2");
  });

  test("L3 for 7-9 syllables", () => {
    expect(difficultyFor(7)).toBe("L3");
    expect(difficultyFor(9)).toBe("L3");
  });

  test("L4 for 10-15 syllables, and anything beyond", () => {
    expect(difficultyFor(10)).toBe("L4");
    expect(difficultyFor(15)).toBe("L4");
    expect(difficultyFor(30)).toBe("L4");
  });
});

describe("hasTones", () => {
  test("true when any syllable carries a trailing tone digit", () => {
    expect(hasTones(["ni", "hao3"])).toBe(true);
  });

  test("false when no syllable has a tone digit", () => {
    expect(hasTones(["ni", "hao"])).toBe(false);
  });
});

describe("contrastsFor", () => {
  const contrasts: ContrastsFile = {
    n_final: {
      description: "plain -n final",
      match: { endsWith: ["n"], notEndsWith: ["ng"] },
    },
    ng_final: {
      description: "-ng final",
      match: { endsWith: ["ng"] },
    },
    q_initial: {
      description: "q- initial",
      match: { startsWith: ["q"] },
    },
  };

  test("tags a sample with every pool matched by at least one syllable", () => {
    expect(contrastsFor(["zhen1", "qi4"], contrasts)).toEqual(
      expect.arrayContaining(["n_final", "q_initial"]),
    );
  });

  test("does not tag pools with no matching syllable", () => {
    expect(contrastsFor(["zhen1"], contrasts)).not.toContain("ng_final");
  });

  test("ng ending does not also match plain n_final (notEndsWith guard)", () => {
    expect(contrastsFor(["fang1"], contrasts)).toEqual(["ng_final"]);
  });

  test("tones are stripped before matching", () => {
    expect(contrastsFor(["fang2"], contrasts)).toEqual(["ng_final"]);
  });

  test("no matches yields an empty array", () => {
    expect(contrastsFor(["ba1"], contrasts)).toEqual([]);
  });
});
