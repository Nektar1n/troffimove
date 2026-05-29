<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import TitleKeyTypewriter from './TitleKeyTypewriter.vue';
import { useInView } from '../composables/useInView.js';
import { normalizeBrandSvg } from '../utils/svgNormalize.js';
import imgTruck from '../assets/фура.png';
import imgTruckUltrawide from '../assets/расширеннаяФура.PNG';
import audi from '../../node_modules/simple-icons/icons/audi.svg?raw';
import bmw from '../../node_modules/simple-icons/icons/bmw.svg?raw';
import volkswagen from '../../node_modules/simple-icons/icons/volkswagen.svg?raw';
import hyundai from '../../node_modules/simple-icons/icons/hyundai.svg?raw';
import kia from '../../node_modules/simple-icons/icons/kia.svg?raw';
import honda from '../../node_modules/simple-icons/icons/honda.svg?raw';
import nissan from '../../node_modules/simple-icons/icons/nissan.svg?raw';
import toyota from '../../node_modules/simple-icons/icons/toyota.svg?raw';

/** На низких экранах меньше «низового» отступа — блок чаще корректно входит во viewport */
const { el, visible: heroVisible } = useInView({ rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
const { el: mapEl, visible: mapVisible } = useInView({ rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

const PATH_MS = 480;
const GAP_MS = 85;
const START_MS = 180;

const path1Delay = START_MS;
const path2Delay = START_MS + PATH_MS + GAP_MS;
const path3Delay = path2Delay + PATH_MS + GAP_MS;

const litEurope = ref(false);
const litRussia = ref(false);
const litKorea = ref(false);
const litJapan = ref(false);
const woven = ref(false);

let timers = [];

function clearTimers() {
  timers.forEach((id) => clearTimeout(id));
  timers = [];
}

function isDrawAnim(ev) {
  return String(ev?.animationName ?? '').includes('routes-draw');
}

/** Линия «выходит» из Европы — первая точка загорается */
function onSeg1DrawStart(ev) {
  if (!isDrawAnim(ev)) return;
  litEurope.value = true;
}

/** Конец сегмента = линия дошла до следующей точки */
function onRouteDrawEnd(segment, ev) {
  if (!isDrawAnim(ev)) return;
  if (segment === 1) litRussia.value = true;
  else if (segment === 2) litKorea.value = true;
  else if (segment === 3) {
    litJapan.value = true;
    clearTimers();
    timers.push(
      setTimeout(() => {
        woven.value = true;
      }, 720),
    );
  }
}

watch(mapVisible, (v) => {
  clearTimers();
  litEurope.value = false;
  litRussia.value = false;
  litKorea.value = false;
  litJapan.value = false;
  woven.value = false;

  if (!v) return;

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    litEurope.value = true;
    litRussia.value = true;
    litKorea.value = true;
    litJapan.value = true;
    woven.value = true;
  }
});

onUnmounted(() => clearTimers());

const d1 = 'M 102 208 C 208 178 318 152 412 172';
const d2 = 'M 412 172 C 528 148 648 198 748 220';
const d3 = 'M 748 220 C 868 198 982 168 1088 152';

const brandSets = {
  eu: [
    { id: 'audi', svg: normalizeBrandSvg(audi), x: '-2.8rem', y: '-1.75rem' },
    { id: 'bmw', svg: normalizeBrandSvg(bmw), x: '0rem', y: '-2.5rem' },
    { id: 'vw', svg: normalizeBrandSvg(volkswagen), x: '2.8rem', y: '-1.75rem' },
  ],
  kr: [
    { id: 'hyundai', svg: normalizeBrandSvg(hyundai), x: '-2.25rem', y: '-1.95rem' },
    { id: 'kia', svg: normalizeBrandSvg(kia), x: '2.25rem', y: '-1.95rem' },
  ],
  jp: [
    { id: 'toyota', svg: normalizeBrandSvg(toyota), x: '-2.9rem', y: '-1.65rem' },
    { id: 'honda', svg: normalizeBrandSvg(honda), x: '0rem', y: '-2.45rem' },
    { id: 'nissan', svg: normalizeBrandSvg(nissan), x: '2.9rem', y: '-1.65rem' },
  ],
};

const euBrands = computed(() => brandSets.eu);
const krBrands = computed(() => brandSets.kr);
const jpBrands = computed(() => brandSets.jp);
</script>

<template>
  <section
    id="routes"
    ref="el"
    class="routes"
    :class="{ 'routes--in': heroVisible, 'routes--map-in': mapVisible, 'routes--woven': woven }"
    :style="{ '--path-draw-ms': `${PATH_MS}ms` }"
    aria-labelledby="routes-heading"
  >
    <figure class="routes__truck" :class="{ 'routes__truck--in': heroVisible }">
      <div class="routes__truck-surface">
        <picture>
          <source
            :srcset="imgTruckUltrawide"
            media="(min-width: 900px) and (min-aspect-ratio: 21/9)"
          />
          <img
            :src="imgTruck"
            class="routes__truck-img"
            width="1600"
            height="900"
            alt="Автовоз с автомобилями: доставка по маршруту"
            decoding="async"
          />
        </picture>
        <div class="routes__truck-overlay" aria-hidden="true" />
      </div>
      <figcaption class="routes__truck-cap">
        <div class="routes__truck-box">
          <h2 id="routes-heading" class="routes__truck-heading">
            <span class="routes__truck-line">
              Привоз авто под ключ
              <span class="routes__truck-amp"> — </span>
            </span>
            <TitleKeyTypewriter
              class="routes__truck-accent"
              phrase="без посредников"
              :active="heroVisible"
              once
              once-id="home-routes-truck-accent"
              :start-delay-ms="210"
              :char-delay-ms="46"
              :caret-hide-delay-ms="260"
            />
          </h2>
          <div class="routes__truck-inline-media" aria-hidden="true">
            <picture>
              <source
                :srcset="imgTruckUltrawide"
                media="(min-width: 900px) and (min-aspect-ratio: 21/9)"
              />
              <img
                :src="imgTruck"
                class="routes__truck-inline-img"
                width="1600"
                height="900"
                alt=""
                decoding="async"
              />
            </picture>
            <div class="routes__truck-inline-veil" />
          </div>
          <p class="routes__truck-deck">
            Европа, Россия, Корея, Япония: контроль груза и сроков на всём пути
          </p>
          <div class="routes__truck-actions">
            <a class="btn btn--primary" href="#contact">Оставить заявку</a>
            <RouterLink class="btn btn--ghost" to="/">На главную →</RouterLink>
          </div>
        </div>
      </figcaption>
    </figure>

    <div ref="mapEl" class="routes__content">
    <div class="routes__stage" aria-hidden="true">
      <!-- Общая коробка: ширина SVG = ширина слоя с точками (иначе при max-height линия «уезжает») -->
      <div class="routes__map">
        <svg class="routes__svg" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <!-- Тонкое эхо только по акценту (без широкой подложки — не смешивается с пунктиром) -->
        <path
          :d="d1"
          class="routes__echo routes__echo--seg1"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path1Delay + 40}ms` }"
        />
        <path
          :d="d2"
          class="routes__echo routes__echo--seg2"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path2Delay + 40}ms` }"
        />
        <path
          :d="d3"
          class="routes__echo routes__echo--seg3"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path3Delay + 40}ms` }"
        />

        <path
          :d="d1"
          class="routes__path routes__path--seg1"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path1Delay}ms` }"
          @animationstart="onSeg1DrawStart"
          @animationend="(e) => onRouteDrawEnd(1, e)"
        />
        <path
          :d="d2"
          class="routes__path routes__path--seg2"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path2Delay}ms` }"
          @animationend="(e) => onRouteDrawEnd(2, e)"
        />
        <path
          :d="d3"
          class="routes__path routes__path--seg3"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path3Delay}ms` }"
          @animationend="(e) => onRouteDrawEnd(3, e)"
        />
        </svg>

        <div class="routes__nodes">
          <div class="routes__node routes__node--eu" :class="{ 'routes__node--lit': litEurope }">
            <div class="routes__logos" aria-hidden="true">
              <span
                v-for="brand in euBrands"
                :key="brand.id"
                class="routes__logo"
                :style="{ '--logo-x': brand.x, '--logo-y': brand.y }"
                v-html="brand.svg"
              />
            </div>
            <span class="routes__dot" />
            <span class="routes__name">Европа</span>
          </div>
          <div class="routes__node routes__node--ru" :class="{ 'routes__node--lit': litRussia }">
            <span class="routes__marker routes__marker--ru" aria-hidden="true">
              <span class="routes__hub-wave" />
              <span class="routes__dot" />
            </span>
            <span class="routes__name">Россия</span>
          </div>
          <div class="routes__node routes__node--kr" :class="{ 'routes__node--lit': litKorea }">
            <div class="routes__logos" aria-hidden="true">
              <span
                v-for="brand in krBrands"
                :key="brand.id"
                class="routes__logo"
                :style="{ '--logo-x': brand.x, '--logo-y': brand.y }"
                v-html="brand.svg"
              />
            </div>
            <span class="routes__dot" />
            <span class="routes__name">Корея</span>
          </div>
          <div class="routes__node routes__node--jp" :class="{ 'routes__node--lit': litJapan }">
            <div class="routes__logos" aria-hidden="true">
              <span
                v-for="brand in jpBrands"
                :key="brand.id"
                class="routes__logo"
                :style="{ '--logo-x': brand.x, '--logo-y': brand.y }"
                v-html="brand.svg"
              />
            </div>
            <span class="routes__dot" />
            <span class="routes__name">Япония</span>
          </div>
        </div>
      </div>
    </div>

    
    </div>
  </section>
