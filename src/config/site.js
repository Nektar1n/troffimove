/** Подставьте свои URL; пустая строка — иконка не показывается. */
export const socialUrls = {
  avito: import.meta.env.VITE_SOCIAL_AVITO ?? '',
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM ?? '',
  telegram: import.meta.env.VITE_SOCIAL_TELEGRAM ?? '',
  vk: import.meta.env.VITE_SOCIAL_VK ?? '',
};

/** Почта для FormSubmit: заявки приходят на этот адрес (см. https://formsubmit.co ) */
export const formSubmitEmail = import.meta.env.VITE_FORM_SUBMIT_EMAIL ?? '';

/** Ссылка на Telegram с отзывами (кнопка «все отзывы» и блок отзывов) */
export const reviewsTelegramUrl = import.meta.env.VITE_REVIEWS_TELEGRAM_URL ?? '';
