import Employee from './../Models/Employee';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';

export const handleLogin = (email: string, password: string, navigation: any) => {
  const employee = loginData.users.find((u: Employee) => u.email === email && u.password === password);

  if (employee) {
    // Successful login, navigate to the next page
    navigation.navigate("Schedule", { employee: new Employee(employee.email, employee.password) });
  } else {
    // Invalid login, show an alert
    Alert.alert('Invalid Credentials', 'Please check your email and password.');
  }
};