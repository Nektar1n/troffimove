<script setup>
import { RouterLink } from 'vue-router';
// Тексты-шаблоны: при работе с клиентами уточните у юриста.
</script>

<template>
  <main class="legal">
    <div class="legal__inner">
      <h1 class="legal__h1">Документы и реквизиты</h1>
      <p class="legal__intro">
        Ниже — базовые сведения для прозрачности. Реквизиты и формулировки договора подставьте под вашу организацию (ИП/ООО) и
        фактическую схему работы.
      </p>

      <!-- <section id="requisites" class="legal__block" aria-labelledby="requisites-title">
        <h2 id="requisites-title" class="legal__h2">Реквизиты</h2>
        <p class="legal__p">
          <strong>ИП / ООО</strong> — наименование, ИНН, КПП, ОГРН, юр. адрес, расчётный счёт, банк, БИК, корр. счёт.
        </p>
        <p class="legal__note">Заполните реальные данные вместо этого блока и опубликуйте на сайте.</p>
      </section> -->
<!-- 
      <section id="offer" class="legal__block" aria-labelledby="offer-title">
        <h2 id="offer-title" class="legal__h2">Публичная оферта (кратко)</h2>
        <p class="legal__p">
          Услуги оказываются на основании заявки клиента, согласования сметы и договора. Стоимость, сроки и перечень услуг
          фиксируются в договоре. Оплата — по согласованной схеме. Отказ стороны возможен в порядке, прописанном в договоре
          и законодательстве РФ. Подробные условия, ответственность и порядок разрешения споров — в полной редакции
          договора, предоставляемом перед подписанием.
        </p>
        <p class="legal__note">Разместите полноценный текст оферты или ведите к PDF после согласования с юристом.</p>
      </section> -->

      <section id="privacy" class="legal__block" aria-labelledby="privacy-title">
        <h2 id="privacy-title" class="legal__h2">Обработка персональных данных</h2>
        <div class="privacy-policy">

  <h1>Политика конфиденциальности</h1>

  <h2>1. Общие положения</h2>
  <p>
    Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта
    <strong>troffimove-auto.ru</strong>.
  </p>
  <p>
    Оператором персональных данных является:
  </p>
  <p>
    <strong>Трофимов Дмитрий Темирович</strong><br>
    E-mail: <strong>vysokij96@bk.ru</strong>
  </p>
  <p>
    Используя сайт и отправляя данные через формы обратной связи, пользователь выражает согласие с настоящей Политикой.
  </p>

  <h2>2. Какие данные собираются</h2>
  <p>При заполнении формы обратной связи пользователь может предоставить:</p>
  <ul>
    <li>имя;</li>
    <li>номер телефона;</li>
    <li>комментарий.</li>
  </ul>

  <h2>3. Цели обработки персональных данных</h2>
  <ul>
    <li>связь с пользователем;</li>
    <li>обработка заявки;</li>
    <li>консультирование по услугам автоподбора;</li>
    <li>предоставление информации об услугах.</li>
  </ul>

  <h2>4. Передача персональных данных</h2>
  <p>
    Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
  </p>

  <h2>5. Способы обработки</h2>
  <p>
    Персональные данные обрабатываются с использованием средств автоматизации и без их использования.
  </p>
  <p>
    Данные могут поступать на электронную почту оператора.
  </p>

  <h2>6. Срок хранения</h2>
  <p>
    Персональные данные хранятся до достижения целей обработки либо до отзыва согласия пользователем,
    если иное не предусмотрено законодательством РФ.
  </p>

  <h2>7. Права пользователя</h2>
  <ul>
    <li>получать информацию об обработке персональных данных;</li>
    <li>требовать уточнения данных;</li>
    <li>требовать удаления данных;</li>
    <li>отозвать согласие на обработку данных.</li>
  </ul>

  <p>
    Для реализации прав пользователь может обратиться по адресу:
    <strong>vysokij96@bk.ru</strong>
  </p>

  <h2>8. Заключительные положения</h2>
  <p>
    Оператор вправе изменять настоящую Политику. Актуальная версия всегда доступна на сайте
    <strong>troffimove-auto.ru</strong>.
  </p>

</div>
        <p class="legal__p">
          Вы вправе запросить уточнение, уточнение категорий данных, ограничение обработки, удаление, если это не противоречит
          исполнению договора. Обращения — на e-mail, указанный в контактах, с пометкой «персональные данные».
        </p>
      </section>

      <section id="cookies" class="legal__block" aria-labelledby="cookies-title">
        <h2 id="cookies-title" class="legal__h2">Cookie и аналоги</h2>
        <p class="legal__p">
          Сайт может использовать технические cookie для работы интерфейса и, при подключении аналитики, обезличенные
          данные о посещениях. В браузере вы можете отключить cookie; часть функций сайта в этом случае может работать
          иначе.
        </p>
      </section>

      <p class="legal__back">
        <RouterLink class="legal__link" to="/">← На главную</RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
.legal {
  padding: calc(5.25rem + env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-left, 0px)) 3rem
    max(1rem, env(safe-area-inset-right, 0px));
  min-height: 60vh;
  background: var(--bg);
}

@media (min-width: 720px) {
  .legal {
    padding: calc(5.5rem + env(safe-area-inset-top, 0px)) max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem
      max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.legal__inner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.legal__h1 {
  font-family: var(--font-hero);
  font-size: clamp(1.8rem, 3.4vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 0.75rem;
  color: var(--text);
}

.legal__intro {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--muted);
  margin: 0 0 2.25rem;
  max-width: 44rem;
}

.legal__block {
  margin-bottom: 2.25rem;
  scroll-margin-top: 5.5rem;
}

.legal__h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.65rem;
  letter-spacing: -0.02em;
  color: var(--text);
}

.legal__p {
  margin: 0 0 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text);
  max-width: 50rem;
}

.legal__note {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--muted);
  font-style: italic;
  margin: 0.5rem 0 0;
}

.legal__back {
  margin: 2.5rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line-light);
}

.legal__link {
  color: var(--text);
  font-weight: 500;
  text-decoration: none;
}

.legal__link:hover {
  text-decoration: underline;
  color: var(--yellow-ink);
}
</style>
