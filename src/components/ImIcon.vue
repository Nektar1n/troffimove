<template>
  <svg
    class="im-icon"
    :class="[size && `im-icon--${size}`]"
    :width="s"
    :height="s"
    :viewBox="`0 0 24 24`"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- brief -->
    <g v-if="name === 'brief'">
      <rect x="4" y="4" width="16" height="14" rx="2" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="12" x2="14" y2="12" />
    </g>
    <!-- search -->
    <g v-else-if="name === 'search'">
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="16.2" y2="16.2" />
    </g>
    <!-- sign -->
    <g v-else-if="name === 'sign'">
      <path d="M4 5h8l3 2v3H4z" />
      <path d="M4 10h11v6a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
      <path d="M9 6V4a1 1 0 112 0v2" />
    </g>
    <!-- truck -->
    <g v-else-if="name === 'truck'">
      <rect x="2" y="6" width="11" height="6" rx="1" />
      <path d="M13 8h3l2.5 2.5V12H13" />
      <rect x="17" y="9" width="4" height="3" rx="0.4" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </g>
    <!-- document -->
    <g v-else-if="name === 'doc'">
      <path d="M7 3h5l3 3v10a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <line x1="8" y1="10" x2="12" y2="10" />
      <line x1="8" y1="13" x2="12" y2="13" />
    </g>
    <!-- key handover -->
    <g v-else-if="name === 'key'">
      <circle cx="4.5" cy="4.5" r="1.6" />
      <path d="M5.7 5.7L20 20" />
      <line x1="11" y1="20" x2="11" y2="17" />
      <line x1="15" y1="20" x2="15" y2="14" />
    </g>
    <!-- clock -->
    <g v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="12" x2="16" y2="12" />
    </g>
    <!-- check circle -->
    <g v-else-if="name === 'check'">
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12.5l2.2 2.2L16 9" />
    </g>
    <!-- layers (extra) -->
    <g v-else-if="name === 'layers'">
      <path d="M4 7l8 4 8-4" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </g>
    <!-- chat -->
    <g v-else-if="name === 'chat'">
      <path d="M4 5h12a2 2 0 012 2v5a2 2 0 01-2 2H8l-4 3V7a2 2 0 012-2z" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'brief',
  },
  size: {
    type: String,
    default: 'm',
  },
});

const map = { s: 18, m: 22, l: 26 };
const s = computed(() => map[props.size] || 22);
</script>

<style scoped>
.im-icon {
  flex-shrink: 0;
  display: block;
  color: rgba(245, 196, 18, 0.95);
}

.im-icon--l {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
