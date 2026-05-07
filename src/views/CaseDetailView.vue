<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getCaseById } from '../data/cases.js';

const route = useRoute();

const caseItem = computed(() => getCaseById(String(route.params.id || '')));
const pageTitle = computed(() => (caseItem.value ? caseItem.value.model : 'Сделка не найдена'));
const activeImageIndex = ref(0);

const specialistName = 'Сергей Язев';

const serviceLabel = computed(() => {
  if (!caseItem.value) return '';
  return caseItem.value.type === 'selection' ? 'Подбор автомобиля' : 'Привоз автомобиля';
});

const completionDate = computed(() => (caseItem.value?.type === 'selection' ? '8 апреля 2026' : '16 марта 2026'));

const activeImage = computed(() => {
  if (!caseItem.value?.gallery?.length) return '';
  return caseItem.value.gallery[activeImageIndex.value] || caseItem.value.gallery[0];
});

watch(
  () => caseItem.value?.id,
  () => {
    activeImageIndex.value = 0;
  },
);
</script>

<template>
  <main class="case-detail">
    <section v-if="caseItem" class="case-detail__hero">
      <div class="case-detail__inner">
        <h1 class="case-detail__title">{{ pageTitle }}</h1>
      </div>
    </section>

    <section v-if="caseItem" class="case-detail__content">
      <div class="case-detail__inner">
        <div class="case-detail__layout">
          <div class="case-detail__gallery">
            <figure class="case-detail__hero-shot">
              <img :src="activeImage" :alt="`Основное фото: ${caseItem.model}`" decoding="async" />
            </figure>
            <div class="case-detail__thumbs">
              <button
                v-for="(img, idx) in caseItem.gallery"
                :key="`${caseItem.id}-${idx}`"
                type="button"
                class="case-detail__thumb"
                :class="{ 'case-detail__thumb--active': idx === activeImageIndex }"
                @click="activeImageIndex = idx"
              >
                <img :src="img" :alt="`Фото ${idx + 1}: ${caseItem.model}`" loading="lazy" decoding="async" />
              </button>
            </div>
            <div class="case-detail__description">
              <h2 class="case-detail__section-title">Описание сделки</h2>
              <p class="case-detail__service-text">{{ caseItem.description }}</p>
              <h3 class="case-detail__sub-title">{{ caseItem.serviceLabel }}</h3>
              <ol class="case-detail__workflow">
                <li v-for="(step, i) in caseItem.workflow" :key="`${caseItem.id}-step-${i}`">{{ step }}</li>
              </ol>
            </div>
          </div>

          <aside class="case-detail__side">
            <div class="case-detail__person">
              <p><span>Специалист:</span> {{ specialistName }}</p>
              <p><span>Услуга:</span> {{ serviceLabel }}</p>
              <p><span>Дата выполнения:</span> {{ completionDate }}</p>
            </div>
            <div class="case-detail__specs-wrap">
              <h2 class="case-detail__section-title">Характеристики</h2>
              <dl class="case-detail__specs">
                <div v-for="row in caseItem.specs" :key="row.label" class="case-detail__spec-row">
                  <dt>{{ row.label }}:</dt>
                  <dd>{{ row.value }}</dd>
                </div>
              </dl>
            </div>
            <div class="case-detail__status">Автомобиль рекомендован и приобретен клиентом</div>
            <RouterLink
              class="case-detail__cta case-detail__cta--full"
              :to="caseItem.type === 'selection' ? { path: '/podbor', hash: '#contact' } : { path: '/privoz', hash: '#contact' }"
            >
              Хочу такой же
            </RouterLink>
            <RouterLink class="case-detail__cta case-detail__cta--ghost case-detail__cta--full" to="/cases">Смотреть все сделки</RouterLink>
          </aside>
        </div>

        <div class="case-detail__service">
          <h2 class="case-detail__section-title">Кратко по задаче</h2>
          <p class="case-detail__service-text">{{ caseItem.meta }}</p>
          <p class="case-detail__service-text">{{ caseItem.serviceDescription }}</p>
        </div>
      </div>
    </section>

    <section v-if="!caseItem" class="case-detail__missing">
      <div class="case-detail__inner">
        <h1 class="case-detail__title">Сделка не найдена</h1>
        <p class="case-detail__lead">Проверьте ссылку или вернитесь к общему списку успешных сделок.</p>
        <RouterLink class="case-detail__cta" to="/cases">Вернуться к сделкам</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.case-detail {
  background: var(--surface-dark);
  color: var(--text-on-dark);
}

