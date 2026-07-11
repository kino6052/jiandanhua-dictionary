export interface Token {
  text: string;
  index: number;
  pos?: string;
}

export interface Tokenizer {
  tokenize(text: string): Token[];
}
