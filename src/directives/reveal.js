/**
 * v-reveal: добавляет класс is-in элементу когда он появляется в области просмотра.
 * Аргументы (модификаторы):
 *   v-reveal             — стандартное появление снизу (fade + translateY)
 *   v-reveal.up / .left / .right — направление
 *   v-reveal.fast / .slow — скорость
 *   v-reveal:200         — задержка появления в миллисекундах
 *
 * Один общий IntersectionObserver на все элементы — без оверхеда.
 */

let observer = null;
const elements = new WeakMap();
/** setTimeout addIsIn, чтобы снять при размонтировании до срабатывания */
const pending = new WeakMap();

const reduced = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

function ensureObserver() {
  if (observer || typeof window === 'undefined') return observer;
  if (!('IntersectionObserver' in window)) return null;

  /** Один rAF: вешаем is-in в следующем кадре, без лишнего пустого кадра (двойной rAF давал заметный лаг). */
  function addIsIn(node) {
    if (!node || !node.isConnected) return;
    requestAnimationFrame(() => {
      if (node.isConnected) node.classList.add('is-in');
    });
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const meta = elements.get(el);
        const delay = meta?.delay ?? 0;
        if (delay > 0) {
          const t = window.setTimeout(() => {
            pending.delete(el);
            addIsIn(el);
          }, delay);
          pending.set(el, t);
        } else {
          addIsIn(el);
        }
        observer.unobserve(el);
        elements.delete(el);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
  );
  return observer;
}

export const revealDirective = {
  mounted(el, binding) {
    const mods = binding.modifiers ?? {};
    let dir = 'up';
    if (mods.left) dir = 'left';
    else if (mods.right) dir = 'right';
    else if (mods.down) dir = 'down';
    else if (mods.fade) dir = 'fade';

    let speed = 'normal';
    if (mods.fast) speed = 'fast';
    else if (mods.slow) speed = 'slow';

    el.classList.add('reveal', `reveal--${dir}`, `reveal--${speed}`);

    let delay = 0;
    if (typeof binding.value === 'number') delay = binding.value;
    else if (binding.arg) delay = Number.parseInt(binding.arg, 10) || 0;

    if (reduced) {
      el.classList.add('is-in');
      return;
    }

    elements.set(el, { delay });
    const o = ensureObserver();
    if (o) o.observe(el);
    else el.classList.add('is-in');
  },
  unmounted(el) {
    const t = pending.get(el);
    if (t) {
      clearTimeout(t);
      pending.delete(el);
    }
    if (observer) observer.unobserve(el);
    elements.delete(el);
  },
};

export default revealDirective;