.case-detail__inner {
  max-width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0 max(1rem, env(safe-area-inset-right, 0px));
}

.case-detail__hero {
  padding: 6.7rem 0 1.35rem;
  background: var(--surface-dark);
  border-bottom: 1px solid var(--border-dark);
}

.case-detail__title {
  margin: 0;
  font-size: clamp(1.8rem, 4.3vw, 2.9rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.case-detail__content {
  padding: 1.25rem 0 2.6rem;
}

.case-detail__layout {
  display: grid;
  gap: 1.15rem;
}

.case-detail__hero-shot {
  margin: 0;
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--surface-panel);
}

.case-detail__hero-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-detail__thumbs {
  margin-top: 0.55rem;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.45rem;
}

.case-detail__thumb {
  margin: 0;
  padding: 0;
  border: 1px solid var(--border-dark);
  background: var(--surface-panel);
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;
}

.case-detail__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-detail__thumb--active {
  border-color: var(--yellow);
}

.case-detail__side {
  padding: 1rem;
  border: 1px solid var(--border-dark);
  border-radius: 10px;
  background: var(--surface-panel);
}

.case-detail__person {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border-dark);
}

.case-detail__person p {
  margin: 0 0 0.45rem;
  font-size: 0.92rem;
}

.case-detail__person p:last-child {
  margin-bottom: 0;
}

.case-detail__person span {
  color: var(--muted-on-dark);
}

.case-detail__specs-wrap {
  padding: 0.95rem 0;
}

.case-detail__section-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  color: var(--text-on-dark);
}

.case-detail__specs {
  margin: 0;
}

.case-detail__spec-row {
  display: block;
  padding: 0.26rem 0;
}

.case-detail__spec-row dt,
.case-detail__spec-row dd {
  display: inline;
  margin: 0;
}

.case-detail__spec-row dt {
  color: var(--muted-on-dark);
}

.case-detail__spec-row dd {
  color: var(--text-on-dark);
  font-weight: 600;
}

.case-detail__status {
  margin-top: 0.3rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  color: rgba(114, 227, 152, 0.95);
  font-weight: 600;
}

.case-detail__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.65rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid var(--yellow);
  background: var(--yellow);
  color: var(--yellow-ink);
  text-decoration: none;
  font-weight: 600;
  margin-top: 0.75rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.case-detail__cta:hover {
  background: var(--yellow-hover);
  border-color: var(--yellow-hover);
}

.case-detail__cta--full {
  width: 100%;
}

.case-detail__cta--ghost {
  background: transparent;
  border-color: var(--border-dark);
  color: var(--text-on-dark);
}

.case-detail__cta--ghost:hover {
  background: var(--surface-panel-2);
  border-color: var(--border-dark-strong);
}

.case-detail__description {
  margin-top: 1rem;
}

.case-detail__sub-title {
  margin: 1rem 0 0.45rem;
  font-size: 1rem;
}

.case-detail__service {
  margin-top: 1.2rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--border-dark);
  background: var(--surface-panel);
}

.case-detail__service-text {
  margin: 0 0 0.6rem;
  line-height: 1.52;
  color: rgb(var(--color-milk-rgb) / 0.84);
}

.case-detail__service-text:last-child {
  margin-bottom: 0;
}

.case-detail__workflow {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  color: var(--muted-on-dark);
}

.case-detail__missing {
  padding: 7rem 0 3rem;
}

@media (min-width: 960px) {
  .case-detail__layout {
    grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.82fr);
    align-items: start;
  }
}
</style>
