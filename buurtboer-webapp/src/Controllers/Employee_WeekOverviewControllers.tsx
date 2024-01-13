import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

export interface UserData {
  userId: any;
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
}

export interface ScheduleData {
  id: number;
  week_number: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export function useEmployeeWeekOverviewController() {
  const [employees, setEmployees] = useState([]);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const userData = response.data.userData;
        await setUserData(userData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    if (userdata) {
      fetchEmployees();
    }
  }, [userdata]);

  useEffect(() => {
    // console.log("Employees state updated:", employees);
  }, [employees]); // Log whenever the employees state changes

  const fetchEmployees = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/employee/company',
        {
          company_id: userdata?.userId,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('companyID: ', userdata?.userId);

      if (response.data && response.data.length > 0) {
        const employeesData = response.data.map((employee: any) => ({
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
        }));
        await setEmployees(employeesData);
      } else {
        console.log('No employees found');
      }
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, id: string) => {
    
    const fetchSchedule = async (elements: FormEvent<HTMLFormElement>) => {
      elements.preventDefault();
      const form = event.currentTarget;
      const wn = form.elements.namedItem('week') as HTMLInputElement;
      const week = wn.value.split('-')[1].substring(1);

      try {
        await fetchEmployees();
        let response = await axios.post('http://localhost:5000/api/employee/schedule', {
          id,
          week
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        

        console.log("binkybonky")

        if (response.data) {
            const scheduleData = response.data;
            setSchedule(scheduleData);
            return response.data;
        }

        else
        {
            setSchedule(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const data = await fetchSchedule(event);
    
  };


  return {
    fetchEmployees,
    employees,
    handleSubmit,
    schedule,
  };
}
