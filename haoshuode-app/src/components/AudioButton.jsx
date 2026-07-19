import { playAudio } from '../lib/audio.js';
import styles from './AudioButton.module.css';

export function AudioButton({ pinyin, audioFile, ttsText }) {
  return (
    <button
      class={styles.btn}
      onClick={(e) => { e.stopPropagation(); playAudio(pinyin, audioFile, ttsText); }}
      aria-label={`Play ${pinyin}`}
      title={`Play ${pinyin}`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  );
}
