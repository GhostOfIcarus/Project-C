import Employee from './../Models/Employee';
import loginData from './../Models/loginData.json';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { getSingleEmployeeData } = require('./../../API Code/API-Functions');

export const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean) => {
  let response = await fetch('http://10.0.2.2:5000/api/employee/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: password,
  }),
});

if (!response.ok) {
  Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
  return;
}

let data = await response.json();
console.log(data); // inspect the response

if (data.error) {
  Alert.alert('Error', data.error);
  return;
}

let employeeData = data;
if (!employeeData) {
  Alert.alert('Error', 'Employee data not found in the response');
  return;
}

let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule);

  if (rememberMe) {
    await AsyncStorage.setItem('user', JSON.stringify(employee));
  }

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