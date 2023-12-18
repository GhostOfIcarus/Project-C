import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

export interface UserData{
    userId: any;
    firstName: string;
    lastName: string;
    email: string;
  }

export function useEmployeesOverviewController() {
    const [employees, setEmployees] = useState([]);
    // const comp_id = 1; // You can replace this with the appropriate comp_id value
    const [userdata, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            });
            // console.log("Response data: ", response.data);
            const userData = response.data.userData;
            // console.log(userData.firstName);
            setUserData(userData);
        } catch (error) {
            // Handle error
        }
        };

        fetchData();
    }, []);

    // Fetch employees when the component mounts
    const fetchEmployees = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/employee/company', {
                company_id: userdata?.userId
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response:', response);
            console.log(userdata?.userId);
    
            if (response.data && response.data.length > 0) {
                console.log(response.data);
                const employeesData = response.data.map((employee: { id: any; first_name: any; last_name: any; }) => ({
                    id: employee.id,
                    first_name: employee.first_name,
                    last_name: employee.last_name
                  }));
                setEmployees(employeesData);
                console.log('Employees:', response.data);
                console.log('First name:', response.data[0].first_name);
            }
            else{
                console.log("wahwah")
            }
        } catch (error) {
            console.log('Error:', error);
        }
        
    };


    return {
        fetchEmployees,
        employees
    };
}
