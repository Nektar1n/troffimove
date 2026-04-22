<script setup>
import { computed, onUnmounted, ref } from 'vue';
import carWhite from '../assets/white-car.png';

/** Клик = закрепить зону (для тача). Наведение показывает без клика. */
const active = ref(null);
const hoverId = ref(null);
let hoverClearTimer;

function onEnter(id) {
  clearTimeout(hoverClearTimer);
  hoverId.value = id;
}

function onLeave() {
  clearTimeout(hoverClearTimer);
  // Только с hover — нельзя трогать active: на таче сразу после клика приходит pointerleave
  // с крошечного маркера, и всплывашка схлопывалась. Закреплённый пункт снимаем с backdrop / повтором клика.
  hoverClearTimer = window.setTimeout(() => {
    hoverId.value = null;
  }, 180);
}

onUnmounted(() => clearTimeout(hoverClearTimer));

/**
 * left/top — % от .check__art (совпадают с началом линии в viewBox 0–100).
 * pop — сторона, куда уводим карточку:
 *   'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'
 */
const spots = [
  {
    id: 'front',
    label: 'Перед',
    left: '89%',
    top: '50%',
    pop: 'left',
    title: 'Передний бампер и оптика',
    text: 'Зазоры бампера, крепления ПТФ и фар, парктроники, следы снятия или удара по пластику.',
  },
  {
    id: 'engine',
    label: 'Капот',
    left: '24%',
    top: '40%',
    pop: 'top-left',
    title: 'Моторный отсек',
    text: 'Утечки и запахи, крепления, уровни, шумы на холостом ходу, OBD — только доступное снаружи, без разбора.',
  },
  {
    id: 'roof',
    label: 'Крыша',
    left: '50%',
    top: '31%',
    pop: 'top',
    title: 'Крыша и люк',
    text: 'Ровность люка, уплотнитель, следы града или перекраса по люку и рейлингам.',
  },
  {
    id: 'salon',
    label: 'Салон',
    left: '50%',
    top: '48%',
    pop: 'bottom',
    title: 'Двери и салон',
    text: 'Зазоры и следы снятия дверей, стёкла, влага под порогами, люфты руля и рычагов по чек-листу.',
  },
  {
    id: 'wheels',
    label: 'Колёса',
    left: '73%',
    top: '68%',
    pop: 'bottom-left',
    title: 'Передняя ось',
    text: 'Протектор и дата резины, диск и суппорт, подкрылок — при согласовании на подъёмнике глубже.',
  },
  {
    id: 'wheelsRear',
    label: 'Колёса',
    left: '27%',
    top: '68%',
    pop: 'bottom',
    title: 'Задняя ось',
    text: 'То же для задней оси: износ, ступица, пружины и амортизаторы снизу по доступу.',
  },
  {
    id: 'rear',
    label: 'Зад',
    left: '11%',
    top: '50%',
    pop: 'right',
    title: 'Зад и багажник',
    text: 'Бампер, фонари, крышка багажника, запаска и ниша, следы удара сзади.',
  },
];

