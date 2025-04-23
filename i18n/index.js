import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
import en from "./locales/en";
import fr from "./locales/fr";
import ar from "./locales/ar";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
