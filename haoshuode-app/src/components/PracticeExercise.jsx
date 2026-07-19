import { useState } from 'preact/hooks';
import { t } from '../lib/i18n.js';
import { AudioButton } from './AudioButton.jsx';
import styles from './PracticeExercise.module.css';

export function PracticeExercise({ questions, answers, lang }) {
  if (!questions || questions.length === 0) return null;
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div class={styles.wrap}>
      <div class={styles.header}>
        <span>✏️ {t(lang, 'practice')}</span>
        {answers && answers.length > 0 && (
          <button class={styles.toggle} onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? t(lang, 'hideAnswers') : t(lang, 'showAnswers')}
          </button>
        )}
      </div>
      {questions.map((q, i) => (
        <div key={i} class={styles.item}>
          <div class={styles.question}><b>{i + 1}.</b> {q}</div>
          {showAnswers && answers && answers[i] && (
            <div class={styles.answer}>
              → {answers[i]}
              <AudioButton pinyin={answers[i]} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
