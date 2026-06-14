import type { Token, Tokenizer } from "../types";

export class MaxMatchTokenizer implements Tokenizer {
  private vocabulary: Set<string>;
  private maxLen: number;

  constructor(vocabulary: Iterable<string>) {
    this.vocabulary = new Set(vocabulary);
    this.maxLen = 0;
    for (const word of this.vocabulary) {
      if (word.length > this.maxLen) this.maxLen = word.length;
    }
  }

  tokenize(text: string): Token[] {
    const chars = [...text];
    const tokens: Token[] = [];
    let charIdx = 0;
    let byteIdx = 0;

    while (charIdx < chars.length) {
      let matched = false;
      const remaining = chars.length - charIdx;
      const windowSize = Math.min(this.maxLen, remaining);

      for (let len = windowSize; len >= 1; len--) {
        const candidate = chars.slice(charIdx, charIdx + len).join("");
        if (this.vocabulary.has(candidate)) {
          tokens.push({ text: candidate, index: byteIdx });
          byteIdx += candidate.length;
          charIdx += len;
          matched = true;
          break;
        }
      }

      if (!matched) {
        const ch = chars[charIdx];
        tokens.push({ text: ch, index: byteIdx });
        byteIdx += ch.length;
        charIdx++;
      }
    }

    return tokens;
  }
}
