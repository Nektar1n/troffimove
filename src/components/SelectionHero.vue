<script setup>
import { RouterLink } from 'vue-router';
import yellowBmwPng from '../assets/желтая бнв.png';
</script>

<template>
  <!-- pick-hero--in сразу: без useInView — кадр с opacity:0 и IO задерживали LCP/появление фото -->
  <section class="pick-hero pick-hero--in" aria-labelledby="pick-hero-title">
    <figure class="pick-hero__shot">
      <div class="pick-hero__surface">
        <img
          :src="yellowBmwPng"
          class="pick-hero__img"
          width="1376"
          height="768"
          alt="Желтый BMW: осмотр автомобиля перед сделкой"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
        />
        <div class="pick-hero__overlay" aria-hidden="true" />
      </div>
      <figcaption class="pick-hero__cap">
        <div class="pick-hero__box">
          <p class="pick-hero__eyebrow">Выезд · диагностика · отчёт</p>
          <h1 id="pick-hero-title" class="pick-hero__title">
            Подбор и проверка:
            <span class="pick-hero__title-accent">мы видим автомобили насквозь</span>
          </h1>
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
  top: calc(var(--pick-head-clear) + 4.75rem);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  background: #0a0a0c;
  opacity: 0;
  transform: translate3d(0, 6px, 0) scale(0.998);
  transition:
    opacity 0.7s var(--pick-ease),
    transform 0.75s var(--pick-ease);
  will-change: transform, opacity;
}

.pick-hero--in .pick-hero__surface {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
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
  .pick-hero__surface {
    top: calc(var(--pick-head-clear) + 7.25rem);
  }

  .pick-hero__img {
    object-position: 50% 74%;
  }
}

.pick-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(6, 6, 8, 0.35) 0%, rgba(6, 6, 8, 0.2) 42%, rgba(6, 6, 8, 0.45) 58%, rgba(4, 4, 5, 0.72) 100%),
    linear-gradient(100deg, rgba(10, 10, 12, 0.94) 0%, rgba(10, 10, 12, 0.35) 48%, transparent 72%);
  mix-blend-mode: multiply;
  pointer-events: none;
  opacity: 0.9;
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
  opacity: 0;
  transform: translate3d(0, 6px, 0) scale(0.998);
  transition:
    opacity 0.7s var(--pick-ease),
    transform 0.75s var(--pick-ease);
  will-change: transform, opacity;
}

.pick-hero--in .pick-hero__cap {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
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
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245, 196, 18, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
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
  text-shadow:
    0 2px 28px rgba(0, 0, 0, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.65);
}

@media (min-width: 900px) {
  .pick-hero__title {
    grid-column: 1 / 11;
    grid-row: 2;
    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 1.02;
  }
}

.pick-hero__title-accent {
  font-weight: 700;
  font-style: italic;
  color: var(--yellow);
}

.pick-hero__lead {
  margin: 0 0 0.9rem;
  max-width: 44rem;
  font-size: clamp(1rem, 2.8vw, 1.0625rem);
  line-height: 1.5;
  color: rgba(245, 245, 247, 0.72);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
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
  padding: 0.65rem 1.35rem;
  border-radius: 980px;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

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

@media (max-height: 520px) and (orientation: landscape) {
  .pick-hero {
    --pick-hero-slab: 100dvh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pick-hero__surface,
  .pick-hero__cap {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
