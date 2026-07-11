import { useState, useEffect, useCallback } from 'preact/hooks';

const THEME_KEY = 'haoshuode-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const apply = useCallback((t) => {
    document.documentElement.setAttribute('data-theme', t);
    setTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  }, []);

  const toggle = useCallback(() => {
    apply(theme === 'dark' ? 'light' : 'dark');
  }, [theme, apply]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    function onChange() {
      if (!localStorage.getItem(THEME_KEY)) {
        apply(mq.matches ? 'dark' : 'light');
      }
    }
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  return { theme, toggle };
}
