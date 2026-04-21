<script setup>
import { useInView } from '../composables/useInView.js';
import BrandsMarquee from './BrandsMarquee.vue';

const { el, visible } = useInView();
</script>

<template>
  <section id="brands" ref="el" class="sec">
    <div class="sec__head" :class="{ 'is-in': visible }">
      <h2 class="sec__title">Производители</h2>
      <p class="sec__lead">
        Работаем с масс-маркетом и премиумом. 
      </p>
    </div>
    <div class="sec__marquee" :class="{ 'is-in': visible }">
      <BrandsMarquee />
    </div>
  </section>
</template>

<style scoped>
.sec {
  padding: 3rem 0 3.5rem;
  overflow: hidden;
  border-bottom: 1px solid var(--line-light);
}

.sec__head {
  max-width: 1120px;
  margin: 0 auto 2rem;
  padding: 0 max(1rem, env(safe-area-inset-left, 0px)) 0 max(1rem, env(safe-area-inset-right, 0px));
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.sec__head.is-in {
  opacity: 1;
  transform: translateY(0);
}

.sec__title {
  font-weight: 600;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.sec__lead {
  margin: 0;
  max-width: 42rem;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--muted);
}

.sec__marquee {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.5s ease 0.08s,
    transform 0.5s ease 0.08s;
}

.sec__marquee.is-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .sec__head,
  .sec__marquee {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
