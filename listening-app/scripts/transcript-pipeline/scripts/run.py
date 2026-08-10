#!/usr/bin/env python3
"""
Pipeline runner: pairs up .mp3/.srt files in input/ by matching filename
(same name, different extension), converts each .srt to the C:/P:/E:
transcript format, then cuts per-word audio segments with segment-transcript.ts.

Usage:
    python3 scripts/run.py [--input DIR] [--output DIR]

Defaults to ../input and ../output relative to this script.
"""
import argparse
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default=str(ROOT / "input"))
    ap.add_argument("--output", default=str(ROOT / "output"))
    args = ap.parse_args()

    in_dir = Path(args.input)
    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    if shutil.which("bun") is None:
        sys.exit("bun is not installed/on PATH -- see README.md for setup.")
    if shutil.which("ffmpeg") is None:
        sys.exit("ffmpeg is not installed/on PATH -- see README.md for setup.")

    srt_files = sorted(in_dir.glob("*.srt"))
    if not srt_files:
        sys.exit(f"No .srt files found in {in_dir}")

    ok, skipped = 0, 0
    for srt in srt_files:
        stem = srt.stem
        mp3 = in_dir / f"{stem}.mp3"
        if not mp3.exists():
            print(f"SKIP {stem}: no matching {stem}.mp3 next to {srt.name}")
            skipped += 1
            continue

        pair_out = out_dir / stem
        pair_out.mkdir(parents=True, exist_ok=True)
        transcript_path = pair_out / "transcript.txt"

        print(f"\n== {stem} ==")
        print("  1/2 building C/P/E transcript...")
        subprocess.run(
            [sys.executable, str(HERE / "build_transcript.py"), str(srt), str(transcript_path)],
            check=True,
        )

        print("  2/2 cutting audio segments...")
        subprocess.run(
            [
                "bun", "run", str(HERE / "segment-transcript.ts"),
                "--audio", str(mp3),
                "--transcript", str(transcript_path),
                "--name", stem,
                "--out-dir", str(pair_out / "segments"),
            ],
            check=True,
        )
        print(f"  done -> {pair_out / 'segments'}/")
        ok += 1

    print(f"\n{ok} pair(s) processed, {skipped} skipped.")


if __name__ == "__main__":
    main()
