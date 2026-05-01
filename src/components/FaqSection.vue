<script setup>
const items = [
  {
    q: 'Сколько в среднем занимает привоз «под ключ»?',
    a: 'Ориентир — от нескольких недель до 1,5–2 месяцев: от страны, порта, очередей и комплектации. Точные сроки по плечам и вилка дат фиксируем в смете и отчётах по этапам.',
  },
  {
    q: 'Что входит в «под ключ» и что оплачивается отдельно?',
    a: 'В договоре прописываем: подбор или согласование лота, выкуп, документы на экспорт, логистику до РФ, таможню, услуги брокера по при необходимости, постановку на учёт. Всё, что не входит в смету (доп. страховка, хранение сверх срока и т.п.) — заранее обсуждаем отдельно.',
  },
  {
    q: 'Как фиксируется итоговая сумма?',
    a: 'Смета с разбивкой по статьям и валютам/курсам на дату согласования. Подписываем договор до оплаты по согласованной схеме. Неожиданных «доплат по факту» без согласования с вами не вводим.',
  },
  {
    q: 'Как проходит таможня и учёт?',
    a: 'Готовим пакет для декларации, согласуем код ТН ВЭД, утиль, НДС при необходимости. После выпуска — постановка на учёт в вашем регионе в рамках согласованного пакета.',
  },
  {
    q: 'Чем отличается подбор б/у на месте от привоза?',
    a: 'Подбор — выезд к объявлению, осмотр, юр. и сервисные проверки по чек-листу, письменный вывод «брать / торговаться / уйти». Привоз — работа с лотом за рубежом и доставка в РФ. Можно комбинировать сценарии в отдельных заявках.',
  },
  {
    q: 'Как быстро отвечаете на заявку?',
    a: 'В рабочий день — ориентир на первичный ответ и вилку в течение суток, если в заявке достаточно вводных. В пиковые дни срок может быть чуть дольше — заранее предупредим в мессенджере.',
  },
];
</script>

<template>
  <section id="faq" class="faq" aria-labelledby="faq-title">
    <div class="faq__inner">
      <h2 id="faq-title" class="faq__title">Вопросы и ответы</h2>
      <p class="faq__lead">Коротко о сроках, договоре и границах услуг. Подробности — в переписке и в договоре.</p>
      <ul class="faq__list" role="list">
        <li v-for="(it, i) in items" :key="i" class="faq__item">
          <details class="faq__details" name="faq">
            <summary class="faq__q">{{ it.q }}</summary>
            <p class="faq__a">{{ it.a }}</p>
          </details>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.5rem max(1rem, env(safe-area-inset-right, 0px));
  background: var(--color-graphite);
  border-top: 1px solid rgb(var(--color-milk-rgb) / 0.12);
  border-bottom: 1px solid rgb(var(--color-milk-rgb) / 0.12);
}

@media (min-width: 720px) {
  .faq {
    padding: 3.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.faq__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.faq__title {
  font-weight: 600;
  font-size: clamp(1.75rem, 3.2vw, 2.35rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  color: var(--color-milk);
}

.faq__lead {
  margin: 0 0 1.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.72);
  max-width: 40rem;
}

.faq__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq__details {
  background: var(--color-graphite);
  border: 1px solid rgb(var(--color-milk-rgb) / 0.14);
  border-radius: 8px;
  padding: 0.65rem 1rem 0.65rem;
}

.faq__q {
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: var(--color-milk);
  cursor: pointer;
  list-style: none;
  position: relative;
  padding-right: 1.5rem;
}

.faq__q::-webkit-details-marker {
  display: none;
}

.faq__q::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 0.1em;
  font-weight: 500;
  color: rgb(var(--color-milk-rgb) / 0.72);
  font-size: 1.1rem;
  line-height: 1;
}

.faq__details[open] .faq__q::after {
  content: '–';
}

.faq__a {
  margin: 0.75rem 0 0.35rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgb(var(--color-milk-rgb) / 0.9);
  padding-top: 0.25rem;
  border-top: 1px solid rgb(var(--color-milk-rgb) / 0.14);
}
</style>
