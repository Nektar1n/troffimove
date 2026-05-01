<template>
  <div class="im">
    <section id="import-process" class="im__sec im__sec--light" aria-labelledby="im-process-h">
      <div class="im__inner">
        <p class="im__kicker">Этапы сделки</p>
        <h2 id="im-process-h" class="im__h2 im__h2--process">Путь от заявки до передачи авто</h2>
        <p class="im__intro">
          Ниже — ориентир по этапам. Фактические сроки и стоимость согласуем в договоре: у каждого поставщика
          и маршрута свои «окна».
        </p>
        <ol class="im__steps" role="list">
          <li
            v-for="(s, i) in steps"
            :key="i"
            v-reveal="i * 85"
            class="im__step"
            :class="{ 'im__step--rev': i % 2 === 1 }"
          >
            <figure class="im__step-fig">
              <img
                class="im__step-img"
                :src="s.img"
                :alt="`Иллюстрация: ${s.t}`"
                width="1000"
                height="558"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
              />
            </figure>
            <div class="im__step-content">
              <div class="im__step-meta">
                <span class="im__step-ico" aria-hidden="true">
                  <ImIcon v-if="s.icon" :name="s.icon" size="m" />
                </span>
                <span class="im__step-n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>
              <div class="im__step-body">
                <h3 class="im__h3">{{ s.t }}</h3>
                <p class="im__p">{{ s.d }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="im__sec" aria-labelledby="im-scope-h">
      <div class="im__inner">
        <h2 id="im-scope-h" class="im__h2 im__h2--solo">Что входит и что согласуем отдельно</h2>
        <div class="im__split">
          <div class="im__col im__col--in">
            <h3 class="im__h3 im__h3--tag im__h3--row">
              <ImIcon class="im__h3-ico" name="check" size="s" />
              В сопровождении
            </h3>
            <ul class="im__ul">
              <li v-for="(x, i) in included" :key="i" v-reveal="i * 60">{{ x }}</li>
            </ul>
          </div>
          <div class="im__col im__col--out">
            <h3 class="im__h3 im__h3--tag im__h3--muted im__h3--row">
              <ImIcon class="im__h3-ico" name="layers" size="s" />
              Отдельно / открыто
            </h3>
            <ul class="im__ul im__ul--out">
              <li v-for="(x, i) in extra" :key="i" v-reveal="i * 60">{{ x }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="im__sec" aria-labelledby="im-contract-h">
      <div class="im__inner">
        <h2 id="im-contract-h" class="im__h2 im__h2--solo">Договор, деньги, связь</h2>
            <ul class="im__check" role="list">
          <li v-for="(c, i) in contract" :key="i" v-reveal="i * 70" class="im__check-item">
            <span class="im__check-ico" aria-hidden="true"><ImIcon name="check" size="s" /></span>
            <span class="im__check-t">{{ c }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="import-faq" class="im__sec im__sec--tight" aria-labelledby="im-faq-h">
      <div class="im__inner">
        <h2 id="im-faq-h" class="im__h2 im__h2--solo">Вопросы о привозе</h2>
        <div class="im__faq" role="list">
          <details v-for="(f, i) in faq" :key="f.q" class="im__details">
            <summary class="im__summary">
              <ImIcon class="im__sum-ico" name="chat" size="s" />
              <span class="im__sum-q">{{ f.q }}</span>
            </summary>
            <p class="im__a">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ImIcon from './ImIcon.vue';
import importStep0 from '../assets/привоз_0-1000.jpg';
import importStep1 from '../assets/привоз_1-1000.jpg';
import importStep2 from '../assets/привоз_2-1000.jpg';
import importStep3 from '../assets/привоз_3-1000.jpg';
import importStep4 from '../assets/привоз_4-1000.jpg';
import importStep5 from '../assets/привоз_5-1000.jpg';

const importStepImgs = [importStep0, importStep1, importStep2, importStep3, importStep4, importStep5];

const steps = [
  {
    icon: 'brief',
    t: 'Бриф и критерии',
    d: 'Бюджет, модель, площадки, допустимый пробег, крайние сроки. Формулируем, что ищем и с чем не соглашаемся заранее.',
  },
  {
    icon: 'search',
    t: 'Подбор и проверка лота',
    d: 'Смотрим историю, продавца, риски по VIN, фотофакты, при необходимости — сопроводительная диагностика на стороне поставщика (по договорённости).',
  },
  {
    icon: 'sign',
    t: 'Договор с вами, оплата поставщику',
    d: 'Прописываем этапы, валюту, комиссию, сценарий отмены. Дальше — согласованные платежи поставщику/на аукционе по схеме сделки.',
  },
  {
    icon: 'truck',
    t: 'Логистика',
    d: 'Доставка до РФ, хранение на транзитных этапах, страхование (если включили в пакет), отчёты движения — без «тишины в чате».',
  },
  {
    icon: 'doc',
    t: 'Таможня и ввоз',
    d: 'Пошлины, декларация, допуск, что нужно от вас: паспорт, пакет владельца, ЭРА-ГЛОНАСС, постановка план — по ситуации кузова.',
  },
  {
    icon: 'key',
    t: 'Выдача',
    d: 'Передача ключей и пакет документов, краткое вводное по дальнейшему обслуживанию и срокам на учёт, если ведём до конца.',
  },
].map((step, i) => ({ ...step, img: importStepImgs[i] }));

const included = [
  'Один менеджер на ветку: вы не пишете пять чатов разных посредникам',
  'Смета с разбивкой: что оплачено, что предстоит, без «сюрпризов в конце»',
  'Статусы: где автомобиль, что ждать на следующем шаге (по согласованной периодичности)',
  'Сопровождение документов: что подписываем, что от вас ждут на таможне и в банке',
  'Согласованные пакеты: страхование, доп.проверки, хранение — прописываем, не навешиваем «тихо»',
];

const extra = [
  'Стоимость непредсказуемых внешних факторов: курсовые всплески, внеплановые досмотры, форс-мажор',
  'Услуги, которые честно не планировались: замена поставщика, смена порта, срочная смена срока',
  'Правки после утверждения ТЗ, если критерии сильно двигаются (пересчёт, новое соглашение)',
  'Сервис у дилера после выдачи — вне контракта, но подсказать можем',
];

const contract = [
  'Письменный договор: кто, что, за что и в каком порядке',
  'Этапы и суммы, которые вы видите до старта основных оплат',
  'Прозрачные «допы»: если пункта нет в договоре, он обсуждается отдельно и письменно',
];

const faq = [
  { q: 'Нужен ли визуальный контроль в стране покупки?', a: 'Не всегда. Часто достаточно пакета с площадки и согласованной удалённой проверки. Обязательно ли вам туда ехать — скажем брифе, если риск высокий, предупредим заранее.' },
  { q: 'Кто везёт автомобиль до РФ?', a: 'Работаем с проверенными логистами, страхование и варианты пути согласуем до оплаты основных логистических фактов — без скрытого «а потом вам порт».' },
  { q: 'Кто платит растаможку и куда?', a: 'Схема в договоре: что платите вы, что мы ведём как сопровождение, в каком порядке. Таможенные обязанности — по вашему пакету и срокам, без размытой формулировки «всё включено», если в законе есть переменные.' },
  { q: 'А если лот сорвался на аукционе?', a: 'Сценарий в договоре: повтор за ваш счёт, возврат депозита (если был) по условиям площадки, или пауза до подходящего варианта — согласуем до участия, не после.' },
  { q: 'Связь: как и как часто?', a: 'Формат (Telegram, звонок) и план обновлений — в договоре. Точечные пики (таможня, выдача) ускоряем по событиям, не по «тикету раз в две недели».' },
];
</script>

<style scoped>
.im {
  position: relative;
  z-index: 0;
  color: rgb(var(--color-milk-rgb) / 0.9);
}

.im::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: -1;
  background: var(--color-graphite);
  pointer-events: none;
}

.im__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0 max(1rem, env(safe-area-inset-right, 0px));
}

@media (min-width: 720px) {
  .im__inner {
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.im__sec {
  position: relative;
  z-index: 0;
  padding: 2.5rem 0 2.75rem;
  border-bottom: 1px solid rgb(var(--color-milk-rgb) / 0.08);
}

.im__sec--tight {
  padding-bottom: 2.25rem;
}

/* «Путь от заявки…» — светлая плашка на всю ширину (остальной блок im остаётся тёмным) */
.im__sec--light {
  position: relative;
  z-index: 0;
  color: var(--text);
  border-bottom-color: var(--line-light);
}

.im__sec--light::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  transform: translateX(-50%);
  z-index: -1;
  background: var(--color-milk);
  pointer-events: none;
}

.im__sec--light .im__h2--process,
.im__sec--light .im__h2 {
  color: var(--text);
}

.im__sec--light .im__kicker {
  margin: 0 0 0.55rem;
  font-size: clamp(2.35rem, 4.6vw, 3.9rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 600;
  font-style: italic;
  text-transform: none;
  color: var(--text);
}

.im__sec--light .im__intro {
  color: var(--muted);
}

.im__sec--light .im__h3 {
  color: var(--text);
}

.im__sec--light .im__p {
  color: var(--muted);
}

.im__sec--light .im__step-n {
  color: var(--yellow, #e9be5f);
}

.im__sec--light .im__step {
  border-color: rgb(var(--color-graphite-rgb) / 0.08);
  background: var(--color-milk);
}

@media (min-width: 800px) {
  .im__sec--light .im__step {
    background: transparent;
    border-color: transparent;
  }
}

.im__h2 {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--color-milk);
}

.im__h2--process {
  max-width: 32ch;
}

.im__h2--solo {
  max-width: none;
  margin-bottom: 1.25rem;
}

.im__intro {
  margin: 0 0 1.75rem;
  max-width: 44rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: rgb(var(--color-milk-rgb) / 0.62);
}

.im__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.im__step {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 0;
  align-items: stretch;
  margin: 0;
  padding: 1.05rem;
  border-radius: 12px;
  border: 1px solid var(--line-light, #dedee3);
  background: rgb(var(--color-graphite-rgb) / 0.02);
}

@media (min-width: 800px) {
  .im__step {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 0 1.5rem;
    align-items: center;
    padding: 0.35rem 0;
    border: none;
    background: transparent;
  }

  .im__step--rev .im__step-fig {
    order: 2;
  }

  .im__step--rev .im__step-content {
    order: 1;
  }
}

.im__step-fig {
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #ececf0;
  border: 1px solid rgb(var(--color-graphite-rgb) / 0.06);
  box-shadow: 0 4px 20px rgb(var(--color-graphite-rgb) / 0.07);
  aspect-ratio: 1000 / 558;
}

.im__step-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.im__step-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.1rem;
}

.im__step-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem 0.7rem;
}

.im__step-ico {
  line-height: 0;
}

.im__step-n {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
  color: var(--yellow);
  min-width: 2.25ch;
}

.im__step-body {
  min-width: 0;
}

.im__h3 {
  margin: 0 0 0.3rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-milk);
}

.im__step .im__h3 {
  font-size: clamp(1.24rem, 2.9vw, 1.62rem);
  line-height: 1.16;
  letter-spacing: -0.028em;
  font-weight: 650;
}

.im__h3--tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--yellow);
  margin: 0 0 0.6rem;
}

