import Employee from './../Models/Employee_Model';


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

    static async fetchScheduleData(Emp: Employee)
    {

      const now = new Date();
      const startOfTheYear = new Date(now.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((now.getTime() - startOfTheYear.getTime()) / 86400000) + startOfTheYear.getDay() + 1) / 7);

      const employeeId = Emp.id;
      const response = await fetch('http://10.0.2.2:5000/api/employee/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: employeeId, week: weekNumber}),
      });
  
      if (!response.ok) {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        return;
      }
  
      const data = await response.json();

      if(!data)
      {
        this.createScheduleData(Emp);
        this.fetchScheduleData(Emp);
      }
      else
      {
        console.log(data);
        return new Schedule(data.id, data.week_number, data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data. sunday);
      }

    };

    static async createScheduleData(Emp: Employee)
    {
      const now = new Date();
      const startOfTheYear = new Date(now.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((now.getTime() - startOfTheYear.getTime()) / 86400000) + startOfTheYear.getDay() + 1) / 7);

      const employeeId = Emp.id;
      const response = await fetch('http://10.0.2.2:5000/api/employee/schedule/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: employeeId, week: weekNumber}),
      });

      
      if (!response.ok) {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);
    }

    static async updateScheduleData(Emp: Employee, m: boolean, tu: boolean, w: boolean, th: boolean, f: boolean, sa: boolean, su: boolean)
    {
      const sched = await this.fetchScheduleData(Emp);
      const schedId = sched?.id;

      const response = await fetch('http://10.0.2.2:5000/api/employee/schedule/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedId, m, tu, w, th, f, sa, su }),
      });

      if (!response.ok) {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);
    }

}
  
export default Schedule;