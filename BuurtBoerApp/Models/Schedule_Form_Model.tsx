// model import
import Employee from './../Models/Employee_Model';

// model for schedule based on database columns
class Schedule 
{
  id: number;
  week: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;

  constructor(id: number, week: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean) 
  {
    this.id = id;
    this.week = week;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
  }

  // gets schedule data based on employee data from the database
  static async fetchScheduleData(Emp: Employee) : Promise<[Schedule | null, boolean]>
  {

    // calculates the weeknumber one week into the future
    const now = new Date();
    const startOfTheYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((now.getTime() - startOfTheYear.getTime()) / 86400000) + startOfTheYear.getDay() + 1) / 7) + 1;

    // emp id
    const employeeId = Emp.id;

    // connnects with api
    const response = await fetch('http://10.0.2.2:5000/api/employee/schedule', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: employeeId, week: weekNumber}),
    });

    // gives error if status is not ok
    if (!response.ok) 
    {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return [null, false];
    }

    // assigns the response to a variable
    const data = await response.json();

    // if the schedule of the next week doesn't exist yet, it will call the create schedule
    if(!data)
    {
      // calls create schedule method
      await this.createScheduleData(employeeId, weekNumber);

      // connects with api
      const response = await fetch('http://10.0.2.2:5000/api/employee/schedule', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: employeeId, week: weekNumber}),
      });
  
      // gives error if status is not ok
      if (!response.ok) 
      {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        return [null, false];
      }

      // assigns the response to a variable
      const data = await response.json();

      // returns a schedule object, with a false for the is submitted boolean
      return [new Schedule(data.schedule_id, data.week_number, data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data.sunday), false];
    }

    // else returns a true for is submitted boolean and a schedule object
    else
    {
      return [new Schedule(data.schedule_id, data.week_number, data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data.sunday), true];
    }
  };

  // creates a schedule for 1 week in the future and links with the employee
  static async createScheduleData(employeeId: number, weekNumber: number)
  {
    // connects with api
    const response = await fetch('http://10.0.2.2:5000/api/employee/schedule/create', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: employeeId, week: weekNumber}),
    });

    // gives error if status is not ok
    if (!response.ok) 
    {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return;
    }
  }

  // updates the schedule with the given booleans using the schedule id
  static async updateScheduleData(schedule_id: number, m: boolean, tu: boolean, w: boolean, th: boolean, f: boolean, sa: boolean, su: boolean)
  {
    // connects with api
    const response = await fetch('http://10.0.2.2:5000/api/employee/schedule/update', 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schedule_id, m, tu, w, th, f, sa, su }),
    });

    // gives error if status is not ok
    if (!response.ok) 
    {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return;
    }
  }
}
  
export default Schedule;