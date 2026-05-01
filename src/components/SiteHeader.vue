<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const scrolled = ref(false);
const mobileMenuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

/** Тёмная прозрачная шапка: hero/верх страницы тёмный — светлые ссылки до прокрутки (иначе сливаются с фоном). */
const darkHeroTop = computed(
  () =>
    route.name === 'home' ||
    route.name === 'selection' ||
    route.name === 'import' ||
    route.name === 'cases',
);

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu();
  },
);

watch(mobileMenuOpen, (isOpen) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
</script>

<template>
  <header
    class="head"
    :class="{
      'head--solid': scrolled,
      'head--dark': darkHeroTop && !scrolled,
      'head--menu': mobileMenuOpen,
    }"
  >
    <div class="head__top">
      <div class="head__inner">
        <RouterLink to="/" class="head__logo" aria-label="Troffimove Auto — на главную">
          <span class="head__mark">T</span>
          <span class="head__word">
            <span class="head__name">Troffimove</span>
            <span class="head__tag">Auto</span>
          </span>
        </RouterLink>

        <nav class="head__nav" aria-label="Основное меню">
          <RouterLink to="/" class="head__link" exact-active-class="head__link--current">Главная</RouterLink>
          <RouterLink to="/privoz" class="head__link" active-class="head__link--current">Привоз</RouterLink>
          <RouterLink to="/podbor" class="head__link" active-class="head__link--current">Подбор</RouterLink>
          <RouterLink to="/cases" class="head__link" active-class="head__link--current">Успешные сделки</RouterLink>
        </nav>

        <RouterLink class="head__cta head__cta--desktop" :to="{ path: '/', hash: '#contact' }">Оставить заявку</RouterLink>

        <button
          type="button"
          class="head__burger"
          :class="{ 'head__burger--open': mobileMenuOpen }"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          aria-label="Открыть меню"
          @click="toggleMobileMenu"
        >
          <span class="head__burger-line" />
          <span class="head__burger-line" />
          <span class="head__burger-line" />
        </button>
      </div>
    </div>

    <Transition name="head-menu">
      <div v-if="mobileMenuOpen" id="mobile-menu" class="head__mob-shell">
        <div class="head__mob-panel">
          <RouterLink class="head__mob-cta" :to="{ path: '/', hash: '#contact' }" @click="closeMobileMenu">
            Оставить заявку
          </RouterLink>

          <nav class="head__mob" aria-label="Разделы страницы">
            <RouterLink to="/" class="head__mob-link" exact-active-class="head__mob-link--current" @click="closeMobileMenu">
              Главная
            </RouterLink>
            <RouterLink to="/privoz" class="head__mob-link" active-class="head__mob-link--current" @click="closeMobileMenu">
              Привоз
            </RouterLink>
            <RouterLink to="/podbor" class="head__mob-link" active-class="head__mob-link--current" @click="closeMobileMenu">
              Подбор
            </RouterLink>
            <RouterLink to="/cases" class="head__mob-link" active-class="head__mob-link--current" @click="closeMobileMenu">
              Успешные сделки
            </RouterLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.head {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 40;
  padding-top: env(safe-area-inset-top, 0px);
  transition:
    background 0.35s ease,
    border-color 0.35s ease;
}

.head--solid {
  background: rgb(var(--color-milk-rgb) / 0.88);
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid var(--line-light);
}

.head--menu.head--solid {
  background: rgb(var(--color-milk-rgb) / 0.94);
}

.head--dark:not(.head--solid) {
  background: transparent;
}

.head--dark.head--menu:not(.head--solid) {
  background: rgba(8, 9, 11, 0.88);
  backdrop-filter: saturate(160%) blur(16px);
  border-bottom: 1px solid rgb(var(--color-milk-rgb) / 0.08);
}

.head__top {
  padding: 0.55rem max(1rem, env(safe-area-inset-left, 0px)) 0.55rem max(1rem, env(safe-area-inset-right, 0px));
}

.head__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.head__logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--text);
  min-width: 0;
}

.head--dark:not(.head--solid) .head__logo {
  color: var(--color-milk);
}

.head__mark {
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: -0.03em;
  background: var(--text);
  color: var(--color-milk);
  flex-shrink: 0;
}

.head--dark:not(.head--solid) .head__mark {
  background: var(--yellow);
  color: var(--color-graphite);
}

