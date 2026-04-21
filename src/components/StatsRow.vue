<script setup>
import { useInView } from '../composables/useInView.js';

const { el, visible } = useInView();

const stats = [
  { n: '1200+', t: 'авто доставлено клиентам' },
  { n: '14', t: 'стран-источников поставки' },
  { n: '48 ч', t: 'до первого отчёта по лоту' },
  { n: '1', t: 'менеджер на всю сделку' },
];
</script>

<template>
  <section ref="el" class="stats" :class="{ 'stats--in': visible }">
    <div v-for="(s, i) in stats" :key="s.t" class="stats__item" :style="{ transitionDelay: `${i * 0.05}s` }">
      <span class="stats__n">{{ s.n }}</span>
      <span class="stats__t">{{ s.t }}</span>
    </div>
  </section>
</template>

<style scoped>
.stats {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem max(1rem, env(safe-area-inset-left, 0px)) 2rem max(1rem, env(safe-area-inset-right, 0px));
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1rem;
  border-bottom: 1px solid var(--line-light);
}

@media (min-width: 720px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 2.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.stats__item {
  padding: 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

@media (min-width: 720px) {
  .stats__item {
    border-right: 1px solid var(--line-light);
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
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.stats__t {
  font-size: 0.8125rem;
  line-height: 1.35;
  color: var(--muted);
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
