<script setup>
import { RouterView } from 'vue-router';
import SeoJsonLd from './components/SeoJsonLd.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import AppBreadcrumbs from './components/AppBreadcrumbs.vue';
import { isNavigationLoading } from './state/navigationLoading.js';
</script>

<template>
  <div class="page">
    <div class="page__top-progress" :class="{ 'page__top-progress--active': isNavigationLoading }" aria-hidden="true" />
    <SeoJsonLd />
    <SiteHeader />
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.path">
          <AppBreadcrumbs :route="route" />
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  overflow-x: clip;
}

.page__top-progress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  width: 100%;
  height: 2px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.page__top-progress::before {
  content: '';
  display: block;
  width: 30%;
  height: 100%;
  border-radius: 999px;
  background: var(--yellow);
  transform: translateX(-120%);
}

.page__top-progress--active {
  opacity: 1;
}

.page__top-progress--active::before {
  animation: top-progress-sweep 1.05s ease-in-out infinite;
}

.page :deep(main) {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>

<style>
@keyframes top-progress-sweep {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(440%);
  }
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.22s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>
