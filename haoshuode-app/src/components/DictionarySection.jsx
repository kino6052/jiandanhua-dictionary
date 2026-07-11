import styles from './DictionarySection.module.css';

export function DictionarySection({ items }) {
  if (!items || items.length === 0) return null;

  const grouped = {};
  for (const entry of items) {
    const letter = (entry.term[0] || '?').toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(entry);
  }

  return (
    <div class={styles.dict}>
      {Object.entries(grouped).map(([letter, entries]) => (
        <div key={letter}>
          <h3 class={styles.letter}>{letter}</h3>
          {entries.map((e, i) => (
            <div key={i} class={styles.entry}>
              <span class={styles.term}>{e.term}</span>
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
