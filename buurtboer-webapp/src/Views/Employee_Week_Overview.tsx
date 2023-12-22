import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import logo from './img/buurtboer_logo.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import postlogin from './Stylesheets/PostLogin.module.css';
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useEmpWeekOverviewController } from '../Controllers/Employee_WeekOverviewControllers';
import { useTranslation } from 'react-i18next';



type DayType = {
    day: string;
    present: boolean;
    absent: boolean;
  };

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

function Employee_Week_Overview() {
  const { t } = useTranslation();
  const{ fetchEmployees, employees } = useEmpWeekOverviewController();
  const [employeesList, setEmployeesList] = useState<Employee[]>(employees);
  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployees();
    };

    fetchData();
  }, [fetchEmployees]);

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);
  console.log("employees from employees: ", employees);
  console.log("employees from employeesList: ", employees);


    const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

    function getCurrentWeek(): string {
        const today: Date = new Date(); // Current date
        const firstDayOfYear: Date = new Date(today.getFullYear(), 0, 1); // First day of the current year
      
        const days: number = Math.floor(((today.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)) as number);
      
        const currentWeek: number = Math.ceil(((days + firstDayOfYear.getDay() + 1) / 7) as number);
        
        return `${today.getFullYear()}-W${currentWeek.toString().padStart(2, '0')}`;
      }
      

    const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeek(e.target.value);
    };
    

  const [attendance, setAttendance] = useState([
    { day: 'Monday', present: true, absent: false },
    { day: 'Tuesday', present: false, absent: true },
    { day: 'Wednesday', present: true, absent: false },
    { day: 'Thursday', present: true, absent: false },
    { day: 'Friday', present: false, absent: true },
  ]);

  //  handle checkbox change
  const handleCheckboxChange = (index: number, field: keyof DayType) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = [...prevAttendance];
      updatedAttendance[index] = {
        ...updatedAttendance[index],
        [field]: !updatedAttendance[index][field],
      };
      return updatedAttendance;
    });
  };

  return (
    <>
      <Navbar />


       {/* Week selecteren */}
       <div className={`container ${postlogin.page_container}  mt-5 p-5`}>
        <div className="d-flex justify-content-center w-100">
          <div className="row">
            <div className="col-lg-12">
                <div className="  form_items ms-5 justify-content-center p-5">
                  <h2>{t('Employee_Overview')}</h2>
                  <form action="/action_page.php">
                      <label htmlFor="week">{t('Week_select')}</label>
                      {/* <input type="week" id="week" name="week" /> */}
                      <input
                          type="week"
                          id="week"
                          name="week"
                          value={selectedWeek}
                          onChange={handleWeekChange}
                      />
                      <input type="submit" value="Submit" />
                  </form>

                  {/* Tabel voor aanwezigen (wordt later verbonden met de week die geselecteerd is) */}
                  <table className="table roundedCorners">
                      <thead>
                          <tr>
                              <th>{t('date')}</th>
                              <th>{t('present')}</th>
                              <th>{t('absent')}</th>
                          </tr>
                      </thead>
                      <tbody>
            {attendance.map((day, index) => (
              <tr key={index}>
                <td>{day.day}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={day.present}
                    onChange={() => handleCheckboxChange(index, 'present')}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={day.absent}
                    onChange={() => handleCheckboxChange(index, 'absent')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthentication(Employee_Week_Overview);