.im__h3--row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.im__h3-ico {
  flex-shrink: 0;
  position: relative;
  top: 0.5px;
}

.im__h3--muted {
  color: rgb(var(--color-milk-rgb) / 0.45);
}

.im__p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: rgb(var(--color-milk-rgb) / 0.68);
}

.im__split {
  display: grid;
  gap: 1.75rem;
}

@media (min-width: 800px) {
  .im__split {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

.im__col--in,
.im__col--out {
  min-width: 0;
  padding: 1rem 1.1rem;
  border-radius: 10px;
  border: 1px solid rgb(var(--color-milk-rgb) / 0.1);
  background: rgb(var(--color-graphite-rgb) / 0.2);
}

.im__col--out {
  background: rgb(var(--color-graphite-rgb) / 0.12);
  border-style: dashed;
  border-color: rgb(var(--color-milk-rgb) / 0.14);
}

.im__ul {
  margin: 0;
  padding: 0 0 0 0.9rem;
  list-style: disc;
  color: rgb(var(--color-milk-rgb) / 0.78);
  font-size: 0.875rem;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.im__ul--out {
  color: rgb(var(--color-milk-rgb) / 0.6);
  list-style: square;
}

.im__check {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.im__check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.8);
}

.im__check-ico {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  color: var(--yellow);
  line-height: 0;
  margin-top: 0.15rem;
}

.im__check-t {
  min-width: 0;
}

.im__faq {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 46rem;
}

.im__details {
  border: 1px solid rgb(var(--color-milk-rgb) / 0.1);
  border-radius: 8px;
  background: rgb(var(--color-graphite-rgb) / 0.2);
  overflow: hidden;
}

.im__summary {
  list-style: none;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem 0.75rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #e8e8ed;
  cursor: pointer;
  line-height: 1.4;
  user-select: none;
  transition: background 0.15s ease;
}

.im__summary::-webkit-details-marker {
  display: none;
}

.im__sum-ico {
  flex-shrink: 0;
  line-height: 0;
  margin-top: 0.12rem;
  opacity: 0.9;
}

.im__sum-q {
  flex: 1;
  min-width: 0;
}

.im__summary::after {
  content: '+';
  margin-left: auto;
  padding-left: 0.4rem;
  color: var(--yellow);
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.2;
  flex-shrink: 0;
}

details[open] .im__summary::after {
  content: '−';
}

.im__summary:hover,
.im__details[open] .im__summary {
  background: rgb(var(--color-milk-rgb) / 0.04);
}

.im__a {
  margin: 0;
  padding: 0 0.9rem 0.9rem 0.9rem;
  font-size: 0.84rem;
  line-height: 1.5;
  color: rgb(var(--color-milk-rgb) / 0.6);
  border-top: 1px solid rgb(var(--color-milk-rgb) / 0.06);
}

@media (max-width: 1199px) {
  .im__sec--light .im__kicker {
    font-size: clamp(1.8rem, 6vw, 2.6rem);
  }
}

@media (max-width: 899px) {
  .im__sec--light .im__kicker {
    font-size: clamp(1.65rem, 7.4vw, 2.2rem);
  }
}
</style>
