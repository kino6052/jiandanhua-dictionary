import html from "../html";
import type { ViewModel } from "../../model/viewModel";
import type { ContrastsFile, Difficulty } from "../../model/types";

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "L1", label: "L1 — up to 4 syllables" },
  { value: "L2", label: "L2 — 5–6 syllables" },
  { value: "L3", label: "L3 — 7–9 syllables" },
  { value: "L4", label: "L4 — 10–15 syllables" },
];

interface Props {
  vm: ViewModel;
  contrasts: ContrastsFile;
}

export function SetupScreen({ vm, contrasts }: Props) {
  const mode = vm.mode.value;
  const difficulty = vm.difficulty.value;
  const contrast = vm.contrast.value;
  const count = vm.count.value;
  const available = vm.availableCount.value;

  return html`
    <div class="screen setup-screen">
      <h2>New session</h2>

      <fieldset class="field">
        <legend>Mode</legend>
        <label class="radio-row">
          <input
            type="radio"
            name="mode"
            checked=${mode === "sounds"}
            onChange=${() => vm.setMode("sounds")}
          />
          Sounds only
        </label>
        <label class="radio-row">
          <input
            type="radio"
            name="mode"
            checked=${mode === "sounds_tones"}
            onChange=${() => vm.setMode("sounds_tones")}
          />
          Sounds + tones
        </label>
      </fieldset>

      <label class="field">
        <span>Difficulty</span>
        <select
          value=${difficulty}
          onChange=${(e: Event) =>
            vm.setDifficulty((e.target as HTMLSelectElement).value as Difficulty)}
        >
          ${DIFFICULTIES.map((d) => html`<option value=${d.value}>${d.label}</option>`)}
        </select>
      </label>

      <label class="field">
        <span>Focus</span>
        <select
          value=${contrast}
          onChange=${(e: Event) => vm.setContrast((e.target as HTMLSelectElement).value)}
        >
          <option value="all">All sounds</option>
          ${Object.entries(contrasts).map(
            ([name, def]) => html`<option value=${name}>${name} — ${def.description}</option>`,
          )}
        </select>
      </label>

      <label class="field">
        <span>Samples per session</span>
        <input
          type="number"
          min="1"
          value=${count}
          onInput=${(e: Event) => vm.setCount(Number((e.target as HTMLInputElement).value))}
        />
      </label>

      <p class="hint" aria-live="polite">
        ${available} sample${available === 1 ? "" : "s"} available with this filter.
      </p>

      <button
        type="button"
        class="primary"
        disabled=${available === 0}
        onClick=${() => vm.startSession()}
      >
        Start session
      </button>
    </div>
  `;
}
