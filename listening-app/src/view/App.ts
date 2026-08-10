import { useState } from "preact/hooks";
import html from "./html";
import type { ViewModel } from "../model/viewModel";
import type { ContrastsFile } from "../model/types";
import { flagStore } from "../model/flagStore";
import { SetupScreen } from "./components/SetupScreen";
import { DrillScreen } from "./components/DrillScreen";
import { ReportScreen } from "./components/ReportScreen";
import { FlaggedFilesPanel } from "./components/FlaggedFilesPanel";

interface Props {
  vm: ViewModel;
  contrasts: ContrastsFile;
}

export function App({ vm, contrasts }: Props) {
  const phase = vm.phase.value;
  const [showFlags, setShowFlags] = useState(false);
  const flagCount = flagStore.flaggedFiles.value.size;

  return html`
    <main class="app">
      <div class="app-header">
        <h1>Listening Trainer</h1>
        <button type="button" class="flag-btn" onClick=${() => setShowFlags(true)}>
          🚩 Flagged files (${flagCount})
        </button>
      </div>
      ${phase === "setup" ? html`<${SetupScreen} vm=${vm} contrasts=${contrasts} />` : null}
      ${phase === "drilling" ? html`<${DrillScreen} vm=${vm} />` : null}
      ${phase === "report" ? html`<${ReportScreen} vm=${vm} />` : null}
      ${showFlags ? html`<${FlaggedFilesPanel} onClose=${() => setShowFlags(false)} />` : null}
    </main>
  `;
}
