import { useState, useEffect } from 'react';
import i18next from 'i18next';
import axios from 'axios';

interface UserData {
  firstName: string;
}

export function SettingsController() {
  const [language, setLanguage] = useState(i18next.language);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPass, setUserPass] = useState<string | null>(null);
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

        const userData = response.data.userData;
        setUserData(userData);

        const userRole = userData.userRole;
        const userEmail = userData.email;
        const userPass = userData.password;

        setUserRole(userRole);
        setUserEmail(userEmail);
        setUserPass(userPass);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error based on your requirements
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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

  const storeLanguage = (newLanguage: string) => {
    localStorage.setItem('language', newLanguage);
  };

  const fetchAdminInfo = async () => {
    if (userRole && userEmail && userPass) {
      let apiUrl: string;

      if (userRole === 'CompanyAdmin') {
        apiUrl = 'http://localhost:5000/api/admin/singleadmin';
      } else if (userRole === 'SuperAdmin') {
        apiUrl = 'http://localhost:5000/api/SuperAdmin/singlesuperadmin';
      } else {
        throw new Error('Invalid role');
      }

      try {
        const response = await axios.get(apiUrl, { params: { userEmail, userPass } });

        if (response.status === 200) {
          const { adminName, adminEmail, companyName } = response.data;
          setAdminInfo({ adminName, adminEmail, companyName });
          console.log(adminName);
          console.log(adminEmail);
          console.log(companyName);
        } else if (response.status === 404) {
          throw new Error(`${userRole} not found`);
        } else {
          throw new Error('Unexpected error');
        }
      } catch (error) {
        console.error('Error fetching admin information:', error);
        // Handle error based on your requirements
      }
    }
  };

  useEffect(() => {
    fetchAdminInfo();
  }, [userRole, userEmail, userPass]);

  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageDirectly,
    adminInfo,
  };
}
