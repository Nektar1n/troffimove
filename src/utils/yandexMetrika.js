/** ID счётчика Яндекс.Метрики */
export const YANDEX_METRIKA_ID = 111102353;

/**
 * Просмотр страницы для SPA — вызывать при смене маршрута Vue Router.
 * Первый просмотр отправляет init в index.html.
 */
export function trackYandexMetrikaPageView(url, title = document.title) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;

  window.ym(YANDEX_METRIKA_ID, 'hit', url, {
    title,
    referer: document.referrer,
  });
}
