/** Показатели в герое и в StatsRow: одни и те же целевые значения */
export const STATS_LINE = [
  { target: 1200, t: 'авто доставлено клиентам', kind: 'plus' },
  { target: 14, t: 'стран-источников поставки', kind: 'int' },
  { target: 48, t: 'до первого отчёта по лоту', kind: 'suff', suffix: ' ч' },
  { target: 1, t: 'менеджер на всю сделку', kind: 'int' },
];

/**
 * @param {number} i индекс
 * @param {number} v текущее анимированное значение
 * @param {boolean} done анимация завершена
 */
export function formatStatValue(i, v, done) {
  const d = STATS_LINE[i];
  const t = d.target;
  const val = Math.min(t, Math.max(0, v));
  if (d.kind === 'plus') {
    if (done || val >= t - 0.5) return `${t}+`;
    return String(Math.floor(val));
  }
  if (d.kind === 'suff') {
    return `${Math.floor(val)}${d.suffix}`;
  }
  return String(Math.floor(val));
}
