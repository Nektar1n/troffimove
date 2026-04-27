<script setup>
import { computed } from 'vue';
import { socialUrls } from '../config/site.js';
import { getSocialSvg } from '../utils/socialSvgs.js';

defineProps({
  /** 'hero' — иконки в ряд; 'hero-messengers' — подпись «Мы в соцсетях:» + IG/TG/VK; 'footer' — в подвале */
  variant: {
    type: String,
    default: 'hero',
  },
});

const messengerIds = new Set(['instagram', 'telegram', 'vk']);

const items = computed(() => {
  const list = [
    {
      id: 'avito',
      label: 'Профиль на Avito',
      href: socialUrls.avito,
      svg: null,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: socialUrls.instagram,
      svg: getSocialSvg('instagram'),
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: socialUrls.telegram,
      svg: getSocialSvg('telegram'),
    },
    {
      id: 'vk',
      label: 'ВКонтакте',
      href: socialUrls.vk,
      svg: getSocialSvg('vk'),
    },
  ];
  return list.filter((x) => typeof x.href === 'string' && x.href.trim().length > 0);
});
</script>

<template>
  <div v-if="items.length" class="soc" :class="'soc--' + variant" aria-label="Соцсети и площадки">
    <a
      v-for="item in items"
      :key="item.id"
      class="soc__link"
      :href="item.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="item.label"
    >
      <span v-if="item.id === 'avito'" class="soc__icon soc__icon--avito" aria-hidden="true">
        <span class="soc__avito-letter">А</span>
      </span>
      <span v-else class="soc__icon" aria-hidden="true" v-html="item.svg" />
    </a>
  </div>
</template>

<style scoped>
.soc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}

.soc--hero {
  margin-top: 0.65rem;
}

.soc--footer {
  gap: 0.5rem;
  margin-top: 1rem;
}

.soc__link {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-light);
  border-radius: 2px;
  color: var(--text);
  background: var(--bg);
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.soc__link:hover {
  border-color: var(--line);
  background: var(--bg-subtle);
}

.soc--footer .soc__link {
  width: 40px;
  height: 40px;
}

.soc__icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
}

.soc__icon :deep(svg) {
  width: 20px;
  height: 20px;
  display: block;
}

.soc__icon :deep(svg),
.soc__icon :deep(path) {
  fill: currentColor !important;
}

/* Монограмма по оптическому весу рядом с SVG 20×20 */
.soc__avito-letter {
  display: block;
  font-weight: 700;
  font-size: 1.1875rem;
  letter-spacing: -0.06em;
  line-height: 1;
  color: inherit;
  transform: translateY(-0.5px);
}
</style>
