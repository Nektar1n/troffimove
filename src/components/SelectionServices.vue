<script setup>
import { computed, ref } from 'vue';
import imgVisit from '../assets/подбор на день.png';
import imgDay from '../assets/эксперт на день.png';
import imgTurnkey from '../assets/под ключ.png';

const current = ref('visit');

const services = [
  {
    id: 'visit',
    tab: 'Выездная проверка',
    title: 'Единоразовый выезд к объявлению',
    price: 'от 6 000 ₽ · по городу и области',
    image: imgVisit,
    imageAlt: 'Выездная проверка авто: осмотр на день, подбор по объявлению',
    bullets: [
      'Чек-лист кузова, ЛКП, салона и багажника по договорённости',
      'Сканер ошибок и базовая механика «с места»',
      'Устный разбор и краткая запись рисков; развёрнутый отчёт — опционально',
    ],
  },
  {
    id: 'day',
    tab: 'Эксперт на день',
    title: 'Несколько осмотров за один день',
    price: 'индивидуально · по количеству адресов',
    image: imgDay,
    imageAlt: 'Эксперт на день: несколько адресов и сравнение вариантов',
    bullets: [
      'Планируем маршрут и временные окна с продавцами',
      'Сравниваем варианты в конце дня: плюсы/минусы в одной таблице',
      'Подходит, если вы сами ищете объявления, а нам нужна «вторая голова»',
    ],
  },
  {
    id: 'turnkey',
    tab: 'Авто под ключ',
    title: 'Подбор б/у на месте до сделки',
    price: 'комиссия и этапы — по договору',
    image: imgTurnkey,
    imageAlt: 'Авто под ключ: сопровождение подбора и сделки на б/у',
    bullets: [
      'Бриф, фильтр объявлений, созвоны с продавцами и выезды по согласованию',
      'Юридическая проверка и сопровождение сделки у нотариуса / в банке',
      'Отдельно от импорта: это про рынок РФ и привоз не включаем',
    ],
  },
];

const activeService = computed(() => services.find((s) => s.id === current.value) ?? services[0]);
</script>

<template>
  <section id="services" class="svc" aria-labelledby="svc-title">
    <div class="svc__inner">
      <h2 v-reveal id="svc-title" class="svc__title">Услуги</h2>
      <p v-reveal="80" class="svc__lead">Три формата — от разового выезда до сопровождения до ключей на рынке б/у.</p>

      <div v-reveal="200" class="svc__shell">
        <div class="svc__tabs" role="tablist" aria-label="Форматы подбора и проверки">
          <button
            v-for="s in services"
            :id="'tab-' + s.id"
            :key="s.id"
            type="button"
            role="tab"
            class="svc__tab"
            :class="{ 'svc__tab--on': current === s.id }"
            :aria-selected="current === s.id"
            @click="current = s.id"
          >
            {{ s.tab }}
          </button>
        </div>

        <div
          class="svc__content"
          role="region"
          aria-label="Описание выбранного формата"
        >
          <Transition name="svc-fade" mode="out-in">
            <div
              :key="activeService.id"
              class="svc__content-body"
              role="tabpanel"
              :aria-labelledby="`tab-${activeService.id}`"
            >
              <div class="svc__text">
                <p class="svc__kicker">{{ activeService.tab }}</p>
                <h3 class="svc__h">{{ activeService.title }}</h3>
                <p class="svc__price">{{ activeService.price }}</p>
                <ul class="svc__list">
                  <li v-for="(b, i) in activeService.bullets" :key="i">{{ b }}</li>
                </ul>
              </div>
              <div class="svc__media">
                <div class="svc__media-frame">
                  <img
                    class="svc__img"
                    :src="activeService.image"
                    :alt="activeService.imageAlt"
                    width="720"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.svc {
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  background: #fff;
  border-bottom: 1px solid var(--line-light);
}

