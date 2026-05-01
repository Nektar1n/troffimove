import { readonly, ref } from 'vue';

const isNavigationLoadingRef = ref(false);

export const isNavigationLoading = readonly(isNavigationLoadingRef);

export function setNavigationLoading(value) {
  isNavigationLoadingRef.value = Boolean(value);
}
