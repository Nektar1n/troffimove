<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { getFeaturedCases } from '../data/cases.js';
import { useInView } from '../composables/useInView.js';

const props = defineProps({
  sectionId: {
    type: String,
    default: 'cases',
  },
  title: {
    type: String,
    default: 'Примеры сделок',
  },
  lead: {
    type: String,
    default: 'Реальные этапы сделок.',
  },
  scope: {
    type: String,
    default: 'home',
  },
  tone: {
    type: String,
    default: 'light',
  },
  ctaLabel: {
    type: String,
    default: 'Все сделки',
  },
  ctaTo: {
    type: [String, Object],
    default: '/cases',
  },
  cardCtaTo: {
    type: [String, Object],
    default: () => ({ path: '/', hash: '#contact' }),
  },
});

const { el, visible } = useInView({ rootMargin: '0px 0px 18% 0px', threshold: 0.06 });

const cases = computed(() => getFeaturedCases(props.scope));
const isDark = computed(() => props.tone === 'dark');
</script>

<template>
  <section :id="sectionId" ref="el" class="sec" :class="{ 'sec--dark': isDark }">
    <div class="sec__intro">
      <h2 class="sec__title">{{ title }}</h2>
      <p class="sec__lead">{{ lead }}</p>
    </div>
    <div class="track" tabindex="0">
      <article
        v-for="(c, i) in cases"
        :key="c.id"
        class="card"
        :class="{ 'card--in': visible }"
        :style="visible ? { transitionDelay: `${i * 0.09}s` } : { transitionDelay: '0s' }"
      >
        <div class="card__media">
          <img
            class="card__img"
            :src="c.image"
            width="800"
            height="500"
            :alt="`Иллюстрация к сделке: ${c.model}`"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : undefined"
            decoding="async"
          />
        </div>
        <div class="card__body">
          <span class="card__tag">{{ c.tag }}</span>
          <h3 class="card__model">{{ c.model }}</h3>
          <p class="card__meta">{{ c.meta }}</p>
          <p class="card__text">{{ c.text }}</p>
          <RouterLink class="card__cta" :to="cardCtaTo">Обсудить похожую задачу →</RouterLink>
        </div>
      </article>
    </div>
    <div class="sec__actions">
      <RouterLink class="sec__cta" :to="ctaTo">{{ ctaLabel }}</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.sec {
  position: relative;
  z-index: 0;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  background: transparent;
  border-bottom: none;
}

.sec::before {
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
  background: #fff;
  border-bottom: 1px solid var(--line-light);
}

.sec--dark::before {
  background: var(--surface-dark);
  border-bottom-color: var(--border-dark);
}

.sec--dark {
  padding-top: 2.2rem;
  padding-bottom: 2.25rem;
}

@media (min-width: 720px) {
  .sec {
    padding: 3.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }

  .sec--dark {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

.sec__intro {
  margin-bottom: 2rem;
  max-width: 40rem;
}

.sec--dark .sec__intro {
  margin-bottom: 1.7rem;
}

.sec__title {
  font-weight: 600;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.65rem;
}

.sec--dark .sec__title {
  color: var(--text-on-dark);
}

.sec__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
}

.sec--dark .sec__lead {
  color: var(--muted-on-dark);
}

.track {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 960px) {
  .track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    overflow: visible;
    padding-bottom: 0;
    scroll-snap-type: none;
  }
}

.track::-webkit-scrollbar {
  height: 4px;
}
.track::-webkit-scrollbar-thumb {
  background: var(--line);
  border-radius: 4px;
}

.sec--dark .track::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
}

.card {
  flex: 0 0 min(340px, calc(100vw - 2.25rem - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--line-light);
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  /* На телефоне горизонтальный scroll-snap + transform на карточках часто даёт рывки (отдельные слои / перерисовки). */
  transform: none;
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.sec--dark .card {
  background: var(--surface-panel);
  border-color: var(--border-dark);
}

.card--in {
  opacity: 1;
}

@media (min-width: 960px) {
  .card {
    flex: none;
    min-width: 0;
    transform: translateY(8px);
    transition:
      opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card--in {
    transform: translateY(0);
  }
}

.card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-dark);
}

.card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

.card__body {
  padding: 1.25rem 1.2rem 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card__tag {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.65rem;
}

.sec--dark .card__tag {
  color: rgba(233, 190, 95, 0.86);
}

.card__model {
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.02em;
  margin: 0 0 0.45rem;
  line-height: 1.3;
  color: #000;
}

.sec--dark .card__model {
  color: var(--text-on-dark);
}

.card__meta {
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--muted);
}

.sec--dark .card__meta {
  color: rgba(245, 245, 247, 0.5);
}

.card__text {
  margin: 0 0 1.1rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text);
  flex: 1;
}

.sec--dark .card__text {
  color: rgba(245, 245, 247, 0.76);
}

.card__cta {
  align-self: flex-start;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--yellow-ink);
  text-decoration: none;
  letter-spacing: -0.01em;
  padding: 0.35rem 0;
  border-bottom: 2px solid var(--yellow);
}

.card__cta:focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 2px;
  border-radius: 2px;
}

.card__cta:hover {
  color: var(--yellow-ink);
}

.sec--dark .card__cta {
  color: rgba(245, 245, 247, 0.88);
  border-bottom-color: rgba(233, 190, 95, 0.72);
}

.sec--dark .card__cta:hover {
  color: var(--yellow);
}

.sec__actions {
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-start;
}

.sec__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.7rem 1.15rem;
  border-radius: 0.9rem;
  border: 1px solid var(--yellow);
  background: var(--yellow);
  color: var(--yellow-ink);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.sec__cta:hover {
  background: var(--yellow-hover);
  border-color: var(--yellow-hover);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .card--in {
    transform: none;
  }
}
</style>
