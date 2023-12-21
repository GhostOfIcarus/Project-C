import Employee from '../Models/Employee_Model';
import { Alert, LogBox } from 'react-native';


class ActivateAccountController {
    static ActivationCodeCheck = async (email: string, activation_key: string, t: Function, navigation: any) => {
        console.log(email, activation_key);
        // Check if the entered email exists in the JSON file
        let response = await fetch('http://10.0.2.2:5000/api/employee/activate/code', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                activation_key: activation_key,
            }),
        });
        // Check if the response is ok
        if (!response.ok) {
            Alert.alert('Error', `HTTP ${response.status}: Invalid activation key`);
            return;
        }
        // Get the data from the response
        let data = await response.json();
        if (!data) {
            // commented for now but is security risk
            Alert.alert("code verkeerd");
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
            // Email exists, navigate to the ChangePassword screen with user data
            navigation.navigate("CreateAccount", { employee });
        } else {
            return;
        }
    }
}

export default ActivateAccountController;