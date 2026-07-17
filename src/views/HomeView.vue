<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import FaqSection from '../components/FaqSection.vue';
import HeroBlock from '../components/HeroBlock.vue';
import HomeHeroStats from '../components/HomeHeroStats.vue';
import CasesSection from '../components/CasesSection.vue';
import ReviewsSection from '../components/ReviewsSection.vue';
import ContactForm from '../components/ContactForm.vue';
import ImIcon from '../components/ImIcon.vue';

/** Совпадает с брейкпоинтом сетки «Почему мы?» */
const WHY_US_MOBILE_MAX = 719;

const whyUsCards = [
  {
    icon: 'search',
    title: 'Честная экспертиза',
    text: 'По подбору даём прямой вердикт по машине: что в порядке, что критично, где есть повод торговаться.',
  },
  {
    icon: 'truck',
    title: 'Привоз под ключ',
    text: 'Закрываем весь путь от аукциона до выдачи ключей в РФ: выкуп, логистика, таможня, документы.',
  },
  {
    icon: 'brief',
    title: 'Фиксация бюджета',
    text: 'Считаем итоговую стоимость заранее и держим вас в контуре расходов без неожиданных доплат в конце.',
  },
  {
    icon: 'check',
    title: 'Репутация важнее сделки',
    text: 'Если авто не проходит по состоянию или истории — рекомендуем отказаться, даже когда это не в нашу пользу.',
  },
  {
    icon: 'doc',
    title: 'Фото, видео, отчёты',
    text: 'Показываем реальную картину по каждому этапу: осмотр, диагностика, отгрузка, движение и получение.',
  },
  {
    icon: 'sign',
    title: 'Сильный торг',
    text: 'Используем факты из диагностики и рынка, чтобы снижать цену и забирать автомобиль на лучших условиях.',
  },
  {
    icon: 'key',
    title: 'Юрчистота и безопасность',
    text: 'Проверяем историю, ограничения и документы до оплаты, чтобы вы входили в сделку без скрытых рисков.',
  },
  {
    icon: 'chat',
    title: 'Сервис по-человечески',
    text: 'Объясняем понятным языком, отвечаем быстро и ведём вас как партнёра, а не как номер в очереди.',
  },
];

const whyUsPage = ref(0);
const whyUsScrollEl = ref(null);

/** Ширина окна для расчёта числа карточек на слайд (2 на мобилке, 4 от tablet). */
const whyUsViewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);

const whyUsPageSize = computed(() =>
  whyUsViewportWidth.value <= WHY_US_MOBILE_MAX ? 2 : 4,
);

const whyUsPages = computed(() => {
  const size = whyUsPageSize.value;
  const pages = [];
  for (let i = 0; i < whyUsCards.length; i += size) {
    pages.push(whyUsCards.slice(i, i + size));
  }
  return pages;
});

const whyUsPageCount = computed(() => Math.max(1, whyUsPages.value.length));

let whyUsScrollRaf = 0;

function refreshWhyUsViewport() {
  if (typeof window === 'undefined') return;
  whyUsViewportWidth.value = window.innerWidth;
}

function prefersReducedScrollMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** instant — без анимации (ресайз, первый кадр) */
function scrollWhyUsToPage(pageIndex, instant = false) {
  const el = whyUsScrollEl.value;
  if (!el) return;
  const w = el.clientWidth;
  if (w < 1) return;
  const reduced = prefersReducedScrollMotion();
  el.scrollTo({ left: pageIndex * w, behavior: instant || reduced ? 'auto' : 'smooth' });
}

function syncWhyUsPageFromScroll() {
  const el = whyUsScrollEl.value;
  if (!el) return;
  const w = el.clientWidth;
  if (w < 1) return;
  const idx = Math.round(el.scrollLeft / w);
  const maxIdx = whyUsPageCount.value - 1;
  const clamped = Math.min(maxIdx, Math.max(0, idx));
  if (clamped !== whyUsPage.value) whyUsPage.value = clamped;
}

function onWhyUsScroll() {
  if (whyUsScrollRaf) return;
  whyUsScrollRaf = requestAnimationFrame(() => {
    whyUsScrollRaf = 0;
    syncWhyUsPageFromScroll();
  });
}

function prevWhyUsPage() {
  const n = whyUsPageCount.value;
  const to = whyUsPage.value <= 0 ? n - 1 : whyUsPage.value - 1;
  whyUsPage.value = to;
  scrollWhyUsToPage(to);
}