</template>

<style scoped>
.routes {
  --path-ease: cubic-bezier(0.33, 1, 0.68, 1);
  --routes-bg: var(--color-graphite);
  --routes-surface: var(--color-graphite);
  --routes-surface-2: var(--color-graphite);
  --routes-border: rgb(var(--color-milk-rgb) / 0.1);
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-bottom: 0;
  border-top: 0;
  border-bottom: 0;
  background: var(--routes-bg);
  color: rgb(var(--color-milk-rgb) / 0.88);
  overflow-x: clip;
  overflow-y: visible;
}

@media (min-width: 720px) {
  .routes {
    padding-bottom: 0;
  }
}

.routes__content {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0;
  margin-top: 0;
  transform: none;
  padding-top: 0;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  padding-bottom: 0.1rem;
  border-top: 0;
  background: var(--color-milk);
}

@media (min-width: 720px) {
  .routes__content {
    margin-top: 0;
    padding-top: 0;
    padding-left: max(1rem, env(safe-area-inset-left, 0px));
    padding-right: max(1rem, env(safe-area-inset-right, 0px));
  }
}

@media (min-width: 1200px) {
  .routes__content {
    padding-left: max(1rem, env(safe-area-inset-left, 0px));
    padding-right: max(1rem, env(safe-area-inset-right, 0px));
  }
}

