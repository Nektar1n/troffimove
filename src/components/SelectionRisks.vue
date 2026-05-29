<script setup>
import imgGauge from '../assets/risk-gauge-1100.jpg';
import imgLegal from '../assets/risk-legal-1100.jpg';
import imgMismatch from '../assets/risk-mismatch-1100.jpg';

const items = [
  {
    title: 'Скрытый ремонт',
    text: 'Перекрашенные элементы, несоответствие зазоров, «свежий» салон при завышенном пробеге — отмечаем в акте.',
    img: imgGauge,
    alt: 'Толщиномер для проверки лакокрасочного покрытия',
  },
  {
    title: 'Юридические риски',
    text: 'Залоги, ограничения, ПТС и владельцы по базам — базовая проверка до выкупа, чтобы не встать в очередь к юристу.',
    img: imgLegal,
    alt: 'Проверка юридической чистоты автомобиля',
  },
  {
    title: 'Несостыковки по технике',
    text: 'Утечки, стуки, ошибки по OBD, состояние тормозов и подвески — не «пощупали», а зафиксировали фактами.',
    img: imgMismatch,
    alt: 'Диагностика и фиксация несостыковок по технике',
  },
];
</script>

<template>
  <section class="risks" aria-labelledby="risks-title">
    <div class="risks__bleed" aria-hidden="true" />
    <div class="risks__inner">
      <p class="risks__kicker">Что смотрим на выезде</p>
      <h2 v-reveal id="risks-title" class="risks__title">Зачем выезд, если «всё честно» в объявлении</h2>
      <p class="risks__intro">
        Три типа рисков — с фотографиями и фиксацией в отчёте, без «пощупал и уехал».
      </p>

      <ul class="risks__list">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal.fade="i * 70"
          class="risks__card"
          :class="{ 'risks__card--reverse': i % 2 === 1 }"
        >
          <div class="risks__shot">
            <div class="risks__shot-frame">
              <img
                class="risks__img"
                :src="item.img"
                :alt="item.alt"
                width="1100"
                height="614"
                :loading="i === 0 ? 'eager' : 'lazy'"
                decoding="async"
                :fetchpriority="i === 0 ? 'high' : 'low'"
              />
            </div>
          </div>
          <div class="risks__panel">
            <span class="risks__n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="risks__h">{{ item.title }}</h3>
            <p class="risks__p">{{ item.text }}</p>
            <span class="risks__panel-bar" aria-hidden="true" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.risks {
  --risks-bg: var(--color-graphite);
  --risks-surface: var(--color-graphite);
  --risks-border: rgb(var(--color-milk-rgb) / 0.1);
  --risks-text: var(--color-milk);
  --risks-muted: rgb(var(--color-milk-rgb) / 0.64);

  position: relative;
  z-index: 0;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.75rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--risks-border);
  background: var(--risks-bg);
  overflow: clip;
}

.risks__bleed {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--risks-bg);
  pointer-events: none;
}

@media (min-width: 720px) {
  .risks {
    padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.risks__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.risks__kicker {
  margin: 0 0 0.4rem;
  font-size: 0.66rem;
  font-weight: 600;
  font-style: normal;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(233, 190, 95, 0.86);
}

.risks__title {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: -0.03em;
  line-height: 1.15;
  max-width: 22ch;
  color: var(--risks-text);
}

.risks__intro {
  margin: 0 0 1.75rem;
  max-width: 40rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--risks-muted);
}

.risks__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 900px) {
  .risks__list {
    gap: 1.15rem;
  }
}

.risks__card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
  border-radius: 0.95rem;
  overflow: hidden;
  border: 1px solid var(--risks-border);
  box-shadow: 0 18px 32px -28px rgb(var(--color-graphite-rgb) / 0.82);
  background: var(--risks-surface);
}

@media (min-width: 900px) {
  .risks__card {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
    min-height: 220px;
  }

  .risks__shot {
    order: 1;
  }

  .risks__panel {
    order: 2;
  }

  .risks__card--reverse .risks__shot {
    order: 2;
  }

  .risks__card--reverse .risks__panel {
    order: 1;
  }
}

.risks__shot {
  position: relative;
  min-height: 200px;
  background: var(--risks-bg);
}

@media (min-width: 900px) {
  .risks__shot {
    min-height: 0;
  }
}

.risks__shot-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  contain: paint;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.risks__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.risks__shot::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(var(--color-graphite-rgb) / 0.42) 0%, transparent 46%);
  pointer-events: none;
  opacity: 1;
}

.risks__card--reverse .risks__shot::after {
  background: linear-gradient(270deg, rgb(var(--color-graphite-rgb) / 0.42) 0%, transparent 46%);
}

@media (max-width: 899px) {
  .risks__shot::after,
  .risks__card--reverse .risks__shot::after {
    background: linear-gradient(180deg, rgb(var(--color-graphite-rgb) / 0.35) 0%, transparent 50%);
  }
}

.risks__panel {
  position: relative;
  padding: 1.35rem 1.35rem 1.45rem 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  background: var(--risks-surface);
  color: var(--risks-text);
  min-height: 0;
}

@media (min-width: 900px) {
  .risks__panel {
    padding: 1.5rem 1.6rem 1.6rem 1.5rem;
  }
}

.risks__n {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--yellow);
  font-variant-numeric: tabular-nums;
}

.risks__h {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.14rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.16;
  color: var(--risks-text);
}

.risks__p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.7);
  max-width: 46ch;
}

.risks__panel-bar {
  position: absolute;
  left: 0;
  top: 1.1rem;
  bottom: 1.1rem;
  width: 2px;
  border-radius: 0;
  background: var(--yellow);
}

.risks__card--reverse .risks__panel-bar {
  left: auto;
  right: 0;
  border-radius: 0;
}

@media (max-width: 899px) {
  .risks__card--reverse .risks__panel-bar {
    left: 0;
    right: auto;
    border-radius: 0;
  }
}

</style>
