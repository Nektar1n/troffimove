<script setup>
import { onMounted, ref } from 'vue';
import desktopHeroPhoto from '../assets/ГлавноеФотоТроффимов.png';
import mobileHeroPhoto from '../assets/trofim.jpeg';
import SocialLinks from './SocialLinks.vue';
import TitleKeyTypewriter from './TitleKeyTypewriter.vue';
const mounted = ref(false);

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
            :src="desktopHeroPhoto"
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
              Подбор, выкуп и привоз авто
              <TitleKeyTypewriter class="hero__title-em" phrase="под ключ" once once-id="home-hero-accent" />
            </h1>
            <div class="hero__inline-media" aria-hidden="true">
              <picture>
                <source :srcset="mobileHeroPhoto" media="(max-width: 899px)" />
                <img
                  :src="desktopHeroPhoto"
                  class="hero__inline-img"
                  width="1920"
                  height="800"
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </picture>
              <div class="hero__inline-veil" />
            </div>
            <div class="hero__quote" :class="{ 'is-in': mounted }">
              <span class="hero__quote-mark" aria-hidden="true">“</span>
              <p class="hero__lead">
                Один контрагент по договору: ищем лот на аукционах и площадках, проверяем продавца и историю, согласуем цену,
                организуем оплату, выкуп, доставку до РФ, таможню и постановку на учёт. Фиксируем этапы, сроки и финальную
                сумму без «доплат по факту».
              </p>
              <p class="hero__lead-attrib">— Дмитрий Темирович</p>
            </div>
          </div>
          <div class="hero__dock">
            <div class="hero__cta">
              <div class="hero__actions" :class="{ 'is-in': mounted }">
                <a class="btn btn--primary" href="#contact">Написать нам</a>
                <a class="btn btn--ghost" href="#cases">Примеры сделок</a>
              </div>
            </div>
            <div class="hero__meta">
              <div class="hero__soc-row">
                <span class="hero__soc-label">Мы в соцсетях:</span>
                <SocialLinks class="hero__soc" :class="{ 'is-in': mounted }" variant="hero" />
              </div>
            </div>
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
  display: flex;
  flex-direction: column;
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

@media (min-width: 900px) {
  .hero__stage {
    min-height: min(100dvh, 1080px);
  }
}

