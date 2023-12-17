import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../Models/languages/en.json';
import nl from '../Models/languages/nl.json';

export const languageResources = {
  en: { translation: en },
  nl: { translation: nl },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: languageResources,
  lng: 'nl',
  fallbackLng: 'nl',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;