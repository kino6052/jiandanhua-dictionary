import { useState, useEffect, useCallback } from 'preact/hooks';

const STORAGE_KEY = 'haoshuode-progress';
const PAGE_KEY = 'haoshuode-page';

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function useProgress(sectionIds) {
  const [completed, setCompleted] = useState(() => loadSet(STORAGE_KEY));
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem(PAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const total = sectionIds.length;

  const markVisited = useCallback((id) => {
    setCompleted(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveSet(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setPage(clamped);
    localStorage.setItem(PAGE_KEY, String(clamped));
  }, [total]);

  const next = useCallback(() => goTo(page + 1), [page, goTo]);
  const prev = useCallback(() => goTo(page - 1), [page, goTo]);

  useEffect(() => {
    if (sectionIds[page]) markVisited(sectionIds[page]);
  }, [page, sectionIds, markVisited]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return { completed, page, total, goTo, next, prev };
}