function pct(v) {
  return Number.parseFloat(String(v).replace('%', '')) || 0;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** Явная позиция карточки — управляется полем pop у spot. */
function popLayout(spot) {
  const x = pct(spot.left);
  const y = pct(spot.top);
  const pos = spot.pop ?? 'right';
  const wide = 'min(260px, calc(100% - 1.2rem))';

  const style = {
    position: 'absolute',
    zIndex: 4,
    width: wide,
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    transform: 'none',
  };

  switch (pos) {
    case 'top-left':
      style.right = `${clamp(100 - x + 2, 3, 74)}%`;
      style.top = `${clamp(y - 22, 3, 78)}%`;
      break;
    case 'top':
      style.left = `${clamp(x, 14, 86)}%`;
      style.top = `${clamp(y - 22, 3, 78)}%`;
      style.transform = 'translateX(-50%)';
      break;
    case 'top-right':
      style.left = `${clamp(x + 5, 3, 72)}%`;
      style.top = `${clamp(y - 22, 3, 78)}%`;
      break;
    case 'left':
      style.right = `${clamp(100 - x + 2, 3, 74)}%`;
      style.top = `${clamp(y - 8, 3, 78)}%`;
      break;
    case 'right':
      style.left = `${clamp(x + 4, 3, 72)}%`;
      style.top = `${clamp(y - 8, 3, 78)}%`;
      break;
    case 'bottom-left':
      style.right = `${clamp(100 - x + 2, 3, 74)}%`;
      style.top = `${clamp(y + 5, 3, 78)}%`;
      break;
    case 'bottom':
      style.left = `${clamp(x, 14, 86)}%`;
      style.top = `${clamp(y + 5, 3, 78)}%`;
      style.transform = 'translateX(-50%)';
      break;
    case 'bottom-right':
    default:
      style.left = `${clamp(x + 4, 3, 72)}%`;
      style.top = `${clamp(y + 5, 3, 78)}%`;
      break;
  }

  return style;
}

/** Конец линии — в центр ближайшей к карточке стороны (viewBox 0–100). */
function wireForSpot(spot) {
  const L = pct(spot.left);
  const T = pct(spot.top);
  const pos = spot.pop ?? 'right';
  const map = {
    'top-left': [-6, -8],
    top: [0, -9],
    'top-right': [6, -8],
    left: [-8, 0],
    right: [8, 0],
    'bottom-left': [-6, 8],
    bottom: [0, 9],
    'bottom-right': [6, 8],
  };
  const [dx, dy] = map[pos] ?? map['bottom-right'];
  return {
    x1: L,
    y1: T,
    x2: clamp(L + dx, 2, 98),
    y2: clamp(T + dy, 2, 98),
  };
}

const showId = computed(() => hoverId.value || active.value);
const showSpot = computed(() => spots.find((s) => s.id === showId.value) ?? null);
const showWire = computed(() => (showSpot.value ? wireForSpot(showSpot.value) : null));

function onMarkerClick(id) {
  active.value = active.value === id ? null : id;
}

function onArtClick(e) {
  const t = e.target;
  if (t.closest?.('.check__marker') || t.closest?.('.check__pop')) return;
  active.value = null;
  hoverId.value = null;
}
</script>

<template>
  <section id="check" class="check" aria-labelledby="check-title">
    <div class="check__bleed" aria-hidden="true" />
    <div class="check__inner">
      <h2 v-reveal id="check-title" class="check__title">Что мы проверяем</h2>
      <p v-reveal="80" class="check__lead">
        Наведите на ромб на кузове или нажмите — рядом появится пояснение и линия к маркеру.
      </p>

      <div class="check__board">
        <div class="check__art" @pointerleave="onLeave" @click="onArtClick">
          <img
            class="check__car-img"
            :src="carWhite"
            width="6000"
            height="4800"
            alt=""
            decoding="async"
            fetchpriority="low"
          />

          <button
            v-for="s in spots"
            :key="s.id"
            type="button"
            class="check__marker"
            :class="{
              'check__marker--on': active === s.id,
              'check__marker--show': showId === s.id,
              'check__marker--dim': showId && showId !== s.id,
            }"
            :style="{ left: s.left, top: s.top }"
            :aria-pressed="active === s.id"
            :aria-label="`${s.label}: ${s.title}`"
            @pointerenter="onEnter(s.id)"
            @pointerleave="onLeave"
            @click.stop="onMarkerClick(s.id)"
          >
            <span class="check__pulse" aria-hidden="true" />
            <span class="check__rhomb" aria-hidden="true" />
          </button>

          <Transition name="wire">
            <svg
              v-if="showWire"
              class="check__wire"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                :x1="showWire.x1"
                :y1="showWire.y1"
                :x2="showWire.x2"
                :y2="showWire.y2"
                class="check__wire-line"
              />
            </svg>
          </Transition>

          <Transition name="pop">
            <div
              v-if="showSpot"
              :key="showSpot.id"
              class="check__pop"
              role="tooltip"
              :style="popLayout(showSpot)"
              @pointerenter="onEnter(showSpot.id)"
              @pointerleave="onLeave"
            >
              <p class="check__pop-k">{{ showSpot.label }}</p>
              <h3 class="check__pop-h">{{ showSpot.title }}</h3>
              <p class="check__pop-t">{{ showSpot.text }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.check {
  position: relative;
  z-index: 0;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 3rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
  background: transparent;
}

@media (min-width: 720px) {
  .check {
    padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.check__bleed {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    var(--bg) 0%,
    color-mix(in srgb, var(--bg-subtle) 70%, var(--bg) 30%) 14%,
    color-mix(in srgb, var(--bg-subtle) 85%, var(--bg) 15%) 42%,
    color-mix(in srgb, var(--bg-subtle) 85%, var(--bg) 15%) 58%,
    color-mix(in srgb, var(--bg-subtle) 70%, var(--bg) 30%) 86%,
    var(--bg) 100%
  );
}

.check__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.check__title {
  margin: 0 0 0.5rem;
  max-width: 22ch;
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text);
}

.check__lead {
  margin: 0 0 1.75rem;
  max-width: 40rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--muted);
}

