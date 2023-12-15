class Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  keepSchedule: boolean;
  companyName: string;

  constructor(id: number, email: string, firstName: string, lastName: string, keepSchedule: boolean, companyName: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.keepSchedule = keepSchedule;
    this.companyName = companyName;
  }
}

export default Employee;