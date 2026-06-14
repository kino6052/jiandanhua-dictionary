import type { Token, Tokenizer } from "../types";

export class SegmenterTokenizer implements Tokenizer {
  private segmenter: Intl.Segmenter;

  constructor(granularity: "word" | "grapheme" = "word") {
    this.segmenter = new Intl.Segmenter("zh-CN", { granularity });
  }

  tokenize(text: string): Token[] {
    const segments = this.segmenter.segment(text);
    const tokens: Token[] = [];
    for (const { segment, index } of segments) {
      tokens.push({ text: segment, index });
    }
    return tokens;
  }
}
