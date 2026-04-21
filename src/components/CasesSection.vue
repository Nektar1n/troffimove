<script setup>
import { useInView } from '../composables/useInView.js';
import imgGenesisCase from '../assets/gelik.jpeg';
import imgAlphardCase from '../assets/toyotagn.jpeg';
import imgBmwCase from '../assets/bmw.jpeg';
import imgCarnivalCase from '../assets/toyota.jpeg';

const { el, visible } = useInView();

const cases = [
  {
    tag: 'Корея',
    model: 'Genesis GV80, 2022',
    meta: 'Под ключ · 28 дней морем · смета зафиксирована в договоре',
    text:
      'Клиент искал семиместный кроссовер с панорамой и пакетом Lexicon. Мы отфильтровали лоты с реальным пробегом, сделали видеоосмотр лакокраски и подвески, согласовали цену с продавцом и забронировали лот до перевода. Документы на экспорт и страховка груза — у нас; клиент получил калькуляцию таможни и утильсбора до оплаты.',
    image: imgGenesisCase,
  },
  {
    tag: 'Япония',
    model: 'Toyota Alphard Executive Lounge, 2021',
    meta: 'USS Tokyo · оценка 4.5B · аукционный лист и перевод',
    text:
      'Запрос на кресла-капсулы второго ряда и минимальную историю ремонтов. Подняли несколько лотов с близкими Grade, сравнили регионы регистрации и пробег. До торгов посчитали полную стоимость в РФ; после выигрыша оформили выкуп, доставку до порта Японии и морскую перевозку с трекингом.',
    image: imgAlphardCase,
  },
  {
    tag: 'Европа',
    model: 'BMW 540i xDrive, 2020',
    meta: 'Официальный дилер EU · сервисная книга · VIN-отчёт',
    text:
      'Нужен был шестицилиндровый седан с M Sport и активным круизом. Проверили опции по VIN, сверили пробег с онлайн-сервисом бренда, получили закрывающие документы для таможни. Авто ушло автовозом до консолидации в Германии, затем контейнером — сроки по каждому плечу прописали в отчёте для клиента.',
    image: imgBmwCase,
  },
  {
    tag: 'Корея',
    model: 'Kia Carnival Hi-Limousine, 2023',
    meta: 'Редкий VIP-ряд · согласование опций · страхование кузова',
    text:
      'Поиск заводской четырёхместной конфигурации с перегородкой. Мы отсекли переоборудованные машины, запросили фото рельсов сдвижных дверей и люка, проверили наличие оригинальных мониторов. После выкупа клиент получал еженедельные статусы: склад в Корее → погрузка → судно → прибытие в порт РФ.',
    image: imgCarnivalCase,
  },
];
</script>

<template>
  <section id="cases" ref="el" class="sec">
    <div class="sec__intro">
      <h2 class="sec__title">Примеры сделок</h2>
      <p class="sec__lead">
        Реальные этапы кейсов. 
      </p>
    </div>
    <div class="track" tabindex="0">
      <article
        v-for="(c, i) in cases"
        :key="c.model"
        class="card"
        :class="{ 'card--in': visible }"
        :style="{ transitionDelay: `${0.06 * i}s` }"
      >
        <div class="card__media">
          <img
            class="card__img"
            :src="c.image"
            width="800"
            height="500"
            :alt="`Иллюстрация к кейсу: ${c.model}`"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card__body">
          <span class="card__tag">{{ c.tag }}</span>
          <h3 class="card__model">{{ c.model }}</h3>
          <p class="card__meta">{{ c.meta }}</p>
          <p class="card__text">{{ c.text }}</p>
          <a class="card__cta" href="#contact">Обсудить похожую сделку →</a>
        </div>
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

.sec__intro {
  margin-bottom: 2rem;
  max-width: 40rem;
}

.sec__title {
  font-weight: 600;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.65rem;
}

.sec__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
}

.track {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 960px) {
  .track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    overflow: visible;
    padding-bottom: 0;
    scroll-snap-type: none;
  }
}

.track::-webkit-scrollbar {
  height: 4px;
}
.track::-webkit-scrollbar-thumb {
  background: var(--line);
  border-radius: 4px;
}

.card {
  flex: 0 0 min(340px, calc(100vw - 2.25rem - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--line-light);
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  transform: translateX(12px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.card--in {
  opacity: 1;
  transform: translateX(0);
}

@media (min-width: 960px) {
  .card {
    flex: none;
    min-width: 0;
    transform: translateY(12px);
  }

  .card--in {
    transform: translateY(0);
  }
}

.card:hover {
  border-color: var(--line);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
}

.card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--bg-subtle);
}

.card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.card__body {
  padding: 1.25rem 1.2rem 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card__tag {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.65rem;
}

.card__model {
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.02em;
  margin: 0 0 0.45rem;
  line-height: 1.3;
  color: #000;
}

.card__meta {
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--muted);
}

.card__text {
  margin: 0 0 1.1rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text);
  flex: 1;
}

.card__cta {
  align-self: flex-start;
  font-size: 0.875rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.card__cta:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
