import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Employee from './../Models/Employee';

export const handleLogin = async (email: string, password: string, navigation: any, rememberMe: boolean) => {
  let employee: Employee | null = null;

  try {
    const response = await axios.post('http://10.0.2.2:5000/api/employee/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const employeeData = response.data;
    if (employeeData) {
      employee = new Employee(employeeData.name, employeeData.email + 2); // Replace with actual properties
    }
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }

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
    routes: [{ name: 'Schedule_Form', params: { employee } }],
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