class Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  keepSchedule: boolean;
  companyName: string;
  full_schedule: boolean;

  constructor(id: number, email: string, firstName: string, lastName: string, keepSchedule: boolean, companyName: string,  full_schedule: boolean) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.keepSchedule = keepSchedule;
    this.companyName = companyName;
    this.full_schedule = full_schedule;
  }
}

export default Employee;