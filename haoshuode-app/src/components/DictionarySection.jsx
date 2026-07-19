import { AudioButton } from './AudioButton.jsx';
import styles from './DictionarySection.module.css';

export function DictionarySection({ items }) {
  if (!items || items.length === 0) return null;

  const hasCategories = items.some(e => e.category);

  const grouped = {};
  for (const entry of items) {
    const key = hasCategories ? (entry.category || 'Other') : (entry.term[0] || '?').toUpperCase();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  }

  return (
    <div class={styles.dict}>
      {Object.entries(grouped).map(([label, entries]) => (
        <div key={label}>
          <h3 class={styles.letter}>{label}</h3>
          {entries.map((e, i) => (
            <div key={i} class={styles.entry}>
              <span class={styles.term}>
                {e.term}
                <AudioButton pinyin={e.term} audioFile={e.audioFile} ttsText={e.ttsText} />
              </span>
              {e.pos && <span class={styles.pos}>[{e.pos}]</span>}
              <span class={styles.def}> — {e.definition}</span>
              {e.maps && <span class={styles.maps}> (Maps to: <i>{e.maps}</i>)</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
