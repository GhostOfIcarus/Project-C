import { useState, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export function SettingsController() {
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    // This effect is used to update the local state when the language changes externally
    const updateLanguage = () => {
      setLanguage(i18next.language);
    };

    i18next.on('languageChanged', updateLanguage);

    return () => {
      i18next.off('languageChanged', updateLanguage);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    storeLanguage(newLanguage);
    console.log('Language toggled to:', newLanguage);
  };

  const setLanguageDirectly = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    storeLanguage(newLanguage);
    console.log('Language set directly to:', newLanguage);
  };

  const getStoredLanguage = () => {
    return localStorage.getItem('language');
  };

  const storeLanguage = (newLanguage: string) => {
    localStorage.setItem('language', newLanguage);
  };

  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageDirectly,
  };
}
