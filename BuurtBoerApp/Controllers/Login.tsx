import { useState } from 'react';
import i18next from 'i18next';
import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

export const useLoginController = () => {
  const [language, setLanguage] = useState(i18next.language);
  const [showPassword, setShowPassword] = useState(false);

  const sync_language = async () => {
    const language = await AsyncStorage.getItem('language');

    if (language) {
      setLanguage(JSON.parse(language));
      i18next.changeLanguage(JSON.parse(language));
    }
  }

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    await AsyncStorage.setItem('language', JSON.stringify(newLanguage));
  };

  const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean, t: Function) => {
    let response = await fetch('http://10.0.2.2:5000/api/employee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  
    if (!response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }
  
    let data = await response.json();


    if (!data) {
      Alert.alert(t('user_error'), t('user_error_text'));
      return;
    }
    console.log(data); 
  
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    const passwordsMatch = bcrypt.compareSync(password, data.password);
  
    if (!passwordsMatch) {
      Alert.alert(t('passowrd_incorrect_error'), t('passowrd_incorrect_error_text'));
      return;
    }
    let employeeData = data;
    let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule);
  
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(employee));
    }
  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Schedule_Form', params: { employee } }],
    });
  };

  const handleLogin2 = async (navigation: any, rememberMe: boolean) => {
    
    let employee = new Employee(1, "h", "h", "h", true);
  
    if (rememberMe) {
      await AsyncStorage.setItem('user', JSON.stringify(employee));
    }
  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Schedule_Form', params: { employee } }],
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    language,
    showPassword,
    sync_language,
    toggleLanguage,
    toggleShowPassword,
    handleLogin,
    handleLogin2,
  };
};





