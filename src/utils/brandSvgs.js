/** Литерал обязателен для Vite (import.meta.glob не принимает переменную). */
const modules = import.meta.glob(
  '../../node_modules/simple-icons/icons/{toyota,honda,nissan,mazda,mitsubishi,subaru,suzuki,infiniti,acura,hyundai,kia,bmw,audi,volkswagen,porsche,mini,opel,volvo,skoda,seat,citroen,peugeot,renault,fiat,dacia,dsautomobiles,ferrari,lamborghini,maserati,bugatti,astonmartin,bentley,rollsroyce,mclaren,ford,chevrolet,cadillac,jeep,ram,chrysler,tesla,polestar,lucid,rimacautomobili,generalmotors,amg,mg}.svg',
  {
    eager: true,
    query: '?raw',
    import: 'default',
  },
);

const bySlug = new Map();
for (const path of Object.keys(modules)) {
  const m = path.match(/\/([^/]+)\.svg$/);
  if (m) bySlug.set(m[1], modules[path]);
}

export function getBrandSvg(slug) {
  return bySlug.get(slug) ?? null;
}
