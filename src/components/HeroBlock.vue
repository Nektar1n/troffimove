<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import mainHeroPhoto from '../assets/главныйгерой.jpg';
import mobileHeroPhoto from '../assets/trofim.jpeg';
import SocialLinks from './SocialLinks.vue';
import { STATS_LINE, formatStatValue } from '../data/statsLine.js';
import { useStatsCountup } from '../composables/useStatsCountup.js';
import { useInView } from '../composables/useInView.js';

const mounted = ref(false);
const statCountStarted = ref(false);
const { el: heroDownRef, visible: heroDownInView } = useInView({
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
});

const { values: statValues, done: statCountDone, start: startStatCount } = useStatsCountup();

const statNumberLines = computed(() =>
  statValues.value.map((v, i) => formatStatValue(i, v, statCountDone.value))
);

watch(
  heroDownInView,
  (v) => {
    if (v && !statCountStarted.value) {
      statCountStarted.value = true;
      startStatCount();
    }
  },
  { immediate: true },
);

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});
</script>

<template>
  <section class="hero">
    <div class="hero__stage" :class="{ 'is-in': mounted }">
      <div class="hero__media" aria-hidden="true">
        <picture>
          <source :srcset="mobileHeroPhoto" media="(max-width: 899px)" />
          <img
            :src="mainHeroPhoto"
            class="hero__bg-img"
            width="1920"
            height="800"
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
        <div class="hero__veil" />
      </div>
      <div class="hero__fore">
        <div class="hero__inner">
          <div class="hero__swiss">
            <p class="hero__eyebrow" :class="{ 'is-in': mounted }">Troffimove Auto · Корея · Европа · Япония</p>
            <h1 class="hero__title" :class="{ 'is-in': mounted }">
              Подбор, выкуп и привоз авто <span class="hero__title-em">под ключ</span>
            </h1>
            <div class="hero__cta">
              <div class="hero__actions" :class="{ 'is-in': mounted }">
                <a class="btn btn--primary" href="#contact">Написать нам</a>
                <a class="btn btn--ghost" href="#cases">Примеры сделок</a>
              </div>
              <p class="hero__subcta" :class="{ 'is-in': mounted }">
                <RouterLink class="hero__subcta-link" to="/podbor">Подбор и проверка б/у на месте →</RouterLink>
              </p>
            </div>
            <p class="hero__lead" :class="{ 'is-in': mounted }">
              Один контрагент по договору: ищем лот на аукционах и площадках, проверяем продавца и историю, согласуем цену,
              организуем оплату, выкуп, доставку до РФ, таможню и постановку на учёт. Фиксируем этапы, сроки и финальную
              сумму без «доплат по факту».
            </p>
            <div class="hero__meta">
              <SocialLinks class="hero__soc" :class="{ 'is-in': mounted }" variant="hero" />
              <p class="hero__byline">Дмитрий Темирович<span class="hero__byline-sep" aria-hidden="true"></span> </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__down" ref="heroDownRef">
      <div class="hero__inner">
        <div
          id="stats"
          class="hero__stats"
          :class="{ 'hero__stats--in': heroDownInView }"
          aria-label="Показатели"
        >
          <div
            v-for="(s, i) in STATS_LINE"
            :key="s.t"
            class="hero__stat"
            :style="{ transitionDelay: `${i * 0.08}s` }"
          >
            <span class="hero__stat-n">{{ statNumberLines[i] }}</span>
            <span class="hero__stat-t">{{ s.t }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-bg: #050607;
  --hero-surface: #0f1013;
  --hero-border: rgba(255, 255, 255, 0.1);
  --hero-text: rgba(245, 245, 247, 0.92);
  --hero-muted: rgba(245, 245, 247, 0.62);

  position: relative;
  z-index: 0;
  min-height: min(100vh, 100dvh);
  /* Без max-width: иначе фон «обрезан» полосами по бокам */
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background: transparent;
  color: var(--hero-text);
  border-bottom: none;
  overflow-x: clip;
}

.hero::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
  background: var(--hero-bg);
  border-bottom: 1px solid var(--hero-border);
}

/* Сцена: фото на 100% ширины, текст вверху слоем; высоту даёт .hero__fore */
.hero__stage {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: min(78vh, 860px);
  background: var(--hero-bg);
  opacity: 0;
  transform: translate3d(0, 4px, 0);
  transition:
    opacity 0.6s ease 0.04s,
    transform 0.65s cubic-bezier(0.33, 1, 0.68, 1) 0.04s;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
}

