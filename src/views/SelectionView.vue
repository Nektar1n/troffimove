<script setup>
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
    <ContactForm />
  </main>
</template>

<style scoped>
.pick-main {
  display: block;
}
</style>
