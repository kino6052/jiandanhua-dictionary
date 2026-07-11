import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

const STORAGE_KEY = 'haoshuode-progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveProgress(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useProgress() {
  const [completed, setCompleted] = useState(loadProgress);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        let changed = false;
        const next = new Set(completed);
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('id');
            if (id && !next.has(id)) {
              next.add(id);
              changed = true;
            }
          }
        }
        if (changed) {
          setCompleted(next);
          saveProgress(next);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );
    return () => observer.current?.disconnect();
  }, []);

  const observe = useCallback(el => {
    if (el && observer.current) observer.current.observe(el);
  }, []);

  return { completed, observe };
}
