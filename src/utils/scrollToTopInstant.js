/** Мгновенный скролл вверх (обходит html { scroll-behavior: smooth }). */
export function scrollToTopInstant() {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  root.style.scrollBehavior = prev;
}
