import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import translationSK from "./locales/sk/translation.json";
import translationEN from "./locales/en/translation.json";
import translationCZ from "./locales/cz/translation.json";
import translationDE from "./locales/de/translation.json";
import translationES from "./locales/es/translation.json";
import translationFR from "./locales/fr/translation.json";

i18n.use(detector).use(initReactI18next).init({
  fallbackLng: 'sk',
  supportedLngs: ['sk', 'en', 'cz', 'de', 'es', 'fr'],
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
    fr: {
      translation: translationFR,
    },
  },
  detection: {
    order: ['path', 'localStorage'],
    lookupFromPathIndex: 0,
    caches: ['localStorage'],
  },
  cache: ['localStorage'],
});

export default i18n;
