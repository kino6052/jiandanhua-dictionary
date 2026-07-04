import { parse } from "csv-parse/sync";

// Second pass: tighten the pool to score >= 75 (0.75*speaking + 0.25*writing),
// but force-keep any word that matches a Basic English core concept even if
// it falls below 75 -- Basic English coverage is a hard completeness check,
// not a translation target (see basic-english-mandarin.json).

const RAW_CSV_PATH = "./src/dictionaries/dictionary.raw.csv";
const BASIC_ENGLISH_PATH = "./scripts/basic-english-mandarin.json";
const OUT_FINAL = "./src/dictionaries/atomic-final.json";
const OUT_GAPS = "./src/dictionaries/basic-english-gaps.json";

interface RawRow {
  Word: string;
  Pinyin: string;
  "Part of speech": string;
  "Simple Native‑Speaker Definition (in 简单话)": string;
  "speaking commonality index": string;
  "writing commonality index": string;
  isIgnored: string;
}

interface Entry {
  word: string;
  pinyin: string;
  pos: string;
  definition: string;
  speaking: number;
  writing: number;
  score: number;
  forcedByBasicEnglish: boolean;
  basicEnglishMatches?: string[];
}

function parseScore(raw: string | undefined): number | null {
  const trimmed = raw?.trim();
  if (!trimmed || trimmed === "—" || trimmed === "-") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

async function main() {
  const csvText = await Bun.file(RAW_CSV_PATH).text();
  const rows: RawRow[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const basicEnglish: Record<string, Array<{ en: string; senses: Array<{ pos: string; zh: string }> }>> =
    JSON.parse(await Bun.file(BASIC_ENGLISH_PATH).text());

  // Map: Mandarin word -> list of English concepts it satisfies
  const zhToEnglish = new Map<string, string[]>();
  for (const [, list] of Object.entries(basicEnglish)) {
    for (const item of list) {
      for (const sense of item.senses) {
        const zh = sense.zh.trim();
        if (!zhToEnglish.has(zh)) zhToEnglish.set(zh, []);
        zhToEnglish.get(zh)!.push(`${item.en} (${sense.pos})`);
      }
    }
  }

  const rowByWord = new Map<string, RawRow>();
  for (const row of rows) {
    const word = row.Word?.trim();
    if (word) rowByWord.set(word, row);
  }

  const finalEntries: Entry[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const word = row.Word?.trim();
    if (!word) continue;
    if (row.isIgnored?.trim().toUpperCase() === "TRUE") continue;

    const speaking = parseScore(row["speaking commonality index"]);
    const writing = parseScore(row["writing commonality index"]);
    if (speaking === null || writing === null) continue; // already flagged separately

    const score = 0.75 * speaking + 0.25 * writing;
    const passesPareto = (speaking > 50 && writing > 70) || speaking > 70;
    const forcedByBasicEnglish = zhToEnglish.has(word);

    const keep = (passesPareto && score >= 75) || forcedByBasicEnglish;
    if (!keep) continue;

    seen.add(word);
    finalEntries.push({
      word,
      pinyin: row.Pinyin?.trim() ?? "",
      pos: row["Part of speech"]?.trim() ?? "",
      definition: row["Simple Native‑Speaker Definition (in 简单话)"]?.trim() ?? "",
      speaking,
      writing,
      score,
      forcedByBasicEnglish,
      ...(forcedByBasicEnglish ? { basicEnglishMatches: zhToEnglish.get(word) } : {}),
    });
  }

  finalEntries.sort((a, b) => b.score - a.score);

  // Find Basic English concepts whose Mandarin word never made it into the CSV at all
  const gaps: Array<{ zh: string; english: string[] }> = [];
  for (const [zh, english] of zhToEnglish.entries()) {
    if (!rowByWord.has(zh)) {
      gaps.push({ zh, english });
    }
  }

  await Bun.write(OUT_FINAL, JSON.stringify(finalEntries, null, 2));
  await Bun.write(OUT_GAPS, JSON.stringify(gaps, null, 2));

  const forcedCount = finalEntries.filter((e) => e.forcedByBasicEnglish).length;
  const forcedBelowThreshold = finalEntries.filter(
    (e) => e.forcedByBasicEnglish && e.score < 75,
  ).length;

  console.log(`\n=== Summary ===`);
  console.log(`Final atomic candidates:      ${finalEntries.length}  -> ${OUT_FINAL}`);
  console.log(`  of which forced by Basic English: ${forcedCount}`);
  console.log(`  of which forced AND below 75 score: ${forcedBelowThreshold}`);
  console.log(`Basic English concepts with no matching CSV word (gaps): ${gaps.length}  -> ${OUT_GAPS}`);
}

main();
