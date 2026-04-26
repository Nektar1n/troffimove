import imgGenesisCase from '../assets/gelik.jpeg';
import imgAlphardCase from '../assets/toyotagn.jpeg';
import imgBmwCase from '../assets/bmw.jpeg';
import imgCarnivalCase from '../assets/toyota.jpeg';
import imgSelectionVisit from '../assets/подбор на день.png';
import imgSelectionDay from '../assets/эксперт на день.png';
import imgSelectionTurnkey from '../assets/под ключ.png';
import { selectionHeroUrl as imgSelectionHero } from '../utils/selectionHeroImage.js';

export const CASE_TYPES = {
  all: 'all',
  import: 'import',
  selection: 'selection',
};

export const CASES = [
  {
    id: 'genesis-gv80-2022',
    type: CASE_TYPES.import,
    tag: 'Корея',
    model: 'Genesis GV80, 2022',
    meta: 'Под ключ · 28 дней морем · смета зафиксирована в договоре',
    text:
      'Клиент искал семиместный кроссовер с панорамой и пакетом Lexicon. Мы отфильтровали лоты с реальным пробегом, сделали видеоосмотр лакокраски и подвески, согласовали цену с продавцом и забронировали лот до перевода.',
    image: imgGenesisCase,
    featured: ['home', 'import'],
  },
  {
    id: 'alphard-2021',
    type: CASE_TYPES.import,
    tag: 'Япония',
    model: 'Toyota Alphard Executive Lounge, 2021',
    meta: 'USS Tokyo · оценка 4.5B · аукционный лист и перевод',
    text:
      'Запрос был на кресла-капсулы второго ряда и минимальную историю ремонтов. До торгов посчитали полную стоимость в РФ; после выигрыша оформили выкуп, доставку до порта Японии и морскую перевозку с трекингом.',
    image: imgAlphardCase,
    featured: ['import'],
  },
  {
    id: 'bmw-540i-2020',
    type: CASE_TYPES.import,
    tag: 'Европа',
    model: 'BMW 540i xDrive, 2020',
    meta: 'Официальный дилер EU · сервисная книга · VIN-отчёт',
    text:
      'Искали шестицилиндровый седан с M Sport и активным круизом. Проверили опции по VIN, сверили пробег с историей обслуживания и получили закрывающие документы для таможни до отправки в РФ.',
    image: imgBmwCase,
    featured: ['home', 'import'],
  },
  {
    id: 'carnival-hilimousine-2023',
    type: CASE_TYPES.import,
    tag: 'Корея',
    model: 'Kia Carnival Hi-Limousine, 2023',
    meta: 'Редкий VIP-ряд · согласование опций · страхование кузова',
    text:
      'Поиск заводской четырёхместной конфигурации с перегородкой. Мы отсекли переоборудованные машины, запросили фото спорных зон кузова и после выкупа вели еженедельные статусы по маршруту до порта РФ.',
    image: imgCarnivalCase,
    featured: ['import'],
  },
  {
    id: 'camry-2019-onsite',
    type: CASE_TYPES.selection,
    tag: 'Выездная проверка',
    model: 'Toyota Camry, 2019',
    meta: '1 адрес · кузов + OBD · торг после осмотра',
    text:
      'На месте нашли вторичный окрас двух элементов, расхождение по зазорам и ошибки по блоку комфорта. После осмотра клиент сразу получил короткий список рисков и аргументы для торга с продавцом.',
    image: imgSelectionVisit,
    featured: ['home', 'selection'],
  },
  {
    id: 'octavia-day-expert',
    type: CASE_TYPES.selection,
    tag: 'Эксперт на день',
    model: 'Skoda Octavia, 2018',
    meta: '3 адреса за день · сравнение вариантов · итоговая таблица',
    text:
      'За один день посмотрели три машины в разных районах города. После финального адреса собрали сравнительную таблицу по кузову, технике и юридическим вопросам, чтобы выбрать лучший вариант без повторных выездов.',
    image: imgSelectionDay,
    featured: ['selection'],
  },
  {
    id: 'sorento-turnkey',
    type: CASE_TYPES.selection,
    tag: 'Авто под ключ',
    model: 'Kia Sorento, 2021',
    meta: '12 объявлений в воронке · сопровождение сделки · проверка у банка',
    text:
      'Клиенту нужен был семейный дизельный кроссовер без серьёзных вложений на старте. Мы отсекли слабые объявления на созвонах, проверили финальный вариант по документам и сопровождали сделку до передачи ключей.',
    image: imgSelectionTurnkey,
    featured: ['home', 'selection'],
  },
  {
    id: 'bmw-320i-quick-check',
    type: CASE_TYPES.selection,
    tag: 'Проверка перед покупкой',
    model: 'BMW 320i, 2017',
    meta: 'Сканер + история обслуживания · заключение в день осмотра',
    text:
      'Продавец заявлял «идеальное состояние», но проверка показала косвенные признаки скрученного пробега и свежие косметические работы по передней части. Клиент отказался от сделки до внесения аванса.',
    image: imgSelectionHero,
    featured: ['selection'],
  },
];

export function getCasesByType(type = CASE_TYPES.all) {
  if (!type || type === CASE_TYPES.all) return CASES;
  return CASES.filter((item) => item.type === type);
}

export function getFeaturedCases(scope = 'home') {
  return CASES.filter((item) => item.featured?.includes(scope));
}
