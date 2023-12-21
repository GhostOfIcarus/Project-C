import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';

class EmailCheckController {
  static handleEmailSend = async (email: string, navigation: any, t: Function, page_key: string) => {
    // Check if the email is valid
    if (!email.includes("@")) {
      Alert.alert(t('invalid_email_error'), t('invalid_email_error_text'));
      return;
    }
    // Check if the entered email exists in the JSON file
    let response = await fetch('http://10.0.2.2:5000/api/employee/email_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    // Check if the response is ok
    if (!response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }

    // Get the data from the response
    let data = await response.json();
    if (!data) {
      // commented for now but is security risk
      // Alert.alert(t('email_error'), t('email_error_text'));
      return;
    }
    console.log(data); 

    // Check if the data contains the employee data
    let employeeData = data;
    if (!employeeData) {
      Alert.alert('Error', 'Employee data not found in the response');
      return;
    }
    
    // Create an employee object
    let employee = new Employee(employeeData.id, employeeData.email, employeeData.first_name, employeeData.last_name, employeeData.keepschedule, employeeData.company_name);
    if (employee) {
      console.log(employee);
      // Email exists, navigate to the ChangePassword screen with user data
      navigation.navigate("ActivationCodeScreen", { employee, page_key });
    } else {
      // Email doesn't exist, show an alert

      // commented for now but is security risk
      // Alert.alert(t('email_error'), t('email_error_text'));
    }
  };
}

export default EmailCheckController;