function nextWhyUsPage() {
  const n = whyUsPageCount.value;
  const to = whyUsPage.value >= n - 1 ? 0 : whyUsPage.value + 1;
  whyUsPage.value = to;
  scrollWhyUsToPage(to);
}

function onWhyUsResize() {
  refreshWhyUsViewport();
  const maxIdx = whyUsPageCount.value - 1;
  whyUsPage.value = Math.min(whyUsPage.value, maxIdx);
  nextTick(() => scrollWhyUsToPage(whyUsPage.value, true));
}

onMounted(() => {
  refreshWhyUsViewport();
  requestAnimationFrame(() => scrollWhyUsToPage(whyUsPage.value, true));
  window.addEventListener('resize', onWhyUsResize, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWhyUsResize);
});
</script>

<template>
  <main class="home-main">
    <HeroBlock class="home-main__hero" />
    <HomeHeroStats class="home-main__stats" />

    <section class="home-split home-main__split" aria-label="Направления работы">
      <div class="home-split__inner">
        <RouterLink class="home-split__card" to="/privoz">
          <span class="home-split__label">Привоз</span>
          <span class="home-split__text">Аукционы, логистика, таможня и учёт в РФ — весь цикл под ключ.</span>
          <span class="home-split__go">Перейти в раздел <span class="home-split__go-ico" aria-hidden="true">→</span></span>
        </RouterLink>
        <RouterLink class="home-split__card" to="/podbor">
          <span class="home-split__label">Подбор</span>
          <span class="home-split__text">Выездная проверка и сопровождение покупки б/у на местном рынке.</span>
          <span class="home-split__go">Перейти в раздел <span class="home-split__go-ico" aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </section>

    <section class="why-us home-main__why-us" aria-labelledby="why-us-title">
      <div class="why-us__inner">
        <div class="why-us__head">
          <div class="why-us__head-text">
            <p class="why-us__kicker">Подбор + привоз</p>
            <h2 id="why-us-title" class="why-us__title">Почему мы?</h2>
          </div>
          <div class="why-us__nav" role="group" aria-label="Переключение слайда">
            <button type="button" class="why-us__nav-btn" aria-label="Предыдущий слайд" @click="prevWhyUsPage">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" class="why-us__nav-btn" aria-label="Следующий слайд" @click="nextWhyUsPage">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div class="why-us__carousel">
          <div
            ref="whyUsScrollEl"
            class="why-us__scroll"
            tabindex="-1"
            role="region"
            aria-roledescription="карусель"
            :aria-label="`Преимущества, слайд ${whyUsPage + 1} из ${whyUsPageCount}`"
            @scroll.passive="onWhyUsScroll"
          >
            <div class="why-us__scroll-track">
              <div v-for="(pageCards, pi) in whyUsPages" :key="pi" class="why-us__scroll-page">
                <div class="why-us__grid" role="list">
                  <article v-for="card in pageCards" :key="card.title" class="why-us__card" role="listitem">
                    <span class="why-us__icon" aria-hidden="true"><ImIcon :name="card.icon" size="m" /></span>
                    <p class="why-us__card-title">{{ card.title }}</p>
                    <p class="why-us__card-text">{{ card.text }}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CasesSection
      class="home-main__cases"
      section-id="cases"
      title="Успешные сделки"
      lead="Смешанная выборка: часть сделок про привоз из Кореи, Японии и Европы, часть — про осмотр и сопровождение покупки на месте."
      scope="home"
      cta-label="Все сделки"
      :cta-to="{ path: '/cases' }"
      :card-cta-to="{ path: '/', hash: '#contact' }"
    />
    <ReviewsSection class="home-main__reviews" />
    <FaqSection class="home-main__faq" />
    <ContactForm class="home-main__contact" />
  </main>
</template>

<style scoped>
.home-main {
  display: flex;
  flex-direction: column;
}

.home-main__hero {
  order: 10;
}

.home-main__stats {
  order: 20;
}

.home-main__split {
  order: 30;
}

.home-main__why-us {
  order: 35;
}

.home-main__cases {
  order: 40;
}

.home-main__reviews {
  order: 50;
}

.home-main__faq {
  order: 60;
}

.home-main__contact {
  order: 70;
}

@media (min-width: 1080px) {
  .home-main__cases {
    order: 35;
  }

  .home-main__why-us {
    order: 40;
  }
}

