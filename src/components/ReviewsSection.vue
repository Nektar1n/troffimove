<script setup>
import { computed } from 'vue';
import { useInView } from '../composables/useInView.js';
import { reviewsTelegramUrl } from '../config/site.js';

const { el, visible } = useInView();

const tgHref = computed(() => {
  const u = reviewsTelegramUrl.trim();
  return u.length ? u : null;
});

const summary = {
  score: '4,9',
  count: '128 отзывов',
};

const reviews = [
  {
    name: 'Иван П.',
    date: '10.01.2025',
    text: 'Заказали GV80 из Кореи: осмотр по видео, все сроки по договору, без скрытых платежей. Машина пришла как обещали.',
  },
  {
    name: 'Марина К.',
    date: '02.12.2024',
    text: 'Вели сделку с аукциона Японии, помогли с утильсбором и расчётом до копейки. Отвечали быстро, всё по делу.',
  },
  {
    name: 'Алексей В.',
    date: '18.11.2024',
    text: 'Брал BMW из Европы — проверили VIN, сервисную книгу, довезли до Москвы без сюрпризов. Рекомендую.',
  },
  {
    name: 'Дмитрий С.',
    date: '05.10.2024',
    text: 'Первый опыт привоза — всё объяснили, сопровождали от заявки до постановки на учёт. Спасибо Дмитрию и команде!',
  },
];
</script>

<template>
  <section id="reviews" ref="el" class="rev">
    <div class="rev__head">
      <div class="rev__titles">
        <h2 class="rev__title">Отзывы клиентов</h2>
        <p class="rev__sub">Отзывы и истории сделок — в нашем Telegram. Ниже несколько примеров с сайта.</p>
      </div>
      <div class="rev__rating" aria-label="Средняя оценка">
        <span class="rev__score">{{ summary.score }}</span>
        <span class="rev__stars" aria-hidden="true">★★★★★</span>
        <span class="rev__count">{{ summary.count }}</span>
      </div>
    </div>

    <div class="rev__grid" :class="{ 'rev__grid--in': visible }">
      <article
        v-for="(r, i) in reviews"
        :key="r.name + r.date"
        class="rev__card"
        :style="{ transitionDelay: `${i * 0.08}s` }"
      >
        <div class="rev__card-top">
          <span class="rev__name">{{ r.name }}</span>
          <div class="rev__meta">
            <span class="rev__card-stars" aria-hidden="true">★★★★★</span>
            <time class="rev__date" :datetime="r.date">{{ r.date }}</time>
          </div>
        </div>
        <p class="rev__text">{{ r.text }}</p>
      </article>
    </div>

    <a
      v-if="tgHref"
      class="rev__cta"
      :href="tgHref"
      target="_blank"
      rel="noopener noreferrer"
    >
      Все отзывы в Telegram
      <span class="rev__arrow" aria-hidden="true">→</span>
    </a>
    <p v-else class="rev__hint">Добавьте в <code class="rev__code">.env</code> переменную <code class="rev__code">VITE_REVIEWS_TELEGRAM_URL</code> — появится кнопка на канал с отзывами.</p>
  </section>
</template>

<style scoped>
.rev {
  position: relative;
  z-index: 0;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  background: transparent;
  border-bottom: none;
}

.rev::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  background: var(--surface-dark);
  border-bottom: 1px solid var(--border-dark);
}

@media (min-width: 720px) {
  .rev {
    padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.rev__head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

@media (min-width: 720px) {
  .rev__head {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
  }
}

.rev__title {
  margin: 0 0 0.5rem;
  font-family: var(--font-hero);
  font-weight: 700;
  font-size: clamp(2rem, 4.4vw, 2.45rem);
  letter-spacing: -0.015em;
  line-height: 1.1;
  color: var(--color-milk);
}

.rev__sub {
  margin: 0;
  max-width: 28rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--muted-on-dark);
}

.rev__rating {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.95rem 1.1rem;
  border: 1px solid var(--border-dark-strong);
  border-radius: var(--radius-m);
  background: var(--surface-panel);
  min-width: 9rem;
}

.rev__score {
  font-weight: 600;
  font-size: 1.75rem;
  letter-spacing: -0.03em;
  color: var(--yellow);
}

.rev__stars {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--yellow);
  line-height: 1;
}

.rev__count {
  font-size: 0.72rem;
  color: rgb(var(--color-milk-rgb) / 0.46);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.rev__grid {
  display: grid;
  gap: 1px;
  margin-bottom: 2rem;
  background: var(--border-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-l);
  overflow: hidden;
}

@media (min-width: 640px) {
  .rev__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.rev__card {
  background: var(--surface-panel);
  padding: 1.25rem 1.15rem 1.35rem;
  opacity: 0;
  transform: translateY(7px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.rev__grid--in .rev__card {
  opacity: 1;
  transform: translateY(0);
}

.rev__card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.rev__name {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--color-milk);
}

.rev__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  flex-shrink: 0;
}

.rev__card-stars {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--yellow);
  line-height: 1;
}

.rev__date {
  font-size: 0.7rem;
  color: rgb(var(--color-milk-rgb) / 0.42);
}

.rev__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.8);
}

.rev__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  min-height: 48px;
  padding: 0.78rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--yellow-ink);
  text-decoration: none;
  border: 1px solid var(--yellow);
  border-radius: var(--radius-m);
  background: var(--yellow);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.rev__cta:hover {
  background: var(--yellow-hover);
  border-color: var(--yellow-hover);
}

.rev__arrow {
  font-size: 1rem;
}

.rev__hint {
  margin: 0;
  text-align: center;
  font-size: 0.8125rem;
  color: rgb(var(--color-milk-rgb) / 0.46);
  max-width: 26rem;
  margin-inline: auto;
}

.rev__code {
  font-size: 0.75rem;
  padding: 0.05rem 0.3rem;
  border: 1px solid var(--border-dark);
  border-radius: 4px;
  background: var(--surface-panel-2);
}

@media (prefers-reduced-motion: reduce) {
  .rev__card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
