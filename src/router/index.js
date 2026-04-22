import { createRouter, createWebHistory } from 'vue-router';
import SelectionView from '../views/SelectionView.vue';
import ImportView from '../views/ImportView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      // После смены маршрута секция с id может появиться позже одного кадра —
      // иначе скролл к якорю «молчит», пока не кликнут второй раз.
      return new Promise((resolve) => {
        let tries = 0;
        const maxTries = 80;
        const step = () => {
          const el = document.querySelector(to.hash);
          if (el) {
            resolve({ el: to.hash, behavior: 'smooth', top: 0 });
            return;
          }
          tries += 1;
          if (tries >= maxTries) {
            resolve({ top: 0, left: 0 });
            return;
          }
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
    if (to.path !== from.path) return { top: 0, left: 0 };
    return { top: 0, left: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Главная' },
    },
    {
      path: '/privoz',
      name: 'import',
      component: ImportView,
      meta: { title: 'Привоз авто' },
    },
    {
      path: '/podbor',
      name: 'selection',
      component: SelectionView,
      meta: { title: 'Подбор и проверка' },
    },
    { path: '/prigon', redirect: '/privoz' },
    { path: '/reviews-cases', redirect: { path: '/', hash: '#cases' } },
  ],
});

router.afterEach((to) => {
  const base = 'Troffimove Auto';
  document.title = to.meta?.title ? `${to.meta.title} · ${base}` : base;
});

export default router;
