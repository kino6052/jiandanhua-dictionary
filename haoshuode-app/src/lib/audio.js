const DIACRITICS = /[̀-ͯ]/g;

export function slugify(pinyin) {
  return pinyin
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

let currentAudio = null;

export function playAudio(pinyin, audioFile, ttsText) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  const fallback = ttsText || pinyin;
  const slug = audioFile || slugify(pinyin);
  const src = `${import.meta.env.BASE_URL}audio/${slug}.mp3`;

  const audio = new Audio(src);
  currentAudio = audio;

  audio.play().catch(() => {
    currentAudio = null;
    speakTTS(fallback);
  });

  audio.addEventListener('ended', () => {
    if (currentAudio === audio) currentAudio = null;
  });
  audio.addEventListener('error', () => {
    if (currentAudio === audio) currentAudio = null;
    speakTTS(fallback);
  });
}

function speakTTS(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const zh = voices.find(v => v.lang.startsWith('zh'));
  if (zh) u.voice = zh;
  window.speechSynthesis.speak(u);
}
