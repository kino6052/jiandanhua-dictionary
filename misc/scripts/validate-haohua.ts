import { parse } from "csv-parse/sync";

const RAW_CSV_PATH = "./src/dictionaries/dictionary.raw.csv";
const TP_MAP_PATH = "./scripts/toki-pona-mandarin.json";
const OUT_WORDLIST = "./src/dictionaries/haohua-wordlist.json";

interface RawRow {
  Word: string;
  Pinyin: string;
  isIgnored: string;
}

async function main() {
  const csvText = await Bun.file(RAW_CSV_PATH).text();
  const rows: RawRow[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });
  const wordSet = new Set(rows.map((r) => r.Word?.trim()).filter(Boolean));

  const tpMap = JSON.parse(await Bun.file(TP_MAP_PATH).text());

  const allZh = new Map<string, { pinyin: string; sources: string[] }>();

  for (const entry of tpMap.grammar_particles) {
    if (entry.zh) {
      if (!allZh.has(entry.zh)) allZh.set(entry.zh, { pinyin: "", sources: [] });
      allZh.get(entry.zh)!.sources.push(`tp:${entry.tp}`);
    }
  }
  for (const entry of tpMap.content_words) {
    if (!allZh.has(entry.zh)) allZh.set(entry.zh, { pinyin: entry.pinyin, sources: [] });
    allZh.get(entry.zh)!.sources.push(`tp:${entry.tp}`);
  }
  for (const entry of tpMap.added_grammar_words) {
    if (!allZh.has(entry.zh)) allZh.set(entry.zh, { pinyin: entry.pinyin, sources: [] });
    allZh.get(entry.zh)!.sources.push(`grammar:${entry.gloss}`);
  }

  const wordlist = Array.from(allZh.entries()).map(([zh, info]) => ({
    word: zh,
    pinyin: info.pinyin,
    sources: info.sources,
    inCsv: wordSet.has(zh),
  }));

  const missing = wordlist.filter((w) => !w.inCsv);

  await Bun.write(OUT_WORDLIST, JSON.stringify(wordlist, null, 2));

  console.log(`Unique Mandarin words in 好话: ${wordlist.length}`);
  console.log(`Found in dictionary.raw.csv: ${wordlist.length - missing.length}`);
  console.log(`NOT found in CSV (${missing.length}):`);
  for (const m of missing) {
    console.log(`  ${m.word} (${m.pinyin}) <- ${m.sources.join(", ")}`);
  }
}

main();
