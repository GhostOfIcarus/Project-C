import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';

interface User {
  email: string;
  password: string;
}

export const handleLogin = (email: string, password: string, navigation: any) => {
  const user = loginData.users.find((u: User) => u.email === email && u.password === password);

  if (user) {
    // Successful login, navigate to the next page
    navigation.navigate("Schedule", { user });
  } else {
    // Invalid login, show an alert
    Alert.alert('Invalid Credentials', 'Please check your email and password.');
  }
};