import { render } from "preact";
import html from "./view/html";
import { App } from "./view/App";
import { ViewModel } from "./model/viewModel";
import type { Manifest } from "./model/types";
import contrasts from "../contrasts.json";

async function main() {
  const root = document.getElementById("app");
  if (!root) throw new Error("Missing #app root element");

  const manifestUrl = `${import.meta.env.BASE_URL}manifest.generated.json`;
  const res = await fetch(manifestUrl);
  if (!res.ok) {
    throw new Error(`Failed to load ${manifestUrl}: ${res.status} ${res.statusText}`);
  }
  const manifest: Manifest = await res.json();

  const vm = new ViewModel(manifest.samples);

  render(html`<${App} vm=${vm} contrasts=${contrasts} />`, root);
}

main().catch((err) => {
  console.error(err);
  const root = document.getElementById("app");
  if (root) {
    root.textContent = `Failed to start: ${err instanceof Error ? err.message : String(err)}`;
  }
});
