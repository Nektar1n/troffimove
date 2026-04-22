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
                loading="eager"
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
  position: relative;
  z-index: 0;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.75rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
  background: transparent;
  overflow: clip;
}

.risks__bleed {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, #f0f0f3 0%, var(--bg) 24%, var(--bg) 100%);
  pointer-events: none;
}

@media (min-width: 720px) {
  .risks {
    padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.risks__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.risks__kicker {
  margin: 0 0 0.4rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5c5c61;
}

.risks__title {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: -0.03em;
  line-height: 1.15;
  max-width: 22ch;
  color: var(--text);
}

.risks__intro {
  margin: 0 0 1.75rem;
  max-width: 40rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--muted);
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
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  background: #111;
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
  background: #0a0a0c;
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
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, transparent 45%);
  pointer-events: none;
  opacity: 0.85;
}

.risks__card--reverse .risks__shot::after {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, transparent 45%);
}

@media (max-width: 899px) {
  .risks__shot::after,
  .risks__card--reverse .risks__shot::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 50%);
  }
}

.risks__panel {
  position: relative;
  padding: 1.35rem 1.35rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(145deg, var(--surface-dark-2) 0%, var(--surface-dark) 100%);
  color: #f5f5f7;
  min-height: 0;
}

@media (min-width: 900px) {
  .risks__panel {
    padding: 1.5rem 1.6rem 1.6rem 1.5rem;
  }
}

.risks__n {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--yellow);
  font-variant-numeric: tabular-nums;
}

.risks__h {
  margin: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: #fff;
}

.risks__p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(245, 245, 247, 0.78);
  max-width: 46ch;
}

.risks__panel-bar {
  position: absolute;
  left: 0;
  top: 1.1rem;
  bottom: 1.1rem;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: var(--yellow);
}

.risks__card--reverse .risks__panel-bar {
  left: auto;
  right: 0;
  border-radius: 2px 0 0 2px;
}

@media (max-width: 899px) {
  .risks__card--reverse .risks__panel-bar {
    left: 0;
    right: auto;
    border-radius: 0 2px 2px 0;
  }
}

</style>
