import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import detector from 'i18next-browser-languagedetector';
import translationSK from "./locales/sk/translation.json";
import translationEN from "./locales/en/translation.json";
import translationCZ from "./locales/cz/translation.json";
import translationDE from "./locales/de/translation.json";
import translationES from "./locales/es/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationFI from "./locales/fi/translation.json";
import translationSE from "./locales/se/translation.json";
import translationNO from "./locales/no/translation.json";
import translationIT from "./locales/it/translation.json";
import translationPL from "./locales/pl/translation.json";
import translationHU from "./locales/hu/translation.json";
import translationSI from "./locales/si/translation.json";

i18n.use(Backend).use(detector).use(initReactI18next).init({
  backend: {
    load: 'languageOnly',
  },
  load: 'languageOnly',
  fallbackLng: 'en',
  supportedLngs: [
    'sk',
    'cz',
    'en',
    'de',
    'es',
    'fr',
    'it',
    'pl',
    'nl',
    'si',
    'fi',
    'se',
    'no',
    'dk',
    'hu',
  ],
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
    fi: {
      translation: translationFI,
    },
    se: {
      translation: translationSE,
    },
    no: {
      translation: translationNO,
    },
    it: {
      translation: translationIT,
    },
    pl: {
      translation: translationPL,
    },
    hu: {
      translation: translationHU,
    },
    si: {
      translation: translationSI,
    },
  },
  detection: {
    order: ['path'],
    lookupFromPathIndex: 0,
  },
  cache: ['path'],
});

export default i18n;
