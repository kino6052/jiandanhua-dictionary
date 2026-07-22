import html from "./html";
import type { ViewModel } from "../model/viewModel";
import type { ContrastsFile } from "../model/types";
import { SetupScreen } from "./components/SetupScreen";
import { DrillScreen } from "./components/DrillScreen";
import { ReportScreen } from "./components/ReportScreen";

interface Props {
  vm: ViewModel;
  contrasts: ContrastsFile;
}

export function App({ vm, contrasts }: Props) {
  const phase = vm.phase.value;

  return html`
    <main class="app">
      <h1>Listening Trainer</h1>
      ${phase === "setup" ? html`<${SetupScreen} vm=${vm} contrasts=${contrasts} />` : null}
      ${phase === "drilling" ? html`<${DrillScreen} vm=${vm} />` : null}
      ${phase === "report" ? html`<${ReportScreen} vm=${vm} />` : null}
    </main>
  `;
}
