import instagram from '../../node_modules/simple-icons/icons/instagram.svg?raw';
import telegram from '../../node_modules/simple-icons/icons/telegram.svg?raw';
import vk from '../../node_modules/simple-icons/icons/vk.svg?raw';

const raw = { instagram, telegram, vk };

function stripTitle(svg) {
  return svg.replace(/<title>[^<]*<\/title>/gi, '');
}

function normalizeSvg(svg) {
  let s = stripTitle(svg);
  if (!/\bfill\s*=/i.test(s.match(/<svg[^>]*>/i)?.[0] ?? '')) {
    s = s.replace(/<svg\b/i, '<svg fill="currentColor" ');
  }
  return s;
}

export function getSocialSvg(id) {
  const r = raw[id];
  return r ? normalizeSvg(r) : '';
}
