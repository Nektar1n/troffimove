<script setup>
import { onMounted } from 'vue';

const siteUrl = () => {
  if (typeof window === 'undefined') return '';
  const base = import.meta.env.BASE_URL || '/';
  return `${window.location.origin}${base}`.replace(/([^:]\/)\/+/g, '$1').replace(/\/$/, '') || window.location.origin;
};

onMounted(() => {
  if (document.getElementById('json-ld-organization')) return;
  const url = siteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Troffimove Auto',
    url: url || undefined,
    email: 'hello@troffimove.auto',
    description:
      'Подбор, выкуп и привоз автомобилей из Кореи, Европы и Японии. Выездная проверка б/у, договор, смета, сопровождение до постановки на учёт.',
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
  };
  const s = document.createElement('script');
  s.id = 'json-ld-organization';
  s.type = 'application/ld+json';
  s.text = JSON.stringify(data);
  document.head.appendChild(s);
});
</script>

<template>
  <span style="display: none" aria-hidden="true" />
</template>
