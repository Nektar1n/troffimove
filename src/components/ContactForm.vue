<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useInView } from '../composables/useInView.js';
import { contactEmail, web3formsAccessKey } from '../config/site.js';
import { consumeContactFormPrefill, useContactFormPrefill } from '../state/contactFormPrefill.js';

const route = useRoute();
const contactFormPrefill = useContactFormPrefill();

const { el, visible } = useInView();

const TOPIC_LABELS = {
  import: 'Привоз (аукцион / импорт)',
  selection: 'Подбор б/у на месте',
  consult: 'Консультация / вилка',
  other: 'Другое',
};

const form = reactive({
  name: '',
  phone: '',
  topic: 'import',
  message: '',
});

const sent = ref(false);
const error = ref('');
const sending = ref(false);
const messageField = ref(null);

const formSubject = computed(() => `[Troffimove] ${TOPIC_LABELS[form.topic] ?? form.topic}`);

const mailtoHref = computed(() => {
  const email = contactEmail.trim();
  if (!email) return '';
  const subject = encodeURIComponent(formSubject.value);
  const body = encodeURIComponent(
    `Имя: ${form.name}\nТелефон: ${form.phone}\nТема: ${TOPIC_LABELS[form.topic] ?? form.topic}\n\n${form.message}`,
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
});

function applyPendingPrefill() {
  const data = consumeContactFormPrefill();
  if (!data) return;
  if (data.topic) form.topic = data.topic;
  if (data.message) form.message = data.message;
  nextTick(() => messageField.value?.focus());
}

watch(contactFormPrefill, () => applyPendingPrefill());
watch(
  () => route.hash,
  (hash) => {
    if (hash === '#contact') applyPendingPrefill();
  },
);

onMounted(() => {
  if (route.hash === '#contact') applyPendingPrefill();
});

async function onSubmit(e) {
  e.preventDefault();
  error.value = '';

  if (!web3formsAccessKey.trim()) {
    error.value =
      'Форма не настроена: получите ключ на web3forms.com и укажите VITE_WEB3FORMS_ACCESS_KEY в .env (см. .env.example).';
    return;
  }

  sending.value = true;
  try {
    const body = new FormData();
    body.append('access_key', web3formsAccessKey.trim());
    body.append('subject', formSubject.value);
    body.append('from_name', form.name);
    body.append('name', form.name);
    body.append('phone', form.phone);
    body.append('topic', TOPIC_LABELS[form.topic] ?? form.topic);
    body.append('message', form.message);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      throw new Error(data.message || `Ошибка ${res.status}`);
    }

    sent.value = true;
    form.name = '';
    form.phone = '';
    form.message = '';
    form.topic = 'import';
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
          Опишите модель, год, бюджет и город учёта. Ссылка на лот, аукционный лист или объявление в комментарии ускоряет
          оценку. Ориентир по вилке и срокам — по заявке; «калькулятор» в одну кнопку не подменяет проверку лота, но
          сразу скажем, каких вводных не хватает.
        </p>
        <ul class="bullets">
          <li>Первичный ответ в рабочий день (часто — в течение суток при полных вводных).</li>
          <li>Договор и оплата после согласования сметы и схемы.</li>
          <li>Можем начать с разбора чужого предложения: где риски и что уточнить.</li>
        </ul>
      </div>

      <form class="form" :class="{ 'is-in': visible }" @submit="onSubmit">
        <Transition name="pop">
          <div v-if="sent" class="toast toast--ok" role="status">Заявка отправлена на почту. Мы свяжемся с вами.</div>
        </Transition>
        <Transition name="pop">
          <div v-if="error && !sent" class="toast toast--err" role="alert">
            <p class="toast__text">{{ error }}</p>
            <a v-if="mailtoHref" class="toast__link" :href="mailtoHref">Написать на почту вручную</a>
          </div>
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
          <span>Тема заявки</span>
          <select v-model="form.topic">
            <option value="import">Привоз (аукцион / импорт)</option>
            <option value="selection">Подбор б/у на месте</option>
            <option value="consult">Консультация / вилка по вводным</option>
            <option value="other">Другое</option>
          </select>
        </label>

        <label class="field">
          <span>Комментарий</span>
          <textarea
            ref="messageField"
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
          Нажимая кнопку, вы даёте согласие на обработку персональных данных для обратной связи. Подробнее — в
          <RouterLink class="fine__link" to="/legal#privacy">политике</RouterLink>.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.sec {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 2.5rem max(1rem, env(safe-area-inset-left, 0px)) calc(2.5rem + env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-right, 0px));
  background: var(--color-milk);
  border-top: 1px solid var(--line-light);
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
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.015em;
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
  padding: 1.5rem 1.35rem 1.65rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  background: var(--color-milk);
  color: var(--text);
  border: 1px solid var(--text);
  border-radius: 14px;
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

@media (min-width: 720px) {
  .form {
    padding: 1.75rem 1.5rem 2rem;
  }
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
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--text);
  border-radius: 8px;
  background: var(--color-milk);
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--text);
  box-shadow: 0 0 0 2px rgba(29, 29, 31, 0.12);
}

.field textarea {
  resize: vertical;
  min-height: 7rem;
}

.submit {
  margin-top: 0.5rem;
  align-self: stretch;
  font: inherit;
  font-weight: 600;
  font-size: 1.0625rem;
  cursor: pointer;
  border: 1px solid var(--yellow);
  border-radius: 980px;
  min-height: 48px;
  padding: 0.65rem 1.75rem;
  color: var(--yellow-ink);
  background: var(--yellow);
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
  color: var(--text);
  opacity: 0.72;
  max-width: 28rem;
}

.fine__link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.12em;
}

.fine__link:hover {
  opacity: 1;
  color: var(--yellow-ink);
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
  border: 1px solid var(--text);
  border-radius: 8px;
  background: var(--color-milk);
}

.toast__text {
  margin: 0 0 0.35rem;
}

.toast__link {
  color: var(--text);
  font-weight: 600;
}

.toast--ok {
  color: var(--text);
  background: var(--color-milk);
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
