import styles from './StoryBlock.module.css';

export function StoryBlock({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div class={styles.story}>
      <div class={styles.label}>Story</div>
      {items.map((line, i) => (
        <div key={i} class={styles.line}>
          <div class={styles.pinyin}>{line.pinyin}</div>
          <div class={styles.translation}>({line.translation})</div>
        </div>
      ))}
    </div>
  );
}
