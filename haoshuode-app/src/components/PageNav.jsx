import { t } from '../lib/i18n.js';
import styles from './PageNav.module.css';

export function PageNav({ page, total, prev, next, lang }) {
  return (
    <div class={styles.nav}>
      <button class={styles.btn} onClick={prev} disabled={page === 0} aria-label="Previous page">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class={styles.btnLabel}>{t(lang, 'back')}</span>
      </button>
      <span class={styles.counter}>{page + 1} / {total}</span>
      <button class={styles.btn} onClick={next} disabled={page === total - 1} aria-label="Next page">
        <span class={styles.btnLabel}>{t(lang, 'next')}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
