<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import autoScheme from '../assets/автоСхема.png';

const zones = [
  {
    id: 'gearbox',
    title: 'КПП и привод',
    text: 'Работа коробки, толчки, шумы, состояние привода.',
    tag: 'Трансмиссия',
    side: 'left',
    anchor: { x: 54.6, y: 61.8 },
    bends: [{ x: 40.2, y: 61.8 }, { x: 24.6, y: 24.2 }],
    port: { x: 24, y: 18 },
    card: { x: 2.8, y: 19.5 },
  },
  {
    id: 'engine',
    title: 'Двигатель',
    text: 'Течи, запуск, посторонние звуки и навесное.',
    tag: 'Мотор',
    side: 'left',
    anchor: { x: 42.6, y: 51.6 },
    bends: [{ x: 31.2, y: 51.6 }, { x: 22.5, y: 37.1 }],
    port: { x: 22, y: 34 },
    card: { x: 2.8, y: 31.5 },
  },
  {
    id: 'turbo',
    title: 'Впуск и турбина',
    text: 'Патрубки, наддув, свисты, следы масла и общее состояние узла.',
    tag: 'Наддув',
    side: 'left',
    anchor: { x: 40.4, y: 46.2 },
    bends: [{ x: 30.4, y: 46.2 }, { x: 22.5, y: 52.2 }],
    port: { x: 22, y: 50 },
    card: { x: 2.8, y: 44.5 },
  },
  {
    id: 'body',
    title: 'Кузов и покрытие',
    text: 'Зазоры, окрас, геометрия и следы ремонта.',
    tag: 'Экстерьер',
    side: 'left',
    anchor: { x: 61.9, y: 43.9 },
    bends: [{ x: 34.4, y: 43.9 }, { x: 23.5, y: 68.4 }],
    port: { x: 23, y: 67 },
    card: { x: 2.8, y: 58 },
  },
  {
    id: 'electronics',
    title: 'Электрика и ошибки',
    text: 'Считывание ошибок, датчики, свет и блоки.',
    tag: 'Диагностика',
    side: 'left',
    anchor: { x: 32.6, y: 62.4 },
    bends: [{ x: 28.2, y: 62.4 }, { x: 24.4, y: 83.4 }],
    port: { x: 24, y: 84 },
    card: { x: 2.8, y: 74.5 },
  },
  {
    id: 'mileage',
    title: 'Реальный пробег',
    text: 'Косвенные признаки износа и сверка истории.',
    tag: 'История',
    side: 'top',
    anchor: { x: 56.6, y: 42.8 },
    bends: [{ x: 47.4, y: 42.8 }, { x: 47.4, y: 16.2 }],
    port: { x: 39, y: 14 },
    card: { x: 35, y: 7.5 },
  },
  {
    id: 'suspension',
    title: 'Подвеска и рулевое',
    text: 'Люфты, стойки, рычаги, рулевые тяги и общее состояние ходовой.',
    tag: 'Ходовая',
    side: 'right',
    anchor: { x: 69.6, y: 59.2 },
    bends: [{ x: 72.6, y: 59.2 }, { x: 72.1, y: 31.6 }],
    port: { x: 88, y: 30 },
    card: { x: 77.2, y: 22.5 },
  },
  {
    id: 'salon',
    title: 'Салон и безопасность',
    text: 'Подушки, ремни, сиденья, руль и общий износ.',
    tag: 'Интерьер',
    side: 'right',
    anchor: { x: 60, y: 43.8 },
    bends: [{ x: 72.8, y: 24.8 }, { x: 74, y: 17.2 }],
    port: { x: 73, y: 15 },
    card: { x: 74, y: 10.5 },
  },
  {
    id: 'brakes',
    title: 'Тормоза и колеса',
    text: 'Диски, резина, суппорты, следы перегрева.',
    tag: 'Тормоза',
    side: 'right',
    anchor: { x: 69.8, y: 63.6 },
    bends: [{ x: 75.6, y: 58.6 }, { x: 75.4, y: 50.9 }],
    port: { x: 89, y: 48 },
    card: { x: 77.2, y: 43.5 },
  },
  {
    id: 'documents',
    title: 'VIN и документы',
    text: 'Маркировки, стекла, таблички и юр. чистота.',
    tag: 'Юридически',
    side: 'right',
    anchor: { x: 54.2, y: 65.6 },
    bends: [{ x: 60.2, y: 70.6 }, { x: 64.4, y: 78 }],
    port: { x: 84, y: 79 },
    card: { x: 74, y: 71 },
  },
];