.home-split {
  padding: 0.75rem max(1rem, env(safe-area-inset-left, 0px)) 2.1rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
  background: var(--bg);
}

@media (min-width: 720px) {
  .home-split {
    padding-top: 0.825rem;
    padding-bottom: 2.35rem;
  }
}

.home-split__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .home-split__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.home-split__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1.2rem 1.25rem 1.3rem 1.35rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  border-left: 3px solid var(--yellow);
  background: var(--color-milk);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-shadow: none;
}

.home-split__card:hover {
  border-color: rgba(15, 15, 16, 0.22);
  background: #fafaf9;
}

.home-split__card:focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 2px;
}

.home-split__label {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--text);
}

.home-split__text {
  font-size: 0.925rem;
  line-height: 1.5;
  color: var(--muted);
  flex: 1 1 auto;
}

.home-split__go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  min-height: 40px;
  padding: 0.45rem 0.95rem 0.45rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--yellow-ink);
  background: var(--yellow);
  border: 1px solid color-mix(in srgb, var(--yellow) 72%, var(--text) 28%);
  border-radius: 999px;
  width: max-content;
  max-width: 100%;
  transition: filter 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.home-split__go-ico {
  position: relative;
  top: 0.5px;
  line-height: 0;
  font-size: 1.05em;
  opacity: 0.9;
}

.home-split__card:hover .home-split__go {
  background: var(--yellow-hover);
  border-color: #b8930e;
  filter: none;
}

.why-us {
  padding: 2.25rem max(1rem, env(safe-area-inset-left, 0px)) 2.4rem max(1rem, env(safe-area-inset-right, 0px));
  background: var(--bg);
  border-top: 1px solid var(--line-light);
  border-bottom: 1px solid var(--line-light);
}

.why-us__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.why-us__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}

.why-us__head-text {
  flex: 1 1 min(18rem, 100%);
  min-width: 0;
}

.why-us__kicker {
  margin: 0 0 0.5rem;
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.why-us__title {
  margin: 0;
  color: var(--text);
  font-family: var(--font-hero);
  font-size: clamp(1.7rem, 5.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.015em;
}

.why-us__nav {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.45rem;
}

.why-us__nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--color-milk);
  color: var(--text);
  font-size: 1.15rem;
  line-height: 1;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.why-us__nav-btn:hover {
  border-color: color-mix(in srgb, var(--yellow) 55%, var(--line) 45%);
  background: color-mix(in srgb, var(--yellow) 14%, white 86%);
  color: var(--yellow-ink);
}

.why-us__nav-btn:focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 2px;
}

.why-us__carousel {
  position: relative;
  min-height: 12rem;
}

.why-us__scroll {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: none;
}

.why-us__scroll::-webkit-scrollbar {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .why-us__scroll {
    scroll-behavior: auto;
  }
}

.why-us__scroll-track {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.why-us__scroll-page {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.why-us__grid {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  align-items: stretch;
}

.why-us__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  border-radius: 14px;
  padding: 1.05rem 1.05rem 1.08rem;
  border: 1px solid var(--border-dark);
  background: var(--color-graphite);
  box-shadow:
    0 1px 0 rgb(var(--color-milk-rgb) / 0.06) inset,
    0 14px 28px -22px rgb(0 0 0 / 0.45);
}

.why-us__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  margin: 0 0 0.6rem;
  border: 1px solid rgb(var(--color-milk-rgb) / 0.18);
  background: rgb(var(--color-milk-rgb) / 0.08);
}

.why-us__icon :deep(.im-icon) {
  color: var(--yellow);
}

.why-us__card-title {
  margin: 0;
  color: var(--text-on-dark);
  font-size: 1.14rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.26;
}

.why-us__card-text {
  margin: 0.5rem 0 0;
  color: var(--muted-on-dark);
  font-size: 1rem;
  line-height: 1.58;
}

@media (min-width: 720px) {
  .why-us {
    padding-top: 2.6rem;
    padding-bottom: 2.75rem;
  }

  .why-us__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .why-us__carousel {
    min-height: 10rem;
  }
}

@media (min-width: 1080px) {
  .why-us__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1fr);
    gap: 0.95rem;
  }

  .why-us__nav-btn {
    width: 2.85rem;
    height: 2.85rem;
    font-size: 1.2rem;
  }
}
</style>
