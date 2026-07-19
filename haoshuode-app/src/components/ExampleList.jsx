import { AudioButton } from './AudioButton.jsx';
import styles from './ExampleList.module.css';

export function ExampleList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div class={styles.label}>Examples</div>
      <div class={styles.list}>
        {items.map((ex, i) => (
          <div key={i} class={styles.card}>
            <span class={styles.pinyin}>
              {ex.pinyin}
              <AudioButton pinyin={ex.pinyin} audioFile={ex.audioFile} ttsText={ex.ttsText} />
            </span>
            <span class={styles.translation}> — {ex.translation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
