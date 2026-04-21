<script setup>
import { computed } from 'vue';
import { buildBrandRows } from '../data/brands.js';
import { getBrandSvg } from '../utils/brandSvgs.js';
import BrandLogo from './BrandLogo.vue';

const row = computed(() => {
  const base = buildBrandRows().filter((b) => !!getBrandSvg(b.slug));
  return [...base, ...base, ...base];
});
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track marquee__track--1">
      <div v-for="(b, i) in row" :key="'a-' + i" class="marquee__cell">
        <BrandLogo :brand="b" />
      </div>
    </div>
    <div class="marquee__track marquee__track--2">
      <div v-for="(b, i) in row" :key="'b-' + i" class="marquee__cell">
        <BrandLogo :brand="b" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  gap: 0.85rem;
  width: max-content;
  animation: scroll-x 85s linear infinite;
}

.marquee__track--2 {
  animation-duration: 110s;
  animation-direction: reverse;
}

.marquee__cell {
  flex: 0 0 auto;
}

@keyframes scroll-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.333%);
  }
}

/* iOS часто включает «Уменьшить движение» — вместо анимации даём горизонтальный свайп, без «простыни» иконок */
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }

  .marquee__track {
    animation: none;
    flex-wrap: nowrap;
    width: max-content;
    align-self: flex-start;
  }
}
</style>
