<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import mainHeroPhoto from '../assets/главныйгерой.jpg';
import SocialLinks from './SocialLinks.vue';

const mounted = ref(false);
onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});

const stats = [
  { n: '1200+', t: 'авто доставлено клиентам' },
  { n: '14', t: 'стран-источников поставки' },
  { n: '48 ч', t: 'до первого отчёта по лоту' },
  { n: '1', t: 'менеджер на всю сделку' },
];
</script>

<template>
  <section class="hero">
    <div class="hero__stage" :class="{ 'is-in': mounted }">
      <div class="hero__media" aria-hidden="true">
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
        <div class="hero__veil" />
      </div>
      <div class="hero__fore">
        <div class="hero__inner">
          <div class="hero__swiss">
            <p class="hero__eyebrow" :class="{ 'is-in': mounted }">Troffimove Auto · Корея · Европа · Япония</p>
            <h1 class="hero__title" :class="{ 'is-in': mounted }">
              Подбор, выкуп и привоз авто <span class="hero__title-em">под ключ</span>
            </h1>
            <p class="hero__kicker" :class="{ 'is-in': mounted }">
              Один контрагент по договору: смета, этапы и сопровождение до постановки на учёт — без «сюрпризов» по деньгам.
            </p>
            <p class="hero__lead" :class="{ 'is-in': mounted }">
              Один контрагент по договору: ищем лот на аукционах и площадках, проверяем продавца и историю, согласуем цену,
              организуем оплату, выкуп, доставку до РФ, таможню и постановку на учёт. Фиксируем этапы, сроки и финальную
              сумму без «доплат по факту».
            </p>
            <div class="hero__meta">
              <SocialLinks class="hero__soc" :class="{ 'is-in': mounted }" variant="hero" />
              <p class="hero__byline">Дмитрий Темирович <span class="hero__byline-sep" aria-hidden="true">·</span> Troffimove Auto — личное сопровождение сделки</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__down">
      <div class="hero__inner">
        <div
          id="stats"
          class="hero__stats"
          :class="{ 'hero__stats--in': mounted }"
          aria-label="Показатели"
        >
          <div
            v-for="(s, i) in stats"
            :key="s.t"
            class="hero__stat"
            :style="{ transitionDelay: `${i * 0.08}s` }"
          >
            <span class="hero__stat-n">{{ s.n }}</span>
            <span class="hero__stat-t">{{ s.t }}</span>
          </div>
        </div>
        <div class="hero__cta">
          <div class="hero__actions" :class="{ 'is-in': mounted }">
            <a class="btn btn--primary" href="#contact">Написать нам</a>
            <a class="btn btn--ghost" href="#cases">Примеры сделок</a>
          </div>
          <p class="hero__subcta" :class="{ 'is-in': mounted }">
            <RouterLink class="hero__subcta-link" to="/podbor">Подбор и проверка б/у на месте →</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 0;
  min-height: min(100vh, 100dvh);
  /* Без max-width: иначе фон «обрезан» полосами по бокам */
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background: transparent;
  color: rgba(245, 245, 247, 0.92);
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
  background: var(--surface-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* Сцена: фото на 100% ширины, текст вверху слоем; высоту даёт .hero__fore */
.hero__stage {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: min(64vh, 700px);
  background: #050506;
  opacity: 0;
  transform: translate3d(0, 4px, 0);
  transition:
    opacity 0.6s ease 0.04s,
    transform 0.65s cubic-bezier(0.33, 1, 0.68, 1) 0.04s;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
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

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
      100deg,
      rgba(2, 2, 3, 0.94) 0%,
      rgba(2, 2, 3, 0.58) 38%,
      rgba(2, 2, 3, 0.2) 68%,
      rgba(2, 2, 3, 0.4) 100%
    ),
    linear-gradient(180deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.1) 38%, rgba(3, 3, 4, 0.82) 100%);
}

.hero__fore {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  padding: calc(7.5rem + env(safe-area-inset-top, 0px)) 0 2.25rem;
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
    padding: calc(6.5rem + env(safe-area-inset-top, 0px)) 0 2.75rem;
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
    font-size: clamp(2.75rem, 4.4vw, 4.4rem);
    line-height: 1.03;
  }

  .hero__swiss .hero__kicker {
    grid-column: 1 / 11;
    grid-row: 3;
    margin-bottom: 0;
    max-width: var(--hero-left-prose);
  }

  .hero__swiss .hero__lead {
    grid-column: 11 / 13;
    grid-row: 2 / 4;
    max-width: none;
    margin: 0;
    align-self: start;
    font-size: clamp(0.86rem, 0.9vw, 0.95rem);
    line-height: 1.5;
  }

  .hero__swiss .hero__meta {
    display: block;
    grid-column: 1 / 11;
    grid-row: 4;
    margin-top: 1.3rem;
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
  color: rgba(245, 245, 247, 0.7);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
}

@media (max-width: 899px) {
  .hero__byline {
    margin-top: 1.1rem;
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
  background: var(--surface-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__stat {
  padding: 0.75rem 0;
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
  color: var(--yellow);
  font-variant-numeric: tabular-nums;
}

.hero__stat-t {
  font-size: 0.8125rem;
  line-height: 1.35;
  color: rgba(245, 245, 247, 0.55);
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
  color: rgba(245, 196, 18, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
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
  font-size: clamp(2.2rem, 7.1vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  margin: 0 0 0.5rem;
  color: #fff;
  text-shadow:
    0 2px 28px rgba(0, 0, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.65);
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
  line-height: 1.45;
  color: rgba(245, 196, 18, 0.92);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
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
  color: rgba(245, 245, 247, 0.72);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
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
  border-color: rgba(255, 255, 255, 0.22);
  color: #fff;
  background: rgba(0, 0, 0, 0.35);
}

.hero :deep(.soc__link:hover) {
  border-color: rgba(245, 196, 18, 0.55);
  background: rgba(255, 255, 255, 0.06);
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
  font-size: 0.875rem;
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
  color: var(--yellow);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.hero__subcta-link:hover {
  text-decoration: underline;
  color: var(--yellow-hover);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.65rem 1.35rem;
  border-radius: 980px;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

/* Hover только у основной кнопки; «Примеры сделок» (ghost) — без притемнения */
.btn--primary:hover {
  opacity: 0.85;
}

.btn--primary {
  color: var(--yellow-ink);
  background: var(--yellow);
  border: 1px solid var(--yellow);
}

.btn--ghost {
  color: rgba(245, 245, 247, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
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
