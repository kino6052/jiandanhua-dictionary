#!/usr/bin/env bun
// Cuts a long-form audio file into per-subtitle-entry mp3 segments using a
// bracketed C:/P:/E: transcript (Chinese hanzi / pinyin-with-tone-numbers /
// English gloss, one bracket per word), and tags each output file with
// structured metadata -- raw pinyin plus a per-word breakdown -- instead of
// encoding everything into the filename. That metadata is meant to be read
// back by the app later (a word-recognition practice mode reads `words`;
// anything reading the sentence-level answer reads `pinyin`), rather than
// parsed from the filename the way build-manifest.ts currently does.
//
// Usage:
//   bun run scripts/segment-transcript.ts --audio source.mp3 --transcript transcript.txt --name lesson-01 [--out-dir ./output]
//
// Transcript block format (blank-line separated, SRT-style numbering/timing):
//   12
//   00:00:12,770 --> 00:00:15,970
//   C: [这] [世上] [有]
//   P: [zhe4] [shi4 shang4] [you3]
//   E: [this] [world on] [have]
//
// Raw, non-bracketed text in the C: line (e.g. an inline proper noun like
// "The Great Blue Hole") is tolerated and simply ignored -- only bracketed
// tokens are extracted, and P:/E: are expected to carry one bracket per C:
// bracket, zipped positionally.
//
// Output: <out-dir>/<name>.<segment>.mp3, one file per transcript block,
// tagged via ffmpeg -metadata with:
//   pinyin = "<raw pinyin string, tone numbers, space-separated>"
//   words  = '[{"hanzi":"...","pinyin":"...","english":"..."}, ...]'
// plus conventional title/album/track tags as a convenience (not required
// by the app, just makes the files sane in any ordinary tag browser).

import { mkdirSync } from "node:fs";

interface Word {
  hanzi: string;
  pinyin: string;
  english: string;
}

interface Segment {
  index: number;
  startSec: number;
  endSec: number;
  words: Word[];
}

interface Args {
  audio: string;
  transcript: string;
  name: string;
  outDir: string;
}

function parseArgs(argv: string[]): Args {
  const args: Partial<Args> = { outDir: "./output" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    switch (arg) {
      case "--audio":
        args.audio = next();
        break;
      case "--transcript":
        args.transcript = next();
        break;
      case "--name":
        args.name = next();
        break;
      case "--out-dir":
        args.outDir = next();
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.audio) throw new Error("--audio is required");
  if (!args.transcript) throw new Error("--transcript is required");
  if (!args.name) throw new Error("--name is required");
  return args as Args;
}

function timecodeToSeconds(tc: string): number {
  const m = tc.trim().match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  if (!m) throw new Error(`Bad timecode: "${tc}"`);
  const [, hh, mm, ss, ms] = m;
  return Number(hh) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms) / 1000;
}

function extractBrackets(line: string): string[] {
  return [...line.matchAll(/\[([^\]]*)\]/g)].map((m) => m[1]!.trim());
}

function parseTranscript(raw: string): Segment[] {
  const blocks = raw
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const segments: Segment[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const index = parseInt(lines[0]!, 10);
    const timeMatch = lines[1]!.match(/(.+?)\s*-->\s*(.+)/);
    if (!timeMatch || Number.isNaN(index)) {
      console.warn(`Skipping unparseable block starting with "${lines[0]}"`);
      continue;
    }
    const startSec = timecodeToSeconds(timeMatch[1]!);
    const endSec = timecodeToSeconds(timeMatch[2]!);

    let hanzi: string[] = [];
    let pinyin: string[] = [];
    let english: string[] = [];

    for (const line of lines.slice(2)) {
      if (line.startsWith("C:")) hanzi = hanzi.concat(extractBrackets(line));
      else if (line.startsWith("P:")) pinyin = pinyin.concat(extractBrackets(line));
      else if (line.startsWith("E:")) english = english.concat(extractBrackets(line));
    }

    const len = Math.max(hanzi.length, pinyin.length, english.length);
    if (hanzi.length !== len || pinyin.length !== len || english.length !== len) {
      console.warn(
        `Segment ${index}: bracket count mismatch (C:${hanzi.length} P:${pinyin.length} E:${english.length}) -- padding shorter line(s) with "".`,
      );
    }

    const words: Word[] = [];
    for (let i = 0; i < len; i++) {
      words.push({ hanzi: hanzi[i] ?? "", pinyin: pinyin[i] ?? "", english: english[i] ?? "" });
    }

    segments.push({ index, startSec, endSec, words });
  }

  return segments;
}

async function cutSegment(audioPath: string, outPath: string, segment: Segment, name: string) {
  const rawPinyin = segment.words.map((w) => w.pinyin).filter(Boolean).join(" ");
  const wordsJson = JSON.stringify(segment.words);
  const title = segment.words.map((w) => w.hanzi).join("");

  const proc = Bun.spawn(
    [
      "ffmpeg",
      "-y",
      "-i", audioPath,
      "-ss", String(segment.startSec),
      "-to", String(segment.endSec),
      "-c:a", "libmp3lame",
      "-q:a", "2",
      "-metadata", `title=${title}`,
      "-metadata", `album=${name}`,
      "-metadata", `track=${segment.index}`,
      "-metadata", `pinyin=${rawPinyin}`,
      "-metadata", `words=${wordsJson}`,
      outPath,
    ],
    { stdout: "ignore", stderr: "pipe" },
  );

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`ffmpeg failed for segment ${segment.index}:\n${stderr}`);
  }
}

async function main() {
  const args = parseArgs(Bun.argv.slice(2));

  const transcriptRaw = await Bun.file(args.transcript).text();
  const segments = parseTranscript(transcriptRaw);

  if (segments.length === 0) {
    throw new Error("No segments parsed from transcript -- check the file format.");
  }

  mkdirSync(args.outDir, { recursive: true });

  console.log(`Parsed ${segments.length} segment(s). Cutting with ffmpeg...`);

  for (const segment of segments) {
    const segmentLabel = String(segment.index).padStart(3, "0");
    const outPath = `${args.outDir}/${args.name}.${segmentLabel}.mp3`;
    await cutSegment(args.audio, outPath, segment, args.name);
    console.log(
      `  ${outPath}  (${segment.startSec.toFixed(2)}s-${segment.endSec.toFixed(2)}s, ${segment.words.length} word(s))`,
    );
  }

  console.log(`Done: ${segments.length} segment(s) written to ${args.outDir}/`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
