const LANG_URL = { eng: 'en', rus: 'ru', zh: 'zh' };
const URL_LANG = { en: 'eng', ru: 'rus', zh: 'zh' };

function base() {
  return (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
}

export function parseUrl(pathname) {
  const b = base();
  let path = pathname;
  if (b && path.startsWith(b)) path = path.slice(b.length);
  if (!path.startsWith('/')) path = '/' + path;
  const parts = path.split('/').filter(Boolean);
  return {
    lang: URL_LANG[parts[0]] || 'eng',
    pageId: parts[1] || null,
  };
}

export function buildUrl(lang, pageId) {
  const b = base();
  const urlLang = LANG_URL[lang] || 'en';
  return pageId ? `${b}/${urlLang}/${pageId}` : `${b}/${urlLang}/`;
}

export function langToUrl(lang) { return LANG_URL[lang] || 'en'; }
