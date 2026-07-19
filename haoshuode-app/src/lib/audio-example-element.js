import { playAudio } from './audio.js';

class AudioExampleElement extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const text = this.textContent.trim();
    const file = this.getAttribute('file') || undefined;
    const zh = this.getAttribute('zh') || undefined;

    this.style.cssText = 'cursor:pointer;border-bottom:1px dashed var(--text-muted);';

    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Play ${text}`);
    btn.style.cssText = `
      display:inline-flex;align-items:center;justify-content:center;
      background:none;border:none;padding:2px;margin-left:3px;
      cursor:pointer;color:var(--text-muted);vertical-align:middle;
    `;
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

    btn.addEventListener('mouseenter', () => { btn.style.color = 'var(--accent)'; });
    btn.addEventListener('mouseleave', () => { btn.style.color = 'var(--text-muted)'; });

    const play = (e) => { e.stopPropagation(); playAudio(text, file, zh); };
    btn.addEventListener('click', play);
    this.addEventListener('click', play);

    this.appendChild(btn);
  }
}

if (!customElements.get('audio-example')) {
  customElements.define('audio-example', AudioExampleElement);
}
