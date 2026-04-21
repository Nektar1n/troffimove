<script setup>
import { useInView } from '../composables/useInView.js';
import { textBrands } from '../data/brands.js';
import BrandLogo from './BrandLogo.vue';

const { el, visible } = useInView();

function svgBrand(slug) {
  return { kind: 'svg', slug };
}

function textBrand(key) {
  const t = textBrands.find((x) => x.key === key);
  if (!t) return null;
  return { kind: 'text', key: t.key, label: t.label, mono: t.mono };
}

const regions = [
  {
    id: 'kr',
    num: '01',
    title: 'Корея',
    lead: 'Рынок Encar: прозрачные пробеги, богатые комплектации, быстрый оборот лотов.',
    points: [
      'Сверка одометра с сервисной историей и страховыми случаями.',
      'Проверка залогов, ограничений и корректности ПТС на экспорт.',
      'Видео- и фотоосмотр по чек-листу: кузов, салон, электрика, подрамник.',
      'Контракт с фиксированной ценой выкупа и сроком отгрузки из порта.',
    ],
    brands: [svgBrand('hyundai'), svgBrand('kia'), textBrand('genesis'), svgBrand('renault')].filter(Boolean),
    delay: '0s',
  },
  {
    id: 'eu',
    num: '02',
    title: 'Европа',
    lead: 'Дилерские и брокерские поставки: премиум, бизнес-класс и редкие комплектации.',
    points: [
      'Полный VIN-отчёт и сверка с официальным сервисом бренда.',
      'Пакет для таможни: инвойс, CMR, сертификация по требованиям РФ.',
      'Согласование опций и пробега до оплаты; налоги и сборы — в смете.',
      'Доставка автовозом или фрахтом — по согласованному маршруту.',
    ],
    brands: [
      svgBrand('bmw'),
      textBrand('mercedes'),
      svgBrand('audi'),
      svgBrand('volkswagen'),
      svgBrand('porsche'),
      svgBrand('volvo'),
    ].filter(Boolean),
    delay: '0.06s',
  },
  {
    id: 'jp',
    num: '03',
    title: 'Япония',
    lead: 'Аукционы USS, TAA, JU и др.: лоты с листом оценки и фиксированной грейд-схемой.',
    points: [
      'Подбор по Grade, пробегу, региону эксплуатации и типу кузова.',
      'Расчёт утильсбора и итоговой стоимости в РФ до поднятия молотка.',
      'Таможенный перевод и комплект документов для выпуска.',
      'Опыт с JDM, гибридами и микроавтобусами под семейный и бизнес-спрос.',
    ],
    brands: [
      svgBrand('toyota'),
      svgBrand('honda'),
      svgBrand('nissan'),
      svgBrand('mazda'),
      textBrand('lexus'),
      svgBrand('subaru'),
    ].filter(Boolean),
    delay: '0.12s',
  },
];
</script>

<template>
  <section id="regions" ref="el" class="sec">
    <div class="sec__head">
      <h2 class="sec__title">Откуда везём</h2>
      <p class="sec__lead">
        Разные рынки — разные риски. Мы заранее говорим, где выгоднее искать ваш класс авто и что будет стоить каждый
        этап в цифрах. Рядом с каждым направлением — ориентиры по самым узнаваемым маркам.
      </p>
    </div>
    <div class="grid">
      <article
        v-for="r in regions"
        :key="r.id"
        class="card"
        :class="{ 'card--in': visible }"
        :style="{ '--delay': r.delay }"
      >
        <div class="card__brands" :aria-label="'Марки-ориентиры: ' + r.title">
          <BrandLogo v-for="(b, idx) in r.brands" :key="r.id + '-' + idx" :brand="b" />
        </div>

        <span class="card__num">{{ r.num }}</span>
        <h3 class="card__title">{{ r.title }}</h3>
        <p class="card__sub">{{ r.lead }}</p>
        <ul class="card__list">
          <li v-for="(p, idx) in r.points" :key="idx">{{ p }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.sec {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
}

@media (min-width: 720px) {
  .sec {
    padding: 3.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.sec__head {
  margin-bottom: 2.5rem;
  max-width: 38rem;
}

.sec__title {
  font-weight: 600;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.sec__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
}

.grid {
  display: grid;
  gap: 1px;
  background: var(--line-light);
  border: 1px solid var(--line-light);
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.card {
  background: var(--bg);
  padding: 1.35rem 1.15rem 1.5rem;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.5s ease var(--delay),
    transform 0.5s ease var(--delay);
}

@media (min-width: 720px) {
  .card {
    padding: 1.75rem 1.5rem 2rem;
  }
}

.card--in {
  opacity: 1;
  transform: translateY(0);
}

.card__brands {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
}

.card__brands :deep(.brand-logo) {
  width: 2.35rem;
  height: 2.35rem;
  min-width: 36px;
  min-height: 36px;
}

.card__brands :deep(.brand-logo__svg svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.card__brands :deep(.brand-logo__mono) {
  font-size: 0.58rem;
}

.card__num {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.card__title {
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  margin: 0 0 0.65rem;
}

.card__sub {
  margin: 0 0 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--muted);
}

.card__list {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text);
}

.card__list li {
  margin-bottom: 0.5rem;
}

.card__list li:last-child {
  margin-bottom: 0;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
