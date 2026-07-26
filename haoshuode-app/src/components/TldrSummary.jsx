import { useState } from 'preact/hooks';
import { t } from '../lib/i18n.js';
import styles from './TldrSummary.module.css';

export function TldrSummary({ items, lang }) {
  const [index, setIndex] = useState(0);
  if (!items || items.length === 0) return null;

  const current = Math.min(index, items.length - 1);
  const item = items[current];
  const overview = items.find((i) => i.isOverview);

  function prev() {
    setIndex((i) => (Math.min(i, items.length - 1) - 1 + items.length) % items.length);
  }
  function next() {
    setIndex((i) => (Math.min(i, items.length - 1) + 1) % items.length);
  }

  return (
    <div class={styles.wrap}>
      {/* Interactive, on-screen only: steps through every tldr/necessity entry. */}
      <div class={styles.screenOnly}>
        <div class={styles.header}>
          <span class={styles.title}>{t(lang, 'tldrTitle')}</span>
          <span class={styles.counter}>{current + 1} / {items.length}</span>
        </div>
        <div class={styles.card}>
          <button
            type="button"
            class={styles.navBtn}
            onClick={prev}
            disabled={items.length < 2}
            aria-label="Previous"
          >
            ‹
          </button>
          <div class={styles.content}>
            {item.isOverview && <div class={styles.overviewLabel}>{t(lang, 'tldrOverview')}</div>}
            {item.tldr && <div class={styles.tldr}>{item.tldr}</div>}
            {item.necessity && (
              <div class={styles.necessity}>
                <span class={styles.necessityLabel}>{t(lang, 'tldrWhy')}</span> {item.necessity}
              </div>
            )}
          </div>
          <button
            type="button"
            class={styles.navBtn}
            onClick={next}
            disabled={items.length < 2}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      {/* Print only: just the whole-chapter overview, no per-paragraph entries or controls. */}
      {overview && (
        <div class={styles.printOnly}>
          <div class={styles.title}>{t(lang, 'tldrTitle')}</div>
          <div class={styles.tldr}>{overview.tldr}</div>
        </div>
      )}
    </div>
  );
}
