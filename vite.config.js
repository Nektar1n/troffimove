import { copyFileSync, existsSync } from 'node:fs';
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

/** Для GitHub Pages при SPA-роуте копия index.html → 404.html (иначе F5 на /privoz даст 404). */
function githubSpa404Plugin() {
  return {
    name: 'github-spa-404',
    closeBundle: () => {
      const from = join(__dirname, 'dist', 'index.html');
      const to = join(__dirname, 'dist', '404.html');
      if (existsSync(from)) copyFileSync(from, to);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), githubSpa404Plugin()],
  base: '/'
});
