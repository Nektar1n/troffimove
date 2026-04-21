<script setup>
import { onUnmounted, ref, watch } from 'vue';
import { useInView } from '../composables/useInView.js';

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
    ref="el"
    class="routes"
    :class="{ 'routes--in': visible, 'routes--woven': woven }"
    :style="{ '--path-draw-ms': `${PATH_MS}ms` }"
    aria-labelledby="routes-heading"
  >
    <div class="routes__head">
      <h2 id="routes-heading" class="routes__title">Контур поставок</h2>
      <p class="routes__lead">
        Запад → восток: Европа, Россия, Корея и Япония. Упрощённая схема; реальный маршрут — по порту, перевозчику и VIN.
      </p>
      <div class="routes__rule" aria-hidden="true" />
    </div>

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

    <p class="routes__foot">Импорт в РФ · один контур документов и отчётности по сделке</p>
  </section>
</template>

<style scoped>
.routes {
  --path-ease: cubic-bezier(0.33, 1, 0.68, 1);
  box-sizing: border-box;
  width: 100vw;
  max-width: 100%;
  margin-left: calc(50% - 50vw);
  padding-top: max(2.25rem, env(safe-area-inset-top, 0px));
  padding-bottom: max(2.75rem, calc(1rem + env(safe-area-inset-bottom, 0px)));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  border-top: 1px solid var(--line-light);
  border-bottom: 1px solid var(--line-light);
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-subtle) 40%, var(--bg) 100%);
  overflow-x: clip;
}

@media (min-width: 720px) {
  .routes {
    padding-top: max(2.75rem, env(safe-area-inset-top, 0px));
    padding-bottom: max(3.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)));
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

@media (min-width: 1200px) {
  .routes {
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
  }
}

.routes__head {
  box-sizing: border-box;
  width: 100%;
  max-width: min(38rem, 100%);
  margin: 0 auto 1.65rem;
  padding-inline: clamp(0px, 1.5vw, 0.5rem);
  text-align: center;
}

.routes__title {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: clamp(0.7rem, 1.5vw, 0.8125rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.routes__lead {
  margin: 0 0 1rem;
  font-size: clamp(0.875rem, 2.2vw, 1.0625rem);
  line-height: 1.45;
  color: var(--text);
  letter-spacing: -0.02em;
  text-wrap: balance;
  overflow-wrap: break-word;
  hyphens: auto;
}

.routes__rule {
  width: 2.5rem;
  height: 1px;
  margin: 0 auto;
  background: var(--line-light);
}

.routes__stage {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: min(1120px, 100%);
  margin: 0 auto;
  padding-inline: clamp(0.35rem, 2.5vw, 1.25rem);
  padding-bottom: 0.35rem;
  min-height: clamp(200px, 42vw, 360px);
}

@media (min-width: 600px) {
  .routes__stage {
    min-height: clamp(220px, 36vw, 340px);
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
  stroke: var(--accent);
  stroke-width: 1.05;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 26 18;
  stroke-dashoffset: 1000;
  opacity: 0.09;
  pointer-events: none;
}

@media (min-width: 720px) {
  .routes__echo {
    stroke-width: 1.25;
  }
}

.routes__path {
  fill: none;
  stroke: var(--line);
  stroke: color-mix(in srgb, var(--text) 28%, var(--line));
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
  background: var(--text);
  animation: routes-dot-ignite 0.68s cubic-bezier(0.22, 1, 0.32, 1) both;
  box-shadow:
    0 0 0 1px var(--bg),
    0 0 0 3px var(--line-light),
    0 0 0 0 rgba(0, 102, 204, 0);
}

@keyframes routes-dot-ignite {
  0% {
    transform: scale(0.72);
    box-shadow:
      0 0 0 1px var(--bg),
      0 0 0 2px var(--line-light),
      0 0 0 0 rgba(0, 102, 204, 0.35);
  }

  55% {
    transform: scale(1.2);
    box-shadow:
      0 0 0 1px var(--bg),
      0 0 0 3px rgba(0, 102, 204, 0.2),
      0 0 28px rgba(0, 102, 204, 0.18);
  }

  100% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--bg),
      0 0 0 3px var(--line-light),
      0 0 18px rgba(29, 29, 31, 0.1);
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
      0 0 0 1px var(--bg),
      0 0 0 3px var(--line-light),
      0 0 18px rgba(29, 29, 31, 0.1);
  }

  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 1px var(--bg),
      0 0 0 3px var(--line-light),
      0 0 22px rgba(29, 29, 31, 0.14);
  }
}

/* Совпадают с концами path в viewBox 1200×360 — не менять отдельно для мобилки, иначе расходится со scale SVG */
.routes__node--eu {
  left: 8.5%;
  top: 57.78%;
}

.routes__node--ru {
  left: 34.333%;
  top: 47.78%;
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
  background: var(--muted);
  transition: background 0.35s var(--path-ease);
}

.routes__name {
  font-size: clamp(0.625rem, 2.8vw, 0.9375rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--muted);
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
  color: var(--text);
}

.routes__foot {
  box-sizing: border-box;
  width: 100%;
  max-width: min(28rem, 100%);
  margin: 1.25rem auto 0;
  padding-inline: clamp(0px, 1.5vw, 0.5rem);
  text-align: center;
  font-size: clamp(0.75rem, 2vw, 0.8125rem);
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: var(--muted);
  overflow-wrap: break-word;
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
    color: var(--text);
    animation: none !important;
  }

  .routes__node .routes__dot {
    background: var(--text);
    transform: none;
    animation: none !important;
    box-shadow: 0 0 0 1px var(--bg), 0 0 0 3px var(--line-light);
  }

  .routes--woven .routes__path,
  .routes--woven .routes__echo {
    animation: none !important;
  }
}
</style>
