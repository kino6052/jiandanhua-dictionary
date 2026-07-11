import styles from './ExampleList.module.css';

export function ProverbList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div class={styles.list}>
      {items.map((p, i) => (
        <div key={i} class={styles.card}>
          <span class={styles.pinyin}>{p.pinyin}</span>
          <span class={styles.translation}> — {p.translation}</span>
        </div>
      ))}
    </div>
  );
}
