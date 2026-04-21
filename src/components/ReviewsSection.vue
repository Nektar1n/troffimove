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
      <article v-for="(r, i) in reviews" :key="r.name + r.date" class="rev__card" :style="{ transitionDelay: `${i * 0.05}s` }">
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
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
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
  font-weight: 600;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #000;
}

.rev__sub {
  margin: 0;
  max-width: 28rem;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: var(--muted);
}

.rev__rating {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--line);
  background: #fff;
  min-width: 9rem;
}

.rev__score {
  font-weight: 600;
  font-size: 1.75rem;
  letter-spacing: -0.03em;
  color: #000;
}

.rev__stars {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #000;
  line-height: 1;
}

.rev__count {
  font-size: 0.75rem;
  color: var(--muted);
}

.rev__grid {
  display: grid;
  gap: 1px;
  margin-bottom: 2rem;
  background: var(--line-light);
  border: 1px solid var(--line-light);
}

@media (min-width: 640px) {
  .rev__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.rev__card {
  background: #fff;
  padding: 1.25rem 1.15rem 1.35rem;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
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
  font-size: 0.9375rem;
  color: #000;
}

.rev__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  flex-shrink: 0;
}

.rev__card-stars {
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: #000;
  line-height: 1;
}

.rev__date {
  font-size: 0.75rem;
  color: var(--muted);
}

.rev__text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #000;
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
  padding: 0.75rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  border: 1px solid var(--line);
  background: #fff;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.rev__cta:hover {
  border-color: #000;
  background: var(--bg-subtle);
}

.rev__arrow {
  font-size: 1rem;
}

.rev__hint {
  margin: 0;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--muted);
  max-width: 26rem;
  margin-inline: auto;
}

.rev__code {
  font-size: 0.75rem;
  padding: 0.05rem 0.3rem;
  border: 1px solid var(--line-light);
  border-radius: 2px;
  background: var(--bg-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .rev__card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
