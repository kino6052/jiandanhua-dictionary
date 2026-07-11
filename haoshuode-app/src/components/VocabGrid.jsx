import styles from './VocabGrid.module.css';

export function VocabGrid({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div class={styles.label}>Vocabulary</div>
      <div class={styles.grid}>
        {items.map((v, i) => (
          <div key={i} class={styles.card}>
            <div class={styles.pinyin}>{v.pinyin}</div>
            <div class={styles.def}>{v.definition}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
