<script setup>
import { onMounted, ref } from 'vue';
import desktopHeroPhoto from '../assets/субаОтлично.jpg';
import trofimCutout from '../assets/вырезаныйТроффим.png';
import mobileHeroPhoto from '../assets/trofim.jpeg';
import SocialLinks from './SocialLinks.vue';
import TitleKeyTypewriter from './TitleKeyTypewriter.vue';

const mounted = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});
</script>

<template>
  <section class="hero">
    <div class="hero__stage" :class="{ 'is-in': mounted }">
      <div class="hero__wash" aria-hidden="true" />

      <!-- z: заголовок и ghost под машиной и фигурой (макет Figma) -->
      <div class="hero__masthead">
        <div class="hero__head">
          <h1 class="hero__title" :class="{ 'is-in': mounted }">
            <span class="hero__title-ghost hero__title-ghost--one" aria-hidden="true">
              <span class="hero__title-line hero__title-line--1">Подбор, выкуп и привоз</span>
              <span class="hero__title-line hero__title-line--2"><span class="hero__title-auto">авто</span> <span class="hero__title-key">под ключ</span></span>
            </span>
            <span class="hero__title-ghost hero__title-ghost--two" aria-hidden="true">
              <span class="hero__title-line hero__title-line--1">Подбор, выкуп и привоз</span>
              <span class="hero__title-line hero__title-line--2"><span class="hero__title-auto">авто</span> <span class="hero__title-key">под ключ</span></span>
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
  --hero-text: #fff;
  --hero-text-dim: rgba(255, 255, 255, 0.92);

  position: relative;
  z-index: 0;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow-x: clip;
  color: var(--hero-text);
}

.hero__stage {
  position: relative;
  width: 100%;
  min-height: min(100dvh, 1120px);
  padding-top: calc(7rem + env(safe-area-inset-top, 0px));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  padding-right: 0;
  padding-bottom: 0;
  box-sizing: border-box;
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
  height: clamp(7rem, 18vh, 13rem);
  background: linear-gradient(180deg, rgba(118, 112, 103, 0.92) 0%, rgba(118, 112, 103, 0.58) 46%, rgba(118, 112, 103, 0) 100%);
  pointer-events: none;
}

.hero__wash {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 50% 62%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.035) 30%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(180deg, #767067 0%, var(--hero-warm) 34%, var(--hero-warm-deep) 100%);
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
}

.hero__head {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero__title {
  --hero-ghost-step: clamp(2.4rem, 6vw, 5.8rem);

  position: relative;
  margin: 0;
  text-align: center;
  max-width: min(98vw, 88rem);
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
  color: #fff;
  pointer-events: none;
  user-select: none;
}

.hero__title-ghost--one {
  opacity: 0.1;
  transform: translate3d(0, var(--hero-ghost-step), 0);
}

.hero__title-ghost--two {
  opacity: 0.05;
  transform: translate3d(0, calc(var(--hero-ghost-step) * 2), 0);
}

.hero__title.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__title-line {
  display: block;
  color: #fff;
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.045em;
  line-height: 1.02;
}

.hero__title-line--1 {
  font-size: clamp(3.2rem, 8.65vw, 8rem);
  white-space: nowrap;
}

.hero__title-line--2 {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.14em;
  margin-top: -0.02em;
  font-size: clamp(3.2rem, 8.65vw, 8rem);
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
  object-position: 50% 152%;
  transform: scale(1.1) translateY(16vh);
  transform-origin: 50% 100%;
  filter: saturate(0.82) contrast(0.94) brightness(0.98);
}

.hero__car-mist {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(118, 112, 103, 0.72) 0%, rgba(114, 108, 99, 0.58) 22%, rgba(90, 84, 76, 0.18) 54%, rgba(28, 25, 22, 0.34) 100%),
    linear-gradient(90deg, rgba(90, 84, 76, 0.34) 0%, rgba(40, 36, 32, 0.02) 50%, rgba(90, 84, 76, 0.28) 100%);
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
  font-size: clamp(0.66rem, 1.05vw, 0.8rem);
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
  font-size: clamp(0.8rem, 1vw, 0.92rem);
  line-height: 1.48;
  font-weight: 600;
  color: var(--hero-text);
}

.hero__lead-attrib {
  margin: 0.55rem 0 0;
  font-size: clamp(0.78rem, 0.96vw, 0.88rem);
  font-weight: 700;
  color: var(--hero-text-dim);
}

.hero__bar {
  position: absolute;
  z-index: 7;
  left: max(1rem, env(safe-area-inset-left, 0px));
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding: 0 max(1rem, env(safe-area-inset-right, 0px)) max(1rem, env(safe-area-inset-bottom, 0px)) 0;
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
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 0.02em;
}

.hero__actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.75rem;
  margin-left: auto;
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
  color: rgba(245, 245, 247, 0.95);
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(12, 13, 15, 0.72);
}

.btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(18, 19, 22, 0.9);
}

.hero :deep(.soc__link) {
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 4px;
  color: #fff;
  background: rgba(30, 28, 26, 0.22);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero :deep(.soc__link:hover) {
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(30, 28, 26, 0.4);
}

@media (max-width: 899px) {
  .hero {
    background: #050607;
  }

  .hero__stage {
    min-height: auto;
    padding: calc(9.25rem + env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-right, 0px)) 1.5rem
      max(1rem, env(safe-area-inset-left, 0px));
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(circle at top right, rgba(233, 190, 95, 0.16), transparent 34%),
      linear-gradient(180deg, #07080a 0%, #0a0b0d 100%);
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
    font-size: clamp(2.3rem, 10vw, 3.4rem);
    line-height: 1.02;
    letter-spacing: -0.045em;
    color: #fff;
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
    font-weight: 600;
  }

  .hero__title-accent {
    margin-top: 0.04em;
  }

  .hero__car-wrap {
    position: relative;
    inset: auto;
    order: 2;
    width: 100%;
    max-width: min(28rem, 100%);
    aspect-ratio: 16 / 10;
    height: auto;
    margin: 0.6rem 0 0;
    border: 1px solid rgba(255, 255, 255, 0.14);
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
      linear-gradient(180deg, rgba(5, 6, 7, 0.08) 0%, rgba(5, 6, 7, 0.1) 44%, rgba(5, 6, 7, 0.46) 100%),
      linear-gradient(90deg, rgba(5, 6, 7, 0.08) 0%, rgba(5, 6, 7, 0) 30%, rgba(5, 6, 7, 0.14) 100%);
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
