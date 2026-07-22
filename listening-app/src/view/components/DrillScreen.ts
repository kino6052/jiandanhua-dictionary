import { useEffect, useRef } from "preact/hooks";
import html from "../html";
import type { ViewModel } from "../../model/viewModel";

interface Props {
  vm: ViewModel;
}

export function DrillScreen({ vm }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const sample = vm.currentSample.value;
  const playCount = vm.playCount.value;
  const speed = vm.speed.value;
  const subPhase = vm.subPhase.value;
  const input = vm.input.value;
  const progress = vm.progress.value;
  const result = vm.currentResult.value;
  const isLast = vm.isLastSample.value;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  if (!sample) return null;

  function handlePlay() {
    vm.play();
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.playbackRate = vm.speed.value;
      void audio.play();
    }
  }

  function handleAnswerKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      vm.verify();
    }
  }

  function handleFeedbackKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      vm.next();
    }
  }

  function syllableClass(earned: number, possible: number): string {
    if (earned >= possible) return "syllable correct";
    if (earned > 0) return "syllable partial";
    return "syllable wrong";
  }

  return html`
    <div class="screen drill-screen" onKeyDown=${subPhase === "feedback" ? handleFeedbackKeyDown : undefined}>
      <p class="progress">Sample ${progress.position} of ${progress.total}</p>

      <audio ref=${audioRef} src=${sample.file} preload="auto"></audio>

      <div class="playback-controls">
        <button type="button" class="primary" onClick=${handlePlay}>
          ▶ Play${playCount > 0 ? ` (${playCount}×)` : ""}
        </button>
        <label class="speed-control">
          <span>Speed</span>
          <select
            value=${String(speed)}
            onChange=${(e: Event) => vm.setSpeed(Number((e.target as HTMLSelectElement).value))}
          >
            <option value="0.75">0.75×</option>
            <option value="1">1×</option>
          </select>
        </label>
      </div>

      ${subPhase === "answering"
        ? html`
            <div class="answer-area">
              <label for="pinyin-input">Type what you heard (pinyin)</label>
              <input
                id="pinyin-input"
                type="text"
                autofocus
                autocomplete="off"
                autocapitalize="off"
                spellcheck=${false}
                value=${input}
                onInput=${(e: Event) => vm.updateInput((e.target as HTMLInputElement).value)}
                onKeyDown=${handleAnswerKeyDown}
              />
              <button type="button" class="primary" onClick=${() => vm.verify()}>Verify</button>
            </div>
          `
        : null}

      ${subPhase === "feedback" && result
        ? html`
            <div class="feedback-area" role="status" aria-live="polite">
              <p>
                Correct: <strong>${sample.transcript.replace(/-/g, " ")}</strong>
              </p>
              <ul class="syllable-results">
                ${result.map(
                  (r, i) => html`
                    <li key=${i} class=${syllableClass(r.earned, r.possible)}>
                      ${r.userSyllable ?? "—"} → ${r.keySyllable}
                    </li>
                  `,
                )}
              </ul>
              <p class="plays-note">Played ${playCount} time${playCount === 1 ? "" : "s"}</p>
              <button type="button" class="primary" onClick=${() => vm.next()}>
                ${isLast ? "Finish session" : "Next"}
              </button>
            </div>
          `
        : null}
    </div>
  `;
}
