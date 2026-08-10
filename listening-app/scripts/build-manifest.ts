#!/usr/bin/env bun
// Scans public/audio/ and writes public/manifest.generated.json.
// Re-run this any time audio files are added, removed, or re-tagged.
//
// Samples are no longer parsed from filenames. The filename is now just an
// opaque asset identifier (and the key the UI's "flag this file" feature
// persists against) -- the actual transcript data (raw pinyin, word-level
// breakdown) is read from each mp3's own ID3 metadata, written there by
// scripts/segment-transcript.ts as custom TXXX:pinyin / TXXX:words frames.
// A file with no TXXX:pinyin tag is skipped (not a fallback case): every
// sample this app can select for a session must be traceable back to a real
// transcript, not a filename someone happened to type correctly.

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { parseFile } from "music-metadata";
import { contrastsFor, difficultyFor, hasTones } from "../src/model/parseFilename";
import type { ContrastsFile, Manifest, Sample } from "../src/model/types";

const AUDIO_DIR = join(import.meta.dir, "..", "public", "audio");
const CONTRASTS_FILE = join(import.meta.dir, "..", "contrasts.json");
const OUTPUT_FILE = join(
  import.meta.dir,
  "..",
  "public",
  "manifest.generated.json",
);
const AUDIO_EXTENSIONS = [".m4a", ".mp3"];

interface WordTag {
  hanzi?: string;
  pinyin: string;
  english?: string;
}

/** Reads a custom TXXX:<name> frame's value from any native tag group. */
function readCustomTag(native: Record<string, { id: string; value: unknown }[]>, name: string): string | undefined {
  const wanted = `TXXX:${name}`;
  for (const group of Object.values(native)) {
    const entry = group.find((tag) => tag.id === wanted);
    if (entry !== undefined) return String(entry.value);
  }
  return undefined;
}

async function main() {
  const contrasts: ContrastsFile = JSON.parse(
    await Bun.file(CONTRASTS_FILE).text(),
  );

  let filenames: string[];
  try {
    filenames = await readdir(AUDIO_DIR);
  } catch {
    filenames = [];
  }

  const samples: Sample[] = [];
  for (const filename of filenames.sort()) {
    const lower = filename.toLowerCase();
    if (!AUDIO_EXTENSIONS.some((ext) => lower.endsWith(ext))) continue;

    const fullPath = join(AUDIO_DIR, filename);
    const meta = await parseFile(fullPath);
    const pinyinTag = readCustomTag(meta.native, "pinyin");

    if (!pinyinTag) {
      console.warn(`Skipping "${filename}": no TXXX:pinyin metadata tag found.`);
      continue;
    }

    const syllables = pinyinTag.trim().split(/\s+/).filter(Boolean);
    if (syllables.length === 0) {
      console.warn(`Skipping "${filename}": TXXX:pinyin tag is empty.`);
      continue;
    }

    const wordsTag = readCustomTag(meta.native, "words");
    let words: string[];
    if (wordsTag) {
      try {
        const parsed: WordTag[] = JSON.parse(wordsTag);
        words = parsed.map((w) => w.pinyin).filter(Boolean);
        if (words.length === 0) throw new Error("empty words array");
      } catch (err) {
        console.warn(
          `"${filename}": TXXX:words tag is present but unparseable (${(err as Error).message}); falling back to one word per syllable.`,
        );
        words = syllables;
      }
    } else {
      words = syllables;
    }

    samples.push({
      file: `audio/${filename}`,
      fileName: filename,
      transcript: syllables.join("-"),
      syllables,
      words,
      syllableCount: syllables.length,
      difficulty: difficultyFor(syllables.length),
      hasTones: hasTones(syllables),
      contrasts: contrastsFor(syllables, contrasts),
    });
  }

  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    samples,
  };

  await Bun.write(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Wrote ${samples.length} sample(s) to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