/* После базовой высоты десктопа: ультраширокий экран — ниже сцена */
@media (min-aspect-ratio: 2 / 1) and (min-width: 900px) {
  .hero__stage {
    min-height: min(88dvh, min(1040px, 92vh));
  }

  .hero__bg-img {
    object-position: 40% 44%;
  }
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
  .hero::before {
    border-bottom: none;
  }

  .hero__stage {
    gap: 1rem;
    min-height: auto;
    box-shadow: none;
    background:
      radial-gradient(circle at top right, rgba(233, 190, 95, 0.16), transparent 34%),
      linear-gradient(180deg, #07080a 0%, #0a0b0d 100%);
  }

  .hero__media {
    display: none;
  }

  .hero__fore {
    order: 1;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding-top: calc(9.8rem + env(safe-area-inset-top, 0px));
    padding-bottom: 0;
  }

  .hero__inner {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: calc(100svh - 6.75rem);
  }

  .hero__swiss {
    flex: 1 1 auto;
    min-height: 0;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
  }

  .btn {
    width: 100%;
    min-width: 0;
    min-height: 3.1rem;
    padding-block: 0.85rem;
    padding-inline: 0.95rem;
    font-size: clamp(0.98rem, 3.5vw, 1.1rem);
  }

  .hero__eyebrow {
    display: none;
  }

  .hero__soc {
    margin-top: 0;
  }

  .hero__dock :deep(.soc) {
    gap: 0.45rem;
  }

  .hero__dock :deep(.soc__link) {
    width: 40px;
    height: 40px;
  }

}

@media (max-width: 380px) {
  .hero__fore {
    padding-top: calc(10.25rem + env(safe-area-inset-top, 0px));
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

.hero__inline-media {
  display: none;
}

.hero__inline-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero__inline-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__fore {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  padding: calc(7.5rem + env(safe-area-inset-top, 0px)) 0 1.85rem;
  box-sizing: border-box;
  pointer-events: auto;
}

.hero__inner {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
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
    flex: 1;
    min-height: 0;
    padding: calc(6.5rem + env(safe-area-inset-top, 0px)) 0 max(1.15rem, env(safe-area-inset-bottom, 0px));
  }

  .hero__inner {
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

/* 12 колонок: слева 10 (заголовок), справа 2 (узкий лид) — от ≥900px */
.hero__swiss {
  min-width: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

@media (min-width: 900px) {
  .hero__swiss {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1.75rem;
    row-gap: 0;
    align-items: start;
    align-content: start;
    /* Иначе колонка тянется на всю высоту героя — док «улетает» вниз, сдвиги margin незаметны */
    flex: 0 1 auto;
    min-height: 0;
    padding-bottom: clamp(2.75rem, 7vh, 5.65rem);
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
    font-size: clamp(3.45rem, 6.2vw, 6.25rem);
    line-height: 1.01;
  }

  .hero__swiss .hero__kicker {
    grid-column: 1 / 11;
    grid-row: 4;
    margin-top: 0.5rem;
    margin-bottom: 0;
    max-width: var(--hero-left-prose);
  }

  .hero__swiss .hero__quote {
    grid-column: 11 / 13;
    grid-row: 2 / 5;
    max-width: none;
    margin: 0;
    align-self: start;
  }

  .hero__swiss .hero__quote .hero__lead,
  .hero__swiss .hero__quote .hero__lead-attrib {
    font-size: clamp(0.86rem, 0.9vw, 0.98rem);
    line-height: 1.55;
    color: #fff;
    text-shadow: 0 1px 18px rgba(0, 0, 0, 0.35);
  }

  .hero__swiss .hero__quote .hero__lead-attrib {
    color: rgba(255, 255, 255, 0.92);
  }

  .hero__swiss .hero__quote-mark {
    font-size: clamp(3.1rem, 4.8vw, 4.25rem);
    line-height: 0.68;
    margin-bottom: 0.35rem;
    color: #ffd057;
    text-shadow: 0 0 32px rgba(233, 190, 95, 0.45);
  }
}

.hero__meta {
  min-width: 0;
  margin: 0;
}

.hero__dock {
  margin-top: auto;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-top: 0.75rem;
}

@media (min-width: 900px) {
  .hero__dock {
    margin-top: clamp(4.85rem, 14vh, 9rem);
    gap: 0.8rem;
    padding-top: 0;
  }
}

.hero__soc-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 1rem;
}

.hero__soc-label {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(245, 245, 247, 0.72);
}

.hero__dock :deep(.soc--hero) {
  margin-top: 0;
}

.hero__dock :deep(.soc__link) {
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 6px;
  color: #fff;
  background: rgba(8, 9, 11, 0.42);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero__dock :deep(.soc__link:hover) {
  border-color: rgba(233, 190, 95, 0.5);
  background: rgba(18, 19, 22, 0.78);
}

.hero__dock .btn--ghost {
  border-color: rgba(255, 255, 255, 0.26);
  background: rgba(8, 9, 11, 0.38);
}

.hero__dock .btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.34);
  background: rgba(18, 19, 22, 0.72);
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
  color: rgba(233, 190, 95, 0.92);
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
  font-size: clamp(2.85rem, 8.8vw, 4.55rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
  margin: 0 0 0.5rem;
  color: #fff;
  /* balance пересчитывается при каждом символе typewriter → лишняя третья строка на мобилке */
  text-wrap: wrap;
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

.hero__kicker {
  font-size: clamp(0.9rem, 2.2vw, 1.02rem);
  font-style: italic;
  line-height: 1.45;
  color: rgba(233, 190, 95, 0.88);
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

.hero__quote {
  max-width: 44rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.1s,
    transform 0.55s ease 0.1s;
}

.hero__quote.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__quote-mark {
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.35rem, 7vw, 3.1rem);
  line-height: 0.72;
  font-weight: 400;
  color: #f2c75c;
  margin: 0 0 0.35rem;
  letter-spacing: -0.04em;
  text-shadow: 0 0 28px rgba(233, 190, 95, 0.22);
}

.hero__lead {
  font-size: clamp(1rem, 2.8vw, 1.0625rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.97);
  margin: 0;
  max-width: 44rem;
  font-weight: 400;
}

.hero__lead-attrib {
  margin: 0.75rem 0 0;
  max-width: 44rem;
  font-size: clamp(0.95rem, 2.5vw, 1.02rem);
  line-height: 1.45;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.94);
  letter-spacing: 0.01em;
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

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(3rem, 5.5vw, 3.65rem);
  padding: clamp(0.85rem, 1.9vw, 1.05rem) clamp(1.15rem, 3.2vw, 1.85rem);
  border-radius: clamp(0.95rem, 1.9vw, 1.2rem);
  font-weight: 600;
  font-size: clamp(1rem, 2.3vw, 1.2rem);
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
  .hero__inline-media {
    position: relative;
    display: block;
    width: 100%;
    max-width: min(28rem, 100%);
    aspect-ratio: 16 / 10;
    margin: 1rem 0 0;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 1.5rem;
    box-shadow: 0 28px 56px -36px rgba(0, 0, 0, 0.92);
    overflow: hidden;
  }

  .hero__inline-img {
    object-position: 50% 24%;
  }

  .hero__inline-veil {
    background:
      linear-gradient(180deg, rgba(5, 6, 7, 0.08) 0%, rgba(5, 6, 7, 0.1) 44%, rgba(5, 6, 7, 0.46) 100%),
      linear-gradient(90deg, rgba(5, 6, 7, 0.08) 0%, rgba(5, 6, 7, 0) 30%, rgba(5, 6, 7, 0.14) 100%);
  }

  .hero__fore {
    padding-bottom: 1.35rem;
  }

  .hero__title {
    margin-bottom: 0.35rem;
  }

  .hero__quote {
    margin-top: 0.75rem;
    max-width: 100%;
  }

  .hero__quote .hero__lead,
  .hero__quote .hero__lead-attrib {
    font-size: clamp(0.72rem, 3.2vw, 0.82rem);
    line-height: 1.42;
  }

  .hero__quote-mark {
    font-size: clamp(2.1rem, 9vw, 2.65rem);
    margin-bottom: 0.2rem;
  }
}

@media (max-width: 380px) {
  .hero__inline-img {
    object-position: 50% 20%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__eyebrow,
  .hero__title,
  .hero__kicker,
  .hero__quote,
  .hero__soc,
  .hero__stage,
  .hero__actions {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
