import { ref, onUnmounted } from 'vue';
import { STATS_LINE } from '../data/statsLine.js';

const DURATION_MS = 1000;

function shouldReduceMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const easeOutCubic = (x) => 1 - (1 - x) ** 3;

/**
 * Счёт 0 → target ~1s. Вызвать start() по событию (mounted / in view).
 */
export function useStatsCountup() {
  const targets = STATS_LINE.map((s) => s.target);
  const n = targets.length;
  const values = ref(targets.map(() => 0));
  const done = ref(false);
  let rafId = 0;

  function start() {
    cancelAnimationFrame(rafId);
    done.value = false;
    values.value = targets.map(() => 0);

    if (shouldReduceMotion()) {
      values.value = [...targets];
      done.value = true;
      return;
    }

    const t0 = performance.now();
    const tick = (now) => {
      const u = Math.min(1, (now - t0) / DURATION_MS);
      const e = easeOutCubic(u);
      values.value = targets.map((t) => t * e);
      if (u < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        values.value = [...targets];
        done.value = true;
      }
    };
    rafId = requestAnimationFrame(tick);
  }

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  });

  return { values, done, start };
}
