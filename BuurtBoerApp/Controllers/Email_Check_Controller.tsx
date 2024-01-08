import Employee from '../Models/Employee_Model';
import { Alert } from 'react-native';

class EmailCheckController {
  static handleEmailSend = async (email: string, navigation: any, t: Function, page_key: string) => {
    let need_to_be_activated: boolean;
    if (page_key == "change_password") {
      need_to_be_activated = true;
    } 
    else{
      need_to_be_activated = false;
    }
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
        activated: need_to_be_activated,
      }),
    });
    // Check if the response is ok
    if (!response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: ${response.statusText}`);
      return;
    }

    // Get the data from the response
    let data = await response.json();
    console.log(data.userData);
    console.log(data.activation_key);
    if (!data.userData) {
      // commented for now but is security risk
      if (page_key == "change_password") {
        Alert.alert("Error", "Activate your account first");
      }
      else{
        Alert.alert("Error", "Your account already has been activated");
      }
      return;
    }
    console.log(data); 

    // Check if the data contains the employee data
    let employeeData = data.userData;
    if (!employeeData) {
      Alert.alert('Error', 'Employee data not found in the response');
      return;
    }
    let email_response = await fetch('http://10.0.2.2:5001/sendEmail/activaionkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: "joeridekker2002@gmail.com",
        activationKey: data.activation_key,
      }),
    });

    console.log(email_response);
    if (!email_response.ok) {
      Alert.alert('Error', `HTTP ${response.status}: "Email not send"`);
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