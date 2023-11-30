import Employee from './../Models/Employee';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean) => {
  let employee = loginData.users.find((u: Employee) => u.email === email && u.password === password);

  if (!employee) {
    // If employee is null, create a new Employee instance
    employee = new Employee('failed', 'test');
  }

  // If the "Remember Me" switch is on, store the user's data in AsyncStorage
  if (rememberMe) {
    await AsyncStorage.setItem('user', JSON.stringify(employee));
  }

  // Reset the navigation stack
  navigation.reset({
    index: 0,
    routes: [{ name: 'Schedule', params: { employee } }],
  });
};

// export const handleLogin = (email: string, password: string, navigation: any) => {
//   const employee = loginData.users.find((u: Employee) => u.email === email && u.password === password);

//   if (!employee) {
//     // If employee is null, create a new Employee instance
//     const employee = new Employee('failed', 'test');

//     if (employee) {
//       // Successful login, reset the navigation stack
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Schedule', params: { employee: new Employee(employee.email, employee.password) } }],
//       });
//     } else {
//       // Invalid login, show an alert
//       Alert.alert('Invalid Credentials', 'Please check your email and password.');
//     }
//   }

  
// };