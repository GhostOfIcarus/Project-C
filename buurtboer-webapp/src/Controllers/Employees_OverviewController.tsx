import { useState, useEffect } from 'react';
import axios from 'axios';

interface Employee {
    id: number;
    first_name: string;
    // Add other properties as needed
}

export function useEmployeesOverviewController() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const comp_id = 1; // You can replace this with the appropriate comp_id value

    useEffect(() => {
        // Fetch employees when the component mounts
        const fetchEmployees = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/employee/company', {
                    comp_id: 1
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                console.log('Response:', response.data);
        
                if (response.data && response.data.length > 0) {
                    setEmployees(response.data);
                    console.log('Employees:', response.data);
                    console.log('First Name:', response.data[0].first_name);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };
        

        fetchEmployees();
    }, [comp_id]); // Include comp_id in the dependency array to re-fetch when it changes



    return {
        employees
    };
}