.hero__stage.is-in {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.hero__bg-img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  object-position: 40% 32%;
  /* отзеркалить сцену (человек / логотип) */
  transform: scaleX(-1) scale(1.03);
  transform-origin: 50% 50%;
}

@media (max-width: 899px) {
  .hero__swiss {
    min-height: calc(min(108svh, 56rem) - (8.1rem + env(safe-area-inset-top, 0px)) - 2.75rem);
  }

  .hero__stage {
    min-height: min(108svh, 56rem);
  }

  .hero__bg-img {
    inset: 0.9rem 0 0;
    height: calc(100% - 0.9rem);
    object-fit: contain;
    object-position: center bottom;
    transform: translateY(-4.2rem);
  }

  .hero__fore {
    padding-top: calc(8.1rem + env(safe-area-inset-top, 0px));
    padding-bottom: 2.75rem;
  }

  .hero__cta {
    margin-top: auto;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
  }

  .btn {
    width: 100%;
    min-width: 0;
    padding-inline: 0.9rem;
  }

  .hero__subcta {
    margin-top: 0.8rem;
    text-align: left;
  }

  .hero__meta {
    margin-top: 1rem;
  }

  .hero__soc {
    margin-top: 0;
  }

  .hero :deep(.soc) {
    gap: 0.45rem;
  }

  .hero :deep(.soc__link) {
    width: 40px;
    height: 40px;
  }

  .hero__byline {
    margin-top: 0.8rem;
    font-size: 0.74rem;
    color: rgba(245, 245, 247, 0.5);
  }
}

@media (max-width: 380px) {
  .hero__bg-img {
    transform: translateY(-6.4rem);
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5, 6, 7, 0.92) 0%, rgba(5, 6, 7, 0.58) 42%, rgba(5, 6, 7, 0.14) 72%),
    linear-gradient(180deg, rgba(5, 6, 7, 0.3) 0%, rgba(5, 6, 7, 0.1) 44%, rgba(5, 6, 7, 0.78) 100%);
}

.hero__fore {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  padding: calc(7.5rem + env(safe-area-inset-top, 0px)) 0 2.5rem;
  box-sizing: border-box;
  pointer-events: auto;
}

.hero__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
}

@media (min-width: 820px) {
  .hero__fore {
    padding-top: calc(5.5rem + env(safe-area-inset-top, 0px));
  }
}

