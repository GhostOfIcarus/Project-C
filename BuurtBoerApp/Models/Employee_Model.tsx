class Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  keepSchedule: boolean;

  constructor(id: number, email: string, firstName: string, lastName: string, keepSchedule: boolean) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.keepSchedule = keepSchedule;
  }
}

export default Employee;