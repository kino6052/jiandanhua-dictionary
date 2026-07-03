import { parse } from "csv-parse/sync";

// New atomic-selection pass (pinyin-based, hanzi-charset constraint dropped).
// Formula: retain if (speaking > 50 AND writing > 70) OR (speaking > 70).
// Ranking score for synonym-cluster resolution: 0.75*speaking + 0.25*writing.

const RAW_CSV_PATH = "./src/dictionaries/dictionary.raw.csv";
const OUT_CANDIDATES = "./src/dictionaries/atomic-candidates.json";
const OUT_FLAGGED_MISSING = "./src/dictionaries/flagged-missing-scores.json";
const OUT_FLAGGED_CHENGYU = "./src/dictionaries/flagged-chengyu.json";

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

interface CandidateEntry {
  word: string;
  pinyin: string;
  pos: string;
  definition: string;
  speaking: number;
  writing: number;
  score: number;
}

function parseScore(raw: string | undefined): number | null {
  const trimmed = raw?.trim();
  if (!trimmed || trimmed === "—" || trimmed === "-") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

// Heuristic: classic chengyu shape is 4 hanzi. Pinyin syllabification is too
// inconsistent in the source data (spaces/hyphens don't reliably mark every
// syllable) to use as a secondary signal, so flag on hanzi length alone and
// let manual review sort out genuine 4-char non-idiom words (e.g. proper nouns).
function looksLikeChengyu(word: string, _pinyin: string): boolean {
  return word.length === 4;
}

async function main() {
  const csvText = await Bun.file(RAW_CSV_PATH).text();
  const rows: RawRow[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`Parsed ${rows.length} rows from CSV`);

  const candidates: CandidateEntry[] = [];
  const flaggedMissing: Array<{
    word: string;
    pinyin: string;
    speaking: string;
    writing: string;
  }> = [];
  const flaggedChengyu: CandidateEntry[] = [];

  let ignoredCount = 0;

  for (const row of rows) {
    const word = row.Word?.trim();
    if (!word) continue;

    if (row.isIgnored?.trim().toUpperCase() === "TRUE") {
      ignoredCount++;
      continue;
    }

    const speakingRaw = row["speaking commonality index"];
    const writingRaw = row["writing commonality index"];
    const speaking = parseScore(speakingRaw);
    const writing = parseScore(writingRaw);
    const pinyin = row.Pinyin?.trim() ?? "";
    const pos = row["Part of speech"]?.trim() ?? "";
    const definition =
      row["Simple Native‑Speaker Definition (in 简单话)"]?.trim() ?? "";

    if (speaking === null || writing === null) {
      flaggedMissing.push({
        word,
        pinyin,
        speaking: speakingRaw?.trim() ?? "",
        writing: writingRaw?.trim() ?? "",
      });
      continue;
    }

    const passes = (speaking > 50 && writing > 70) || speaking > 70;
    if (!passes) continue;

    const entry: CandidateEntry = {
      word,
      pinyin,
      pos,
      definition,
      speaking,
      writing,
      score: 0.75 * speaking + 0.25 * writing,
    };

    if (looksLikeChengyu(word, pinyin)) {
      flaggedChengyu.push(entry);
      continue; // held out of the main candidate pool pending manual confirmation
    }

    candidates.push(entry);
  }

  candidates.sort((a, b) => b.score - a.score);
  flaggedChengyu.sort((a, b) => b.score - a.score);

  await Bun.write(OUT_CANDIDATES, JSON.stringify(candidates, null, 2));
  await Bun.write(OUT_FLAGGED_MISSING, JSON.stringify(flaggedMissing, null, 2));
  await Bun.write(OUT_FLAGGED_CHENGYU, JSON.stringify(flaggedChengyu, null, 2));

  console.log(`\n=== Summary ===`);
  console.log(`Total rows:              ${rows.length}`);
  console.log(`Ignored (isIgnored):     ${ignoredCount}`);
  console.log(`Passed threshold:        ${candidates.length}  -> ${OUT_CANDIDATES}`);
  console.log(`Flagged (4-syll/chengyu-shaped, held out): ${flaggedChengyu.length}  -> ${OUT_FLAGGED_CHENGYU}`);
  console.log(`Flagged (missing score): ${flaggedMissing.length}  -> ${OUT_FLAGGED_MISSING}`);
}

main();