@media (min-width: 900px) {
  .hero__fore {
    padding: calc(6.5rem + env(safe-area-inset-top, 0px)) 0 3rem;
  }

  .hero__inner {
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

/* 12 колонок: слева 10 (заголовок), справа 2 (узкий лид) — от ≥900px */
.hero__swiss {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .hero__swiss {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1.75rem;
    row-gap: 0;
    align-items: start;
    /* Узкая мера для жёлтой строки (заголовок — отдельно, --hero-title-w) */
    --hero-left-prose: min(32rem, 100%);
    --hero-title-w: min(64rem, 100%);
  }

  .hero__swiss .hero__eyebrow {
    grid-column: 1 / 11;
    grid-row: 1;
  }

  .hero__swiss .hero__title {
    grid-column: 1 / 11;
    grid-row: 2;
    max-width: var(--hero-title-w);
    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 1.02;
  }

  .hero__swiss .hero__cta {
    grid-column: 1 / 11;
    grid-row: 3;
    margin-top: 1.25rem;
    margin-bottom: 0;
    align-self: start;
  }

  .hero__swiss .hero__kicker {
    grid-column: 1 / 11;
    grid-row: 4;
    margin-top: 0.5rem;
    margin-bottom: 0;
    max-width: var(--hero-left-prose);
  }

  .hero__swiss .hero__lead {
    grid-column: 11 / 13;
    grid-row: 2 / 6;
    max-width: none;
    margin: 0;
    align-self: start;
    font-size: clamp(0.86rem, 0.9vw, 0.95rem);
    line-height: 1.5;
  }

  .hero__swiss .hero__meta {
    display: block;
    grid-column: 1 / 11;
    grid-row: 5;
    margin-top: 1.35rem;
  }
}

.hero__meta {
  min-width: 0;
}

.hero__byline {
  margin: 0.85rem 0 0;
  max-width: 40rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color: rgba(245, 245, 247, 0.58);
}

@media (max-width: 899px) {
  .hero__byline {
    margin-top: 0.8rem;
  }

  .hero__swiss .hero__cta {
    margin-bottom: 0;
  }

  .hero__lead {
    display: none;
  }
  
  .hero__down {
    padding-bottom: 2rem;
  }

  .hero__stats {
    margin-top: 0.25rem;
  }
}

.hero__byline-sep {
  color: rgba(245, 196, 18, 0.55);
  font-weight: 500;
  padding: 0 0.1em;
}

.hero__down {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 0 2.5rem;
}

@media (min-width: 900px) {
  .hero__down {
    padding: 0 0 3.5rem;
  }
}

/* Как в StatsRow: тёмный фон на всю ширину экрана + сетка 2×2 / 4 в ряд */
.hero__stats {
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
  .hero__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    padding: 1.5rem 0 2.25rem;
  }
}

.hero__stats::before {
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
  /* Как .hero::before, не --surface-dark-2 (сероватый) */
  background: #0a0b0d;
  border-top: 1px solid var(--hero-border);
  border-bottom: 1px solid var(--hero-border);
}

.hero__stat {
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
  .hero__stat {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.25rem 1.75rem;
  }

  .hero__stat:first-child {
    padding-left: 0;
  }

  .hero__stat:last-child {
    border-right: none;
    padding-right: 0;
  }
}

.hero__stats--in .hero__stat {
  opacity: 1;
  transform: translateY(0);
}

.hero__stat-n {
  font-weight: 600;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.03em;
  color: rgba(245, 245, 247, 0.95);
  font-variant-numeric: tabular-nums;
}

.hero__stat-t {
  font-size: 0.8125rem;
  line-height: 1.35;
  color: rgba(245, 245, 247, 0.48);
  max-width: 12rem;
}

.hero__cta {
  min-width: 0;
  padding: 0;
}

.hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245, 196, 18, 0.92);
  margin: 0 0 0.85rem;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.hero__eyebrow.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__title {
  font-weight: 600;
  font-size: clamp(2.4rem, 7.6vw, 3.9rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  margin: 0 0 0.5rem;
  color: #fff;
  text-wrap: balance;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.04s,
    transform 0.55s ease 0.04s;
}

.hero__title.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__title-em {
  font-weight: 700;
  font-style: italic;
  color: var(--yellow);
}

.hero__kicker {
  font-size: clamp(0.9rem, 2.2vw, 1.02rem);
  font-style: italic;
  line-height: 1.45;
  color: rgba(245, 196, 18, 0.88);
  margin: 0 0 1rem;
  max-width: min(32rem, 100%);
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.5s ease 0.08s,
    transform 0.5s ease 0.08s;
}

.hero__kicker.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__lead {
  font-size: clamp(1rem, 2.8vw, 1.0625rem);
  line-height: 1.5;
  color: var(--hero-muted);
  margin: 0;
  max-width: 44rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.1s,
    transform 0.55s ease 0.1s;
}

.hero__lead.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__soc {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.55s ease 0.12s,
    transform 0.55s ease 0.12s;
}

.hero__soc.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero :deep(.soc__link) {
  border-color: rgba(255, 255, 255, 0.14);
  color: #fff;
  background: rgba(13, 14, 16, 0.78);
}

.hero :deep(.soc__link:hover) {
  border-color: rgba(245, 196, 18, 0.4);
  background: rgba(18, 19, 22, 0.92);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.18s,
    transform 0.55s ease 0.18s;
}

.hero__actions.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__subcta {
  margin: 0.85rem 0 0;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.55s ease 0.2s,
    transform 0.55s ease 0.2s;
}

.hero__subcta.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__subcta-link {
  color: rgba(245, 245, 247, 0.84);
  text-decoration: none;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.hero__subcta-link:hover {
  color: var(--yellow);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.7rem 1.2rem;
  border-radius: 0.9rem;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn--primary:hover {
  background: var(--yellow-hover);
  border-color: var(--yellow-hover);
}

.btn--primary {
  color: var(--yellow-ink);
  background: var(--yellow);
  border: 1px solid var(--yellow);
}

.btn--ghost {
  color: rgba(245, 245, 247, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(12, 13, 15, 0.72);
}

.btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(18, 19, 22, 0.9);
}

@media (max-width: 899px) {
  .hero__fore {
    padding-bottom: 1.8rem;
  }

  .hero__stats {
    margin-bottom: 1.25rem;
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
  }

  .hero__stat {
    gap: 0.28rem;
  }

  .hero__title {
    margin-bottom: 0.35rem;
  }

  .hero__subcta {
    margin-top: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__eyebrow,
  .hero__title,
  .hero__kicker,
  .hero__lead,
  .hero__soc,
  .hero__stage,
  .hero__actions,
  .hero__subcta,
  .hero__stat {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
