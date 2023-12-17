import { useState, useEffect, FormEvent } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios, { AxiosError } from 'axios';

export function SettingsController() {
  //add a function that checks the token and sees if an admin or superadmin is logged in
  const [language, setLanguage] = useState(i18next.language);
  const role = 'companyadmin'; //temp variable
  const email = 'company@email.com';
  const password = 'hashed';
  const [adminInfo, setAdminInfo] = useState({
    adminName: '',
    adminEmail: '',
    companyName: '',
  });
  
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

  // const fetchAdminInfo = async () => {
  //   let apiUrl: string;

  //   if (role === 'companyadmin') {
  //     apiUrl = 'http://localhost:5000/api/admin/singleadmin';
  //   } else if (role === 'superadmin') {
  //     apiUrl = 'http://localhost:5000/api/SuperAdmin/singlesuperadmin'; // Update with the actual superadmin endpoint
  //   } else {
  //     throw new Error('Invalid role');
  //   }

  //   try {
  //     const response = await axios.get(apiUrl, { params: { email, password } });

  //     if (response.status === 200) {
  //       const { adminName, adminEmail, companyName } = response.data;
  //       setAdminInfo({ adminName, adminEmail, companyName });
  //     } else if (response.status === 404) {
  //       throw new Error(`${role} not found`);
  //     } else {
  //       throw new Error('Unexpected error');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching admin information:', error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchAdminInfo(); // Fetch admin information when the component mounts
  // }, []);

  return {
    language,
    toggleLanguage,
    adminInfo,
    setLanguage: setLanguageDirectly,
    //fetchAdminInfo
  };
}