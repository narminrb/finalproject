import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: "Home",
      drawing: "Drawing",
      shop: "Shop",
      blog: "Blog",
      aboutUs: "About Us",
      contactUs: "Contact Us",
    },
  },
  az: {
    translation: {
      home: "Ana Səhifə",
      drawing: "Rəsm",
      shop: "Mağaza",
      blog: "Bloq",
      aboutUs: "Haqqımızda",
      contactUs: "Əlaqə",
    },
  },
  // Add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
