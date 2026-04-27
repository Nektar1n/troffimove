<script setup>
import { computed, ref, watch } from 'vue';
import { STATS_LINE, formatStatValue } from '../data/statsLine.js';
import { useStatsCountup } from '../composables/useStatsCountup.js';
import { useInView } from '../composables/useInView.js';

const countStarted = ref(false);

const { el, visible } = useInView({
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
});

const { values: statValues, done: statCountDone, start: startStatCount } = useStatsCountup();

const statNumberLines = computed(() =>
  statValues.value.map((v, i) => formatStatValue(i, v, statCountDone.value)),
);

watch(
  visible,
  (v) => {
    if (v && !countStarted.value) {
      countStarted.value = true;
      startStatCount();
    }
  },
  { immediate: true },
);
</script>

<template>
  <section id="stats" ref="el" class="home-hero-stats" aria-label="Показатели">
    <div class="home-hero-stats__inner">
      <div class="home-hero-stats__grid" :class="{ 'home-hero-stats__grid--in': visible }">
        <div
          v-for="(s, i) in STATS_LINE"
          :key="s.t"
          class="home-hero-stats__item"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <span class="home-hero-stats__n">{{ statNumberLines[i] }}</span>
          <span class="home-hero-stats__t">{{ s.t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero-stats {
  position: relative;
  z-index: 0;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 0 2.5rem;
  background: transparent;
  color: rgba(245, 245, 247, 0.92);
}

.home-hero-stats__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
}

.home-hero-stats__grid {
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1rem;
  margin: 0 0 1.75rem;
  padding: 1.5rem 0 2rem;
  background: transparent;
}

@media (min-width: 720px) {
  .home-hero-stats__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    padding: 1.5rem 0 2.25rem;
  }
}

.home-hero-stats__grid::before {
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
  background: #0a0b0d;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.home-hero-stats__item {
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
  .home-hero-stats__item {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.25rem 1.75rem;
  }

  .home-hero-stats__item:first-child {
    padding-left: 0;
  }

  .home-hero-stats__item:last-child {
    border-right: none;
    padding-right: 0;
  }
}

.home-hero-stats__grid--in .home-hero-stats__item {
  opacity: 1;
  transform: translateY(0);
}

.home-hero-stats__n {
  font-weight: 600;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.03em;
  color: rgba(245, 245, 247, 0.95);
  font-variant-numeric: tabular-nums;
}

.home-hero-stats__t {
  font-size: 0.8125rem;
  line-height: 1.35;
  color: rgba(245, 245, 247, 0.48);
  max-width: 12rem;
}

@media (max-width: 899px) {
  .home-hero-stats {
    margin-top: -1px;
    padding-top: 0;
    padding-bottom: 2rem;
    /* без щели со светлым --bg страницы между героем и блоком */
    background: #0a0b0d;
  }

  .home-hero-stats__grid {
    margin-top: 0;
    padding-top: 1.25rem;
  }

  .home-hero-stats__grid::before {
    border-top: none;
  }
}

/* После базовых тёмных правил — иначе они перебивают светлую тему */
@media (min-width: 900px) {
  .home-hero-stats {
    padding: 0 0 3.5rem;
    color: var(--text);
  }

  .home-hero-stats__inner {
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }

  .home-hero-stats__grid {
    padding: 2rem 0 2.75rem;
  }

  .home-hero-stats__grid::before {
    background: #fff;
    border-top: 1px solid var(--line-light);
    border-bottom: 1px solid var(--line-light);
  }

  .home-hero-stats__item {
    border-right: 1px solid var(--line-light);
  }

  .home-hero-stats__n {
    font-size: clamp(2.5rem, 4.8vw, 3.75rem);
    color: #0a0a0a;
  }

  .home-hero-stats__t {
    font-size: 0.875rem;
    color: var(--muted);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero-stats__item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
