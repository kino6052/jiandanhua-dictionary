import type { Token, Tokenizer } from "../types";

export class CharTokenizer implements Tokenizer {
  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    for (const char of text) {
      tokens.push({ text: char, index: i });
      i += char.length;
    }
    return tokens;
  }
}
