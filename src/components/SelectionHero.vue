<script setup>
import { RouterLink } from 'vue-router';
import { selectionHeroUrl } from '../utils/selectionHeroImage.js';
import TitleKeyTypewriter from './TitleKeyTypewriter.vue';
</script>

<template>
  <!-- pick-hero--in сразу: без useInView — кадр с opacity:0 и IO задерживали LCP/появление фото -->
  <section class="pick-hero pick-hero--in" aria-labelledby="pick-hero-title">
    <figure class="pick-hero__shot">
      <div class="pick-hero__surface">
        <img
          :src="selectionHeroUrl"
          class="pick-hero__img"
          width="1376"
          height="768"
          alt="BMW: осмотр автомобиля перед сделкой"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div class="pick-hero__overlay" aria-hidden="true" />
      </div>
      <figcaption class="pick-hero__cap">
        <div class="pick-hero__box">
          <p class="pick-hero__eyebrow">Выезд · диагностика · отчёт</p>
          <h1 id="pick-hero-title" class="pick-hero__title">
            Подбор и проверка:
            <TitleKeyTypewriter
              class="pick-hero__title-accent"
              phrase="видим автомобили насквозь"
              wrap
              once
              once-id="page-podbor-hero-accent"
              :start-delay-ms="210"
              :char-delay-ms="46"
              :caret-hide-delay-ms="260"
            />
          </h1>
          <div class="pick-hero__inline-media" aria-hidden="true">
            <img
              :src="selectionHeroUrl"
              class="pick-hero__inline-img"
              width="1376"
              height="768"
              alt=""
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
            <div class="pick-hero__inline-veil" />
          </div>
          <p class="pick-hero__lead">
            Приезжаем к объявлению, снимаем кузов и узлы на сканере, проверяем юридическую чистоту и сервисную
            историю. В конце — понятный письменный вердикт: брать, торговаться или уходить.
          </p>
          <div class="pick-hero__actions">
            <a class="btn btn--primary" href="#contact">Оставить заявку</a>
            <RouterLink class="btn btn--ghost" to="/">На главную →</RouterLink>
          </div>
        </div>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
/* Как баннер привоза / герой главной: тот же слот под шапку и типографика */
.pick-hero {
  --pick-ease: cubic-bezier(0.33, 1, 0.68, 1);
  --pick-head-clear: calc(3.4rem + env(safe-area-inset-top, 0px));
  --pick-hero-slab: 100dvh;
  box-sizing: border-box;
  width: 100vw;
  max-width: 100%;
  margin-left: calc(50% - 50vw);
  position: relative;
  z-index: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #f5f5f7;
  overflow-x: clip;
  overflow-y: visible;
  background: #0a0a0c;
}

/* 21:9 и шире: полный 100dvh + cover сильно режут кадр — ниже слой и мягче сдвиг фото */
@media (min-aspect-ratio: 2 / 1) {
  .pick-hero {
    --pick-hero-slab: min(100dvh, clamp(560px, 78dvh, 940px));
  }
}

.pick-hero__shot {
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  max-width: none;
  /* Отрицательный margin: баннер под шапку; padding НЕ влияет на abspos — смещение в .pick-hero__surface / __cap */
  margin: calc(0px - var(--pick-head-clear)) 0 0 0;
  padding: 0;
  min-height: calc(var(--pick-head-clear) + var(--pick-hero-slab));
  border: 0;
  background: #0a0a0c;
}

.pick-hero__surface {
  position: absolute;
  top: var(--pick-head-clear);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  background: #0a0a0c;
}

.pick-hero__img {
  display: block;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  object-position: 50% 72%;
  /* смотрит вправо: исходник ориентирован влево */
  transform: scaleX(-1);
}

@media (min-width: 900px) {
  /* Ниже в кадре — воздух между заголовком и машиной */
  .pick-hero__img {
    object-position: 50% 94%;
    transform: scaleX(-1) translateY(3.25rem);
  }
}

@media (min-width: 900px) and (min-aspect-ratio: 2 / 1) {
  .pick-hero__img {
    object-position: 50% 82%;
    transform: scaleX(-1) translateY(1.85rem);
  }
}

.pick-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(5, 6, 7, 0.92) 0%, rgba(5, 6, 7, 0.54) 46%, rgba(5, 6, 7, 0.14) 72%),
    linear-gradient(180deg, rgba(5, 6, 7, 0.28) 0%, rgba(5, 6, 7, 0.12) 44%, rgba(5, 6, 7, 0.8) 100%);
  pointer-events: none;
  opacity: 1;
}

.pick-hero__inline-media {
  display: none;
  position: relative;
}

.pick-hero__inline-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 54% 58%;
  transform: scaleX(-1);
  position: relative;
  z-index: 0;
}

