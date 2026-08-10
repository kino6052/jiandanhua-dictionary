- INPUT: standard SRT‑format subtitles (timestamp lines + Chinese text lines).

- OUTPUT: for each subtitle entry, produce exactly three consecutive lines:
  C: [word1] [word2] ... [wordN]
  P: [pinyin1] [pinyin2] ... [pinyinN]
  E: [english1] [english2] ... [englishN]
  (Keep the original timestamp lines unchanged above each block.)

- SEGMENTATION (C‑line):
  • Split every Chinese sentence into individual words (standard Chinese word segmentation).
  • Put each separate word inside its own square brackets: [ ].
  • Do NOT group phrases – every bracket must contain one single word (e.g., [我们] [的], not [我们的]).
  • Punctuation (。，？、！等), numbers, percentages (%, 米, 公里), and time expressions can be kept as separate unbracketed elements or bracketed according to natural word boundaries (e.g., [三十分钟] or [30] [分钟] – follow standard segmentation).
  • English proper names, acronyms, brand names, and foreign phrases that appear in the Chinese text (e.g., The Great Blue Hole, AOW, Refresher, Padding, Eric Yes) are left OUTSIDE the brackets in the C‑line (they are not bracketed).

- PINYIN (P‑line):
  • Transcribe each bracketed Chinese word into Pinyin with TONE NUMBERS (e.g., ni3, hao3, ma5) – do NOT use tone marks (ā, ǐ, etc.).
  • Place the Pinyin for each bracket in the same order, inside its own square brackets.
  • For foreign/unbracketed words, either omit them in the P‑line or keep them as‑is if relevant – the P‑line should align bracket‑for‑bracket with the C‑line.

- ENGLISH TRANSLATION (E‑line):
  • Provide an English gloss/translation for every bracketed Chinese word, in the same bracket order.
  • Translate only the bracketed items – do not add extra words outside the brackets in the E‑line.
  • For proper nouns / acronyms that appear unbracketed in C, you may repeat them as‑is in the corresponding E‑line positions if needed, or simply align the brackets.

- ALIGNMENT: The number of brackets in C, P, and E must be identical for each subtitle entry. Each bracket set corresponds one‑to‑one across the three lines.

- TONE MARKS: Absolutely NO diacritic tone marks (e.g., nǐ, hǎo). Use numbers only (ni3, hao3).

- GOAL: Help viewers identify Chinese word boundaries for language learning / reading assistance.
