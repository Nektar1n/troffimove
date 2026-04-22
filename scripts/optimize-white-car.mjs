import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'src/assets/white-car.png');
const output = join(root, 'src/assets/white-car.webp');

const buf = await readFile(input);
const out = await sharp(buf)
  .resize({ width: 2400, withoutEnlargement: true })
  .webp({ quality: 84, effort: 5 })
  .toBuffer();

await writeFile(output, out);
console.log(`white-car: ${(buf.length / 1024).toFixed(0)} kB → webp ${(out.length / 1024).toFixed(0)} kB\n${output}`);
