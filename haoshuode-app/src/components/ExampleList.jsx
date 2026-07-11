import styles from './ExampleList.module.css';

export function ExampleList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div class={styles.label}>Examples</div>
      <div class={styles.list}>
        {items.map((ex, i) => (
          <div key={i} class={styles.card}>
            <span class={styles.pinyin}>{ex.pinyin}</span>
            <span class={styles.translation}> — {ex.translation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
