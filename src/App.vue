<script setup>
import SiteHeader from './components/SiteHeader.vue';
import HeroBlock from './components/HeroBlock.vue';
import ImportRoutesViz from './components/ImportRoutesViz.vue';
import StatsRow from './components/StatsRow.vue';
import RegionsGrid from './components/RegionsGrid.vue';
import BrandsSection from './components/BrandsSection.vue';
import CasesSection from './components/CasesSection.vue';
import ReviewsSection from './components/ReviewsSection.vue';
import ContactForm from './components/ContactForm.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="page">
    <SiteHeader />
    <main>
      <HeroBlock />
      <ImportRoutesViz />
      <StatsRow />
      <RegionsGrid />
      <BrandsSection />
      <CasesSection />
      <ReviewsSection />
      <ContactForm />
    </main>
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

.page main {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
