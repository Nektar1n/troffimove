import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: githubPagesBase(),
});
