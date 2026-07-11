
## How does translation work

---

### Step 1 – LLM Pre‑simplification (HSK4 level)

Same as before. The LLM may output words not in your dictionary – that’s fine.

**Prompt:**

> Rewrite the following Chinese text into simple Chinese suitable for an HSK4 learner.  
> Use short sentences. Prefer HSK4 vocabulary. Keep all meaning.  
> Do not add explanations.  
>  
> Text: `{original_text}`

Output: `simplified_text`

---

### Step 2 – Tokenization with JiebaTokenizer

Use your existing `JiebaTokenizer` in default mode, with POS tagging optional but recommended for debugging.

```typescript
const tokenizer = new JiebaTokenizer("default", true);
const tokens = tokenizer.tokenize(simplified_text);
```

Each token has `.text` (the word) and `.index` (character offset).

---

### Step 3 – Replace or Collect

Initialize two arrays:

- `outputParts: string[]` – for the final translated text (words and definitions inserted inline).
- `unknownWords: Set<string>` – to collect any token not found in dictionary.

For each token in order:

1. **If `token.text` is in `atomicWords`**  
   → Push `token.text` into `outputParts`.

2. **Else if `token.text` is in `definitions` (non‑atomic)**  
   → Push the definition string into `outputParts`.  
   (The definition may contain spaces or multiple words – that’s fine; treat it as a single chunk.)

3. **Else**  
   → Add `token.text` to `unknownWords`.  
   → Do **not** push anything into `outputParts` for this token.  
   → (Optional: push a placeholder like `[?]` to mark the gap, but you said print at the end, so inline maybe nothing. However, to preserve readability, I suggest pushing `"???"` or the original word in brackets *inline*? Wait, you said “print it at the end of translation” – so no inline insertion. That means the output sentence will have a missing word. That’s semantically broken. Perhaps better to push the original word surrounded by `[[` and `]]` to indicate it’s unknown but still present. Let me propose: push `[[token.text]]` inline *and* also add to unknown list for later reporting. This way the reader sees something is missing, and at the end you list all missing words. I’ll adopt that.)

   **Proposed inline fallback:** push `"【" + token.text + "】"` to mark an untranslated word. Then add it to `unknownWords`.

---

### Step 4 – Combine and Append Missing Word List

After processing all tokens:

- Join `outputParts` with spaces: `let jiandanhuaText = outputParts.join(" ");`
- Normalize spacing (remove spaces before punctuation, etc.).
- If `unknownWords` is not empty, append a newline and then:

```
[Missing dictionary entries: word1, word2, word3]
```

---

## Example Walkthrough

**Input sentence (after LLM step):**  
`我 想 买 一个 电脑`

**Dictionary:**
- Atomic: 我, 想, 一个
- Non‑atomic definition for `买` → `"给钱拿东西"`
- `电脑` not in either dictionary.

**Processing:**
- `我` → atomic → `"我"`
- `想` → atomic → `"想"`
- `买` → definition → `"给钱拿东西"`
- `一个` → atomic → `"一个"`
- `电脑` → unknown → inline `"【电脑】"`, add `电脑` to unknown set.

**Output text:**  
`我 想 给钱拿东西 一个 【电脑】`

**Appended:**  
`[Missing dictionary entries: 电脑]`

---

## Why This Works for Your Goals

- **No cheating with character‑by‑character fallback** – the dictionary must be complete for every word that appears, or it’s explicitly marked as missing.
- **Non‑atomic words are fully expanded** inline, so the reader gets the definition immediately.
- **Unknown words are reported** – this helps you identify gaps in your dictionary or the LLM’s output.
- **The output remains readable** (the unknown word is still shown, just bracketed).

