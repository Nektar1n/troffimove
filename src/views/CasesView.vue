<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { CASE_TYPES, getCasesByType } from '../data/cases.js';

const route = useRoute();
const router = useRouter();

const filters = [
  { id: CASE_TYPES.all, label: 'Все кейсы' },
  { id: CASE_TYPES.import, label: 'Привоз' },
  { id: CASE_TYPES.selection, label: 'Подбор' },
];

const activeType = computed(() => {
  const raw = String(route.query.type ?? CASE_TYPES.all);
  return [CASE_TYPES.all, CASE_TYPES.import, CASE_TYPES.selection].includes(raw) ? raw : CASE_TYPES.all;
});

const visibleCases = computed(() => getCasesByType(activeType.value));

function setType(nextType) {
  router.replace({
    path: '/cases',
    query: nextType === CASE_TYPES.all ? {} : { type: nextType },
  });
}

function caseContactTarget(type) {
  if (type === CASE_TYPES.selection) return { path: '/podbor', hash: '#contact' };
  return { path: '/privoz', hash: '#contact' };
}
</script>

<template>
  <main class="cases-page">
    <section class="cases-page__hero">
      <div class="cases-page__inner">
        <p class="cases-page__kicker">Кейсы</p>
        <h1 class="cases-page__title">Привоз и подбор: реальные сделки и реальные осмотры</h1>
        <p class="cases-page__lead">
          Все кейсы в одном месте. Можно смотреть вместе или отдельно по направлениям: привоз авто и подбор б/у на
          месте.
        </p>

        <div class="cases-page__filters" role="tablist" aria-label="Фильтр кейсов">
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            class="cases-page__filter"
            :class="{ 'cases-page__filter--on': activeType === filter.id }"
            :aria-selected="activeType === filter.id"
            @click="setType(filter.id)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="cases-page__list">
      <div class="cases-page__inner">
        <div class="cases-page__grid">
          <article v-for="item in visibleCases" :key="item.id" class="cases-card">
            <div class="cases-card__media">
              <img
                class="cases-card__img"
                :src="item.image"
                width="800"
                height="500"
                :alt="`Иллюстрация к кейсу: ${item.model}`"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="cases-card__body">
              <span class="cases-card__tag">{{ item.tag }}</span>
              <h2 class="cases-card__title">{{ item.model }}</h2>
              <p class="cases-card__meta">{{ item.meta }}</p>
              <p class="cases-card__text">{{ item.text }}</p>
              <RouterLink class="cases-card__cta" :to="caseContactTarget(item.type)">Обсудить похожую задачу →</RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.cases-page {
  background: var(--bg);
}

.cases-page__hero {
  padding: 7rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  background: var(--surface-dark);
  border-bottom: 1px solid var(--border-dark);
  color: var(--text-on-dark);
}

@media (min-width: 720px) {
  .cases-page__hero {
    padding: 8rem max(1.25rem, env(safe-area-inset-left, 0px)) 3rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.cases-page__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.cases-page__kicker {
  margin: 0 0 0.45rem;
  font-size: 0.68rem;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 196, 18, 0.9);
}

.cases-page__title {
  margin: 0 0 0.65rem;
  max-width: 16ch;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.cases-page__lead {
  margin: 0;
  max-width: 42rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--muted-on-dark);
}

.cases-page__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.cases-page__filter {
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-m);
  border: 1px solid var(--border-dark);
  background: var(--surface-panel);
  color: rgba(245, 245, 247, 0.72);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.cases-page__filter--on {
  background: var(--surface-panel-2);
  color: #fff;
  border-color: var(--border-dark-strong);
  box-shadow: inset 3px 0 0 var(--yellow);
}

.cases-page__list {
  padding: 2rem max(1rem, env(safe-area-inset-left, 0px)) calc(3rem + env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-right, 0px));
  background: var(--bg);
}

@media (min-width: 720px) {
  .cases-page__list {
    padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 4rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.cases-page__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 960px) {
  .cases-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cases-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line-light);
  border-radius: 12px;
  background: #fff;
}

.cases-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-subtle);
}

.cases-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.cases-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.3rem 1.2rem 1.35rem;
}

.cases-card__tag {
  margin-bottom: 0.65rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.cases-card__title {
  margin: 0 0 0.45rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.24;
  letter-spacing: -0.03em;
  color: var(--text);
}

.cases-card__meta {
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--muted);
}

.cases-card__text {
  margin: 0 0 1.1rem;
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.52;
  color: var(--text);
}

.cases-card__cta {
  align-self: flex-start;
  padding: 0.35rem 0;
  border-bottom: 2px solid var(--yellow);
  color: var(--yellow-ink);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.cases-card__cta:hover {
  color: var(--text);
}
</style>
