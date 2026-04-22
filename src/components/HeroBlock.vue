<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import trofimPhoto from '../assets/trofim.jpeg';
import SocialLinks from './SocialLinks.vue';

const mounted = ref(false);
onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});
</script>

<template>
  <section class="hero">
    <div class="hero__layout">
      <div class="hero__primary">
        <p class="hero__eyebrow" :class="{ 'is-in': mounted }">Troffimove Auto · Корея · Европа · Япония</p>
        <h1 class="hero__title" :class="{ 'is-in': mounted }">
          Подбор, выкуп и привоз авто <span class="hero__title-em">под ключ</span>
        </h1>
        <p class="hero__kicker" :class="{ 'is-in': mounted }">
          Один контрагент по договору: смета, этапы и сопровождение до постановки на учёт — без «сюрпризов» по деньгам.
        </p>
        <p class="hero__lead" :class="{ 'is-in': mounted }">
          Один контрагент по договору: ищем лот на аукционах и площадках, проверяем продавца и историю, согласуем цену,
          организуем оплату, выкуп, доставку до РФ, таможню и постановку на учёт. Фиксируем этапы, сроки и финальную сумму
          без «доплат по факту».
        </p>
        <SocialLinks class="hero__soc" :class="{ 'is-in': mounted }" variant="hero" />
      </div>

      <figure class="hero__figure" :class="{ 'is-in': mounted }">
        <div class="hero__frame">
          <img :src="trofimPhoto" width="640" height="800" alt="Трофим" class="hero__img" loading="eager" decoding="async" />
        </div>
        <figcaption class="hero__caption">
          <span class="hero__caption-name">Дмитрий Темирович</span>
          <span class="hero__caption-role">Troffimove Auto · личное сопровождение сделки</span>
        </figcaption>
      </figure>

      <div class="hero__body">
        <ul class="hero__list" :class="{ 'is-in': mounted }">
          <li>Корея: Encar, проверка пробега и сервиса, типовые контракты и страхование груза.</li>
          <li>Европа: дилеры и брокеры, полный VIN-отчёт, комплектация и сервисная книга до отправки.</li>
          <li>Япония: аукционные листы (USS, TAA и др.), оценка кузова и салона, расчёт утильсбора заранее.</li>
          <li>Один менеджер ведёт сделку от заявки до ключей; отчёты по этапам.</li>
        </ul>
        <div class="hero__actions" :class="{ 'is-in': mounted }">
          <a class="btn btn--primary" href="#contact">Написать нам</a>
          <a class="btn btn--ghost" href="#cases">Примеры сделок</a>
        </div>
        <p class="hero__subcta" :class="{ 'is-in': mounted }">
          <RouterLink class="hero__subcta-link" to="/podbor">Подбор и проверка б/у на месте →</RouterLink>
        </p>
      </div>

      <aside class="hero__aside" :class="{ 'is-in': mounted }" aria-label="Схема поставки">
        <p class="hero__aside-label">Цепочка</p>
        <ol class="hero__steps">
          <li><span>1</span> Бриф и бюджет</li>
          <li><span>2</span> Подбор и осмотр</li>
          <li><span>3</span> Выкуп и документы</li>
          <li><span>4</span> Логистика в РФ</li>
          <li><span>5</span> Таможня и учёт</li>
        </ol>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 0;
  min-height: min(100vh, 100dvh);
  /* До 819px: .head__mob (вторая строка) — больший зазор под fixed header */
  padding: calc(7.5rem + env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-left, 0px)) 2.5rem
    max(1rem, env(safe-area-inset-right, 0px));
  max-width: var(--content-max);
  margin: 0 auto;
  background: transparent;
  color: rgba(245, 245, 247, 0.92);
  border-bottom: none;
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
  z-index: -1;
  pointer-events: none;
  background: var(--surface-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__layout {
  display: grid;
  gap: 1.75rem;
  align-items: start;
}

@media (min-width: 820px) {
  .hero {
    padding-top: calc(5.5rem + env(safe-area-inset-top, 0px));
  }
}

@media (min-width: 900px) {
  .hero {
    padding-top: calc(6.5rem + env(safe-area-inset-top, 0px));
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
    padding-bottom: 3.5rem;
  }

  .hero__layout {
    grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
    grid-template-rows: auto 1fr;
    column-gap: 3rem;
    row-gap: 2rem;
  }

  .hero__primary {
    grid-column: 1;
    grid-row: 1;
  }

  .hero__figure {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }

  .hero__body {
    grid-column: 1;
    grid-row: 2;
  }

  .hero__aside {
    grid-column: 2;
    grid-row: 2;
    align-self: start;
  }
}

.hero__primary {
  min-width: 0;
}

.hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245, 196, 18, 0.95);
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
  font-size: clamp(2rem, 6.5vw, 3.75rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  margin: 0 0 0.5rem;
  color: #fff;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.04s,
    transform 0.55s ease 0.04s;
}

@media (min-width: 900px) {
  .hero__title {
    font-size: clamp(2.35rem, 3.8vw, 3.75rem);
  }
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
  margin: 0 0 1rem;
  max-width: 40rem;
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
  color: rgba(245, 245, 247, 0.68);
  margin: 0;
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

.hero__figure {
  margin: 0;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.08s,
    transform 0.55s ease 0.08s;
}

.hero__figure.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__frame {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.hero__img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 18%;
  display: block;
}

@media (min-width: 900px) {
  .hero__img {
    aspect-ratio: 3 / 4;
    min-height: 280px;
  }
}

.hero__caption {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-top: none;
  background: rgba(10, 10, 12, 0.95);
}

.hero__caption-name {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fff;
}

.hero__caption-role {
  font-size: 0.75rem;
  line-height: 1.35;
  color: rgba(245, 245, 247, 0.55);
}

.hero__body {
  min-width: 0;
}

.hero__list {
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: clamp(0.875rem, 2.4vw, 0.9375rem);
  line-height: 1.45;
  color: rgba(245, 245, 247, 0.88);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.14s,
    transform 0.55s ease 0.14s;
}

.hero__list.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__list li {
  position: relative;
  padding-left: 1rem;
}

.hero__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--yellow);
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

.hero__aside {
  padding-top: 0.25rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.2s,
    transform 0.55s ease 0.2s;
}

@media (min-width: 900px) {
  .hero__aside {
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }
}

.hero__aside.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__aside-label {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(245, 196, 18, 0.9);
}

.hero__steps {
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgba(245, 245, 247, 0.85);
}

.hero__steps li {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  margin-bottom: 0.45rem;
}

.hero__steps span {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--yellow);
  min-width: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .hero__eyebrow,
  .hero__title,
  .hero__kicker,
  .hero__lead,
  .hero__soc,
  .hero__figure,
  .hero__list,
  .hero__actions,
  .hero__aside,
  .hero__subcta {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
