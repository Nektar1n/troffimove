<script setup>
import { RouterLink } from 'vue-router';
import { selectionHeroUrl } from '../utils/selectionHeroImage.js';
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
          alt="Audi: осмотр автомобиля перед сделкой"
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
            Подбор и проверка б/у до сделки: видим риски до перевода денег
          </h1>
          <p class="pick-hero__lead">
            Приезжаем к объявлению, снимаем кузов и узлы на сканере, проверяем юридическую чистоту и сервисную
            историю. В конце — понятный письменный вердикт: брать, торговаться или уходить.
          </p>
          <div class="pick-hero__actions">
            <a class="pick-hero__btn pick-hero__btn--primary" href="#contact">Оставить заявку</a>
            <RouterLink class="pick-hero__btn pick-hero__btn--ghost" to="/">На главную →</RouterLink>
          </div>
        </div>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
/* Как баннер «Дорога к вашему авто» на /import: полный кадр, тёмный градиент, текст снизу */
.pick-hero {
  --pick-ease: cubic-bezier(0.33, 1, 0.68, 1);
  /* Mobile-first: до 820px шапка в две строки (.head__mob) — с запасом. ≥820px — одна строка */
  --pick-head-clear: calc(7.5rem + env(safe-area-inset-top, 0px));
  /* min выше, чтобы flex-end клок текста на узких экранах не «вылезал» в зону fixed header */
  --pick-hero-slab: clamp(300px, 58vh, 620px);
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

@media (min-width: 820px) {
  .pick-hero {
    --pick-head-clear: calc(3.4rem + env(safe-area-inset-top, 0px));
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
  object-position: 50% 42%;
  /* смотрит вправо: исходник ориентирован влево */
  transform: scaleX(-1);
}

.pick-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(6, 6, 8, 0) 0%, rgba(6, 6, 8, 0.4) 55%, rgba(4, 4, 5, 0.75) 100%),
    linear-gradient(100deg, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.18) 58%, transparent 75%);
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
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: clamp(1.05rem, 3.6vw, 2.2rem) 0
    max(1.15rem, calc(0.35rem + env(safe-area-inset-bottom, 0px)));
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

.pick-hero__box {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  box-sizing: border-box;
  /* Воздух сверху над «Выезд · диагностика · отчёт» (текстовый блок прижат снизу, блок растёт вверх) */
  padding-top: clamp(2rem, 6vw, 3.75rem);
  padding-bottom: 0;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  pointer-events: auto;
}

@media (min-width: 720px) {
  .pick-hero__box {
    padding-top: clamp(2.25rem, 5.5vw, 4rem);
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

@media (min-width: 1200px) {
  .pick-hero__box {
    padding-top: clamp(2.5rem, 4.5vw, 4.25rem);
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

.pick-hero__eyebrow {
  margin: 0 0 0.9rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 197, 66, 0.95);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.45);
}

.pick-hero__title {
  margin: 0 0 0.9rem;
  max-width: 20ch;
  font-weight: 600;
  font-size: clamp(1.8rem, 4.2vw, 2.9rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
  color: rgba(252, 252, 255, 0.99);
  text-shadow: 0 1px 18px rgba(0, 0, 0, 0.35);
}

@media (min-width: 640px) {
  .pick-hero__title {
    max-width: 22ch;
  }
}

.pick-hero__lead {
  margin: 0 0 1.35rem;
  max-width: 40rem;
  font-size: clamp(0.9rem, 1.9vw, 1.1rem);
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: rgba(245, 245, 247, 0.8);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.45);
}

.pick-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.pick-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.35rem;
  border-radius: 980px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.pick-hero__btn:active {
  transform: scale(0.98);
}

.pick-hero__btn--primary {
  background: #f5c542;
  color: #111;
  border: 1px solid #f5c542;
}

.pick-hero__btn--primary:hover {
  opacity: 0.92;
}

.pick-hero__btn--ghost {
  background: transparent;
  color: rgba(245, 245, 247, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.pick-hero__btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}

@media (max-height: 520px) and (orientation: landscape) {
  .pick-hero {
    /* Чуть больше высоты «полки», иначе многострочный заголовок + шапка снова сходятся */
    --pick-hero-slab: min(48vh, 320px);
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
