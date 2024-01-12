
// model for employee based on database columns
class Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  keepSchedule: boolean;
  companyName: string;
  isFullSchedule: boolean;

  constructor(id: number, email: string, firstName: string, lastName: string, keepSchedule: boolean, companyName: string,  isFullSchedule: boolean) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.keepSchedule = keepSchedule;
    this.companyName = companyName;
    this.isFullSchedule = isFullSchedule;
  }
}

export default Employee;