/* Кинематика: кадр залезает под фиксированное меню (как у hero) */
.routes__truck {
  /* Меньше захода под шапку — кадр визуально ниже, важная часть фуры не «под» меню */
  --routes-head-clear: calc(3.4rem + env(safe-area-inset-top, 0px));
  /* Главный кадр блока привоза = полный экран */
  --routes-hero-slab: 100dvh;
  position: relative;
  z-index: 0;
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  margin: calc(0px - var(--routes-head-clear)) 0 0 0;
  padding: var(--routes-head-clear) 0 0 0;
  min-height: calc(var(--routes-head-clear) + var(--routes-hero-slab));
  border: 0;
  background: var(--routes-bg);
}

.routes__truck-surface {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: 0;
  background: var(--routes-bg);
  width: 100%;
  max-width: none;
  box-shadow: none;
  opacity: 0;
  transform: translate3d(0, 6px, 0) scale(0.998);
  transition:
    opacity 0.7s var(--path-ease),
    transform 0.75s var(--path-ease);
  will-change: transform, opacity;
}

.routes__truck--in .routes__truck-surface {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.routes__truck-surface picture {
  display: block;
  width: 100%;
  height: 100%;
}

.routes__truck-img {
  display: block;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  object-position: 52% 58%;
}

.routes__truck-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgb(var(--color-graphite-rgb) / 0.58) 0%, rgb(var(--color-graphite-rgb) / 0.36) 34%, rgb(var(--color-graphite-rgb) / 0.1) 58%, rgb(var(--color-graphite-rgb) / 0.02) 100%);
  pointer-events: none;
  opacity: 1;
}

