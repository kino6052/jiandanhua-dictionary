import { useState } from 'preact/hooks';
import { ProgressBar } from './ProgressBar.jsx';
import styles from './Sidebar.module.css';

export function Sidebar({ sections, completed, currentId, onNavigate }) {
  const [open, setOpen] = useState(false);
  const total = sections.length;
  const done = sections.filter(s => completed.has(s.id)).length;

  const intros = sections.filter(s => s.type === 'intro');
  const lessons = sections.filter(s => s.type === 'lesson');
  const others = sections.filter(s => !['intro', 'lesson'].includes(s.type));

  function go(id) {
    onNavigate(id);
    setOpen(false);
  }

  return (
    <>
      <button class={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? '✕' : '☰'}
      </button>

      <div class={`${styles.overlay} ${open ? styles.overlayOpen : ''}`} onClick={() => setOpen(false)} />

      <nav class={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div class={styles.logo}>
          <div class={styles.logoIcon}><span>好</span></div>
          <div>
            <div class={styles.logoTitle}>Hǎo-shuō-de</div>
            <div class={styles.logoSub}>the minimal book</div>
          </div>
        </div>

        <ProgressBar done={done} total={total} />

        {intros.length > 0 && (
          <TocGroup label="Introduction" items={intros} completed={completed} currentId={currentId} onGo={go} />
        )}
        {lessons.length > 0 && (
          <TocGroup label="Lessons" items={lessons} completed={completed} currentId={currentId} onGo={go} />
        )}
        {others.length > 0 && (
          <TocGroup label="Reference" items={others} completed={completed} currentId={currentId} onGo={go} />
        )}

        <div class={styles.tagline}>
          120 words.<br />Real Mandarin.<br />No overwhelm. ✌
        </div>
      </nav>
    </>
  );
}

function TocGroup({ label, items, completed, currentId, onGo }) {
  return (
    <div class={styles.tocGroup}>
      <div class={styles.tocLabel}>{label}</div>
      {items.map(item => {
        const done = completed.has(item.id);
        const active = item.id === currentId;
        return (
          <button
            key={item.id}
            class={`${styles.tocItem} ${done ? styles.tocDone : ''} ${active ? styles.tocActive : ''}`}
            onClick={() => onGo(item.id)}
          >
            <span class={`${styles.dot} ${done ? styles.dotDone : ''}`}>
              {done ? '✓' : ''}
            </span>
            {item.tocLabel}
          </button>
        );
      })}
    </div>
  );
}
