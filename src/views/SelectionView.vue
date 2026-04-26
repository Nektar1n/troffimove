<script setup>
import CasesSection from '../components/CasesSection.vue';
import SelectionHero from '../components/SelectionHero.vue';
import SelectionRisks from '../components/SelectionRisks.vue';
import SelectionCheckMap from '../components/SelectionCheckMap.vue';
import SelectionServices from '../components/SelectionServices.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<template>
  <main class="pick-main">
    <SelectionHero />
    <SelectionRisks />
    <SelectionCheckMap />
    <SelectionServices />
    <CasesSection
      section-id="selection-cases"
      title="Кейсы подбора"
      lead="Примеры выездных проверок, сопровождения сделок и подбора б/у на местном рынке."
      scope="selection"
      tone="dark"
      cta-label="Смотреть все кейсы подбора"
      :cta-to="{ path: '/cases', query: { type: 'selection' } }"
      :card-cta-to="{ path: '/podbor', hash: '#contact' }"
    />
    <ContactForm />
  </main>
</template>

<style scoped>
.pick-main {
  display: block;
}
</style>