.head__word {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  min-width: 0;
}

.head__name {
  font-weight: 600;
  font-size: clamp(0.85rem, 3.5vw, 0.95rem);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.head__tag {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.head--dark:not(.head--solid) .head__tag {
  color: rgb(var(--color-milk-rgb) / 0.5);
}

.head__nav {
  display: none;
  margin-left: auto;
  gap: 1.75rem;
}

@media (min-width: 820px) {
  .head__nav {
    display: flex;
  }
}

.head__link {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
}

.head--dark:not(.head--solid) .head__link {
  color: rgb(var(--color-milk-rgb) / 0.72);
}

.head__link:hover {
  color: var(--text);
}

.head__link--current {
  color: var(--text);
  font-weight: 600;
}

.head--dark:not(.head--solid) .head__link:hover {
  color: var(--color-milk);
}

.head--dark:not(.head--solid) .head__link--current {
  color: var(--color-milk);
}

.head__cta {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 500;
  min-height: 44px;
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 980px;
  text-decoration: none;
  color: var(--color-milk);
  background: var(--text);
  border-color: var(--yellow);
  transition: opacity 0.2s ease;
}

.head--dark:not(.head--solid) .head__cta {
  background: var(--yellow);
  color: var(--color-graphite);
  border-color: var(--yellow);
}

.head__cta--desktop {
  display: none;
}

@media (min-width: 820px) {
  .head__cta {
    display: inline-flex;
    margin-left: 0;
  }
}

.head__cta:hover {
  opacity: 0.88;
}

.head__burger {
  margin-left: auto;
  width: 44px;
  height: 44px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0;
  border: 1px solid var(--line-light);
  border-radius: 999px;
  background: rgb(var(--color-milk-rgb) / 0.92);
  color: var(--text);
  cursor: pointer;
}

.head--dark:not(.head--solid) .head__burger {
  border-color: rgb(var(--color-milk-rgb) / 0.12);
  background: rgb(var(--color-graphite-rgb) / 0.76);
  color: var(--color-milk);
}

.head__burger-line {
  width: 16px;
  height: 1.5px;
  border-radius: 999px;
  background: currentColor;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.head__burger--open .head__burger-line:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}

.head__burger--open .head__burger-line:nth-child(2) {
  opacity: 0;
}

.head__burger--open .head__burger-line:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

@media (min-width: 820px) {
  .head__burger,
  .head__mob-shell {
    display: none;
  }
}

.head__mob-shell {
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0.9rem max(1rem, env(safe-area-inset-right, 0px));
}

.head__mob-panel {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0.9rem;
  border: 1px solid var(--line-light);
  border-radius: 1.1rem;
  background: rgb(var(--color-milk-rgb) / 0.96);
  box-shadow: 0 22px 48px -32px rgb(var(--color-graphite-rgb) / 0.34);
}

.head--dark:not(.head--solid) .head__mob-panel {
  border-color: rgb(var(--color-milk-rgb) / 0.1);
  background: rgb(var(--color-graphite-rgb) / 0.94);
  box-shadow: 0 28px 54px -34px rgb(var(--color-graphite-rgb) / 0.8);
}

.head__mob-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  margin-bottom: 0.85rem;
  padding: 0.8rem 1rem;
  border-radius: 0.95rem;
  background: var(--yellow);
  color: var(--yellow-ink);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
}

.head__mob {
  display: grid;
  gap: 0.2rem;
}

.head__mob-link {
  display: block;
  padding: 0.75rem 0.2rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
  text-decoration: none;
}

.head--dark:not(.head--solid) .head__mob-link {
  color: rgb(var(--color-milk-rgb) / 0.8);
}

.head__mob-link:active {
  background: rgba(15, 15, 16, 0.06);
}

.head__mob-link--current {
  background: rgba(15, 15, 16, 0.06);
  font-weight: 600;
}

.head--dark:not(.head--solid) .head__mob-link:active {
  background: rgb(var(--color-milk-rgb) / 0.06);
}

.head--dark:not(.head--solid) .head__mob-link--current {
  color: var(--color-milk);
  background: rgb(var(--color-milk-rgb) / 0.06);
}

.head-menu-enter-active,
.head-menu-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.head-menu-enter-from,
.head-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
