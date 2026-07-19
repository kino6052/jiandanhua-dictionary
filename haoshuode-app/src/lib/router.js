const LANG_URL = { eng: 'en', rus: 'ru', zh: 'zh' };
const URL_LANG = { en: 'eng', ru: 'rus', zh: 'zh' };
const LANG_CODES = Object.values(LANG_URL);

// Finds the site's deployment root by locating the first recognized
// language segment in the path and treating everything before it as the
// root. Works for a root deployment ("/"), a GitHub Pages project page
// ("/repo-name/"), or any other subpath -- without needing to know that
// prefix at build time.
function siteRoot(pathname) {
  const parts = pathname.split('/');
  for (let i = 0; i < parts.length; i++) {
    if (LANG_CODES.includes(parts[i])) {
      return parts.slice(0, i).join('/');
    }
  }
  return pathname.replace(/\/+$/, '');
}

export function parseUrl(pathname) {
  const root = siteRoot(pathname);
  let path = pathname.startsWith(root) ? pathname.slice(root.length) : pathname;
  if (!path.startsWith('/')) path = '/' + path;
  const parts = path.split('/').filter(Boolean);
  const hasLang = LANG_CODES.includes(parts[0]);
  return {
    root,
    lang: hasLang ? URL_LANG[parts[0]] : null,
    pageId: hasLang ? (parts[1] || null) : null,
  };
}

export function buildUrl(root, lang, pageId) {
  const urlLang = LANG_URL[lang] || 'en';
  return pageId ? `${root}/${urlLang}/${pageId}` : `${root}/${urlLang}/`;
}

export function langToUrl(lang) { return LANG_URL[lang] || 'en'; }
