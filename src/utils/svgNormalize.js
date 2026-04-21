/**
 * Подготовка SVG simple-icons: убираем title, снимаем только явные чёрные заливки,
 * чтобы наследовался currentColor. Светлые/белые заливки не трогаем (нужны для «вырезов» в лого).
 */
export function normalizeBrandSvg(raw) {
  if (!raw) return '';
  let s = raw.replace(/<title>[^<]*<\/title>/gi, '');
  s = s.replace(/\sfill="#0{3,8}"/gi, '');
  s = s.replace(/\sfill='#[0]{3,8}'/gi, '');
  s = s.replace(/\sfill="black"/gi, '');
  s = s.replace(/\sfill='black'/gi, '');
  const openSvg = s.match(/<svg[^>]*>/i)?.[0] ?? '';
  if (!/\bfill\s*=/i.test(openSvg)) {
    s = s.replace(/<svg\b/i, '<svg fill="currentColor" ');
  }
  return s;
}