const iconPaths = {
  gearbox: ['M4 9h16', 'M7 9V5h3l2 2h4l2-2h3v4', 'M8 13h8', 'M12 13v4'],
  engine: ['M5 10V8l2-2h10l2 2v7H5z', 'M3 10h2', 'M19 10h2', 'M8 6V4', 'M16 6V4', 'M9 13h6'],
  turbo: ['M12 6a6 6 0 1 0 6 6', 'M12 10a2 2 0 1 0 2 2', 'M10 14l-3 3', 'M15 9l3-3'],
  body: ['M3 14l2-4 3-2h7l3 2 3 4', 'M5 14h14', 'M7 16a1.5 1.5 0 1 0 0 .01', 'M17 16a1.5 1.5 0 1 0 0 .01'],
  electronics: ['M8 4v3', 'M12 4v3', 'M16 4v3', 'M8 17v3', 'M12 17v3', 'M16 17v3', 'M4 8h3', 'M4 12h3', 'M4 16h3', 'M17 8h3', 'M17 12h3', 'M17 16h3', 'M8 8h8v8H8z'],
  mileage: ['M5 15a7 7 0 1 1 14 0', 'M12 15l4-5', 'M12 11v1'],
  suspension: ['M8 4v3l4 3-4 4 4 3-4 3v3', 'M16 4v16'],
  salon: ['M8 6a2 2 0 1 1 4 0', 'M7 10h6l2 4v4', 'M7 10v8', 'M15 14h3'],
  brakes: ['M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0-14', 'M12 8v4l3 2', 'M12 12h.01'],
  documents: ['M7 4h7l4 4v12H7z', 'M14 4v4h4', 'M9 13h6', 'M9 17h4'],
};

function pad2(n) {
  return String(n).padStart(2, '0');
}

const boardEl = ref(null);
const dynamicPorts = ref({});
const calloutEls = new Map();
let measureRaf = 0;

function setCalloutRef(id, el) {
  if (el) calloutEls.set(id, el);
  else calloutEls.delete(id);
}

function portPos(zone) {
  return dynamicPorts.value[zone.id] ?? zone.port;
}

