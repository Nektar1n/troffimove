/**
 * Генерирует WebP из hero PNG для /podbor. Запуск: node scripts/optimize-selection-hero.mjs
 * Исходник: src/assets/желтаяауди.png → желтаяауди.webp
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'src/assets/желтаяауди.png');
const output = join(root, 'src/assets/желтаяауди.webp');

const buf = await readFile(input);
const meta = await sharp(buf).metadata();
const w = Math.min(1600, meta.width ?? 1600);

const out = await sharp(buf)
  .resize({ width: w, withoutEnlargement: true })
  .webp({ quality: 86, effort: 5, smartSubsample: true })
  .toBuffer();

const before = buf.length;
const after = out.length;
await writeFile(output, out);
console.log(
  `желтаяауди: ${(before / 1024).toFixed(0)} kB → webp ${(after / 1024).toFixed(0)} kB (${((1 - after / before) * 100).toFixed(0)}% smaller) @ ${w}px\n${output}`,
);