.routes__truck-inline-media {
  display: none;
}

.routes__truck-inline-media picture {
  display: block;
  width: 100%;
  height: 100%;
}

.routes__truck-inline-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.routes__truck-inline-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.routes__truck-cap {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: calc(7.5rem + var(--routes-head-clear) + env(safe-area-inset-top, 0px)) 0
    max(1.15rem, calc(0.35rem + env(safe-area-inset-bottom, 0px)));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  max-width: 100%;
  text-align: left;
  text-wrap: balance;
  pointer-events: none;
  /* как у .routes__truck-surface: figcaption вне div, но в одной анимации */
  margin: 0;
  opacity: 0;
  transform: translate3d(0, 6px, 0) scale(0.998);
  transition:
    opacity 0.7s var(--path-ease),
    transform 0.75s var(--path-ease);
  will-change: transform, opacity;
}

.routes__truck--in .routes__truck-cap {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.routes__truck-box {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  pointer-events: auto;
}

@media (min-width: 720px) {
  .routes__truck-box {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 820px) {
  .routes__truck-cap {
    padding-top: calc(5.5rem + var(--routes-head-clear) + env(safe-area-inset-top, 0px));
  }
}

@media (min-width: 900px) {
  .routes__truck-cap {
    padding-top: calc(6.5rem + var(--routes-head-clear) + env(safe-area-inset-top, 0px));
  }

  .routes__truck-box {
    position: relative;
    height: 100%;
    align-content: start;
    padding-left: 0;
    padding-right: 0;
  }

  .routes__truck-actions {
    position: absolute;
    right: 0;
    bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    margin: 0;
    flex-wrap: nowrap;
    gap: 0.75rem;
  }
}

.routes__truck-heading {
  margin: 0 0 0.5rem;
  max-width: min(64rem, 100%);
  font-weight: 700;
  font-size: clamp(2.4rem, 7.6vw, 3.9rem);
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: var(--color-milk);
  text-wrap: wrap;
  text-align: left;
}

@media (min-width: 900px) {
  .routes__truck-heading {
    font-size: clamp(2.6rem, 4.2vw, 4.4rem);
    line-height: 1.04;
  }

  /* «Привоз авто под ключ —» одной строкой: тире не должно «отваливаться» вниз */
  .routes__truck-line {
    white-space: nowrap;
  }
}

.routes__truck-line {
  display: block;
}

.routes__truck-amp {
  font-weight: 500;
  color: rgb(var(--color-milk-rgb) / 0.32);
  letter-spacing: 0.02em;
}

.routes__truck-deck {
  margin: 0 0 0.9rem;
  max-width: 44rem;
  font-size: clamp(0.98rem, 2.4vw, 1.02rem);
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.84);
  text-align: left;
}

.routes__truck-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  min-width: clamp(12rem, 18vw, 15rem);
  padding: 0.9rem 1.55rem;
  border-radius: 0.9rem;
  font-weight: 600;
  font-size: clamp(1rem, 1.1vw, 1.08rem);
  letter-spacing: 0.01em;
  text-decoration: none;
  border: 1px solid transparent;
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
  color: rgb(var(--color-milk-rgb) / 0.95);
  border: 1px solid rgb(var(--color-milk-rgb) / 0.16);
  background: rgb(var(--color-graphite-rgb) / 0.72);
}

.btn--ghost:hover {
  border-color: rgb(var(--color-milk-rgb) / 0.24);
  background: rgb(var(--color-graphite-rgb) / 0.9);
}

