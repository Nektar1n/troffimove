<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import desktopHeroPhoto from '../assets/главнаяПрод.jpg';
import trofimCutout from '../assets/вырезаныйТроффим.png';
import mobileHeroPhoto from '../assets/trofim.jpeg';
import SocialLinks from './SocialLinks.vue';
import TitleKeyTypewriter from './TitleKeyTypewriter.vue';

/**
 * Parallax / разбор ghost-заголовка при скролле (только десктоп).
 * Поставьте true, чтобы вернуть анимацию — остальной код уже на месте.
 */
const ENABLE_HERO_GHOST_SCROLL = false;

const mounted = ref(false);
const heroStage = ref(null);
const heroTitle = ref(null);

let scrollRaf = 0;
let reduceMotionQuery = null;
let mobileQuery = null;

function buildGhostLetters(text) {
  const chars = Array.from(text);
  const lastIndex = Math.max(chars.length - 1, 1);
  const center = lastIndex / 2;

  return chars.map((char, index) => {
    const distanceFromCenter = Math.abs(index - center) / center;
    const centerWeight = 1 - Math.min(distanceFromCenter, 1);
    const speed = 0.54 + Math.pow(centerWeight, 1.65) * 0.92;

    return {
      id: `${char}-${index}`,
      char: char === ' ' ? '\u00A0' : char,
      speed: Number(speed.toFixed(3)),
    };
  });
}

const ghostLineOneLetters = buildGhostLetters('Подбор, выкуп и привоз');
const ghostLineTwoLetters = buildGhostLetters('авто под ключ');

function setGhostMotionVars({
  parallax = 0,
  blur = 0,
  opacityOne = 0.1,
  opacityTwo = 0.05,
} = {}) {
  if (!heroTitle.value) return;

  const style = heroTitle.value.style;
  style.setProperty('--hero-ghost-parallax', `${parallax}px`);
  style.setProperty('--hero-ghost-blur', `${blur}px`);
  style.setProperty('--hero-ghost-opacity-one', opacityOne);
  style.setProperty('--hero-ghost-opacity-two', opacityTwo);
}

function resetGhostMotion() {
  setGhostMotionVars();
}

function updateGhostParallax() {
  scrollRaf = 0;

  if (!ENABLE_HERO_GHOST_SCROLL) {
    resetGhostMotion();
    return;
  }

  if (!heroStage.value || reduceMotionQuery?.matches || mobileQuery?.matches) {
    resetGhostMotion();
    return;
  }

  const rect = heroStage.value.getBoundingClientRect();
  const scrolledInsideHero = Math.min(Math.max(-rect.top, 0), rect.height * 1.35);
  const progress = rect.height > 0 ? scrolledInsideHero / rect.height : 0;

  setGhostMotionVars({
    parallax: Math.min(scrolledInsideHero * 1.18, 780),
    blur: Math.min(Math.max(progress - 0.78, 0) * 6, 3.2),
    opacityOne: Math.max(0.025, 0.1 - Math.max(progress - 1.02, 0) * 0.14),
    opacityTwo: Math.max(0.012, 0.05 - Math.max(progress - 1.02, 0) * 0.07),
  });
}

function scheduleGhostParallax() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(updateGhostParallax);
}

onMounted(() => {
  if (ENABLE_HERO_GHOST_SCROLL) {
    reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mobileQuery = window.matchMedia('(max-width: 899px)');
  }

  requestAnimationFrame(() => {
    mounted.value = true;
    updateGhostParallax();
  });

  if (ENABLE_HERO_GHOST_SCROLL) {
    window.addEventListener('scroll', scheduleGhostParallax, { passive: true });
    window.addEventListener('resize', scheduleGhostParallax, { passive: true });
  }
});

onBeforeUnmount(() => {
  if (!ENABLE_HERO_GHOST_SCROLL) return;

  window.removeEventListener('scroll', scheduleGhostParallax);
  window.removeEventListener('resize', scheduleGhostParallax);
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
});
</script>

