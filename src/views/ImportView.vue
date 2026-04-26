<script setup>
import CasesSection from '../components/CasesSection.vue';
import ImportRoutesViz from '../components/ImportRoutesViz.vue';
import ImportInfoBlocks from '../components/ImportInfoBlocks.vue';
import StatsRow from '../components/StatsRow.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<template>
  <main>
    <ImportRoutesViz />
    <ImportInfoBlocks />
    <CasesSection
      section-id="import-cases"
      title="Кейсы привоза"
      lead="Несколько примеров, как проходит выкуп, логистика и доставка авто до РФ по разным направлениям."
      scope="import"
      tone="dark"
      cta-label="Смотреть все кейсы привоза"
      :cta-to="{ path: '/cases', query: { type: 'import' } }"
      :card-cta-to="{ path: '/privoz', hash: '#contact' }"
    />
    <StatsRow />
    <ContactForm />
  </main>
</template>
