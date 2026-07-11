import { t } from '../lib/i18n.js';
import styles from './GrammarBlock.module.css';

export function GrammarBlock({ html, lang }) {
  if (!html) return null;
  return (
    <div>
      <div class={styles.label}>{t(lang, 'grammar')}</div>
      <div class={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