<template>
  <section class="hero">
    <div ref="heroStage" class="hero__stage" :class="{ 'is-in': mounted }">
      <div class="hero__wash" aria-hidden="true" />

      <!-- z: заголовок и ghost под машиной и фигурой (макет Figma) -->
      <div class="hero__masthead">
        <div class="hero__head">
          <h1
            ref="heroTitle"
            class="hero__title"
            :class="{ 'is-in': mounted }"
          >
            <span class="hero__title-ghost hero__title-ghost--one" aria-hidden="true">
              <span class="hero__title-line hero__title-line--1">
                <span
                  v-for="letter in ghostLineOneLetters"
                  :key="`one-1-${letter.id}`"
                  class="hero__ghost-letter"
                  :style="{ '--letter-speed': letter.speed }"
                >{{ letter.char }}</span>
              </span>
              <span class="hero__title-line hero__title-line--2">
                <span
                  v-for="letter in ghostLineTwoLetters"
                  :key="`one-2-${letter.id}`"
                  class="hero__ghost-letter"
                  :style="{ '--letter-speed': letter.speed }"
                >{{ letter.char }}</span>
              </span>
            </span>
            <span class="hero__title-ghost hero__title-ghost--two" aria-hidden="true">
              <span class="hero__title-line hero__title-line--1">
                <span
                  v-for="letter in ghostLineOneLetters"
                  :key="`two-1-${letter.id}`"
                  class="hero__ghost-letter"
                  :style="{ '--letter-speed': letter.speed }"
                >{{ letter.char }}</span>
              </span>
              <span class="hero__title-line hero__title-line--2">
                <span
                  v-for="letter in ghostLineTwoLetters"
                  :key="`two-2-${letter.id}`"
                  class="hero__ghost-letter"
                  :style="{ '--letter-speed': letter.speed }"
                >{{ letter.char }}</span>
              </span>
            </span>
            <span class="hero__title-live">
              <span class="hero__title-line hero__title-line--1">Подбор, выкуп и привоз</span>
              <span class="hero__title-line hero__title-line--2">
                <span class="hero__title-auto">авто</span>
                <span class="hero__title-key">под ключ</span>
              </span>
            </span>
            <span class="hero__title-mobile">
              Подбор, выкуп и привоз авто
              <TitleKeyTypewriter
                class="hero__title-accent"
                phrase="под ключ"
                wrap
                once
                once-id="home-hero-mobile-title-accent"
                :start-delay-ms="210"
                :char-delay-ms="46"
                :caret-hide-delay-ms="260"
              />
            </span>
          </h1>
        </div>
      </div>

      <div class="hero__car-wrap" aria-hidden="true">
        <picture>
          <source :srcset="mobileHeroPhoto" media="(max-width: 899px)" />
          <img
            :src="desktopHeroPhoto"
            class="hero__car"
            width="1920"
            height="800"
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
        <div class="hero__car-mist" />
      </div>

      <img
        class="hero__cutout"
        :src="trofimCutout"
        width="288"
        height="469"
        alt=""
        loading="eager"
        decoding="async"
        fetchpriority="low"
        aria-hidden="true"
      />

      <p class="hero__eyebrow" :class="{ 'is-in': mounted }">
        Troffimove Auto · Корея · Европа · Япония
      </p>

      <div class="hero__quote" :class="{ 'is-in': mounted }">
        <span class="hero__quote-mark" aria-hidden="true">“</span>
        <p class="hero__lead">
          Один контрагент по договору: ищем лот на аукционах и площадках, проверяем продавца и историю, согласуем цену,
          организуем оплату, выкуп, доставку до РФ, таможню и постановку на учёт. Фиксируем этапы, сроки и финальную сумму
          без «доплат по факту».
        </p>
        <p class="hero__lead-attrib">— Дмитрий Темирович</p>
      </div>

      <div class="hero__bar" :class="{ 'is-in': mounted }">
        <div class="hero__bar-soc">
          <span class="hero__soc-label">Мы в соцсетях:</span>
          <SocialLinks class="hero__soc" variant="hero" />
        </div>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#contact">Написать нам</a>
          <a class="btn btn--ghost" href="#cases">Примеры сделок</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-warm: #726c63;
  --hero-warm-deep: #514b43;
  --hero-top: #767067;
  --hero-text: var(--color-milk);
  --hero-text-dim: rgb(var(--color-milk-rgb) / 0.92);

  position: relative;
  z-index: 0;
  width: 100%;
  background-color: var(--hero-top);
  max-width: none;
  margin: 0;
  padding: 0;
  /* overflow-x: clip на .page — иначе здесь Y становится auto и режет parallax-заголовок снизу */
  overflow: visible;
  color: var(--hero-text);
}

