import desktopHeroPhoto from '../assets/главнаяПрод.jpg';
import trofimCutout from '../assets/вырезаныйТроффим.png';
import mobileHeroPhoto from '../assets/trofim.jpeg';
import imgTruck from '../assets/фура.png';
import { selectionHeroUrl } from './selectionHeroImage.js';

const ROUTE_IMAGES = {
  home: [desktopHeroPhoto, mobileHeroPhoto, trofimCutout],
  selection: [selectionHeroUrl],
  import: [imgTruck],
};

const loaded = new Set();

function loadImage(url, timeoutMs = 8000) {
  if (!url || loaded.has(url)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    const done = () => {
      loaded.add(url);
      resolve();
    };

    const timer = window.setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      done();
    }, timeoutMs);

    img.onload = () => {
      window.clearTimeout(timer);
      done();
    };

    img.onerror = () => {
      window.clearTimeout(timer);
      done();
    };

    img.decoding = 'async';
    img.src = url;

    if (img.complete) {
      window.clearTimeout(timer);
      done();
    }
  });
}

export async function preloadCriticalImagesForRoute(routeName) {
  if (typeof window === 'undefined') return;

  const urls = ROUTE_IMAGES[routeName] || [];
  if (!urls.length) return;

  await Promise.all(urls.map((url) => loadImage(url)));
}
