import { useState } from "preact/hooks";
import { ProgressBar } from "./ProgressBar.jsx";
import { FontSelector } from "./FontSelector.jsx";
import { LANG_CONFIG, t } from "../lib/i18n.js";
import styles from "./Sidebar.module.css";

export function Sidebar({
  sections,
  completed,
  currentId,
  onNavigate,
  lang,
  availableLangs,
  onSwitchLang,
  theme,
  onToggleTheme,
  onResetProgress,
}) {
  const [open, setOpen] = useState(false);
  const total = sections.length;
  const done = sections.filter((s) => completed.has(s.id)).length;

  const intros = sections.filter((s) => s.type === "intro");
  const lessons = sections.filter((s) => s.type === "lesson");
  const others = sections.filter((s) => !["intro", "lesson"].includes(s.type));

  function go(id) {
    onNavigate(id);
    setOpen(false);
  }

  return (
    <>
      <button
        class={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>

      <div
        class={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      <nav class={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div class={styles.logo}>
          <div class={styles.logoIcon}>
            <span>好</span>
          </div>
          <div>
            <div class={styles.logoTitle}>Hǎo-shuō-de</div>
            <div class={styles.logoSub}>{t(lang, "logoSub")}</div>
          </div>
        </div>

        <div class={styles.langRow}>
          {availableLangs.map((l) => (
            <button
              key={l}
              class={`${styles.langBtn} ${l === lang ? styles.langActive : ""}`}
              onClick={() => onSwitchLang(l)}
            >
              {LANG_CONFIG[l]?.nativeLabel || l}
            </button>
          ))}
        </div>

        <ProgressBar done={done} total={total} onReset={onResetProgress} />

        {intros.length > 0 && (
          <TocGroup
            label={t(lang, "introduction")}
            items={intros}
            completed={completed}
            currentId={currentId}
            onGo={go}
          />
        )}
        {lessons.length > 0 && (
          <TocGroup
            label={t(lang, "lessons")}
            items={lessons}
            completed={completed}
            currentId={currentId}
            onGo={go}
          />
        )}
        {others.length > 0 && (
          <TocGroup
            label={t(lang, "reference")}
            items={others}
            completed={completed}
            currentId={currentId}
            onGo={go}
          />
        )}

        <div class={styles.controls}>
          <FontSelector />
          <button
            class={styles.themeBtn}
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div class={styles.tagline}>{t(lang, "tagline")}</div>
      </nav>
    </>
  );
}

function TocGroup({ label, items, completed, currentId, onGo }) {
  return (
    <div class={styles.tocGroup}>
      <div class={styles.tocLabel}>{label}</div>
      {items.map((item) => {
        const done = completed.has(item.id);
        const active = item.id === currentId;
        return (
          <button
            key={item.id}
            class={`${styles.tocItem} ${done ? styles.tocDone : ""} ${active ? styles.tocActive : ""}`}
            onClick={() => onGo(item.id)}
          >
            <span class={`${styles.dot} ${done ? styles.dotDone : ""}`}>
              {done ? "✓" : ""}
            </span>
            {item.tocLabel}
          </button>
        );
      })}
    </div>
  );
}
