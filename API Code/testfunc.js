const axios = require('axios');

async function test1() {
    const comp_id = 1;
    const first_name = 'John';
    const last_name = 'Doe';
    const email = 'test@test.com';
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
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
}

async function test2() {
    const employee_id = 3;
    try {
        const response = await axios({
            method: 'delete',
            url: 'http://localhost:5000/api/employee/delete',
            data: {
                employee_id
            },
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data) {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}

async function test3() {
  const company_name = 'epic';
  const first_name = 'John';
  const last_name = 'Doe';
  const email = 'help@test.com';
  try {
      const response = await axios.post('http://localhost:5000/api/company/add', {
        first_name, 
        last_name, 
        email, 
        company_name
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
}

async function test4() {
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
          console.log(response.data);
      }
  } catch (error) {
      console.log(error);
  }
}

async function test5() {
  const company_id = 1;
  try {
      const response = await axios.post('http://localhost:5000/api/employee/company', {
        company_id
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
}
// test3();
test1();
// test5();