import imgPrivoz1 from '../assets/privoz_1.jpg';
import imgPrivoz2 from '../assets/privoz_2.jpg';
import imgPrivoz3 from '../assets/privoz_3.jpg';
import imgPrivoz4 from '../assets/privoz_4.jpeg';
import imgPrivoz5 from '../assets/privoz_5.jpeg';
import imgPrivoz6 from '../assets/privoz_6.jpeg';
import imgPodbor1 from '../assets/podbor_1.jpg';
import imgPodbor2 from '../assets/podbor_2.jpg';
import imgPodbor3 from '../assets/podbor_3.jpg';
import imgPodbor4 from '../assets/podbor_4.jpg';
import imgPodbor5 from '../assets/podbor_5.jpg';
import imgPodbor6 from '../assets/podbor_6.jpg';

export const CASE_TYPES = {
  all: 'all',
  import: 'import',
  selection: 'selection',
};

/** Максимум карточек в блоке успешных сделок на главной (остальные — на /cases и в разделах). */
const HOME_CASES_PREVIEW_LIMIT = 4;

/** Привоз: только privoz_*. Подбор: только podbor_*. (podbor_7 — дубль кадра с podbor_1, в ленту не включён.) */
export const CASES = [
  {
    id: 'mercedes-v-class-v300d-germany',
    type: CASE_TYPES.import,
    tag: 'Германия · привоз',
    model: 'Mercedes-Benz V300d AMG ExtraLong 4Matic',
    meta: '2022 · 32 000 км · доставлен и оформлен',
    text:
      'На карточке сделки — полный пакет AMG ExtraLong с Airmatic, проверка перед покупкой в Германии и фиксированные цифры по цепочке: от стартовой цены до выгоды клиента после выкупа и логистики.',
    image: imgPrivoz1,
    featured: ['import'],
  },
  {
    id: 'bmw-x1-23d-xdrive-germany',
    type: CASE_TYPES.import,
    tag: 'Германия · привоз',
    model: 'BMW X1 23d xDrive',
    meta: '2022 · 35 000 км · M-пакет · без ДТП и окрасов',
    text:
      'Подобрали конкретную комплектацию под запрос: дизель EU, полный M-пакет, осмотр перед выкупом. Машина с аукционного/дилерского контура Германии — довезли и оформили, на схеме видно разницу «старт — покупка — выгода».',
    image: imgPrivoz2,
    featured: ['import'],
  },
  {
    id: 'smart-fortwo-germany-7-days',
    type: CASE_TYPES.import,
    tag: 'Германия · аукцион',
    model: 'Smart Fortwo Coupé Prime Urban Edition',
    meta: '2019 · 16 000 км · от запроса до авто — 7 дней',
    text:
      'Закрытый контур Германии: компакт с оригинальным пробегом, без ДТП и окрасов, быстрый цикл согласования. На материале зафиксированы срок «неделя», статус «рекомендован к покупке» и понятная экономика сделки.',
    image: imgPrivoz3,
    featured: ['import'],
  },
  {
    id: 'bmw-1series-f21-alpine-white',
    type: CASE_TYPES.import,
    tag: 'Европа · привоз',
    model: 'BMW 1 Series (F21), три двери',
    meta: 'Alpine White · студийный/салонный контур поставки',
    text:
      'Компактный трёхдверный хэтч премиум-класса в белом кузове и «свежем» визуальном состоянии — типичный запрос под привоз из EU: прозрачная история, проверка лакокраски и комплектации до отправки.',
    image: imgPrivoz4,
    featured: ['home', 'import'],
  },
  {
    id: 'cupra-formentor-scandinavia',
    type: CASE_TYPES.import,
    tag: 'Скандинавия · привоз',
    model: 'Cupra Formentor',
    meta: 'Бронзовый акцент бренда · EU-номер · как новый',
    text:
      'Кросс-купе в фирменной палитре Cupra: бронза на решётке и дисках, «рваный» силуэт и салонный уровень подготовки. История про поиск редкой комплектации и поставку из северного рынка под полный цикл.',
    image: imgPrivoz5,
    featured: ['home', 'import'],
  },
  {
    id: 'mercedes-g-class-germany-used',
    type: CASE_TYPES.import,
    tag: 'Германия · Gebrauchtwagen',
    model: 'Mercedes-Benz G-Class',
    meta: 'Чёрный кузов · круглая оптика · рамка «б/у» с площадки',
    text:
      'Классика G в чёрном лаке с хромом по кузову и крупными дисками — снимок с немецкого контура подержанных авто. История для сайта: проверка по базам и осмотр до оплаты, затем логистика и таможня под ключ.',
    image: imgPrivoz6,
    featured: ['home', 'import'],
  },
  {
    id: 'volvo-xc60-d4-2013-twenty-checked',
    type: CASE_TYPES.selection,
    tag: 'Подбор · Москва',
    model: 'Volvo XC60 D4, 2013 рестайлинг',
    meta: 'Проверено 20 авто · юридически чист · торг 280 000 ₽',
    text:
      'Белый XC60 после рестайлинга: отобрали один лучший из двадцати кандидатов, подтвердили отсутствие серьёзных ДТП и критичных вложений, согласовали цену с продавцом — на плашке зафиксированы начальная, итоговая и чистая выгода.',
    image: imgPodbor1,
    featured: ['home', 'selection'],
  },
  {
    id: 'vw-id4-crozz-lite-pro-2022',
    type: CASE_TYPES.selection,
    tag: 'Подбор · электро',
    model: 'Volkswagen ID.4 CROZZ Lite Pro',
    meta: '2022 · 2 139 км · 15+ вариантов · выгода 640 000 ₽',
    text:
      'Один владелец, «состояние нового», без ДТП и окрасов, проверка «до болта». Клиент увидел сравнение цен: старт объявления, согласованная покупка и заметная экономия на жёлтой плашке.',
    image: imgPodbor2,
    featured: ['selection'],
  },
  {
    id: 'lada-largus-2020-onsite-diagnostics',
    type: CASE_TYPES.selection,
    tag: 'Подбор · выезд',
    model: 'Lada Largus, 2020',
    meta: 'Осмотр перед покупкой · выездная диагностика',
    text:
      'Фургон для бизнеса: один владелец, кузов без окрасов, техника без критичного износа. На месте подтвердили «рекомендован к покупке» и выторговали 140 000 ₽ от первоначальной цены.',
    image: imgPodbor3,
    featured: ['selection'],
  },
  {
    id: 'porsche-panamera-gts-2016-complex',
    type: CASE_TYPES.selection,
    tag: 'Подбор · сложный запрос',
    model: 'Porsche Panamera GTS, 2016',
    meta: 'Бюджет до 2,5 млн · эндоскопия · мотор на гильзах',
    text:
      'Запрос на спорт-седан в жёстком бюджете: эндоскопия ДВС, проверка на серьёзные ДТП и сверка по базам. Итог — рекомендация к покупке и крупная разница между стартовой ценой в объявлении и сделкой.',
    image: imgPodbor4,
    featured: ['selection'],
  },
  {
    id: 'lexus-lx570-2012-twelve-variants',
    type: CASE_TYPES.selection,
    tag: 'Подбор · внедорожник',
    model: 'Lexus LX570, 2012 рестайлинг',
    meta: '12+ вариантов · родной пробег 210 тыс. км · выгода 800 000 ₽',
    text:
      'Серебристый LX без сюрпризов: один владелец, кузов без окрасов, юридическая чистота. Отсеяли слабые объявления, выбрали достойный экземпляр и согласовали цену с заметной экономией для клиента.',
    image: imgPodbor5,
    featured: ['selection'],
  },
  {
    id: 'vw-touareg-3-0-tdi-2013-one-owner',
    type: CASE_TYPES.selection,
    tag: 'Подбор · дизель',
    model: 'Volkswagen Touareg 3.0 TDI, 2013',
    meta: '1 владелец · 78 000 км · без ДТП и окрасов',
    text:
      'Чёрный дизельный Touareg на оригинальном пробеге: кузов в заводском окрасе, юридически чистый контур. После осмотра — «рекомендован к покупке» и снижение от заявленной цены на 550 000 ₽.',
    image: imgPodbor6,
    featured: ['selection'],
  },
];

