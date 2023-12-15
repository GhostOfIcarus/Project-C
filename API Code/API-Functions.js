const Pool = require('pg').Pool;

const pool = new Pool({ 
	user: 'postgres',
	host: 'localhost',
	database: 'BuurtBoer',
	port: 5432
});

const createNewCompany = async (first_name, last_name, email, company_name) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`INSERT INTO company (admin_first_name, admin_last_name, company_name, full_schedule, email, password )  
										VALUES ($1, $2, $3, false, $4, 'password') 
										RETURNING id`, [first_name, last_name, email, company_name]);
		if (results.rowCount > 0) 
		{	
			console.log('Insert successful');
			return true;
		} 
	} catch (error) {
		console.error(error);
		console.error('Error in getting company data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); 
	}
};

const deleteCompany = async (company_id) => {
    const db = await pool.connect();
    try {
        // First, get the ids of the employees associated with the company
        const employeeIds = await db.query(`SELECT employee_id FROM employeesincompany WHERE company_id = $1`, [company_id]);

        // Then, delete the schedules associated with these employees
        const scheduleResult = await db.query(`DELETE FROM schedulefromemployee WHERE employee_id = ANY($1)`, [employeeIds.rows.map(row => row.employee_id)]);

        // Next, delete the associations of these employees with the company
        const empincompResult = await db.query(`DELETE FROM employeesincompany WHERE company_id = $1`, [company_id]);

        // Then, delete the employees
        const employeeResult = await db.query(`DELETE FROM employee WHERE id = ANY($1)`, [employeeIds.rows.map(row => row.employee_id)]);
        
        // Finally, delete the company
        const companyResult = await db.query(`DELETE FROM company WHERE id = $1`, [company_id]);

        if (scheduleResult.rowCount > 0 || empincompResult.rowCount > 0 || employeeResult.rowCount > 0 || companyResult.rowCount > 0) {
            console.log('Delete successful');
            return true;
        } else {
            console.log('No rows were deleted');
            return false;
        }
    } catch (error) {
        console.error('Error in deleting user data:', error);
        throw new Error("Internal error");
    } finally {
        db.release(); 
    }
};

const createNewEmployee = async (comp_id, first_name, last_name, email) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`INSERT INTO employee (first_name, last_name, email, password, keepschedule) 
										VALUES ($1, $2, $3, 'password', false) 
										RETURNING id`, [first_name, last_name, email]);
		if (results.rowCount > 0) 
		{	
			const results2 = await db.query(`
											INSERT INTO employeesincompany (employee_id, company_id)
											VALUES ($1, $2);
										`, [results.rows[0].id, comp_id]);
			if (results2.rowCount > 0) 
			{	
				console.log('Insert successful');
				return true;
			}
		} 
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); 
	}
};

const deleteEmployee = async (employee_id) => {
    const db = await pool.connect();
    try {
        const results = await db.query(`DELETE FROM employeesincompany WHERE employee_id = $1`, [employee_id]);
		console.log('Results from employeesincompany deletion:', results);
        if (results.rowCount > 0 ) {
			const results2 = await db.query(`DELETE FROM employee WHERE id = $1`, [employee_id]);
			if (results2.rowCount > 0 ) {
            	console.log('Delete successful');
            	return true;
        	} else {
				console.log('No rows were deleted2');
				return false;
        	}
	 	}
		else {
			console.log('No rows were deleted');
			return false;
		}
    } catch (error) {
        console.error('Error in deleting user data:', error);
        throw new Error("Internal error");
    } finally {
        db.release(); 
    }
};

// Functions to fetch data from the database
const getAllEmployeeData = async () => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT * FROM employee");
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const getAllCompanies = async () => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT id, company_name FROM company");
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const getAllEmployeeDataByCompany = async (company_id) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`SELECT * 
										FROM employee 
										JOIN employeesincompany ON employeesincompany.employee_id = employee.id
										WHERE company_id = $1`, [company_id]);
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const getEmployeeSchedule = async (employeeId, week) => {
	const db = await pool.connect();
	try {
	  const results = await db.query(`
									  SELECT *
	                                  FROM schedule
									  JOIN schedulefromemployee ON schedulefromemployee.schedule_id = schedule.id
									  WHERE schedulefromemployee.employee_id = $1 AND schedule.week_number = $2
									`, [employeeId, week]);

	if (results.rowCount === 0) {
		console.error('No schedule found with this Id:', employeeId);
		return false;
	}
	else{
		return results.rows[0];
	}
	  
	} catch (error) {
	  console.error(error);
	  console.error('Error in getting user data:', error);
	  throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
  }

const createEmployeeSchedule = async (employeeId, week) => {
	const db = await pool.connect();
	try {
	  const results = await db.query(`
										INSERT INTO schedule (week_number, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
										VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
										RETURNING id;
									`, [week, false, false, false, false, false, false, false]);
	  
	if (results.rowCount > 0) 
	{	
		const results2 = await db.query(`
										INSERT INTO ScheduleFromEmployee (schedule_id, employee_id)
										VALUES ($1, $2);
									`, [results.rows[0].id, employeeId]);
		if (results2.rowCount > 0) 
		{	
			console.log('Insert successful');
			return true;
		}
	} 
	else 
	{
		console.log('Insert failed');
		return false;
	}

	} catch (error) 
	{
	  console.error(error);
	  console.error('Error in getting user data:', error);
	  throw new Error("Internal error wah wah");
	}finally {
		db.release(); // Release the connection back to the pool
	  }
  }

const updateEmployeeSchedule = async (schedule_id,  m, tu, w, th, f, sa, su) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`UPDATE schedule SET monday = $2, tuesday = $3, wednesday = $4, thursday = $5, friday = $6, saturday = $7, sunday = $8
										WHERE id = $1 RETURNING *`, [schedule_id, m, tu, w, th, f, sa, su]);
	
		if (results.rowCount === 0) {
		  console.error('No schedule found with this Id:', schedule_id);
		  return false;
		}
	
		return true;
	  } catch (error) {
		console.error(error);
		console.error('Error in updating schedule:', error);
		throw new Error("Internal error wah wah");
	  } finally {
		db.release(); // Release the connection back to the pool
	  }
	};

