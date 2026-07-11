import styles from './Section.module.css';

const BADGE_THEMES = {
  intro: { bg: 'var(--amber-bg)', icon: '❓', color: 'var(--text-handwritten)' },
  lesson: { bg: null, icon: null, color: null },
  proverbs: { bg: 'var(--green-bg)', icon: '🌿', color: 'var(--green)' },
  dictionary: { bg: 'var(--blue-bg)', icon: '📖', color: 'var(--blue)' },
  appendix: { bg: 'var(--blue-bg)', icon: '🔤', color: 'var(--blue)' },
};

export function Section({ data, children }) {
  const { meta } = data;
  const theme = BADGE_THEMES[meta.type] || BADGE_THEMES.intro;
  const isLesson = meta.type === 'lesson';

  return (
    <div class={styles.section}>
      {isLesson ? (
        <div class={styles.lessonHeader}>
          <div class={styles.lessonNum}>{meta.lessonNumber}</div>
          <h2 class={styles.lessonTitle}>{meta.title}</h2>
        </div>
      ) : (
        <>
          <div class={styles.badgeRow}>
            <div class={styles.badge} style={{ background: theme.bg }}>
              {theme.icon}
            </div>
            <div class={styles.badgeLabel} style={{ color: theme.color }}>
              {meta.type === 'intro' ? 'Introduction' : meta.title}
            </div>
          </div>
          <h2 class={styles.heading}>{meta.title}</h2>
        </>
      )}
      {children}
    </div>
  );
}
