import { onMounted, onUnmounted, ref } from 'vue';

export function useInView(options = {}) {
  const el = ref(null);
  const visible = ref(false);
  let observer;

  onMounted(() => {
    const node = el.value;
    if (!node || typeof IntersectionObserver === 'undefined') {
      visible.value = true;
      return;
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true;
          if (options.once !== false) observer.disconnect();
        } else if (!options.once) {
          visible.value = false;
        }
      },
      { rootMargin: options.rootMargin ?? '0px 0px -8% 0px', threshold: options.threshold ?? 0.12 },
    );
    observer.observe(node);
  });

  onUnmounted(() => observer?.disconnect());

  return { el, visible };
}
