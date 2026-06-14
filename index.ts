import {
  JiebaTokenizer,
  SegmenterTokenizer,
  CharTokenizer,
  MaxMatchTokenizer,
} from "./src";
import type { Tokenizer } from "./src";

import fs from 'fs';

const text = `关于新汉语水平考试（HSK 3.0）的介绍

汉语水平考试（HSK）最近有了很大的变化。新版本叫HSK 3.0，从2025年底开始使用。这个新考试能更好地检查学生的真实汉语能力。`;

const tokenizer = new JiebaTokenizer("default", true);
const tokens = tokenizer.tokenize(text);

fs.writeFileSync('output.json', JSON.stringify(tokens));
