import { t } from '../lib/i18n.js';
import styles from './MissingTranslationBanner.module.css';

export function MissingTranslationBanner({ blocks, lang }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div class={styles.wrap} role="status">
      {t(lang, 'missingContent')} {blocks.map(i => i + 1).join(', ')}
    </div>
  );
}
