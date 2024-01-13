const axios = require('axios');

async function AddEmployeeTest(email_input) {
    const comp_id = 1;
    const first_name = 'John';
    const last_name = 'Doe';
    const email = email_input;
    try {
        const response = await axios.post('http://localhost:5000/api/employee/add', {
            comp_id, 
            first_name, 
            last_name, 
            email
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          console.log("AddEmployeeTest Test result: " + response.data);
        }
      } catch (error) {
        console.log(error);
      }
}

async function RegisterCompanyTest() {
  const admin_first_name = "John"
  const admin_last_name = "Doe"
  const company_name = "Test Company"
  const full_schedule = true
  const email = "test@test.com"
  const password = "test"
  
  try {
      const response = await axios.post('http://localhost:5000/api/admin/registerAdmin', {
        admin_first_name, 
        admin_last_name, 
        company_name, 
        full_schedule, 
        email, 
        password 
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log("RegisterCompanyTest Test result: " + true);
      }
    } catch (error) {
      console.log(error);
    }
}

async function DeleteCompanyTest() {
  const company_id = 2;
  try {
      const response = await axios({
          method: 'delete',
          url: 'http://localhost:5000/api/company/delete',
          data: {
            company_id
          },
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.data) {
          console.log( "DeleteCompanyTest Test result: " + response.data);
      }
  } catch (error) {
      console.log(error);
  }
}

async function CreateEmployeeSchedule() {
  const id = 1;
  const week = 2;
  try {
      const response = await axios.post('http://localhost:5000/api/employee/schedule/create', {
        id,
        week
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log("CreateEmployeeSchedule Test result: " + true);
      }
    } catch (error) {
      console.log(error);
    }
}

async function EditEmployeeSchedule() {
  const schedule_id = 8;
  const m = true;
  const tu = false;
  const w = true;
  const th = false;
  const f = true;
  const sa = false;
  const su = true;
  try {
      const response = await axios.put('http://localhost:5000/api/employee/schedule/update', {
        schedule_id, m, tu, w, th, f, sa, su
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log("EditEmployeeSchedule Test result: " + true);
      }
    } catch (error) {
      console.log(error);
    }
}

async function runTests() {
  await AddEmployeeTest("test@test.com");
  await new Promise(resolve => setTimeout(resolve, 1000));

  await AddEmployeeTest("test2@test.com");
  await new Promise(resolve => setTimeout(resolve, 1000));

  await CreateEmployeeSchedule();
  await new Promise(resolve => setTimeout(resolve, 1000));

  await EditEmployeeSchedule();
  await new Promise(resolve => setTimeout(resolve, 1000));

  await RegisterCompanyTest();
  await new Promise(resolve => setTimeout(resolve, 1000));

  await DeleteCompanyTest();
  await new Promise(resolve => setTimeout(resolve, 1000));

}

runTests();

