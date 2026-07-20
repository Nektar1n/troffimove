import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * GitHub Pages:
 * - Обычный репозиторий → сайт: https://USER.github.io/REPO/  → base = "/REPO/"
 * - Репозиторий USER.github.io (user/org page) → https://USER.github.io/  → base = "/"
 * Локально GITHUB_REPOSITORY нет → base = "/"
 */
function githubPagesBase() {
  const full = process.env.GITHUB_REPOSITORY;
  if (!full) return '/';
  const [owner, repo] = full.split('/');
  if (!owner || !repo) return '/';
  if (repo === `${owner}.github.io`) return '/';
  return `/${repo}/`;
}

/** Можно задать `VITE_GITHUB_BASE=/имя-репо/`, если собираешь `dist` локально под Pages без GITHUB_REPOSITORY. */
function resolveBase() {
  const v = process.env.VITE_GITHUB_BASE?.trim();
  if (v) {
    if (v === '/' || v === './') return '/';
    return v.endsWith('/') ? v : `${v}/`;
  }
  return githubPagesBase();
}

/**
 * GitHub Pages для SPA:
 * - 404.html — fallback для неизвестных путей
 * - /privoz/index.html и т.п. — чтобы маршруты отдавали HTTP 200, а не 404
 *   (иначе Google отклоняет индексирование: «ошибки индексирования»)
 */
function githubSpaRoutesPlugin() {
  const staticRoutes = ['privoz', 'podbor', 'cases', 'legal', 'prigon', 'reviews-cases'];

  return {
    name: 'github-spa-routes',
    closeBundle: () => {
      const from = join(__dirname, 'dist', 'index.html');
      if (!existsSync(from)) return;

      copyFileSync(from, join(__dirname, 'dist', '404.html'));

      const routes = [...staticRoutes];
      try {
        const casesSrc = readFileSync(join(__dirname, 'src', 'data', 'cases.js'), 'utf8');
        for (const match of casesSrc.matchAll(/id:\s*'([^']+)'/g)) {
          routes.push(`cases/${match[1]}`);
        }
      } catch {
        /* кейсы не критичны для билда */
      }

      for (const route of routes) {
        const dir = join(__dirname, 'dist', route);
        mkdirSync(dir, { recursive: true });
        copyFileSync(from, join(dir, 'index.html'));

        /* Односегментные пути: /privoz → privoz.html (GitHub Pages отдаёт 200 без слэша) */
        if (!route.includes('/')) {
          copyFileSync(from, join(__dirname, 'dist', `${route}.html`));
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), githubSpaRoutesPlugin()],
  base: '/',
});
