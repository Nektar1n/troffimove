/** Дефолтные тексты для <meta name="description"> и соц. превью */
export const DEFAULT_DESCRIPTION =
  'Troffimove Auto — подбор, выкуп и привоз авто под ключ. Аукционы и площадки Кореи, Европы и Японии: логистика, таможня, учёт. Один контрагент.';

export const PAGE_DESCRIPTIONS = {
  home: DEFAULT_DESCRIPTION,
  import:
    'Привоз авто из Кореи, Европы и Японии: аукционы, доставка в РФ, таможня и постановка на учёт. Смета в договоре, сопровождение сделки.',
  selection:
    'Выездная проверка б/у перед покупкой: кузов, юридическая чистота, отчёт с рекомендацией. Подбор и сопровождение на месте.',
  cases:
    'Успешные сделки Troffimove Auto — привоз и подбор: реальные примеры по Корее, Японии, Европе и выездная проверка б/у на месте.',
  legal: 'Политика конфиденциальности, cookies, публичная оферта и реквизиты Troffimove Auto.',
};

function ensureMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * @param {string} description
 * @param {string} [fullPageTitle] — document.title / og:title
 * @param {string} [canonicalUrl] — полный URL страницы для og:url
 */
export function applyPageMeta(description, fullPageTitle, canonicalUrl) {
  if (typeof document === 'undefined') return;

  let m = document.querySelector('meta[name="description"]');
  if (!m) {
    m = document.createElement('meta');
    m.setAttribute('name', 'description');
    document.head.appendChild(m);
  }
  m.setAttribute('content', description);

  ensureMetaProperty('og:description', description);
  if (fullPageTitle) {
    ensureMetaProperty('og:title', fullPageTitle);
  }
  if (canonicalUrl) {
    ensureMetaProperty('og:url', canonicalUrl);
  }
}
