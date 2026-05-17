/** Подставьте свои URL; пустая строка — иконка не показывается. */
export const socialUrls = {
  avito: import.meta.env.VITE_SOCIAL_AVITO ?? '',
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM ?? '',
  telegram: import.meta.env.VITE_SOCIAL_TELEGRAM ?? '',
  vk: import.meta.env.VITE_SOCIAL_VK ?? '',
};

/** Ключ Web3Forms: заявки на почту из личного кабинета https://web3forms.com */
export const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

/** Почта для ссылки mailto, если форма недоступна */
export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL ?? import.meta.env.VITE_FORM_SUBMIT_EMAIL ?? '';

/** Ссылка на Telegram с отзывами (кнопка «все отзывы» и блок отзывов) */
export const reviewsTelegramUrl = import.meta.env.VITE_REVIEWS_TELEGRAM_URL ?? '';
