import { ref } from 'vue';
import { CASE_TYPES } from '../data/cases.js';

const pendingPrefill = ref(null);

export function buildCaseInquiryMessage(model, type) {
  const direction = type === CASE_TYPES.selection ? 'подбору' : 'привозу';
  return `Здравствуйте, хочу рассмотреть ${model} к ${direction}.`;
}

/** Перед переходом на #contact — тема заявки и текст комментария. */
export function setContactFormPrefill({ model, type }) {
  if (!model?.trim()) return;
  const topic = type === CASE_TYPES.selection ? 'selection' : 'import';
  pendingPrefill.value = {
    topic,
    message: buildCaseInquiryMessage(model.trim(), type),
    token: Date.now(),
  };
}

export function consumeContactFormPrefill() {
  const data = pendingPrefill.value;
  if (!data) return null;
  pendingPrefill.value = null;
  return data;
}

export function useContactFormPrefill() {
  return pendingPrefill;
}
