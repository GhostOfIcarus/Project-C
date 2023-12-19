import { useState, useEffect, FormEvent } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios, { AxiosError } from 'axios';

interface UserData {
  firstName: string;
}


export function SettingsController() {
  //add a function that checks the token and sees if an admin or superadmin is logged in
  const [language, setLanguage] = useState(i18next.language);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPass, setUserPass] = useState(null);
  const [adminInfo, setAdminInfo] = useState({
    adminName: '',
    adminEmail: '',
    companyName: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        // console.log("Response data: ", response.data);
        const userData = response.data.userData;
        // console.log(userData.firstName);
        setUserData(userData);
        const userRole = userData.userRole;
        const userEmail = userData.email;
        const userPass = userData.password;

        console.log(userEmail);
        console.log(userPass);
        console.log(userRole);
      } catch (error) {
        // Handle error
      }
    };

    const handleUserRole = () => {
      setUserRole(userRole);
      setUserEmail(userEmail);
      setUserPass(userPass);
    };

    fetchData();
    handleUserRole();
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

  //   if (userRole === 'CompanyAdmin') {
  //     apiUrl = 'http://localhost:5000/api/admin/singleadmin';
  //   } else if (userRole === 'SuperAdmin') {
  //     apiUrl = 'http://localhost:5000/api/SuperAdmin/singlesuperadmin'; 
  //   } else {
  //     throw new Error('Invalid role');
  //   }

  //   try {
  //     const response = await axios.get(apiUrl, { params: { userEmail, userPass } });

  //     if (response.status === 200) {
  //       const { adminName, adminEmail, companyName } = response.data;
  //       setAdminInfo({ adminName, adminEmail, companyName });
  //     } else if (response.status === 404) {
  //       throw new Error(`${userRole} not found`);
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
    setLanguage: setLanguageDirectly,
    adminInfo,
  };
}