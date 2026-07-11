import { t } from "../lib/i18n.js";
import styles from "./HeroSection.module.css";

export function HeroSection({ lang }) {
  return (
    <div class={styles.hero}>
      <div class={styles.badge}>
        <span class={styles.badgeIcon}>📖</span> {t(lang, "heroBadge")}
      </div>
      <h1 class={styles.title}>
        Hǎo-shuō-de
        <br />
        <span class={styles.accent}>{t(lang, "subtitle")}</span>
      </h1>
      <p class={styles.subtitle}>{t(lang, "heroSubtitle")}</p>
    </div>
  );
}
