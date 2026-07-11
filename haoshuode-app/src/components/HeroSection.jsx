import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <div class={styles.hero}>
      <div class={styles.badge}>
        <span class={styles.badgeIcon}>📖</span> an interactive book
      </div>
      <h1 class={styles.title}>
        Hǎo-shuō-de<br />
        <span class={styles.accent}>the minimal Chinese language</span>
      </h1>
      <p class={styles.subtitle}>
        Real Mandarin, frozen to about 120 words. Nothing invented, nothing to
        unlearn — just enough to start speaking today.
      </p>
    </div>
  );
}