.check__board {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.check__art {
  position: relative;
  width: 100%;
  max-width: 88%;
  aspect-ratio: 6000 / 4800;
  margin: 0 auto;
  border-radius: 8px;
  overflow: visible;
  /* Прозрачный фон — чтобы не было светлого прямоугольника поверх градиентной полосы */
  background: transparent;
}

.check__car-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  pointer-events: none;
  z-index: 0;
}

.check__marker {
  position: absolute;
  z-index: 3;
  width: 2.65rem;
  height: 2.65rem;
  margin: -1.325rem 0 0 -1.325rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition:
    transform 0.25s cubic-bezier(0.22, 0.9, 0.32, 1),
    opacity 0.25s ease;
}

.check__marker--dim {
  opacity: 0.55;
}

.check__marker:hover,
.check__marker:focus-visible {
  transform: scale(1.08);
  opacity: 1;
}

.check__marker:focus-visible {
  outline: 2px solid #1a1a1c;
  outline-offset: 4px;
  border-radius: 4px;
}

.check__rhomb {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 15px;
  height: 15px;
  margin: 0;
  background: #1a1a1c;
  border: 2px solid #fff;
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow:
    0 0 0 1.5px #1a1a1c,
    0 2px 6px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.3s ease,
    width 0.25s cubic-bezier(0.22, 0.9, 0.32, 1),
    height 0.25s cubic-bezier(0.22, 0.9, 0.32, 1);
  will-change: transform, box-shadow;
}

.check__marker:hover .check__rhomb {
  width: 17px;
  height: 17px;
  background: #f5c400;
  border-color: #1a1a1c;
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 4px #1a1a1c,
    0 4px 12px rgba(0, 0, 0, 0.4);
}

.check__marker--on .check__rhomb,
.check__marker--show .check__rhomb {
  width: 18px;
  height: 18px;
  background: #f5c400;
  border-color: #1a1a1c;
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 4px #1a1a1c,
    0 6px 16px rgba(0, 0, 0, 0.45);
}

.check__pulse {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 4px;
  background: #f5c400;
  transform: rotate(45deg) scale(1);
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.check__marker--show .check__pulse {
  animation: check-pulse 1.6s ease-out infinite;
}

@keyframes check-pulse {
  0% {
    opacity: 0.55;
    transform: rotate(45deg) scale(1);
  }
  70% {
    opacity: 0;
    transform: rotate(45deg) scale(2.6);
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) scale(2.6);
  }
}

.check__wire {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  overflow: visible;
}

.check__wire-line {
  stroke: #1a1a1c;
  stroke-width: 0.42;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  stroke-dasharray: 200;
  stroke-dashoffset: 0;
}

.wire-enter-active .check__wire-line {
  animation: wire-draw 0.52s cubic-bezier(0.25, 0.1, 0.25, 1) both;
}

.wire-leave-active {
  transition: opacity 0.18s ease;
}

.wire-leave-to {
  opacity: 0;
}

@keyframes wire-draw {
  from {
    stroke-dashoffset: 200;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.check__pop {
  padding: 1rem 1.1rem 1.1rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 3px solid #f5c400;
  pointer-events: auto;
}

.pop-enter-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.pop-leave-active {
  transition: opacity 0.16s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .check__car-img,
  .check__marker,
  .check__rhomb,
  .check__pulse,
  .pop-enter-active,
  .pop-leave-active,
  .wire-enter-active .check__wire-line,
  .wire-leave-active {
    transition: none !important;
    animation: none !important;
  }
}

.check__pop-k {
  margin: 0 0 0.35rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a6220;
}

.check__pop-h {
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1a1a1c;
}

.check__pop-t {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #5c5c61;
}
</style>
