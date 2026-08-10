import html from "../html";
import { flagStore } from "../../model/flagStore";

interface Props {
  onClose: () => void;
}

export function FlaggedFilesPanel({ onClose }: Props) {
  const files = [...flagStore.flaggedFiles.value].sort();

  return html`
    <div class="modal-backdrop" onClick=${onClose}>
      <div class="modal" onClick=${(e: Event) => e.stopPropagation()} role="dialog" aria-label="Flagged files">
        <div class="modal-header">
          <h2>Flagged files (${files.length})</h2>
          <button type="button" class="modal-close" onClick=${onClose} aria-label="Close">✕</button>
        </div>

        ${files.length === 0
          ? html`<p class="hint">No files flagged yet. Flag a bad clip from the drill screen.</p>`
          : html`
              <ul class="flag-list">
                ${files.map(
                  (fileName) => html`
                    <li key=${fileName} class="flag-list-item">
                      <span class="file-name">${fileName}</span>
                      <button type="button" class="flag-btn" onClick=${() => flagStore.unflag(fileName)}>
                        Unflag
                      </button>
                    </li>
                  `,
                )}
              </ul>
              <p class="hint">
                Delete these files from <code>public/audio/</code> and re-run
                <code>bun run build:manifest</code> to remove them for good.
              </p>
            `}
      </div>
    </div>
  `;
}
