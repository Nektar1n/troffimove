<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const links = [
  { href: '#regions', label: 'Направления' },
  { href: '#brands', label: 'Марки' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contact', label: 'Контакт' },
];
</script>

<template>
  <header class="head" :class="{ 'head--solid': scrolled }">
    <div class="head__top">
      <div class="head__inner">
        <a href="#" class="head__logo" aria-label="Troffimove Auto — на главную">
          <span class="head__mark">T</span>
          <span class="head__word">
            <span class="head__name">Troffimove</span>
            <span class="head__tag">Auto</span>
          </span>
        </a>
        <nav class="head__nav" aria-label="Основное меню">
          <a v-for="l in links" :key="l.href" :href="l.href" class="head__link">{{ l.label }}</a>
        </nav>
        <a class="head__cta" href="#contact">Заявка</a>
      </div>
    </div>
    <nav class="head__mob" aria-label="Разделы сайта">
      <a v-for="l in links" :key="'m-' + l.href" :href="l.href" class="head__mob-link">{{ l.label }}</a>
    </nav>
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
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid var(--line-light);
}

.head__top {
  padding: 0.55rem max(1rem, env(safe-area-inset-left, 0px)) 0.55rem max(1rem, env(safe-area-inset-right, 0px));
}

.head__inner {
  max-width: 1120px;
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
  color: #fff;
  flex-shrink: 0;
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

.head__link:hover {
  color: var(--text);
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
  color: #fff;
  background: var(--text);
  border: 1px solid var(--text);
  transition: opacity 0.2s ease;
}

@media (min-width: 820px) {
  .head__cta {
    margin-left: 0;
  }
}

.head__cta:hover {
  opacity: 0.88;
}

/* Мобильная строка навигации: горизонтальный скролл, без «гамбургера» */
.head__mob {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0.35rem max(1rem, env(safe-area-inset-left, 0px)) 0.65rem max(1rem, env(safe-area-inset-right, 0px));
  max-width: 1120px;
  margin: 0 auto;
  border-top: 1px solid transparent;
}

.head__mob::-webkit-scrollbar {
  display: none;
}

.head--solid .head__mob {
  border-top-color: var(--line-light);
}

@media (min-width: 820px) {
  .head__mob {
    display: none;
  }

  .head--solid .head__mob {
    border-top: none;
  }
}

.head__mob-link {
  flex: 0 0 auto;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--muted);
  text-decoration: none;
  white-space: nowrap;
  padding: 0.35rem 0;
}

.head__mob-link:active {
  color: var(--text);
}
</style>
