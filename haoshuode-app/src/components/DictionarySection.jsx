import dictionary from '../data/dictionary.json';
import { AudioButton } from './AudioButton.jsx';
import { getUsageLabels } from '../lib/word-usage.js';
import { t } from '../lib/i18n.js';
import styles from './DictionarySection.module.css';

const idByTerm = new Map(Object.entries(dictionary.words).map(([id, w]) => [w.term, id]));

export function DictionarySection({ items, lang }) {
  if (!items || items.length === 0) return null;

  const grouped = {};
  for (const entry of items) {
    const key = (entry.term[0] || '?').toUpperCase();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  }

  return (
    <div class={styles.dict}>
      {Object.entries(grouped).map(([label, entries]) => (
        <div key={label}>
          <h3 class={styles.letter}>{label}</h3>
          {entries.map((e, i) => {
            const id = idByTerm.get(e.term);
            const usage = id ? getUsageLabels(id) : [];
            return (
              <div key={i} class={styles.entry}>
                <span class={styles.term}>
                  {e.term}
                  <AudioButton pinyin={e.term} audioFile={e.audioFile} ttsText={e.ttsText} />
                </span>
                {e.pos && <span class={styles.pos}>[{e.pos}]</span>}
                <span class={styles.def}> — {e.definition}</span>
                {e.maps && <span class={styles.maps}> (Maps to: <i>{e.maps}</i>)</span>}
                {usage.length > 0 ? (
                  <div class={styles.usage}>{t(lang, 'usedIn')} {usage.join(', ')}</div>
                ) : (
                  <div class={styles.usageEmpty}>{t(lang, 'notUsedYet')}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
