import styles from './GrammarBlock.module.css';

export function GrammarBlock({ html }) {
  if (!html) return null;
  return (
    <div>
      <div class={styles.label}>Grammar</div>
      <div class={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
