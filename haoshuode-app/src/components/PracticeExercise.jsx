import { useState } from 'preact/hooks';
import styles from './PracticeExercise.module.css';

export function PracticeExercise({ questions, answers }) {
  if (!questions || questions.length === 0) return null;
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div class={styles.wrap}>
      <div class={styles.header}>
        <span>✏️ Practice Exercise</span>
        {answers && answers.length > 0 && (
          <button class={styles.toggle} onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? 'Hide answers' : 'Show answers'}
          </button>
        )}
      </div>
      {questions.map((q, i) => (
        <div key={i} class={styles.item}>
          <div class={styles.question}><b>{i + 1}.</b> {q}</div>
          {showAnswers && answers && answers[i] && (
            <div class={styles.answer}>→ {answers[i]}</div>
          )}
        </div>
      ))}
    </div>
  );
}
