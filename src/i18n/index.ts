import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationRU from './locales/ru.json';

// the translations
const resources = {
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // default language
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false // already react safes from xss
    }
  });
