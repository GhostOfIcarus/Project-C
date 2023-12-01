import scheduleData from './../Models/scheduleData.json';

class Schedule 
{

    week: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  
    constructor(week: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean) 
    {
      this.week = week;
      this.monday = monday;
      this.tuesday = tuesday;
      this.wednesday = wednesday;
      this.thursday = thursday;
      this.friday = friday;
      this.saturday = saturday;
      this.sunday = sunday;
    }

    static loadSchedule()
    {
      let schedule = new Schedule (scheduleData.schedules[0].week, scheduleData.schedules[0].monday, scheduleData.schedules[0].tuesday, scheduleData.schedules[0].wednesday, scheduleData.schedules[0].thursday, scheduleData.schedules[0].friday, scheduleData.schedules[0].saturday, scheduleData.schedules[0].sunday);
      return schedule;
    }
    
}
  
export default Schedule;