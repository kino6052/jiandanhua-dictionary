import styles from './Section.module.css';

const BADGE_THEMES = {
  intro: { bg: '#FFD9A0', icon: '❓', color: '#B7885B', label: 'Introduction' },
  lesson: { bg: null, icon: null, color: null, label: 'Lesson' },
  proverbs: { bg: '#CDEBD8', icon: '🌿', color: '#4E9A6D', label: 'Proverbs' },
  dictionary: { bg: '#D8E3FA', icon: '📖', color: '#5B7FD1', label: 'Dictionary' },
  appendix: { bg: '#D8E3FA', icon: '🔤', color: '#5B7FD1', label: 'Appendix' },
};

export function Section({ data, sectionRef, children }) {
  const { meta } = data;
  const theme = BADGE_THEMES[meta.type] || BADGE_THEMES.intro;
  const isLesson = meta.type === 'lesson';

  return (
    <section id={meta.id} ref={sectionRef} class={styles.section}>
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
              {theme.label}
            </div>
          </div>
          <h2 class={styles.heading}>{meta.title}</h2>
        </>
      )}
      {children}
    </section>
  );
}
