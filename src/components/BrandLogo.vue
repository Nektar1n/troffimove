<script setup>
import { computed } from 'vue';
import { getBrandSvg } from '../utils/brandSvgs.js';
import { normalizeBrandSvg } from '../utils/svgNormalize.js';

const props = defineProps({
  brand: { type: Object, required: true },
});

const svg = computed(() => (props.brand.kind === 'svg' ? getBrandSvg(props.brand.slug) : null));

const safeSvg = computed(() => normalizeBrandSvg(svg.value ?? ''));
</script>

<template>
  <div v-if="brand.kind === 'text' || safeSvg" class="brand-logo" :class="{ 'brand-logo--text': brand.kind === 'text' }">
    <span v-if="brand.kind === 'text'" class="brand-logo__mono" :title="brand.label">{{ brand.mono }}</span>
    <span v-else class="brand-logo__svg" v-html="safeSvg" />
  </div>
</template>

<style scoped>
.brand-logo {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 2px;
  background: #fff;
  border: 1px solid var(--line-light);
  color: var(--text);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.brand-logo:hover {
  border-color: var(--line);
}

/* Монограммы — тот же светлый стиль, что и SVG (без чёрного квадрата) */
.brand-logo--text {
  background: #fff;
  border-color: var(--line-light);
  color: var(--text);
}

.brand-logo--text:hover {
  border-color: var(--line);
}

.brand-logo__mono {
  font-weight: 600;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
}

.brand-logo__svg :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  fill: currentColor;
  color: inherit;
}

/* Не затираем fill="none" и светлые области внутри многоконтурных лого */
.brand-logo__svg :deep(path[fill='none']),
.brand-logo__svg :deep(circle[fill='none']),
.brand-logo__svg :deep(rect[fill='none']) {
  fill: none !important;
}
</style>
