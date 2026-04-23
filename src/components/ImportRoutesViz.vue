<script setup>
import { onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useInView } from '../composables/useInView.js';
import imgTruck from '../assets/фура.png';

/** На низких экранах меньше «низового» отступа — блок чаще корректно входит во viewport */
const { el, visible } = useInView({ rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

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

watch(visible, (v) => {
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
</script>

<template>
  <section
    id="routes"
    ref="el"
    class="routes"
    :class="{ 'routes--in': visible, 'routes--woven': woven }"
    :style="{ '--path-draw-ms': `${PATH_MS}ms` }"
    aria-labelledby="routes-heading"
  >
    <figure class="routes__truck" :class="{ 'routes__truck--in': visible }">
      <div class="routes__truck-surface">
        <img
          :src="imgTruck"
          class="routes__truck-img"
          width="1600"
          height="900"
          alt="Автовоз с автомобилями: доставка по маршруту"
          decoding="async"
        />
        <div class="routes__truck-overlay" aria-hidden="true" />
      </div>
      <figcaption class="routes__truck-cap">
        <div class="routes__truck-box">
          <h2 id="routes-heading" class="routes__truck-heading">
            Дорога к вашему авто
            <span class="routes__truck-amp"> — </span>
            <span class="routes__truck-accent">с нами везде</span>
          </h2>
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

    <div class="routes__content">
    <div class="routes__stage" aria-hidden="true">
      <!-- Общая коробка: ширина SVG = ширина слоя с точками (иначе при max-height линия «уезжает») -->
      <div class="routes__map">
        <svg class="routes__svg" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <!-- Тонкое эхо только по акценту (без широкой подложки — не смешивается с пунктиром) -->
        <path
          :d="d1"
          class="routes__echo"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path1Delay + 40}ms` }"
        />
        <path
          :d="d2"
          class="routes__echo"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path2Delay + 40}ms` }"
        />
        <path
          :d="d3"
          class="routes__echo"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path3Delay + 40}ms` }"
        />

        <path
          :d="d1"
          class="routes__path"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path1Delay}ms` }"
          @animationstart="onSeg1DrawStart"
          @animationend="(e) => onRouteDrawEnd(1, e)"
        />
        <path
          :d="d2"
          class="routes__path"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path2Delay}ms` }"
          @animationend="(e) => onRouteDrawEnd(2, e)"
        />
        <path
          :d="d3"
          class="routes__path"
          pathLength="1000"
          vectorEffect="non-scaling-stroke"
          :style="{ animationDelay: `${path3Delay}ms` }"
          @animationend="(e) => onRouteDrawEnd(3, e)"
        />
        </svg>

        <div class="routes__nodes">
          <div class="routes__node routes__node--eu" :class="{ 'routes__node--lit': litEurope }">
            <span class="routes__dot" />
            <span class="routes__name">Европа</span>
          </div>
          <div class="routes__node routes__node--ru" :class="{ 'routes__node--lit': litRussia }">
            <span class="routes__dot" />
            <span class="routes__name">Россия</span>
          </div>
          <div class="routes__node routes__node--kr" :class="{ 'routes__node--lit': litKorea }">
            <span class="routes__dot" />
            <span class="routes__name">Корея</span>
          </div>
          <div class="routes__node routes__node--jp" :class="{ 'routes__node--lit': litJapan }">
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
  box-sizing: border-box;
  width: 100vw;
  max-width: 100%;
  margin-left: calc(50% - 50vw);
  padding: 0;
  padding-bottom: max(1.65rem, calc(0.45rem + env(safe-area-inset-bottom, 0px)));
  border-top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #0a0a0c 0%, #0a0a0c 22%, #141416 100%);
  color: rgba(245, 245, 247, 0.88);
  overflow-x: clip;
  overflow-y: visible;
}

@media (min-width: 720px) {
  .routes {
    padding-bottom: max(3.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)));
  }
}

.routes__content {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-top: 0.9rem;
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  padding-bottom: 0.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, #0e0e10 0%, #0a0a0c 38%, #101012 100%);
}

@media (min-width: 720px) {
  .routes__content {
    padding-top: 1.2rem;
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

@media (min-width: 1200px) {
  .routes__content {
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

/* Кинематика: кадр залезает под фиксированное меню (как у hero) */
.routes__truck {
  /* Меньше захода под шапку — кадр визуально ниже, важная часть фуры не «под» меню */
  --routes-head-clear: calc(3.4rem + env(safe-area-inset-top, 0px));
  /* Высота баннера: крупный hero — ~50% экрана по vh, верх/низ в clamp прижимают */
  --routes-hero-slab: clamp(280px, 58vh, 720px);
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
  background: #0a0a0c;
}

.routes__truck-surface {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: 0;
  background: #0a0a0c;
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
  background: linear-gradient(180deg, rgba(6, 6, 8, 0.35) 0%, rgba(6, 6, 8, 0.2) 42%, rgba(6, 6, 8, 0.45) 58%, rgba(4, 4, 5, 0.72) 100%),
    linear-gradient(100deg, rgba(10, 10, 12, 0.94) 0%, rgba(10, 10, 12, 0.35) 48%, transparent 72%);
  mix-blend-mode: multiply;
  pointer-events: none;
  opacity: 0.9;
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
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0 max(1rem, env(safe-area-inset-right, 0px));
  pointer-events: auto;
}

@media (min-width: 720px) {
  .routes__truck-box {
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
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
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

.routes__truck-heading {
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
  text-align: left;
}

@media (min-width: 900px) {
  .routes__truck-heading {
    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 1.02;
  }
}

.routes__truck-amp {
  font-weight: 500;
  color: rgba(245, 245, 247, 0.45);
  letter-spacing: 0.02em;
}

.routes__truck-accent {
  font-weight: 700;
  font-style: italic;
  color: var(--yellow);
}

.routes__truck-deck {
  margin: 0 0 0.9rem;
  max-width: 44rem;
  font-size: clamp(1rem, 2.8vw, 1.0625rem);
  line-height: 1.5;
  color: rgba(245, 245, 247, 0.72);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
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
  .routes__truck {
    --routes-hero-slab: min(42vh, 280px);
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
  padding-bottom: 0.5rem;
}

@media (min-width: 720px) {
  .routes__stage {
    min-height: clamp(200px, 28vw, 300px);
    padding-bottom: 0.35rem;
  }
}

@media (min-width: 1100px) {
  .routes__stage {
    max-width: min(1200px, 100%);
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
    padding-bottom: 0.15rem;
  }

  .routes__map {
    --routes-map-h: min(36vh, 200px);
    height: var(--routes-map-h);
    width: min(100%, calc(var(--routes-map-h) * 1200 / 360));
    aspect-ratio: unset;
    margin-inline: auto;
  }

  .routes__svg {
    width: 100%;
    height: 100%;
    aspect-ratio: unset;
  }
}

.routes__echo {
  fill: none;
  stroke: rgba(245, 196, 18, 0.45);
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
  stroke: rgba(245, 245, 247, 0.22);
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

.routes--in .routes__path,
.routes--in .routes__echo {
  animation-name: routes-draw;
  animation-duration: var(--path-draw-ms, 480ms);
  animation-timing-function: var(--path-ease);
  animation-fill-mode: forwards;
}

.routes--woven .routes__path {
  animation-name: routes-dash-drift;
  animation-duration: 14s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
}

.routes--woven .routes__echo {
  animation-name: routes-dash-drift;
  animation-duration: 17s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
}

@keyframes routes-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes routes-dash-drift {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -44;
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
  gap: 0.35rem;
  transform: translate(-50%, -50%);
  transition:
    opacity 0.4s var(--path-ease),
    filter 0.4s var(--path-ease);
  opacity: 0.2;
  filter: grayscale(0.4);
}

.routes__node--lit {
  opacity: 1;
  filter: grayscale(0);
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
    0 0 0 1px #0c0c0e,
    0 0 0 3px rgba(245, 196, 18, 0.35),
    0 0 0 0 rgba(245, 196, 18, 0);
}

@keyframes routes-dot-ignite {
  0% {
    transform: scale(0.72);
    box-shadow:
      0 0 0 1px #0c0c0e,
      0 0 0 2px rgba(245, 196, 18, 0.25),
      0 0 0 0 rgba(245, 196, 18, 0.35);
  }

  55% {
    transform: scale(1.2);
    box-shadow:
      0 0 0 1px #0c0c0e,
      0 0 0 3px rgba(245, 196, 18, 0.45),
      0 0 28px rgba(245, 196, 18, 0.35);
  }

  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px #0c0c0e,
      0 0 0 3px rgba(245, 196, 18, 0.3),
      0 0 18px rgba(245, 196, 18, 0.2);
  }
}

.routes--woven .routes__node--lit .routes__dot {
  animation: routes-dot-breathe 5.5s ease-in-out infinite;
  animation-delay: 0.15s;
}

@keyframes routes-dot-breathe {
  0%,
  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px #0c0c0e,
      0 0 0 3px rgba(245, 196, 18, 0.28),
      0 0 18px rgba(245, 196, 18, 0.15);
  }

  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px #0c0c0e,
      0 0 0 3px rgba(245, 196, 18, 0.4),
      0 0 22px rgba(245, 196, 18, 0.22);
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
  width: 12px;
  height: 12px;
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transition: background 0.35s var(--path-ease);
}

.routes__name {
  font-size: clamp(0.625rem, 2.8vw, 0.9375rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: rgba(245, 245, 247, 0.38);
  max-width: min(4.75rem, 22vw);
  text-align: center;
  line-height: 1.15;
  white-space: nowrap;
  transition: color 0.35s var(--path-ease);
}

@media (max-width: 359px) {
  .routes__name {
    white-space: normal;
    max-width: 3.5rem;
  }
}

@media (min-width: 720px) {
  .routes__name {
    max-width: none;
  }
}

.routes__node--lit .routes__name {
  color: #fff;
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
  color: rgba(245, 245, 247, 0.5);
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
    color: rgba(245, 245, 247, 0.9);
    animation: none !important;
  }

  .routes__node .routes__dot {
    background: var(--yellow);
    transform: none;
    animation: none !important;
    box-shadow: 0 0 0 1px #0c0c0e, 0 0 0 3px rgba(245, 196, 18, 0.35);
  }

  .routes--woven .routes__path,
  .routes--woven .routes__echo {
    animation: none !important;
  }
}
</style>
