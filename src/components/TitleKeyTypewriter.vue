<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

/** Сбрасывается при полной перезагрузке страницы (F5 / новый заход), сохраняется при SPA-переходах в той же вкладке */
const playedOnceThisPageLoad = new Set();

const props = defineProps({
  phrase: { type: String, required: true },
  startDelayMs: { type: Number, default: 420 },
  charDelayMs: { type: Number, default: 92 },
  caretHideDelayMs: { type: Number, default: 520 },
  /** false: ждём первого true, затем один запуск (например блок вошёл во viewport) */
  active: { type: Boolean, default: true },
  /** длинная фраза: перенос строк вместо одной nowrap-линии (иначе клип на узком экране) */
  wrap: { type: Boolean, default: false },
  /** один раз за «жизнь» загрузки страницы: без повтора при SPA; перезагрузка вкладки — снова с анимацией */
  once: { type: Boolean, default: false },
  /** уникальный ключ; если пусто — от phrase (риск коллизии при повторе фразы) */
  onceId: { type: String, default: '' },
});

const typed = ref('');
const caret = ref(false);
const hasStarted = ref(false);

function playOnceKey() {
  return props.onceId?.trim() || props.phrase;
}

function readAlreadyPlayed() {
  if (!props.once) return false;
  return playedOnceThisPageLoad.has(playOnceKey());
}

function markPlayed() {
  if (!props.once) return;
  playedOnceThisPageLoad.add(playOnceKey());
}

/** Уже смотрели в этой вкладке — сразу полный текст, без таймеров */
function hydrateIfAlreadyPlayed() {
  if (!readAlreadyPlayed()) return false;
  typed.value = props.phrase;
  caret.value = false;
  hasStarted.value = true;
  return true;
}

let startTimer = null;
let charTimer = null;
let caretTimer = null;

function clearTimers() {
  if (startTimer != null) {
    clearTimeout(startTimer);
    startTimer = null;
  }
  if (charTimer != null) {
    clearInterval(charTimer);
    charTimer = null;
  }
  if (caretTimer != null) {
    clearTimeout(caretTimer);
    caretTimer = null;
  }
}

function applyReducedMotion() {
  typed.value = props.phrase;
  caret.value = false;
  if (props.once) markPlayed();
}

function runTypewriter() {
  clearTimers();
  typed.value = '';
  caret.value = false;

  const phrase = props.phrase;
  const { startDelayMs, charDelayMs, caretHideDelayMs } = props;

  startTimer = window.setTimeout(() => {
    startTimer = null;
    caret.value = true;
    let i = 0;
    charTimer = window.setInterval(() => {
      if (i >= phrase.length) {
        if (charTimer != null) {
          clearInterval(charTimer);
          charTimer = null;
        }
        markPlayed();
        caretTimer = window.setTimeout(() => {
          caretTimer = null;
          caret.value = false;
        }, caretHideDelayMs);
        return;
      }
      typed.value += phrase[i];
      i += 1;
    }, charDelayMs);
  }, startDelayMs);
}

function tryStartOnce() {
  if (hasStarted.value || !props.active) return;
  hasStarted.value = true;

  const reduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    applyReducedMotion();
    return;
  }

  runTypewriter();
}

onMounted(() => {
  if (hydrateIfAlreadyPlayed()) return;
  tryStartOnce();
});

watch(
  () => props.active,
  (v) => {
    if (!v) return;
    if (hydrateIfAlreadyPlayed()) return;
    tryStartOnce();
  },
);

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <span class="title-key-tw" :class="{ 'title-key-tw--wrap': wrap }">
    <span class="title-key-tw__measure" aria-hidden="true">{{ phrase }}</span>
    <span class="title-key-tw__live">
      <span class="title-key-tw__text">{{ typed }}</span
      ><span v-if="caret" class="title-key-tw__caret" aria-hidden="true" /></span>
  </span>
</template>

<style scoped>
.title-key-tw {
  display: inline-grid;
  grid-template: 1fr / 1fr;
  vertical-align: baseline;
  font-weight: 700;
  font-style: italic;
  color: var(--yellow);
  white-space: nowrap;
  --title-caret-w: 0.08em;
  --title-caret-min-w: 2px;
  --title-caret-h: 0.72em;
  --title-caret-ml: 0.05em;
  --title-caret-va: -0.08em;
}

.title-key-tw__measure {
  grid-area: 1 / 1;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
}

.title-key-tw__measure::after {
  content: '';
  display: inline-block;
  width: var(--title-caret-w);
  min-width: var(--title-caret-min-w);
  height: var(--title-caret-h);
  margin-left: var(--title-caret-ml);
  vertical-align: var(--title-caret-va);
}

.title-key-tw__live {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: baseline;
  align-self: start;
  justify-self: start;
  max-width: 100%;
  white-space: nowrap;
  color: var(--yellow);
}

.title-key-tw__text {
  display: inline;
}

.title-key-tw__caret {
  display: inline-block;
  width: var(--title-caret-w);
  min-width: var(--title-caret-min-w);
  height: var(--title-caret-h);
  margin-left: var(--title-caret-ml);
  vertical-align: var(--title-caret-va);
  border-radius: 1px;
  background: currentColor;
  animation: title-key-tw-caret-blink 0.88s steps(1, end) infinite;
}

/* Резерв высоты как у финального переноса: скрытый measure + live в одной ячейке grid */
.title-key-tw--wrap {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: anywhere;
  align-items: start;
  justify-items: stretch;
}

.title-key-tw--wrap .title-key-tw__measure {
  display: block;
  grid-area: 1 / 1;
  width: 100%;
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
}

.title-key-tw--wrap .title-key-tw__live {
  grid-area: 1 / 1;
  align-self: start;
  justify-self: stretch;
  display: block;
  width: 100%;
  min-width: 0;
  max-width: none;
  white-space: normal;
  overflow-wrap: anywhere;
}

.title-key-tw--wrap .title-key-tw__text {
  white-space: normal;
}

@keyframes title-key-tw-caret-blink {
  0%,
  45% {
    opacity: 1;
  }

  55%,
  100% {
    opacity: 0;
  }
}
</style>
