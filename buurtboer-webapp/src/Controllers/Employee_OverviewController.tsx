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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const getAttendance = async () => {
      const form = event.currentTarget;
      const week_number = form.week.value;
      const comp_id = 1;

      try {
        let response = await axios.post('http://localhost:5000/api/employees/attendance', {
          comp_id,
          week_number
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log("binkybonky")

        if (response.data) {
          console.log(response.data);
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const data = await getAttendance();
    console.log(data);
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