.hero__stage {
  position: relative;
  width: 100%;
  min-height: min(100dvh, 1120px);
  background-color: var(--hero-top);
  padding-top: calc(7rem + env(safe-area-inset-top, 0px));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: 0;
  padding-bottom: 0;
  box-sizing: border-box;
  overflow: visible;
  opacity: 0;
  transform: translate3d(0, 6px, 0);
  transition:
    opacity 0.55s ease,
    transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.hero__stage.is-in {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.hero__stage::before {
  content: '';
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: clamp(7rem, 19vh, 13rem);
  background: linear-gradient(
    180deg,
    rgba(118, 112, 103, 0.78) 0%,
    rgba(118, 112, 103, 0.45) 52%,
    rgba(118, 112, 103, 0) 100%
  );
  pointer-events: none;
}

.hero__wash {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 50% 62%, rgb(var(--color-milk-rgb) / 0.07) 0%, rgb(var(--color-milk-rgb) / 0.035) 30%, rgb(var(--color-milk-rgb) / 0) 62%),
    linear-gradient(180deg, var(--hero-top) 0%, var(--hero-warm) 34%, var(--hero-warm-deep) 100%);
  pointer-events: none;
}

/* Заголовок + ghost: под машиной (z ниже .hero__car-wrap) */
.hero__masthead {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  padding: 0 max(1rem, env(safe-area-inset-right, 0px)) 0 max(1rem, env(safe-area-inset-left, 0px));
  margin-bottom: 0;
  min-height: clamp(12rem, 31vh, 20.5rem);
  overflow: visible;
}

.hero__head {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: visible;
}

.hero__title {
  --hero-ghost-step: clamp(2.4rem, 6vw, 5.8rem);
  --hero-ghost-parallax: 0px;
  --hero-ghost-blur: 0px;
  --hero-ghost-opacity-one: 0.1;
  --hero-ghost-opacity-two: 0.05;

  position: relative;
  margin: 0;
  text-align: center;
  max-width: min(98vw, 88rem);
  overflow: visible;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.55s ease 0.06s,
    transform 0.55s ease 0.06s;
}

.hero__title-live {
  position: relative;
  z-index: 2;
  display: block;
}

.hero__title-mobile {
  display: none;
}

.hero__title-ghost {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  color: var(--color-milk);
  filter: blur(var(--hero-ghost-blur));
  overflow: visible;
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity, filter;
}

.hero__title-ghost .hero__title-line {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0;
}

.hero__ghost-letter {
  display: inline-block;
  transform: translate3d(0, calc(var(--hero-ghost-parallax) * var(--letter-speed)), 0);
}

.hero__title-ghost--one {
  opacity: var(--hero-ghost-opacity-one);
  transform: translate3d(0, var(--hero-ghost-step), 0);
}

.hero__title-ghost--two {
  opacity: var(--hero-ghost-opacity-two);
  transform: translate3d(0, calc(var(--hero-ghost-step) * 2), 0);
}

.hero__title.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__title-line {
  display: block;
  color: var(--color-milk);
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.045em;
  line-height: 0.9;
}

.hero__title-line--1 {
  font-size: clamp(2.55rem, 6.97vw, 6.46rem);
  white-space: nowrap;
}

.hero__title-line--2 {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.14em;
  margin-top: -0.02em;
  font-size: clamp(2.55rem, 6.97vw, 6.46rem);
}

.hero__car-wrap {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.hero__car {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 180%;
  transform: scale(1.29) translateY(22vh);
  transform-origin: 50% 100%;
  filter: saturate(0.82) contrast(0.94) brightness(0.98);
}

.hero__car-mist {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      180deg,
      rgba(118, 112, 103, 0.76) 0%,
      rgba(118, 112, 103, 0.62) 18%,
      rgba(114, 108, 99, 0.48) 32%,
      rgba(90, 84, 76, 0.16) 54%,
      rgba(28, 25, 22, 0.34) 100%
    ),
    linear-gradient(90deg, rgba(90, 84, 76, 0.34) 0%, rgb(var(--color-graphite-rgb) / 0.02) 50%, rgba(90, 84, 76, 0.28) 100%);
  pointer-events: none;
}

.hero__cutout {
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: min(67vh, 790px);
  max-width: min(69vw, 675px);
  max-height: none;
  object-fit: contain;
  object-position: bottom center;
  filter: brightness(0.92) saturate(0.94);
  display: block;
  pointer-events: none;
}

.hero__eyebrow {
  position: absolute;
  z-index: 6;
  top: clamp(13.25rem, 44vh, 26.5rem);
  left: calc(50% + clamp(4.5rem, 10vw, 9rem));
  right: max(0.75rem, env(safe-area-inset-right, 0px));
  margin: 0;
  font-size: clamp(0.62rem, 0.96vw, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.35;
  color: var(--hero-text-dim);
  text-align: left;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.5s ease 0.1s,
    transform 0.5s ease 0.1s;
}

.hero__eyebrow.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__quote {
  position: absolute;
  z-index: 6;
  left: max(clamp(7rem, 17vw, 16rem), env(safe-area-inset-left, 0px));
  top: clamp(18.5rem, 62vh, 36rem);
  transform: translateY(-50%);
  width: min(27rem, 38vw);
  max-width: min(27rem, max(19rem, calc(50vw - 6rem)));
  margin: 0;
  text-align: left;
  opacity: 0;
  transition:
    opacity 0.55s ease 0.12s,
    transform 0.55s ease 0.12s;
}

.hero__quote.is-in {
  opacity: 1;
}

.hero__quote-mark {
  display: none;
}

.hero__lead {
  margin: 0;
  font-size: clamp(0.76rem, 0.92vw, 0.86rem);
  line-height: 1.48;
  font-weight: 600;
  color: var(--hero-text);
}

.hero__lead-attrib {
  margin: 0.55rem 0 0;
  font-size: clamp(0.74rem, 0.88vw, 0.82rem);
  font-weight: 700;
  color: var(--hero-text-dim);
}

.hero__bar {
  position: absolute;
  z-index: 7;
  left: max(1rem, calc((100vw - var(--content-max)) / 2));
  right: max(1rem, calc((100vw - var(--content-max)) / 2));
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding: 0 0 max(1rem, env(safe-area-inset-bottom, 0px)) 0;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.5s ease 0.16s,
    transform 0.5s ease 0.16s;
}

.hero__bar.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__bar-soc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.65rem;
  max-width: min(100%, 15rem);
  padding-bottom: 0.15rem;
}

.hero__soc-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(var(--color-milk-rgb) / 0.78);
  letter-spacing: 0.02em;
}