const getSingleEmployeeData = async (email, password) => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT * FROM employee WHERE email = $1 AND password = $2", [email, password]);
		if (results.rowCount === 0) {
			return false;
		  }
		return results.rows[0];
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const getSingleEmployeeByEmailData = async (email) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`
										SELECT employee.*, company.Company_Name 
										FROM employee 
										INNER JOIN EmployeesInCompany ON employee.ID = EmployeesInCompany.Employee_ID
										INNER JOIN Company ON EmployeesInCompany.Company_ID = Company.ID
										WHERE employee.email = $1
									   `, [email]);
		if (results.rowCount === 0) {
			return false;
		  }
		return results.rows[0];
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const ChangePasswordEmployee = async (newPassword, email) => {
	const db = await pool.connect();
	try {
	  const results = await db.query("UPDATE employee SET password = $1 WHERE email = $2 RETURNING *", [newPassword, email]);
  
	  if (results.rowCount === 0) {
		// No rows were updated, which means the email was not found in the database
		console.error('No user found with this email:', email);
		return false;
	  }
  
	  return true;
	} catch (error) {
	  console.error(error);
	  console.error('Error in updating user password:', error);
	  throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
  };

const getSingleCompanyAdminData = async (email, password) => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT * FROM company WHERE email = $1 AND password = $2", [email, password]);
		return results.rows[0];
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

const getSingleSuperAdminData = async (email, password) => {
	try {
		const db = await pool.connect();

		const results = await db.query("SELECT * FROM superadmin WHERE email = $1 AND password = $2", [email, password]);
		return results.rows[0];
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
}

const getAttendance = async (comp_id, week_number) => {
    try {
      const db = await pool.connect();
      const results = await db.query(`
      SELECT 
        S.week_Number, 
        SUM(CASE WHEN S.monday THEN 1 ELSE 0 END) AS Monday_True,
        SUM(CASE WHEN NOT S.monday THEN 1 ELSE 0 END) AS Monday_False,
        SUM(CASE WHEN S.tuesday THEN 1 ELSE 0 END) AS Tuesday_True,
        SUM(CASE WHEN NOT S.tuesday THEN 1 ELSE 0 END) AS Tuesday_False,
        SUM(CASE WHEN S.wednesday THEN 1 ELSE 0 END) AS Wednesday_True,
        SUM(CASE WHEN NOT S.wednesday THEN 1 ELSE 0 END) AS Wednesday_False,
        SUM(CASE WHEN S.thursday THEN 1 ELSE 0 END) AS Thursday_True,
        SUM(CASE WHEN NOT S.thursday THEN 1 ELSE 0 END) AS Thursday_False,
        SUM(CASE WHEN S.friday THEN 1 ELSE 0 END) AS Friday_True,
        SUM(CASE WHEN NOT S.friday THEN 1 ELSE 0 END) AS Friday_False,
        SUM(CASE WHEN S.saturday THEN 1 ELSE 0 END) AS Saturday_True,
        SUM(CASE WHEN NOT S.saturday THEN 1 ELSE 0 END) AS Saturday_False,
        SUM(CASE WHEN S.sunday THEN 1 ELSE 0 END) AS Sunday_True,
        SUM(CASE WHEN NOT S.sunday THEN 1 ELSE 0 END) AS Sunday_False
      FROM employeesincompany AS EC
      JOIN employee AS E ON EC.employee_id = E.id
      JOIN schedulefromemployee AS SE ON E.ID = SE.employee_id
      JOIN schedule AS S ON SE.schedule_id = S.ID
      WHERE EC.company_id = $1 AND S.week_number = $2
      GROUP BY S.week_Number
    `, [comp_id, week_number]);
      db.release(); // Don't forget to release the connection
      return results.rows[0]; // Return the entire results object
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching attendance data.");
    }
  }
  
//   const fetchData = async () => {
// 	try {
// 	  const results = await getAttendance(49);
	  
// 	  if (results && results.rows) {
// 		results.rows.forEach(row => {
// 		  console.log("Monday", row.monday);
// 		  console.log("Tuesday:", row.tuesday);
// 		  // Add more properties as needed
// 		});
// 	  } else {
// 		console.log("No results or rows found.");
// 	  }
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   };


//   fetchData();


module.exports = {
	createNewCompany,
	deleteCompany,
	createNewEmployee,
	deleteEmployee,
	getAllEmployeeData,	
	getAllCompanies,
	getAllEmployeeDataByCompany,
	getSingleEmployeeData,
	getSingleEmployeeByEmailData,
	getSingleCompanyAdminData,
	getSingleSuperAdminData,
	ChangePasswordEmployee,	
	getEmployeeSchedule,
	createEmployeeSchedule,
	updateEmployeeSchedule,
	getAttendance,
	pool
};