function measurePorts() {
  const board = boardEl.value;
  if (!board) return;

  const boardRect = board.getBoundingClientRect();
  const nextPorts = {};

  for (const zone of zones) {
    const el = calloutEls.get(zone.id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    let x = zone.port.x;
    let y = zone.port.y;

    if (zone.side === 'left') {
      x = ((rect.right - boardRect.left) / boardRect.width) * 100;
      y = ((rect.top + rect.height * 0.5 - boardRect.top) / boardRect.height) * 100;
    } else if (zone.side === 'right') {
      x = ((rect.left - boardRect.left) / boardRect.width) * 100;
      y = ((rect.top + rect.height * 0.5 - boardRect.top) / boardRect.height) * 100;
    } else {
      x = ((rect.left + rect.width * 0.5 - boardRect.left) / boardRect.width) * 100;
      y = ((rect.bottom - boardRect.top) / boardRect.height) * 100;
    }

    nextPorts[zone.id] = { x, y };
  }

  dynamicPorts.value = nextPorts;
}

function scheduleMeasure() {
  cancelAnimationFrame(measureRaf);
  measureRaf = requestAnimationFrame(() => {
    measurePorts();
  });
}

function wireRoute(zone) {
  const port = portPos(zone);
  return [zone.anchor, ...(zone.bends ?? []), port];
}

function wirePoints(zone) {
  return wireRoute(zone).map((p) => `${p.x},${p.y}`).join(' ');
}

onMounted(async () => {
  await nextTick();
  scheduleMeasure();
  window.addEventListener('resize', scheduleMeasure);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(measureRaf);
  window.removeEventListener('resize', scheduleMeasure);
});
</script>

<template>
  <section id="check" class="scheme" aria-labelledby="scheme-title">
    <div class="scheme__bleed" aria-hidden="true" />

    <div class="scheme__inner">
      <div ref="boardEl" v-reveal="140" class="scheme__board">
        <h2 id="scheme-title" class="scheme__title">Что проверяем</h2>

        <svg class="scheme__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            v-for="zone in zones"
            :key="`${zone.id}-wire`"
            class="scheme__wire"
            :points="wirePoints(zone)"
          />
        </svg>

        <div class="scheme__nodes" aria-hidden="true">
          <span
            v-for="zone in zones"
            :key="`${zone.id}-anchor-dot`"
            class="scheme__node scheme__node--anchor"
            :style="{ left: `${zone.anchor.x}%`, top: `${zone.anchor.y}%` }"
          />
          <span
            v-for="zone in zones"
            :key="`${zone.id}-port-dot`"
            class="scheme__node scheme__node--port"
            :style="{ left: `${portPos(zone).x}%`, top: `${portPos(zone).y}%` }"
          />
        </div>

        <img
          class="scheme__car"
          :src="autoScheme"
          width="1024"
          height="576"
          alt=""
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />

        <article
          v-for="(zone, i) in zones"
          :key="zone.id"
          :ref="(el) => setCalloutRef(zone.id, el)"
          class="scheme__callout"
          :class="`scheme__callout--${zone.side}`"
          :style="{ left: `${zone.card.x}%`, top: `${zone.card.y}%` }"
        >
          <div class="scheme__callout-top">
            <span class="scheme__callout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  v-for="path in iconPaths[zone.id]"
                  :key="path"
                  :d="path"
                />
              </svg>
            </span>
            <span class="scheme__callout-tag">{{ zone.tag }}</span>
          </div>
          <h3 class="scheme__callout-title">{{ zone.title }}</h3>
          <p class="scheme__callout-text">{{ zone.text }}</p>
        </article>
      </div>

      <div class="scheme__mobile-list" role="list" aria-label="Пункты осмотра">
        <article
          v-for="(zone, i) in zones"
          :key="`${zone.id}-mobile`"
          v-reveal="140 + i * 35"
          class="scheme__mobile-item"
          role="listitem"
        >
          <span class="scheme__mobile-num">{{ pad2(i + 1) }}</span>
          <div>
            <p class="scheme__mobile-tag">{{ zone.tag }}</p>
            <h3 class="scheme__mobile-title">{{ zone.title }}</h3>
            <p class="scheme__mobile-text">{{ zone.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scheme {
  --scheme-line: color-mix(in srgb, var(--yellow, #f5c412) 52%, white 48%);
  --scheme-text: #f7f7f8;
  --scheme-muted: rgba(247, 247, 248, 0.78);

  position: relative;
  z-index: 0;
  padding: 0 0 2rem;
  background: #050607;
  border-bottom: 0;
  overflow: hidden;
}

@media (min-width: 900px) {
  .scheme {
    padding: 0 0 2.5rem;
  }
}

.scheme__bleed {
  display: none;
}

.scheme__inner {
  max-width: min(1520px, calc(100vw - 1.5rem));
  margin: 0 auto;
}

.scheme__title {
  position: absolute;
  left: max(1rem, calc((100vw - var(--content-max)) / 2 + 1rem));
  top: 1.25rem;
  z-index: 5;
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 600;
  color: var(--yellow, #f5c412);
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.32);
}

.scheme__board {
  position: relative;
  width: 100vw;
  height: clamp(35rem, 56vw, 54rem);
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: #050607;
  border-top: none;
  border-bottom: none;
  box-shadow: none;
  overflow: hidden;
}

.scheme__board::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.44), rgba(0, 0, 0, 0.1) 18%, rgba(0, 0, 0, 0.08) 76%, rgba(0, 0, 0, 0.34)),
    radial-gradient(circle at 50% 52%, rgba(255, 255, 255, 0.06), transparent 34%);
  opacity: 1;
  pointer-events: none;
  z-index: 2;
}

.scheme__wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.scheme__nodes {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.scheme__wire {
  fill: none;
  stroke: var(--scheme-line);
  stroke-width: 0.11;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.72;
}

.scheme__node {
  position: absolute;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}

.scheme__node--anchor {
  width: 0.5rem;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
}

.scheme__node--port {
  width: 0.42rem;
  height: 0.42rem;
  background: rgba(255, 255, 255, 0.82);
}

.scheme__car {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  object-fit: cover;
  object-position: center 52%;
  filter: brightness(0.99) contrast(1.02) saturate(1.01);
}

.scheme__callout {
  position: absolute;
  z-index: 4;
  width: clamp(10.2rem, 12.8vw, 13.2rem);
  min-width: 10.2rem;
  padding: 0.7rem 0.8rem 0.76rem;
  border-radius: 0.95rem;
  background: linear-gradient(180deg, rgba(12, 13, 16, 0.78), rgba(12, 13, 16, 0.62));
  border: 1px solid color-mix(in srgb, var(--yellow, #f5c412) 18%, rgba(255, 255, 255, 0.14));
  box-shadow:
    0 12px 26px -18px rgba(0, 0, 0, 0.62),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.scheme__callout-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}

.scheme__callout-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--yellow, #f5c412) 88%, white 12%);
  border: 1px solid color-mix(in srgb, var(--yellow, #f5c412) 70%, white 30%);
}

.scheme__callout-icon svg {
  width: 0.95rem;
  height: 0.95rem;
  stroke: var(--yellow-ink, #111);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.scheme__callout-tag {
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--yellow, #f5c412) 82%, white 18%);
  opacity: 1;
}

.scheme__callout-title {
  margin: 0 0 0.28rem;
  font-size: 0.9rem;
  line-height: 1.16;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.45);
}

.scheme__callout-text {
  margin: 0;
  font-size: 0.74rem;
  line-height: 1.42;
  color: rgba(251, 252, 254, 0.76);
}

.scheme__mobile-list {
  display: none;
}

@media (max-width: 1199px) {
  .scheme {
    padding-bottom: 1.5rem;
  }

  .scheme__title {
    left: 1rem;
    top: 1rem;
    font-size: clamp(1.35rem, 4.5vw, 1.75rem);
  }

  .scheme__board {
    width: calc(100% - 2rem);
    height: 28rem;
    margin: 0 auto;
    border-radius: 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .scheme__wires,
  .scheme__nodes,
  .scheme__callout {
    display: none;
  }

  .scheme__car {
    inset: 3.4rem 0 0;
    width: 100%;
    height: calc(100% - 3.4rem);
    object-fit: contain;
    object-position: center bottom;
  }

  .scheme__mobile-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    width: calc(100% - 2rem);
    margin: 1rem auto 0;
  }

  .scheme__mobile-item {
    display: grid;
    grid-template-columns: 2.2rem 1fr;
    gap: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--surface-dark-2, #161618) 88%, black 12%);
    border: 1px solid color-mix(in srgb, var(--yellow, #f5c412) 18%, rgba(255, 255, 255, 0.1));
  }

  .scheme__mobile-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--yellow-ink, #111);
    background: var(--yellow, #f5c412);
  }

  .scheme__mobile-title {
    margin: 0 0 0.22rem;
    font-size: 0.96rem;
    line-height: 1.2;
    font-weight: 600;
    color: var(--scheme-text);
  }

  .scheme__mobile-tag {
    margin: 0 0 0.15rem;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--yellow, #f5c412) 82%, white 18%);
  }

  .scheme__mobile-text {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--scheme-muted);
  }
}

@media (min-width: 1200px) and (max-width: 1439px) {
  .scheme__board {
    height: clamp(36rem, 57vw, 44rem);
  }

  .scheme__callout {
    width: 9.45rem;
    min-width: 9.45rem;
    padding: 0.62rem 0.68rem 0.7rem;
  }

  .scheme__callout-tag {
    font-size: 0.5rem;
    letter-spacing: 0.12em;
  }

  .scheme__callout-title {
    font-size: 0.84rem;
  }

  .scheme__callout-text {
    font-size: 0.68rem;
    line-height: 1.35;
  }

  .scheme__callout:nth-of-type(1) {
    left: 2.4% !important;
    top: 17% !important;
  }

  .scheme__callout:nth-of-type(2) {
    left: 2.4% !important;
    top: 31.5% !important;
  }

  .scheme__callout:nth-of-type(3) {
    left: 2.4% !important;
    top: 46% !important;
  }

  .scheme__callout:nth-of-type(4) {
    left: 2.4% !important;
    top: 61.5% !important;
  }

  .scheme__callout:nth-of-type(5) {
    left: 3.2% !important;
    top: 77.5% !important;
  }

  .scheme__callout:nth-of-type(6) {
    left: 34.2% !important;
    top: 5.8% !important;
  }

  .scheme__callout:nth-of-type(7) {
    left: 77.6% !important;
    top: 25.2% !important;
  }

  .scheme__callout:nth-of-type(8) {
    left: 75.6% !important;
    top: 8.8% !important;
  }

  .scheme__callout:nth-of-type(9) {
    left: 77.8% !important;
    top: 47.8% !important;
  }

  .scheme__callout:nth-of-type(10) {
    left: 74.6% !important;
    top: 70.8% !important;
  }
}

@media (max-width: 899px) {
  .scheme__title {
    top: 0.85rem;
    left: 0.9rem;
    font-size: clamp(1.2rem, 5.5vw, 1.5rem);
  }

  .scheme__board {
    height: 23rem;
  }

  .scheme__car {
    inset: 3rem 0 0;
    height: calc(100% - 3rem);
  }

  .scheme__mobile-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1600px) {
  .scheme__board {
    height: clamp(38rem, 54vw, 58rem);
  }

  .scheme__callout {
    width: clamp(11.4rem, 11vw, 13.6rem);
  }
}
</style>
