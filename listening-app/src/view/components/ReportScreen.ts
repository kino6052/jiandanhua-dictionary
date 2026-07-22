import html from "../html";
import type { ViewModel } from "../../model/viewModel";

interface Props {
  vm: ViewModel;
}

export function ReportScreen({ vm }: Props) {
  const report = vm.report.value;
  if (!report) return null;

  function syllableClass(earned: number, possible: number): string {
    if (earned >= possible) return "syllable correct";
    if (earned > 0) return "syllable partial";
    return "syllable wrong";
  }

  return html`
    <div class="screen report-screen">
      <h2 class="final-pct band-${report.band}">${report.finalPct.toFixed(1)}%</h2>
      <p class="band-message band-${report.band}" role="status">${report.message}</p>

      <p class="score-breakdown">
        Accuracy ${report.accuracyPct.toFixed(1)}%
        ${report.totalExtraPlays > 0
          ? html` − ${report.totalExtraPlays} extra play${report.totalExtraPlays === 1 ? "" : "s"}`
          : null}
      </p>

      <ol class="record-list">
        ${report.records.map(
          (r, i) => html`
            <li key=${i} class="record">
              <p class="record-transcript">
                <strong>${r.sample.transcript.replace(/-/g, " ")}</strong>
                <span class="record-meta">
                  you typed "${r.answer || "(nothing)"}" · played ${r.playCount}×
                </span>
              </p>
              <ul class="syllable-results">
                ${r.syllables.map(
                  (s, j) => html`
                    <li key=${j} class=${syllableClass(s.earned, s.possible)}>
                      ${s.userSyllable ?? "—"} → ${s.keySyllable}
                    </li>
                  `,
                )}
              </ul>
            </li>
          `,
        )}
      </ol>

      <button type="button" class="primary" onClick=${() => vm.reset()}>
        Start a new session
      </button>
    </div>
  `;
}
