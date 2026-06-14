import { parse } from "csv-parse/sync";

const HANZI_PATH = "./hanzi.md";
const RAW_CSV_PATH = "./src/dictionaries/dictionary.raw.csv";
const OUTPUT_PATH = "./src/dictionaries/dictionary.json";

interface RawRow {
  "#": string;
  Word: string;
  Pinyin: string;
  "Part of speech": string;
  "Simple Native‑Speaker Definition (in 简单话)": string;
  isAtomic: string;
  modifyee: string;
  qualifiers: string;
  "comment (native thinking & specificity note)": string;
  "speaking commonality index": string;
  "writing commonality index": string;
  isIgnored: string;
}

interface DictionaryEntry {
  word: string;
  pinyin: string;
  pos: string;
  definition: string;
  isAtomic: boolean;
  speakingIndex: number;
  writingIndex: number;
}

interface DictionaryData {
  atomicWords: string[];
  definitions: Record<string, string>;
  entries: Record<string, DictionaryEntry>;
  validation: {
    totalRows: number;
    atomicCount: number;
    definedCount: number;
    ignoredCount: number;
    invalidDefinitions: Array<{
      word: string;
      definition: string;
      invalidChars: string[];
    }>;
  };
}

async function loadAllowedCharacters(): Promise<Set<string>> {
  const text = await Bun.file(HANZI_PATH).text();
  const chars = new Set<string>();
  for (const ch of text) {
    if (/\p{Script=Han}/u.test(ch)) {
      chars.add(ch);
    }
  }
  return chars;
}

function findInvalidChars(
  definition: string,
  allowed: Set<string>,
): string[] {
  const invalid: string[] = [];
  for (const ch of definition) {
    if (/\p{Script=Han}/u.test(ch) && !allowed.has(ch)) {
      if (!invalid.includes(ch)) invalid.push(ch);
    }
  }
  return invalid;
}

async function main() {
  const allowed = await loadAllowedCharacters();
  console.log(`Loaded ${allowed.size} allowed characters from hanzi.md`);

  const csvText = await Bun.file(RAW_CSV_PATH).text();
  const rows: RawRow[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`Parsed ${rows.length} rows from CSV`);

  const result: DictionaryData = {
    atomicWords: [],
    definitions: {},
    entries: {},
    validation: {
      totalRows: rows.length,
      atomicCount: 0,
      definedCount: 0,
      ignoredCount: 0,
      invalidDefinitions: [],
    },
  };

  for (const row of rows) {
    const word = row.Word?.trim();
    if (!word) continue;

    const isIgnored = row.isIgnored?.trim().toUpperCase() === "TRUE";
    if (isIgnored) {
      result.validation.ignoredCount++;
      continue;
    }

    const isAtomic = row.isAtomic?.trim().toUpperCase() === "TRUE";
    const definition =
      row["Simple Native‑Speaker Definition (in 简单话)"]?.trim() ?? "";
    const pinyin = row.Pinyin?.trim() ?? "";
    const pos = row["Part of speech"]?.trim() ?? "";
    const speakingIndex =
      parseInt(row["speaking commonality index"]?.trim()) || 0;
    const writingIndex =
      parseInt(row["writing commonality index"]?.trim()) || 0;

    const entry: DictionaryEntry = {
      word,
      pinyin,
      pos,
      definition: isAtomic ? "" : definition,
      isAtomic,
      speakingIndex,
      writingIndex,
    };

    result.entries[word] = entry;

    if (isAtomic) {
      result.atomicWords.push(word);
      result.validation.atomicCount++;
    } else {
      result.definitions[word] = definition;
      result.validation.definedCount++;

      const invalidChars = findInvalidChars(definition, allowed);
      if (invalidChars.length > 0) {
        result.validation.invalidDefinitions.push({
          word,
          definition,
          invalidChars,
        });
      }
    }
  }

  await Bun.write(OUTPUT_PATH, JSON.stringify(result, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Atomic words:     ${result.validation.atomicCount}`);
  console.log(`Defined words:    ${result.validation.definedCount}`);
  console.log(`Ignored words:    ${result.validation.ignoredCount}`);
  console.log(`Total entries:    ${Object.keys(result.entries).length}`);
  console.log(
    `\nDefinitions with invalid chars: ${result.validation.invalidDefinitions.length}`,
  );

  if (result.validation.invalidDefinitions.length > 0) {
    console.log(`\n=== Invalid Definitions (first 20) ===`);
    for (const item of result.validation.invalidDefinitions.slice(0, 20)) {
      console.log(
        `  ${item.word}: "${item.definition}" — bad chars: ${item.invalidChars.join(", ")}`,
      );
    }
    if (result.validation.invalidDefinitions.length > 20) {
      console.log(
        `  ... and ${result.validation.invalidDefinitions.length - 20} more`,
      );
    }
  }

  console.log(`\nWritten to ${OUTPUT_PATH}`);
}

main();
