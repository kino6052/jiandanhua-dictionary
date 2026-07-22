#!/usr/bin/env bun
// Scans public/audio/ and writes public/manifest.generated.json.
// Re-run this any time audio files are added, removed, or renamed.

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  contrastsFor,
  difficultyFor,
  hasTones,
  parseFilename,
} from "../src/model/parseFilename";
import type { ContrastsFile, Manifest, Sample } from "../src/model/types";

const AUDIO_DIR = join(import.meta.dir, "..", "public", "audio");
const CONTRASTS_FILE = join(import.meta.dir, "..", "contrasts.json");
const OUTPUT_FILE = join(
  import.meta.dir,
  "..",
  "public",
  "manifest.generated.json",
);

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
    if (!filename.toLowerCase().endsWith(".m4a")) continue;

    const parsed = parseFilename(filename);
    if (!parsed) {
      console.warn(
        `Skipping "${filename}": could not parse a transcript from it.`,
      );
      continue;
    }

    const { transcript, syllables } = parsed;
    samples.push({
      file: `audio/${filename}`,
      transcript,
      syllables,
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
