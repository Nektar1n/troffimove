<script setup>
import { reactive, ref } from 'vue';
import { useInView } from '../composables/useInView.js';
import { formSubmitEmail } from '../config/site.js';

const { el, visible } = useInView();

const form = reactive({
  name: '',
  phone: '',
  region: 'korea',
  message: '',
});

const sent = ref(false);
const error = ref('');
const sending = ref(false);

async function onSubmit(e) {
  e.preventDefault();
  error.value = '';

  if (!formSubmitEmail.trim()) {
    error.value =
      'Заявки на почту не настроены: в файле .env укажите VITE_FORM_SUBMIT_EMAIL=ваша@почта.ru и перезапустите dev-сервер.';
    return;
  }

  sending.value = true;
  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(formSubmitEmail.trim())}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Troffimove] Заявка · ${form.region}`,
        name: form.name,
        phone: form.phone,
        region: form.region,
        message: form.message,
        _captcha: false,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || data.message || `Ошибка ${res.status}`);
    }

    sent.value = true;
    form.name = '';
    form.phone = '';
    form.message = '';
    form.region = 'korea';
    setTimeout(() => {
      sent.value = false;
    }, 5000);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Не удалось отправить. Попробуйте позже или напишите в мессенджер.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <section id="contact" ref="el" class="sec">
    <div class="layout">
      <div class="copy" :class="{ 'is-in': visible }">
        <h2 class="title">Заявка</h2>
        <p class="lead">
          Опишите модель, год, бюджет «под ключ» и город постановки на учёт. Если уже есть ссылка на Encar, аукционный
          лист или объявление дилера — приложите её в поле комментария: так быстрее сориентируем по срокам и полной
          сумме.
        </p>
        <ul class="bullets">
          <li>Первичный ответ и вилка по стоимости — в рабочий день.</li>
          <li>Договор и оплата только после согласования лота и сметы.</li>
          <li>Можем начать с аудита чужого предложения: скажем, где риски.</li>
        </ul>
      </div>

      <form class="form" :class="{ 'is-in': visible }" @submit="onSubmit">
        <Transition name="pop">
          <div v-if="sent" class="toast toast--ok" role="status">Заявка отправлена на почту. Мы свяжемся с вами.</div>
        </Transition>
        <Transition name="pop">
          <div v-if="error && !sent" class="toast toast--err" role="alert">{{ error }}</div>
        </Transition>

        <label class="field">
          <span>Имя</span>
          <input v-model="form.name" type="text" name="name" required autocomplete="name" placeholder="" />
        </label>

        <label class="field">
          <span>Телефон или Telegram</span>
          <input
            v-model="form.phone"
            type="text"
            name="phone"
            required
            autocomplete="tel"
            placeholder=""
          />
        </label>

        <label class="field">
          <span>Направление</span>
          <select v-model="form.region" name="region">
            <option value="korea">Корея</option>
            <option value="japan">Япония</option>
            <option value="europe">Европа</option>
            <option value="any">Пока не выбрал</option>
          </select>
        </label>

        <label class="field">
          <span>Комментарий</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="5"
            placeholder="Модель, год, бюджет, город, ссылка на лот…"
          />
        </label>

        <button type="submit" class="submit" :disabled="sending">
          {{ sending ? 'Отправка…' : 'Отправить' }}
        </button>
        <p class="fine">
          Отправка идёт через FormSubmit (письмо на адрес из <code class="fine__code">VITE_FORM_SUBMIT_EMAIL</code> в
          <code class="fine__code">.env</code>). Нажимая кнопку, вы даёте согласие на обработку данных для обратной связи.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.sec {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) calc(2.5rem + env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-right, 0px));
}

@media (min-width: 720px) {
  .sec {
    padding: 3.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 4rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.layout {
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.copy {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.copy.is-in {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-weight: 600;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.lead {
  margin: 0 0 1.5rem;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
}

.bullets {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text);
}

.form {
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease 0.06s,
    transform 0.45s ease 0.06s;
}

.form.is-in {
  opacity: 1;
  transform: translateY(0);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
}

.field input,
.field select,
.field textarea {
  font: inherit;
  font-size: 1.0625rem;
  font-weight: 400;
  padding: 0.65rem 0;
  border: none;
  border-bottom: 1px solid var(--line);
  border-radius: 0;
  background: transparent;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s ease;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-bottom-color: var(--text);
}

.field textarea {
  resize: vertical;
  min-height: 7rem;
}

.submit {
  margin-top: 0.5rem;
  align-self: stretch;
  font: inherit;
  font-weight: 500;
  font-size: 1.0625rem;
  cursor: pointer;
  border: none;
  border-radius: 980px;
  min-height: 48px;
  padding: 0.65rem 1.75rem;
  color: #fff;
  background: var(--text);
  transition: opacity 0.2s ease;
}

.submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (min-width: 480px) {
  .submit {
    align-self: flex-start;
  }
}

.submit:hover:not(:disabled) {
  opacity: 0.88;
}

.fine {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--muted);
  max-width: 28rem;
}

.fine__code {
  font-size: 0.7rem;
  padding: 0.05rem 0.25rem;
  border: 1px solid var(--line-light);
  border-radius: 2px;
  background: var(--bg-subtle);
}

.toast {
  position: absolute;
  left: 0;
  right: 0;
  top: -0.25rem;
  transform: translateY(-100%);
  padding: 0.75rem 0.85rem;
  font-size: 0.875rem;
  line-height: 1.4;
  border: 1px solid var(--line);
}

.toast--ok {
  color: var(--text);
  background: var(--bg-subtle);
}

.toast--err {
  color: var(--text);
  background: #fff5f5;
  border-color: #fecaca;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-100%) translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .copy,
  .form {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
