import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationSK from "./locales/sk/translation.json";
import translationEN from "./locales/en/translation.json";
import translationCZ from "./locales/cz/translation.json";
import translationDE from "./locales/de/translation.json";
import translationES from "./locales/es/translation.json";

i18n.use(initReactI18next).init({
  lng: 'sk',
  fallbackLng: 'sk',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    sk: {
      translation: translationSK,
    },
    en: {
      translation: translationEN,
    },
    cz: {
      translation: translationCZ,
    },
    de: {
      translation: translationDE,
    },
    es: {
      translation: translationES,
    },
  },
});

export default i18n;
