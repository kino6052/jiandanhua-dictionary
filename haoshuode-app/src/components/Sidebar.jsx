import { ProgressBar } from './ProgressBar.jsx';
import styles from './Sidebar.module.css';

export function Sidebar({ sections, completed }) {
  const total = sections.length;
  const done = sections.filter(s => completed.has(s.id)).length;

  const intros = sections.filter(s => s.type === 'intro');
  const lessons = sections.filter(s => s.type === 'lesson');
  const others = sections.filter(s => !['intro', 'lesson'].includes(s.type));

  return (
    <nav class={styles.sidebar}>
      <div class={styles.logo}>
        <div class={styles.logoIcon}>
          <span>好</span>
        </div>
        <div>
          <div class={styles.logoTitle}>Hǎo-shuō-de</div>
          <div class={styles.logoSub}>the minimal book</div>
        </div>
      </div>

      <ProgressBar done={done} total={total} />

      {intros.length > 0 && (
        <TocGroup label="Introduction" items={intros} completed={completed} />
      )}
      {lessons.length > 0 && (
        <TocGroup label="Lessons" items={lessons} completed={completed} />
      )}
      {others.length > 0 && (
        <TocGroup label="Reference" items={others} completed={completed} />
      )}

      <div class={styles.tagline}>
        120 words.<br />Real Mandarin.<br />No overwhelm. ✌
      </div>
    </nav>
  );
}

function TocGroup({ label, items, completed }) {
  return (
    <div class={styles.tocGroup}>
      <div class={styles.tocLabel}>{label}</div>
      {items.map(item => {
        const done = completed.has(item.id);
        return (
          <a
            key={item.id}
            href={'#' + item.id}
            class={`${styles.tocItem} ${done ? styles.tocDone : ''}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span class={`${styles.dot} ${done ? styles.dotDone : ''}`}>
              {done ? '✓' : ''}
            </span>
            {item.tocLabel}
          </a>
        );
      })}
    </div>
  );
}
