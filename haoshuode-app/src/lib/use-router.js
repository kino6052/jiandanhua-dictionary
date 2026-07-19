import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import { parseUrl, buildUrl } from './router.js';
import { getSections, buildToc, AVAILABLE_LANGS } from './content-registry.js';
import { LANG_CONFIG } from './i18n.js';

const PROGRESS_KEY = 'haoshuode-progress';
const LANG_KEY = 'haoshuode-lang';

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function useAppRouter() {
  // The deployment root never changes during a session, so it's captured
  // once from the initial URL and reused for every subsequent navigation.
  const [root] = useState(() => parseUrl(window.location.pathname).root);

  const [state, setState] = useState(() => {
    const parsed = parseUrl(window.location.pathname);
    const lang = parsed.lang || localStorage.getItem(LANG_KEY) || 'eng';
    return { lang, pageId: parsed.pageId };
  });

  const [completed, setCompleted] = useState(() => loadSet(PROGRESS_KEY));

  const sections = useMemo(() => getSections(state.lang), [state.lang]);
  const toc = useMemo(() => buildToc(sections), [sections]);
  const sectionIds = useMemo(() => sections.map(s => s.meta.id), [sections]);

  const pageIndex = useMemo(() => {
    if (!state.pageId) return 0;
    const idx = sectionIds.indexOf(state.pageId);
    return idx >= 0 ? idx : 0;
  }, [state.pageId, sectionIds]);

  const navigate = useCallback((lang, pageId, replace = false) => {
    const url = buildUrl(root, lang, pageId);
    if (replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
    setState({ lang, pageId });
    localStorage.setItem(LANG_KEY, lang);
    const config = LANG_CONFIG[lang];
    if (config) document.documentElement.lang = config.htmlLang;
  }, [root]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(sectionIds.length - 1, idx));
    navigate(state.lang, sectionIds[clamped]);
  }, [state.lang, sectionIds, navigate]);

  const next = useCallback(() => goTo(pageIndex + 1), [pageIndex, goTo]);
  const prev = useCallback(() => goTo(pageIndex - 1), [pageIndex, goTo]);

  const switchLang = useCallback((newLang) => {
    const newSections = getSections(newLang);
    const newIds = newSections.map(s => s.meta.id);
    const pageId = state.pageId && newIds.includes(state.pageId)
      ? state.pageId
      : (newIds[0] || null);
    navigate(newLang, pageId);
  }, [state.pageId, navigate]);

  // Mark current page as visited
  useEffect(() => {
    const id = sectionIds[pageIndex];
    if (id) {
      setCompleted(prev => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        saveSet(PROGRESS_KEY, next);
        return next;
      });
    }
  }, [pageIndex, sectionIds]);

  // Set initial URL if at root or invalid page
  useEffect(() => {
    const parsed = parseUrl(window.location.pathname);
    if (sectionIds.length > 0 && (!parsed.pageId || !sectionIds.includes(parsed.pageId))) {
      navigate(state.lang, sectionIds[0], true);
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    function onPopState() {
      const parsed = parseUrl(window.location.pathname);
      setState(prev => ({
        lang: parsed.lang || prev.lang,
        pageId: parsed.pageId,
      }));
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Arrow keys
  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Update html lang attribute
  useEffect(() => {
    const config = LANG_CONFIG[state.lang];
    if (config) document.documentElement.lang = config.htmlLang;
  }, [state.lang]);

  const resetProgress = useCallback(() => {
    setCompleted(new Set());
    localStorage.removeItem(PROGRESS_KEY);
  }, []);

  return {
    lang: state.lang,
    pageId: state.pageId,
    pageIndex,
    sections,
    toc,
    sectionIds,
    completed,
    total: sectionIds.length,
    availableLangs: AVAILABLE_LANGS,
    goTo,
    next,
    prev,
    switchLang,
    resetProgress,
  };
}
