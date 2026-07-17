<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { getCaseById } from '../data/cases.js';

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});

const TITLES = {
  import: 'Привоз авто',
  selection: 'Подбор и проверка',
  cases: 'Успешные сделки',
  'case-detail': 'Детали сделки',
  legal: 'Документы',
};

const isVisible = computed(() => props.route?.name && props.route.name !== 'home');
const isDark = computed(() => ['import', 'selection', 'cases', 'case-detail'].includes(String(props.route?.name || '')));
const caseTitle = computed(() => {
  const caseId = String(props.route?.params?.id || '');
  if (!caseId) return 'Детали сделки';
  return getCaseById(caseId)?.model || 'Детали сделки';
});

const trail = computed(() => {
  const name = String(props.route?.name || '');
  if (name === 'case-detail') {
    return [
      { label: 'Главная', to: '/' },
      { label: 'Успешные сделки', to: '/cases' },
      { label: caseTitle.value, to: null },
    ];
  }
  return [
    { label: 'Главная', to: '/' },
    { label: TITLES[name] || 'Страница', to: null },
  ];
});
</script>

<template>
  <div v-if="isVisible" class="crumbs" :class="{ 'crumbs--dark': isDark }">
    <nav class="crumbs__inner" aria-label="Хлебные крошки">
      <template v-for="(item, idx) in trail" :key="`${item.label}-${idx}`">
        <RouterLink v-if="item.to" class="crumbs__link" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else class="crumbs__current" aria-current="page">{{ item.label }}</span>
        <span v-if="idx < trail.length - 1" class="crumbs__sep">/</span>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.crumbs {
  position: absolute;
  z-index: 30;
  top: calc(4.05rem + env(safe-area-inset-top, 0px));
  left: 0;
  right: 0;
  padding: 0.45rem max(1.35rem, env(safe-area-inset-right, 0px)) 0 max(1.35rem, env(safe-area-inset-left, 0px));
  pointer-events: none;
}

.crumbs--dark {
  background: transparent;
}

.crumbs__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--muted);
  pointer-events: auto;
  width: 100%;
}

.crumbs--dark .crumbs__inner {
  color: var(--muted-on-dark);
}

.crumbs__link {
  text-decoration: none;
  color: inherit;
}

.crumbs__link:hover {
  color: var(--yellow);
}

.crumbs__current {
  color: var(--text);
}

.crumbs--dark .crumbs__current {
  color: var(--text-on-dark);
}

@media (max-width: 899px) {
  .crumbs {
    top: calc(3.65rem + env(safe-area-inset-top, 0px));
  }
}
</style>