@media (max-width: 899px) {
  .routes__logo {
    width: clamp(0.78rem, 3.7vw, 1.04rem);
    height: clamp(0.78rem, 3.7vw, 1.04rem);
    padding: 0.11rem;
    transform: translate(
      calc(-50% + (var(--logo-x) * 0.56)),
      calc(-50% + (var(--logo-y) * 0.56))
    );
  }

  .routes__truck {
    display: flex;
    flex-direction: column;
    min-height: auto;
    padding: 0 0 1.15rem;
    background:
      radial-gradient(circle at top right, rgba(233, 190, 95, 0.16), transparent 34%),
      linear-gradient(180deg, var(--color-graphite) 0%, var(--color-graphite) 100%);
  }

  .routes__truck-surface {
    display: none;
  }

  .routes__truck-cap {
    position: relative;
    inset: auto;
    order: 1;
    padding: calc(9.7rem + env(safe-area-inset-top, 0px)) 0 0.95rem;
  }

  .routes__truck-heading {
    max-width: 100%;
    font-size: clamp(2.3rem, 10vw, 3.35rem);
    line-height: 1.02;
  }

  /* На узких экранах строка переносится — тире-разделитель убираем, чтобы не висело отдельно */
  .routes__truck-amp {
    display: none;
  }

  .routes__truck-inline-media {
    position: relative;
    display: block;
    width: 100%;
    max-width: min(28rem, 100%);
    aspect-ratio: 16 / 10;
    margin: 1rem 0 1rem;
    border: 1px solid rgb(var(--color-milk-rgb) / 0.14);
    border-radius: 1.5rem;
    box-shadow: 0 28px 56px -36px rgb(var(--color-graphite-rgb) / 0.92);
    overflow: hidden;
  }

  .routes__truck-inline-img {
    object-position: 58% 54%;
  }

  .routes__truck-inline-veil {
    background:
      linear-gradient(180deg, rgb(var(--color-graphite-rgb) / 0.58) 0%, rgb(var(--color-graphite-rgb) / 0.36) 34%, rgb(var(--color-graphite-rgb) / 0.1) 58%, rgb(var(--color-graphite-rgb) / 0.02) 100%);
  }

  .routes__truck-deck {
    max-width: 100%;
    margin-bottom: 1rem;
    font-size: clamp(0.68rem, 3.1vw, 0.78rem);
    line-height: 1.38;
  }

  .routes__truck-actions {
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn {
    min-height: 46px;
    padding: 0.78rem 1.15rem;
  }
}

@media (max-width: 380px) {
  .routes__truck-cap {
    padding-top: calc(10.15rem + env(safe-area-inset-top, 0px));
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .routes__truck {
    --routes-hero-slab: min(42vh, 280px);
  }
}

/* Ультраширокий: выше баннер с фурой (был жёсткий max 720px), спокойнее кроп по ширине */
@media (min-aspect-ratio: 2 / 1) and (min-width: 900px) {
  .routes {
    min-height: auto;
  }

  .routes__truck {
    --routes-hero-slab: clamp(380px, 58dvh, 760px);
  }

  .routes__truck-surface {
    background: var(--routes-bg);
  }

  .routes__truck-img {
    object-fit: contain;
    object-position: 50% 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .routes__truck-surface,
  .routes__truck-cap {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.routes__stage {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: min(var(--content-max), 100%);
  margin: 0 auto;
  padding-inline: clamp(0.35rem, 2.5vw, 1.25rem);
  /* Без жёсткого min-height на телефоне — иначе под схемой остаётся пустая полоса */
  min-height: 0;
  padding-bottom: 0.1rem;
}

@media (min-width: 720px) {
  .routes__stage {
    min-height: clamp(170px, 22vw, 260px);
    padding-bottom: 0.1rem;
  }
}

@media (min-width: 1100px) {
  .routes__stage {
    max-width: min(1200px, 100%);
  }
}

@media (min-aspect-ratio: 2 / 1) and (min-width: 900px) {
  .routes__content {
    margin-top: 0;
    background: var(--color-milk);
  }

  .routes__stage {
    max-width: min(1400px, 100%);
    min-height: clamp(170px, min(18vw, 20dvh), 300px);
  }
}

.routes__map {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  aspect-ratio: 1200 / 360;
  overflow: visible;
}

.routes__svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: none;
  aspect-ratio: 1200 / 360;
  overflow: visible;
}

@media (max-height: 480px) and (orientation: landscape) {
  .routes__stage {
    min-height: 0;
    padding-bottom: 0.05rem;
  }

  .routes__map {
    width: 100%;
    aspect-ratio: 1200 / 360;
    margin-inline: auto;
  }

  .routes__svg {
    width: 100%;
    height: auto;
    aspect-ratio: 1200 / 360;
  }
}

.routes__echo {
  fill: none;
  stroke: rgba(180, 134, 38, 0.56);
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 26 18;
  stroke-dashoffset: 1000;
  opacity: 0.14;
  pointer-events: none;
}

@media (min-width: 720px) {
  .routes__echo {
    stroke-width: 1.25;
  }
}

.routes__path {
  fill: none;
  stroke: rgb(43 43 46 / 0.42);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 26 18;
  stroke-dashoffset: 1000;
}

@media (min-width: 480px) {
  .routes__path {
    stroke-width: 2.2;
  }
}

@media (min-width: 720px) {
  .routes__path {
    stroke-width: 2.35;
  }
}

.routes--map-in .routes__path,
.routes--map-in .routes__echo {
  animation-name: routes-draw;
  animation-duration: var(--path-draw-ms, 480ms);
  animation-timing-function: var(--path-ease);
  animation-fill-mode: forwards;
}

.routes--woven .routes__path--seg1,
.routes--woven .routes__echo--seg1 {
  animation-name: routes-dash-to-russia;
  animation-duration: 14s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
}

.routes--woven .routes__path--seg2,
.routes--woven .routes__path--seg3,
.routes--woven .routes__echo--seg2,
.routes--woven .routes__echo--seg3 {
  animation-name: routes-dash-to-russia-reverse;
  animation-duration: 14s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
}

@keyframes routes-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes routes-dash-to-russia {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -44;
  }
}

@keyframes routes-dash-to-russia-reverse {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 44;
  }
}

.routes__nodes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.routes__node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.52rem;
  transform: translate(-50%, -50%);
  transition:
    opacity 0.4s var(--path-ease),
    filter 0.4s var(--path-ease);
  opacity: 0.2;
  filter: grayscale(0.4);
}

.routes__marker {
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
}

.routes__marker .routes__dot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.routes__logos {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.routes__logo {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: clamp(1.9rem, 4.8vw, 2.45rem);
  height: clamp(1.9rem, 4.8vw, 2.45rem);
  padding: 0.32rem;
  border-radius: 999px;
  color: rgb(32 32 36 / 0.78);
  background: rgb(255 255 255 / 0.86);
  border: 1px solid rgb(44 44 46 / 0.16);
  transform: translate(calc(-50% + var(--logo-x)), calc(-50% + var(--logo-y)));
  transition:
    color 0.35s var(--path-ease),
    border-color 0.35s var(--path-ease),
    background 0.35s var(--path-ease),
    opacity 0.35s var(--path-ease),
    transform 0.35s var(--path-ease);
  opacity: 0.72;
}

.routes__logo :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.routes__hub-wave {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 1px solid rgba(233, 190, 95, 0.42);
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
  pointer-events: none;
}

.routes__node--lit {
  opacity: 1;
  filter: grayscale(0);
}

.routes__node--ru.routes__node--lit .routes__hub-wave {
  animation: routes-hub-arrival 2.4s ease-out infinite;
}

.routes__node--lit .routes__logo {
  color: rgb(24 24 28 / 0.96);
  background: rgb(255 255 255 / 0.98);
  border-color: rgba(190, 142, 42, 0.42);
  opacity: 1;
}

.routes__node--lit .routes__name {
  animation: routes-name-in 0.45s var(--path-ease) both;
}

@keyframes routes-name-in {
  from {
    opacity: 0.35;
    letter-spacing: -0.06em;
  }

  to {
    opacity: 1;
    letter-spacing: -0.03em;
  }
}

.routes__node--lit .routes__dot {
  background: var(--yellow);
  animation: routes-dot-ignite 0.68s cubic-bezier(0.22, 1, 0.32, 1) both;
  box-shadow:
    0 0 0 1px var(--color-graphite),
    0 0 0 3px rgba(233, 190, 95, 0.35),
    0 0 0 0 rgba(233, 190, 95, 0);
}

@keyframes routes-dot-ignite {
  0% {
    transform: scale(0.72);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 2px rgba(233, 190, 95, 0.25),
      0 0 0 0 rgba(233, 190, 95, 0.35);
  }

  55% {
    transform: scale(1.2);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 3px rgba(233, 190, 95, 0.45),
      0 0 28px rgba(233, 190, 95, 0.35);
  }

  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 3px rgba(233, 190, 95, 0.3),
      0 0 18px rgba(233, 190, 95, 0.2);
  }
}

.routes--woven .routes__node--lit .routes__dot {
  animation: routes-dot-breathe 5.5s ease-in-out infinite;
  animation-delay: 0.15s;
}

.routes--woven .routes__node--ru.routes__node--lit .routes__dot {
  animation: routes-dot-hub 2.8s ease-in-out infinite;
}

@keyframes routes-dot-breathe {
  0%,
  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 3px rgba(233, 190, 95, 0.28),
      0 0 18px rgba(233, 190, 95, 0.15);
  }

  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 3px rgba(233, 190, 95, 0.4),
      0 0 22px rgba(233, 190, 95, 0.22);
  }
}

