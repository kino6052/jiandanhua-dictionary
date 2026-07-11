// Verifies each 好话 example sentence in HAOHUA.md is built only from the
// 124-word vocabulary (greedy longest-match tokenization) and reports any
// leftover characters that don't belong to any allowed word.

const tpMap = await Bun.file("./scripts/toki-pona-mandarin.json").json();

const vocab = new Set<string>();
for (const e of tpMap.grammar_particles) if (e.zh) vocab.add(e.zh);
for (const e of tpMap.content_words) vocab.add(e.zh);
for (const e of tpMap.added_grammar_words) vocab.add(e.zh);

// words added after the doc's initial draft (§6 provenance note)
vocab.add("没");
vocab.add("个");

const words = Array.from(vocab).sort((a, b) => b.length - a.length);
const maxLen = Math.max(...words.map((w) => w.length));

const sentences = [
  "我是人。",
  "你好吗？",
  "我要水，我也要米饭。",
  "那个动物很大，这个很小。",
  "我看一个红色的鸟。",
  "他要去房子，但是他没有钱。",
  "我很热，你也很热吗？",
  "你的名字是什么？",
  "这个和那个一样，不同的是颜色。",
  "我可以用工具做东西。",
  '那个动物叫"汪汪"。',
  "我做了，但是坏了。",
  "我要睡觉，因为很热。",
];

const punctuation = new Set(["，", "。", "？", "、"]);
const quoteChars = new Set(['"', "“", "”"]);

function tokenize(sentence: string): { tokens: string[]; unmatched: string[] } {
  const tokens: string[] = [];
  const unmatched: string[] = [];
  let i = 0;
  while (i < sentence.length) {
    const ch = sentence[i];
    // quoted onomatopoeia block: skip verbatim (Quote Partition), not checked against vocab
    if (quoteChars.has(ch)) {
      let end = -1;
      for (let j = i + 1; j < sentence.length; j++) {
        if (quoteChars.has(sentence[j])) {
          end = j;
          break;
        }
      }
      i = end === -1 ? sentence.length : end + 1;
      continue;
    }
    if (punctuation.has(ch)) {
      i++;
      continue;
    }
    let matched = false;
    for (let len = Math.min(maxLen, sentence.length - i); len >= 1; len--) {
      const candidate = sentence.slice(i, i + len);
      if (vocab.has(candidate)) {
        tokens.push(candidate);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      unmatched.push(ch);
      i++;
    }
  }
  return { tokens, unmatched };
}

console.log(`Vocabulary size (incl. 没/个): ${vocab.size}\n`);

let allOk = true;
for (const s of sentences) {
  const { tokens, unmatched } = tokenize(s);
  const status = unmatched.length === 0 ? "OK" : "FAIL";
  if (unmatched.length > 0) allOk = false;
  console.log(`[${status}] ${s}`);
  console.log(`   tokens: ${tokens.join(" / ")}`);
  if (unmatched.length > 0) console.log(`   NOT IN VOCAB: ${unmatched.join(", ")}`);
}

console.log(`\n${allOk ? "All sentences use only vocabulary words." : "Some sentences use out-of-vocabulary characters."}`);