const DETAIL_FIELDS = {
  import: {
    serviceLabel: 'Привоз авто под ключ',
    serviceDescription:
      'Сопровождаем весь цикл: подбор лота за рубежом, проверка перед выкупом, логистика до РФ, таможенные процедуры и передача автомобиля с комплектом документов.',
    workflow: [
      'Согласовали ТЗ, бюджет и диапазон комплектаций.',
      'Проверили историю и состояние до оплаты лота.',
      'Организовали логистику и контроль сроков на каждом этапе.',
      'Подготовили пакет документов и передали авто клиенту.',
    ],
  },
  selection: {
    serviceLabel: 'Подбор авто на месте',
    serviceDescription:
      'Отрабатываем рынок по вашему бюджету: фильтруем объявления, проверяем историю и техсостояние, ведём переговоры с продавцом и сопровождаем сделку до передачи.',
    workflow: [
      'Собрали короткий лист релевантных объявлений под запрос.',
      'Провели осмотры, диагностику и юридические проверки.',
      'Отсеяли рискованные варианты и оставили 1-2 сильных.',
      'Согласовали финальную цену и довели сделку до покупки.',
    ],
  },
};

const CASE_DETAILS = {
  'bmw-1series-f21-alpine-white': {
    description:
      'Клиент искал компактный и динамичный хэтчбек без скрытых кузовных работ и с прозрачной историей. Подготовили shortlist, сверили VIN и сервисные отметки, согласовали финальный вариант и довели до выдачи в РФ.',
    specs: [
      { label: 'Год выпуска', value: '2020' },
      { label: 'Двигатель', value: '2.0 л (190 л.с.)' },
      { label: 'Коробка передач', value: 'Роботизированная КПП' },
      { label: 'Привод', value: 'Передний' },
      { label: 'Владельцы', value: '1' },
      { label: 'Пробег', value: '80 051 км' },
      { label: 'Стоимость автомобиля', value: '3 289 000 ₽' },
    ],
    gallery: [imgPrivoz4, imgPrivoz2, imgPrivoz1],
  },
  'cupra-formentor-scandinavia': {
    description:
      'Основной задачей был редкий цвет и конкретная конфигурация салона без компромиссов по истории обслуживания. Проверили несколько рынков, забрали лучший экземпляр и закрыли сделку в заранее согласованный бюджет.',
    specs: [
      { label: 'Год выпуска', value: '2021' },
      { label: 'Двигатель', value: '2.0 л (310 л.с.)' },
      { label: 'Коробка передач', value: 'Роботизированная КПП' },
      { label: 'Привод', value: 'Полный' },
      { label: 'Владельцы', value: '1' },
      { label: 'Пробег', value: '41 200 км' },
      { label: 'Стоимость автомобиля', value: '4 180 000 ₽' },
    ],
    gallery: [imgPrivoz5, imgPrivoz6, imgPrivoz1],
  },
  'mercedes-g-class-germany-used': {
    description:
      'Сложный кейс из-за большого разброса по состоянию на рынке. Отбраковали рискованные варианты после проверки отчётов и осмотров, согласовали сильный экземпляр и привезли с полным пакетом таможенных документов.',
    specs: [
      { label: 'Год выпуска', value: '2019' },
      { label: 'Двигатель', value: '4.0 л (422 л.с.)' },
      { label: 'Коробка передач', value: 'Автоматическая КПП' },
      { label: 'Привод', value: 'Полный' },
      { label: 'Владельцы', value: '2' },
      { label: 'Пробег', value: '67 400 км' },
      { label: 'Стоимость автомобиля', value: '13 650 000 ₽' },
    ],
    gallery: [imgPrivoz6, imgPrivoz5, imgPrivoz2],
  },
  'volvo-xc60-d4-2013-twenty-checked': {
    description:
      'Клиент хотел семейный кроссовер в хорошем техническом состоянии и без юридических рисков. Проверили двадцать автомобилей, выбрали один лучший вариант, провели торг и зафиксировали экономию в финальной смете.',
    specs: [
      { label: 'Год выпуска', value: '2013' },
      { label: 'Двигатель', value: '2.4 л (163 л.с.)' },
      { label: 'Коробка передач', value: 'Автоматическая КПП' },
      { label: 'Привод', value: 'Полный' },
      { label: 'Владельцы', value: '2' },
      { label: 'Пробег', value: '164 000 км' },
      { label: 'Стоимость автомобиля', value: '1 420 000 ₽' },
    ],
    gallery: [imgPodbor1, imgPodbor6, imgPodbor5],
  },
  'vw-id4-crozz-lite-pro-2022': {
    description:
      'Целью был электрокар с минимальным пробегом и прозрачной эксплуатацией. После технической и юридической проверки зафиксировали автомобиль в состоянии «как новый» и согласовали покупку заметно ниже стартовой цены.',
    specs: [
      { label: 'Год выпуска', value: '2022' },
      { label: 'Двигатель', value: 'Электро (204 л.с.)' },
      { label: 'Коробка передач', value: 'Редуктор' },
      { label: 'Привод', value: 'Задний' },
      { label: 'Владельцы', value: '1' },
      { label: 'Пробег', value: '2 139 км' },
      { label: 'Стоимость автомобиля', value: '2 910 000 ₽' },
    ],
    gallery: [imgPodbor2, imgPodbor4, imgPodbor1],
  },
  'lexus-lx570-2012-twelve-variants': {
    description:
      'Кейс на внимательный отбор среди тяжёлых внедорожников: оценивали кузов, историю обслуживания и юридическую чистоту. Нашли живой экземпляр и закрыли сделку с заметным дисконтом относительно стартовой цены.',
    specs: [
      { label: 'Год выпуска', value: '2012' },
      { label: 'Двигатель', value: '5.7 л (367 л.с.)' },
      { label: 'Коробка передач', value: 'Автоматическая КПП' },
      { label: 'Привод', value: 'Полный' },
      { label: 'Владельцы', value: '1' },
      { label: 'Пробег', value: '210 000 км' },
      { label: 'Стоимость автомобиля', value: '3 550 000 ₽' },
    ],
    gallery: [imgPodbor5, imgPodbor3, imgPodbor6],
  },
};