@keyframes routes-dot-hub {
  0%,
  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 5px rgba(233, 190, 95, 0.38),
      0 0 28px rgba(233, 190, 95, 0.22);
  }

  50% {
    transform: scale(1.18);
    box-shadow:
      0 0 0 1px var(--color-graphite),
      0 0 0 7px rgba(233, 190, 95, 0.5),
      0 0 40px rgba(233, 190, 95, 0.34);
  }
}

@keyframes routes-hub-arrival {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85);
  }

  18% {
    opacity: 0.5;
  }

  55% {
    opacity: 0.24;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3.9);
  }
}

/* Совпадают с концами path в viewBox 1200×360 — не менять отдельно для мобилки, иначе расходится со scale SVG */
.routes__node--eu {
  left: 8.5%;
  top: 57.78%;
}

.routes__node--ru {
  left: 34.333%;
  top: 45.9%;
}

.routes__node--ru .routes__dot {
  background: rgba(233, 190, 95, 0.72);
  box-shadow:
    0 0 0 1px var(--color-graphite),
    0 0 0 4px rgba(233, 190, 95, 0.14),
    0 0 22px rgba(233, 190, 95, 0.16);
}

.routes__marker--ru {
  width: 22px;
  height: 22px;
}

.routes__node--ru.routes__node--lit .routes__dot {
  box-shadow:
    0 0 0 1px var(--color-graphite),
    0 0 0 5px rgba(233, 190, 95, 0.42),
    0 0 32px rgba(233, 190, 95, 0.34);
}

