const PREFIX = 'troffimove-tw-once:';

export function typewriterOnceStorageKey(onceId, phrase) {
  const id = (onceId && String(onceId).trim()) || phrase;
  return `${PREFIX}${id}`;
}

export function hasTypewriterPlayed(onceId, phrase) {
  if (typeof sessionStorage === 'undefined') return false;
  try {
    return sessionStorage.getItem(typewriterOnceStorageKey(onceId, phrase)) === '1';
  } catch {
    return false;
  }
}

export function markTypewriterPlayed(onceId, phrase) {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(typewriterOnceStorageKey(onceId, phrase), '1');
  } catch {
    /* приватный режим и т.п. */
  }
}

/** При F5 / reload — сбросить флаги, чтобы анимации снова проиграли; sessionStorage при этом сохраняется при переключении вкладок */
export function clearTypewriterOnceStorageIfReload() {
  if (typeof sessionStorage === 'undefined') return;
  let navType = '';
  try {
    const nav = performance.getEntriesByType?.('navigation')?.[0];
    navType = nav?.type || '';
  } catch {
    return;
  }
  if (navType !== 'reload') return;
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
      const k = sessionStorage.key(i);
      if (k?.startsWith(PREFIX)) sessionStorage.removeItem(k);
    }
  } catch {
    /* ignore */
  }
}
