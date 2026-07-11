import type { Token, Tokenizer } from "../types";
import { cut, cut_for_search, tag } from "jieba-wasm";

export type JiebaMode = "default" | "search";

export class JiebaTokenizer implements Tokenizer {
  private mode: JiebaMode;
  private posTag: boolean;

  constructor(mode: JiebaMode = "default", posTag = true) {
    this.mode = mode;
    this.posTag = posTag;
  }

  tokenize(text: string): Token[] {
    if (this.posTag) {
      return this.tokenizeWithPos(text);
    }

    const words =
      this.mode === "search" ? cut_for_search(text, true) : cut(text, true);
    const tokens: Token[] = [];
    let index = 0;
    for (const word of words) {
      tokens.push({ text: word, index });
      index += word.length;
    }
    return tokens;
  }

  private tokenizeWithPos(text: string): Token[] {
    const tagged = tag(text, true) as Array<{ word: string; tag: string }>;
    const tokens: Token[] = [];
    let index = 0;
    for (const { word, tag: pos } of tagged) {
      tokens.push({ text: word, index, pos });
      index += word.length;
    }
    return tokens;
  }
}