.routes__node--kr {
  left: 62.333%;
  top: 61.11%;
}

.routes__node--jp {
  left: 90.667%;
  top: 42.22%;
}

.routes__dot {
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgb(54 54 58 / 0.34);
  transition: background 0.35s var(--path-ease);
}

.routes__name {
  font-size: clamp(0.84rem, 3.6vw, 1.28rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: rgb(42 42 48 / 0.82);
  max-width: min(7.2rem, 31vw);
  text-align: center;
  line-height: 1.12;
  white-space: nowrap;
  transition: color 0.35s var(--path-ease);
}

@media (max-width: 359px) {
  .routes__name {
    white-space: normal;
    max-width: 4.8rem;
  }

  .routes__logo {
    width: 0.92rem;
    height: 0.92rem;
    padding: 0.1rem;
  }
}

@media (min-width: 720px) {
  .routes__name {
    max-width: none;
  }
}

.routes__node--lit .routes__name {
  color: rgb(22 22 26 / 0.96);
}

.routes__foot {
  box-sizing: border-box;
  width: 100%;
  max-width: min(28rem, 100%);
  margin: 0.85rem auto 0;
  padding-inline: clamp(0px, 1.5vw, 0.5rem);
  text-align: center;
  font-size: clamp(0.75rem, 2vw, 0.8125rem);
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: rgb(var(--color-milk-rgb) / 0.5);
  overflow-wrap: break-word;
}

@media (min-width: 720px) {
  .routes__foot {
    margin-top: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .routes__path,
  .routes__echo {
    stroke-dashoffset: 0;
    animation: none !important;
  }

  .routes__echo {
    opacity: 0.08;
  }

  .routes__node {
    opacity: 1;
    filter: none;
  }

  .routes__node .routes__name {
    color: rgb(var(--color-milk-rgb) / 0.9);
    animation: none !important;
  }

  .routes__node .routes__dot {
    background: var(--yellow);
    transform: none;
    animation: none !important;
    box-shadow: 0 0 0 1px var(--color-graphite), 0 0 0 3px rgba(233, 190, 95, 0.35);
  }

  .routes--woven .routes__path,
  .routes--woven .routes__echo {
    animation: none !important;
  }
}
</style>