.hero__actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.75rem;
  margin-left: auto;
}

@media (min-width: 1200px) and (max-width: 1700px) {
  .hero__bar {
    gap: 0.65rem 0.8rem;
  }

  .hero__bar-soc {
    max-width: 14rem;
  }

  .btn {
    min-width: clamp(10.75rem, 14vw, 12.75rem);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  min-width: clamp(12rem, 18vw, 15rem);
  padding: 0.9rem 1.55rem;
  border-radius: 0.9rem;
  font-weight: 600;
  font-size: clamp(1rem, 1.1vw, 1.08rem);
  letter-spacing: 0.01em;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn::after {
  content: '\2192';
  display: inline-block;
  margin-left: 0.55rem;
  font-size: 0.95em;
  font-weight: 400;
  line-height: 1;
  opacity: 0.9;
  transform: translateX(0);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn--primary {
  color: var(--yellow-ink);
  background: var(--yellow);
  border-color: var(--yellow);
}

.btn--primary:hover {
  background: var(--yellow-hover);
  border-color: var(--yellow-hover);
}

.btn--ghost {
  color: rgb(var(--color-milk-rgb) / 0.95);
  border-color: rgb(var(--color-milk-rgb) / 0.16);
  background: rgb(var(--color-graphite-rgb) / 0.72);
}

.btn--ghost::after {
  content: '\2197';
}

.btn--ghost:hover {
  border-color: rgb(var(--color-milk-rgb) / 0.24);
  background: rgb(var(--color-graphite-rgb) / 0.9);
}

.btn:hover::after {
  transform: translateX(0.14rem);
  opacity: 1;
}

.hero :deep(.soc__link) {
  border: 1px solid rgb(var(--color-milk-rgb) / 0.38);
  border-radius: 4px;
  color: var(--color-milk);
  background: rgb(var(--color-graphite-rgb) / 0.22);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero :deep(.soc__link:hover) {
  border-color: rgb(var(--color-milk-rgb) / 0.55);
  background: rgb(var(--color-graphite-rgb) / 0.4);
}

@media (max-width: 899px) {
  .hero {
    background: var(--color-graphite);
  }

  .hero__stage {
    min-height: auto;
    padding: calc(9.25rem + env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-right, 0px)) 1.5rem
      max(1rem, env(safe-area-inset-left, 0px));
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(circle at top right, rgba(233, 190, 95, 0.16), transparent 34%),
      linear-gradient(180deg, var(--color-graphite) 0%, var(--color-graphite) 100%);
  }

  .hero__stage::before {
    display: none;
  }

  .hero__wash {
    display: none;
  }

  .hero__masthead {
    position: relative;
    order: 1;
    margin-bottom: 0.85rem;
    min-height: 0;
    padding: 0;
  }

  .hero__title-ghost {
    display: none;
  }

  .hero__title {
    max-width: 100%;
    text-align: left;
    margin: 0 0 0.5rem;
    font-weight: 600;
    font-size: clamp(1.95rem, 8.5vw, 2.9rem);
    line-height: 1.02;
    letter-spacing: -0.045em;
    color: var(--color-milk);
    overflow-wrap: anywhere;
  }

  .hero__title-live {
    display: none;
  }

  .hero__title-mobile {
    position: relative;
    z-index: 2;
    display: block;
    max-width: 100%;
    min-width: 0;
    font-weight: 700;
  }

  .hero__title-accent {
    margin-top: 0.04em;
  }

  .hero__car-wrap {
    position: relative;
    inset: auto;
    order: 2;
    align-self: center;
    width: min(100%, 28rem);
    max-width: 100%;
    aspect-ratio: 16 / 10;
    height: auto;
    margin: 0.6rem 0 0;
    border: 1px solid rgb(var(--color-milk-rgb) / 0.14);
    border-radius: 1.5rem;
    overflow: hidden;
    z-index: 3;
  }

  .hero__car {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 24%;
    transform: none;
    filter: none;
  }

  .hero__car-mist {
    background:
      linear-gradient(180deg, rgb(var(--color-graphite-rgb) / 0.08) 0%, rgb(var(--color-graphite-rgb) / 0.1) 44%, rgb(var(--color-graphite-rgb) / 0.46) 100%),
      linear-gradient(90deg, rgb(var(--color-graphite-rgb) / 0.08) 0%, rgb(var(--color-graphite-rgb) / 0) 30%, rgb(var(--color-graphite-rgb) / 0.14) 100%);
  }

  .hero__eyebrow {
    display: none;
  }

  .hero__quote {
    position: static;
    transform: none;
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 0.85rem;
    top: auto;
  }

  .hero__quote-mark {
    display: block;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 9vw, 2.65rem);
    line-height: 0.7;
    color: var(--yellow);
    margin: 0 0 0.3rem;
  }

  .hero__cutout {
    display: none;
  }

  .hero__bar {
    position: relative;
    order: 4;
    left: auto;
    right: auto;
    bottom: auto;
    padding: 0;
    margin-top: 1.1rem;
    flex-direction: column;
    align-items: stretch;
    opacity: 1;
    transform: none;
  }

  .hero__bar.is-in {
    transform: none;
  }

  .hero__bar-soc {
    display: none;
  }

  .hero__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-left: 0;
  }

  .btn {
    width: 100%;
    min-width: 0;
    min-height: 3.65rem;
    padding: 0.9rem 1.15rem;
    border-radius: 1.25rem;
    font-size: clamp(1.05rem, 4vw, 1.18rem);
  }
}

@media (max-width: 520px) {
  .hero__title {
    max-width: 100%;
  }
}

@media (min-width: 1920px) {
  .hero__masthead {
    min-height: clamp(11rem, 24vh, 17rem);
  }

  .hero__title {
    max-width: min(86vw, 74rem);
  }

  .hero__title-line--1,
  .hero__title-line--2 {
    font-size: clamp(2.3rem, 4.9vw, 5.35rem);
  }

  .hero__car-wrap {
    background: rgb(var(--color-milk-rgb) / 0.96);
  }

  .hero__car {
    object-fit: contain;
    object-position: 50% 100%;
    transform: none;
  }

  .hero__car-mist {
    background:
      linear-gradient(
        180deg,
        rgba(118, 112, 103, 0.54) 0%,
        rgba(118, 112, 103, 0.42) 18%,
        rgba(114, 108, 99, 0.3) 34%,
        rgba(90, 84, 76, 0.1) 56%,
        rgba(28, 25, 22, 0.26) 100%
      ),
      linear-gradient(90deg, rgba(90, 84, 76, 0.24) 0%, rgb(var(--color-graphite-rgb) / 0.01) 50%, rgba(90, 84, 76, 0.2) 100%);
  }

  .hero__eyebrow {
    left: calc(50% + clamp(3.5rem, 6vw, 7rem));
    right: max(1rem, calc(50% - 36.5rem));
  }

  .hero__quote {
    left: max(2.5rem, calc(50% - 35rem));
    width: min(24rem, 24vw);
    max-width: min(24rem, calc(50vw - 6.5rem));
  }

  .hero__bar-soc {
    max-width: 13.5rem;
  }

  .hero__actions {
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__stage,
  .hero__title,
  .hero__eyebrow,
  .hero__quote,
  .hero__bar {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
