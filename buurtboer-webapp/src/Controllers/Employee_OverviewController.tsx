import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

export interface AttendanceData {
  day: string;
  value: any;
}

export function useEmpOverviewController() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [countMonday, setCountMonday] = useState<number>(0);
  const [countTuesday, setCountTuesday] = useState<number>(0);
  const [countWednesday, setCountWednesday] = useState<number>(0);
  const [countThursday, setCountThursday] = useState<number>(0);
  const [countFriday, setCountFriday] = useState<number>(0);
  const [absentMonday, setabsentMonday] = useState<number>(0);
  const [absentTuesday, setabsentTuesday] = useState<number>(0);
  const [absentWednesday, setabsentWednesday] = useState<number>(0);
  const [absentThursday, setabsentThursday] = useState<number>(0);
  const [absentFriday, setabsentFriday] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<number>(49);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    const getAttendance = async (elements: FormEvent<HTMLFormElement>) => {
      elements.preventDefault();
      const form = event.currentTarget;
      const wn = form.elements.namedItem('week') as HTMLInputElement;
      const week_number = wn.value.split('-')[1].substring(1);
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
          // console.log(response.data);
          setSelectedWeek(50);
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const data = await getAttendance(event);
    await setCountMonday(data.monday_true);
    await setCountTuesday(data.tuesday_true);
    await setCountWednesday(data.wednesday_true);
    await setCountThursday(data.thursday_true);
    await setCountFriday(data.friday_true);
    await setabsentMonday(data.monday_false);
    await setabsentTuesday(data.tuesday_false);
    await setabsentWednesday(data.wednesday_false);
    await setabsentThursday(data.thursday_false);
    await setabsentFriday(data.friday_false);
    // await setCountSaturday(data.saturday_true);
    // await setCountSunday(data.sunday_true);
    
    console.log(countMonday);
  };

  return {
    isSubmitted,
    handleSubmit,
    countMonday,
    countTuesday,
    countWednesday,
    countThursday,
    countFriday,
    absentMonday,
    absentTuesday,
    absentWednesday,
    absentThursday,
    absentFriday,
    attendanceData,
    selectedWeek
  };
}