<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import SeoJsonLd from './components/SeoJsonLd.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import { preloadCriticalImagesForRoute } from './utils/criticalRouteImages.js';

const route = useRoute();
const routeReady = ref(false);
let loadToken = 0;

watch(
  () => route.name,
  async (routeName) => {
    const token = ++loadToken;
    routeReady.value = false;

    await preloadCriticalImagesForRoute(String(routeName || ''));

    if (token !== loadToken) return;
    routeReady.value = true;
  },
  { immediate: true },
);
</script>

<template>
  <div class="page">
    <div v-if="!routeReady" class="page__loader" role="status" aria-live="polite" aria-label="Загрузка">
      <span class="page__loader-dot" />
    </div>
    <template v-else>
      <SeoJsonLd />
      <SiteHeader />
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
      <SiteFooter />
    </template>
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

.page__loader {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: var(--bg);
}

.page__loader-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--yellow);
  animation: page-loader-pulse 0.95s ease-in-out infinite;
}

.page :deep(main) {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>

<style>
@keyframes page-loader-pulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.92);
  }

  50% {
    opacity: 1;
    transform: scale(1.14);
  }
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.38s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.38s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