.pick-hero__inline-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.pick-hero__cap {
  position: absolute;
  top: var(--pick-head-clear);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: calc(9.25rem + env(safe-area-inset-top, 0px)) 0
    max(2.6rem, calc(1.2rem + env(safe-area-inset-bottom, 0px)));
  max-width: 100%;
  text-align: left;
  text-wrap: balance;
  pointer-events: none;
  margin: 0;
}

@media (min-width: 820px) {
  .pick-hero__cap {
    padding-top: calc(7rem + env(safe-area-inset-top, 0px));
  }
}

@media (min-width: 900px) {
  .pick-hero__cap {
    padding-top: calc(8rem + env(safe-area-inset-top, 0px));
  }
}

.pick-hero__box {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0 max(1rem, env(safe-area-inset-right, 0px));
  pointer-events: auto;
}

@media (min-width: 720px) {
  .pick-hero__box {
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

@media (min-width: 900px) {
  .pick-hero__box {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1.75rem;
    row-gap: 0;
    align-items: start;
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

.pick-hero__eyebrow {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(233, 190, 95, 0.92);
}

@media (min-width: 900px) {
  .pick-hero__eyebrow {
    grid-column: 1 / 11;
    grid-row: 1;
  }
}

.pick-hero__title {
  margin: 0 0 0.5rem;
  max-width: min(64rem, 100%);
  font-weight: 600;
  font-size: clamp(2.4rem, 7.6vw, 3.9rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  color: #fff;
  text-wrap: wrap;
}

@media (min-width: 900px) {
  .pick-hero__title {
    grid-column: 1 / 11;
    grid-row: 2;
    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 1.02;
  }
}

.pick-hero__lead {
  margin: 0 0 0.9rem;
  max-width: 44rem;
  font-size: clamp(1rem, 2.8vw, 1.0625rem);
  line-height: 1.5;
  color: rgba(245, 245, 247, 0.62);
}

@media (min-width: 900px) {
  .pick-hero__lead {
    grid-column: 11 / 13;
    grid-row: 2 / 4;
    max-width: none;
    margin: 0;
    align-self: start;
    font-size: clamp(0.86rem, 0.9vw, 0.95rem);
    line-height: 1.5;
  }
}

.pick-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

@media (max-width: 899px) {
  .pick-hero__eyebrow {
    display: none;
  }

  .pick-hero__shot {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: auto;
    padding: 0 0 max(1.4rem, calc(0.7rem + env(safe-area-inset-bottom, 0px)));
    background:
      radial-gradient(circle at top right, rgba(233, 190, 95, 0.16), transparent 34%),
      linear-gradient(180deg, #08090b 0%, #0a0b0d 100%);
  }

  .pick-hero__surface {
    display: none;
  }

  .pick-hero__cap {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    order: 1;
    padding: calc(9.8rem + env(safe-area-inset-top, 0px)) 0 0;
  }

  .pick-hero__title {
    max-width: 100%;
    min-width: 0;
    font-size: clamp(2.3rem, 10vw, 3.4rem);
    line-height: 1.02;
    overflow-wrap: anywhere;
  }

  .pick-hero__inline-media {
    position: relative;
    display: block;
    width: calc(100% + max(1rem, env(safe-area-inset-left, 0px)) + max(1rem, env(safe-area-inset-right, 0px)));
    max-width: none;
    aspect-ratio: 16 / 10;
    margin: 1rem calc(-1 * max(1rem, env(safe-area-inset-right, 0px))) 1rem
      calc(-1 * max(1rem, env(safe-area-inset-left, 0px)));
    border: 0;
    border-radius: 0;
    box-shadow: none;
    overflow: hidden;
    background: #0a0a0c;
  }

  .pick-hero__inline-media::before,
  .pick-hero__inline-media::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
  }

  .pick-hero__inline-media::before {
    top: 0;
    height: clamp(2.25rem, 14%, 4.5rem);
    background: linear-gradient(180deg, #0a0a0c 0%, rgba(10, 10, 12, 0) 100%);
  }

  .pick-hero__inline-media::after {
    bottom: 0;
    height: clamp(2.75rem, 22%, 6rem);
    background: linear-gradient(0deg, #0a0a0c 0%, rgba(10, 10, 12, 0) 100%);
  }

  .pick-hero__inline-veil {
    display: none;
  }

  .pick-hero__lead {
    max-width: 100%;
    margin-bottom: 1rem;
    font-size: clamp(0.68rem, 3.1vw, 0.78rem);
    line-height: 1.38;
  }

  .pick-hero__actions {
    gap: 0.75rem;
  }

  .btn {
    min-height: 46px;
    padding: 0.78rem 1.15rem;
  }
}

@media (max-width: 380px) {
  .pick-hero__cap {
    padding-top: calc(10.3rem + env(safe-area-inset-top, 0px));
  }
}

@media (min-width: 900px) {
  .pick-hero__actions {
    grid-column: 1 / 11;
    grid-row: 3;
    margin-top: 1.1rem;
  }
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

@media (max-height: 520px) and (orientation: landscape) {
  .pick-hero {
    --pick-hero-slab: 100dvh;
  }
}

</style>
