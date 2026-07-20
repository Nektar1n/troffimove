const MIN_VISIBLE_MS = 720;
const MAX_WAIT_MS = 12000;

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function waitFonts() {
  if (!document.fonts?.ready) return;
  try {
    await Promise.race([document.fonts.ready, wait(2500)]);
  } catch {
    /* ignore */
  }
}

/**
 * Снимает полноэкранный HTML-лоадер из index.html после готовности приложения.
 */
export async function dismissSiteBoot({ startedAt = performance.now() } = {}) {
  await waitFonts();

  const elapsed = performance.now() - startedAt;
  if (elapsed < MIN_VISIBLE_MS) {
    await wait(MIN_VISIBLE_MS - elapsed);
  }

  const boot = document.getElementById('site-boot');
  document.body.classList.remove('is-booting');

  if (!boot) return;

  boot.classList.add('site-boot--done');
  boot.setAttribute('aria-busy', 'false');

  const remove = () => {
    boot.remove();
  };

  boot.addEventListener('transitionend', remove, { once: true });
  window.setTimeout(remove, 700);
}

/**
 * Ждём готовности роутера, но не дольше MAX_WAIT_MS.
 */
export async function waitForAppReady(router) {
  const startedAt = performance.now();

  try {
    await Promise.race([
      router.isReady(),
      wait(MAX_WAIT_MS),
    ]);
  } catch {
    /* роут уже мог упасть — всё равно снимаем лоадер */
  }

  return startedAt;
}
