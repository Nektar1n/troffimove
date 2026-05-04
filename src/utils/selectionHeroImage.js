import selectionHeroUrl from '../assets/подборПрод.jpg';
import selectionHeroUltrawideUrl from '../assets/расширеннаяПодбор.PNG';

const preloaded = new Set();

/**
 * Старт загрузки hero-изображения до монтирования SelectionHero.
 * URL один на модуль; вызывать при переходе на /podbor и с дедупликацией.
 */
export function ensureSelectionHeroImagePreload() {
  if (typeof document === 'undefined' || preloaded.has(selectionHeroUrl)) return;
  preloaded.add(selectionHeroUrl);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = selectionHeroUrl;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

export { selectionHeroUrl, selectionHeroUltrawideUrl };