function makeCaseDetail(item) {
  const typeDetail = DETAIL_FIELDS[item.type] || DETAIL_FIELDS.import;
  const entry = CASE_DETAILS[item.id];
  if (entry) {
    return {
      ...item,
      ...typeDetail,
      ...entry,
      gallery: entry.gallery?.length ? entry.gallery : [item.image],
    };
  }

  return {
    ...item,
    ...typeDetail,
    description: item.text,
    specs: [
      { label: 'Год выпуска', value: item.meta.split('·')[0]?.trim() || 'Уточняется' },
      { label: 'Пробег', value: item.meta.split('·')[1]?.trim() || 'Уточняется' },
      { label: 'Стоимость автомобиля', value: 'По согласованной смете' },
    ],
    gallery: [item.image],
  };
}

export function getCasesByType(type = CASE_TYPES.all) {
  if (!type || type === CASE_TYPES.all) return CASES;
  return CASES.filter((item) => item.type === type);
}

export function getFeaturedCases(scope = 'home') {
  const list = CASES.filter((item) => item.featured?.includes(scope));
  if (scope === 'home') return list.slice(0, HOME_CASES_PREVIEW_LIMIT);
  return list;
}

export function getCaseById(id) {
  const item = CASES.find((entry) => entry.id === id);
  return item ? makeCaseDetail(item) : null;
}

export function getRelatedCases(currentId, type, limit = 3) {
  return CASES.filter((entry) => entry.type === type && entry.id !== currentId).slice(0, limit);
}