@media (min-width: 720px) {
  .svc {
    padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.svc__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.svc__title {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: clamp(1.75rem, 3.2vw, 2.35rem);
  letter-spacing: -0.035em;
}

.svc__lead {
  margin: 0 0 2rem;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
  max-width: 40rem;
}

.svc__shell {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .svc__shell {
    grid-template-columns: minmax(200px, 260px) minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
  }
}

.svc__tabs {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

@media (max-width: 899px) {
  .svc__tabs {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.svc__tab {
  text-align: left;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.8rem 1rem 0.8rem 0.85rem;
  border-radius: 0;
  border: 1px solid var(--line-light);
  border-left: 2px solid transparent;
  background: #fff;
  color: var(--muted);
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.svc__tab:hover:not(.svc__tab--on) {
  background: #f7f7f8;
  border-color: var(--line);
  border-left-color: rgba(245, 196, 18, 0.55);
  color: var(--text);
}

.svc__tab--on {
  background: #151517;
  color: #f5f5f7;
  border-color: #151517;
  border-left: 2px solid var(--yellow);
}

.svc__tab--on:hover,
.svc__tab--on:focus-visible {
  background: #1a1a1c;
  color: #f5f5f7;
  border-color: #1a1a1c;
  border-left-color: var(--yellow);
}

@media (max-width: 899px) {
  .svc__tab {
    flex: 1 1 auto;
    min-width: 0;
    text-align: center;
    font-size: 0.6875rem;
    padding: 0.6rem 0.4rem;
    border-left: 1px solid var(--line-light);
    border-bottom: 2px solid transparent;
  }

  .svc__tab--on {
    border-left: 1px solid #151517;
    border-bottom: 2px solid var(--yellow);
  }

  .svc__tab--on:hover,
  .svc__tab--on:focus-visible {
    background: #1a1a1c;
    color: #f5f5f7;
  }
}

.svc__tab:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Внешняя оболочка: рамка и min-height, чтобы при out-in панель не схлопывалась */
.svc__content {
  position: relative;
  overflow: hidden;
  min-height: 26rem;
  border: 1px solid var(--line-light);
  border-radius: 0;
  background: #fff;
}

@media (min-width: 800px) {
  .svc__content {
    min-height: 30rem;
  }
}

.svc__content-body {
  display: grid;
  min-height: 26rem;
  align-items: stretch;
  padding: 0;
  grid-template-columns: 1fr;
}

@media (min-width: 800px) {
  .svc__content-body {
    min-height: 30rem;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  }
}

.svc__text {
  box-sizing: border-box;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.4rem 1.65rem 1.5rem;
  border-left: 3px solid var(--yellow);
}

@media (min-width: 800px) {
  .svc__text {
    padding: 1.65rem 1.75rem 1.9rem 1.85rem;
  }
}

.svc__kicker {
  margin: 0 0 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.svc__media {
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-subtle);
  border-top: 1px solid var(--line-light);
}

@media (min-width: 800px) {
  .svc__media {
    border-top: 0;
    border-left: 1px solid var(--line-light);
  }
}

.svc__media-frame {
  position: relative;
  flex: 1 1 auto;
  min-height: 200px;
  aspect-ratio: 5 / 4;
}

@media (min-width: 800px) {
  .svc__media-frame {
    flex: 1 1 auto;
    min-height: 240px;
    height: 100%;
    aspect-ratio: auto;
  }
}

.svc__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.svc__h {
  margin: 0 0 0.4rem;
  font-size: clamp(1.15rem, 1.5vw, 1.3rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--text);
}

.svc__price {
  margin: 0 0 1.15rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--muted);
}

.svc__list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.90625rem;
  line-height: 1.55;
  color: var(--text);
}

.svc__list li {
  position: relative;
  margin-bottom: 0.6rem;
  padding-left: 0.9rem;
}

.svc__list li:last-child {
  margin-bottom: 0;
}

.svc__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  border-radius: 0;
  background: #151517;
}

.svc-fade-enter-active,
.svc-fade-leave-active {
  transition: opacity 0.42s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.svc-fade-enter-from,
.svc-fade-leave-to {
  opacity: 0;
}
</style>
