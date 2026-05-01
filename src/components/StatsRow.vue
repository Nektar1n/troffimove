<script setup>
import { computed, ref, watch } from 'vue';
import { useInView } from '../composables/useInView.js';
import { useStatsCountup } from '../composables/useStatsCountup.js';
import { STATS_LINE, formatStatValue } from '../data/statsLine.js';

const { el, visible } = useInView();
const { values: statValues, done: statCountDone, start: startStatCount } = useStatsCountup();
const countStarted = ref(false);

const statNumberLines = computed(() =>
  statValues.value.map((v, i) => formatStatValue(i, v, statCountDone.value))
);

watch(
  visible,
  (v) => {
    if (v && !countStarted.value) {
      countStarted.value = true;
      startStatCount();
    }
  },
  { immediate: true }
);
</script>

<template>
  <section id="stats" ref="el" class="stats" :class="{ 'stats--in': visible }">
    <div v-for="(s, i) in STATS_LINE" :key="s.t" class="stats__item" :style="{ transitionDelay: `${i * 0.08}s` }">
      <span class="stats__n">{{ statNumberLines[i] }}</span>
      <span class="stats__t">{{ s.t }}</span>
    </div>
  </section>
</template>

<style scoped>
.stats {
  --stats-bg: var(--color-graphite);
  --stats-border: rgb(var(--color-milk-rgb) / 0.1);

  position: relative;
  z-index: 0;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 2rem max(1rem, env(safe-area-inset-left, 0px)) 2rem max(1rem, env(safe-area-inset-right, 0px));
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1rem;
  background: transparent;
  border-bottom: none;
}

.stats::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  background: var(--stats-bg);
  border-bottom: 1px solid var(--stats-border);
}

@media (min-width: 720px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 2.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.stats__item {
  padding: 0.9rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 720px) {
  .stats__item {
    border-right: 1px solid var(--stats-border);
    padding: 0.25rem 1.75rem;
  }

  .stats__item:first-child {
    padding-left: 0;
  }

  .stats__item:last-child {
    border-right: none;
    padding-right: 0;
  }
}

.stats--in .stats__item {
  opacity: 1;
  transform: translateY(0);
}

.stats__n {
  font-weight: 600;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.03em;
  color: rgb(var(--color-milk-rgb) / 0.95);
  font-variant-numeric: tabular-nums;
}

.stats__t {
  font-size: 0.8125rem;
  line-height: 1.35;
  color: rgb(var(--color-milk-rgb) / 0.48);
  max-width: 12rem;
}

@media (prefers-reduced-motion: reduce) {
  .stats__item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
