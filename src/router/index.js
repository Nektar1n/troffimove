import { createRouter, createWebHistory } from 'vue-router';
import { DEFAULT_DESCRIPTION, PAGE_DESCRIPTIONS, applyPageMeta } from '../seo/siteMeta.js';
import { ensureSelectionHeroImagePreload } from '../utils/selectionHeroImage.js';
import HomeView from '../views/HomeView.vue';
import ImportView from '../views/ImportView.vue';
import LegalView from '../views/LegalView.vue';
import CasesView from '../views/CasesView.vue';
import SelectionView from '../views/SelectionView.vue';

const router = createRouter({
  /* На GitHub Pages путь: /repo/ — без base роуты не сходятся, белый экран. Vite кладёт base в BASE_URL. */
  history: createWebHistory(import.meta.env.BASE_URL),
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
      meta: { title: 'Главная', description: PAGE_DESCRIPTIONS.home },
    },
    {
      path: '/privoz',
      name: 'import',
      component: ImportView,
      meta: { title: 'Привоз авто', description: PAGE_DESCRIPTIONS.import },
    },
    {
      path: '/podbor',
      name: 'selection',
      component: SelectionView,
      meta: { title: 'Подбор и проверка', description: PAGE_DESCRIPTIONS.selection },
    },
    {
      path: '/cases',
      name: 'cases',
      component: CasesView,
      meta: { title: 'Успешные сделки', description: PAGE_DESCRIPTIONS.cases },
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalView,
      meta: { title: 'Документы', description: PAGE_DESCRIPTIONS.legal },
    },
    { path: '/prigon', redirect: '/privoz' },
    { path: '/reviews-cases', redirect: '/cases' },
  ],
});

router.beforeEach((to) => {
  if (to.name === 'selection') {
    ensureSelectionHeroImagePreload();
  }
});

router.afterEach((to) => {
  const base = 'Troffimove Auto';
  const t = to.meta?.title;
  const fullTitle = t ? `${t} · ${base}` : base;
  document.title = fullTitle;
  const desc = to.meta?.description || DEFAULT_DESCRIPTION;
  const pathUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  applyPageMeta(desc, fullTitle, pathUrl || undefined);
});

export default router;
