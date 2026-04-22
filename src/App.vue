<script setup>
import { RouterView } from 'vue-router';
import SeoJsonLd from './components/SeoJsonLd.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="page">
    <SeoJsonLd />
    <SiteHeader />
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
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

.page :deep(main) {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>

<style>
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
