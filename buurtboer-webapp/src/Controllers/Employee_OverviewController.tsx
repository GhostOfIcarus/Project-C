// doesn't work yet
import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

export interface AttendanceData {
  day: string;
  value: any;
}

export function useEmpOverviewController() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [countMonday, setCountMonday] = useState<number>(0);
  const [countTuesday, setCountTuesday] = useState<number>(0);
  const [countWednesday, setCountWednesday] = useState<number>(0);
  const [countThursday, setCountThursday] = useState<number>(0);
  const [countFriday, setCountFriday] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<string>(''); // State to store the selected week


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const week_number = form.week.value || 49;

    const getAttendance = async (weekNumber: number) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/attendance?weekNumber=${weekNumber}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    const fetchAndLogAttendance = async (weekNumber: number) => {
        try {
          const results = await getAttendance(weekNumber);
      
          if (results && results.rows) {
            setAttendanceData(results.rows);
      
            // Use the functional form of state updates
            results.rows.forEach((row: AttendanceData) => {
              switch (row.day.toLowerCase()) {
                case 'monday':
                  setCountMonday(prevCount => prevCount + 1);
                  break;
                case 'tuesday':
                  setCountTuesday(prevCount => prevCount + 1);
                  break;
                case 'wednesday':
                setCountWednesday(prevCount => prevCount + 1);
                    break;
                case 'thursday':
                setCountThursday(prevCount => prevCount + 1);
                    break;
                case 'friday':
                  setCountFriday(prevCount => prevCount + 1);
                  break;
                // Add more cases for other days as needed
                default:
                  break;
              }
            });
          } else {
            console.log("No results or rows found.");
          }
        } catch (error) {
          console.error(error);
        }
      };

    try {
      const results = await getAttendance(Number(week_number));

      if (results) {
        console.log(results);
        setIsSubmitted(true);
        await fetchAndLogAttendance(Number(week_number));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
    }
  };

  return {
    isSubmitted,
    isAdded,
    handleSubmit,
    countMonday,
    countTuesday,
    countWednesday,
    countThursday,
    countFriday,
    attendanceData,
  };
}
