const { Console } = require('console');
const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool;
const { hashPassword, comparePasswords } = require('./Pass-Encryption');
const bcrypt = require('bcrypt');


const pool = new Pool({ 
	user: 'postgres',
	host: 'localhost',
	database: 'BuurtBoer',
	port: 5432
});

const createNewCompany = async (admin_first_name, admin_last_name, company_name, full_schedule, email, password) => {
	const db = await pool.connect();
	try {
		const hashedPassword = await hashPassword(password);
	
		const results = await db.query(`
		  INSERT INTO company (admin_first_name, admin_last_name, company_name, full_schedule, email, password )  
		  VALUES ($1, $2, $3, $4, $5, $6) 
		  RETURNING id`, [admin_first_name, admin_last_name, company_name, full_schedule, email, hashedPassword]);
	
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

const createNewEmployee = async (comp_id, first_name, last_name, email, activation_key) => {
	const db = await pool.connect();
	try {
		const results = await db.query(`INSERT INTO employee (first_name, last_name, email, password, keepschedule, activated) 
										VALUES ($1, $2, $3, 'password', false, false) 
										RETURNING id`, [first_name, last_name, email]);
		if (results.rowCount > 0) 
		{	
			const results2 = await db.query(`
											INSERT INTO employeesincompany (employee_id, company_id)
											VALUES ($1, $2);
											`, [results.rows[0].id, comp_id]);

			const resultAddKey = await db.query(`
											INSERT INTO activationkeys (employee_id, key)
											VALUES ($1, $2);
											`, [results.rows[0].id, activation_key]);
			if (results2.rowCount > 0 && resultAddKey.rowCount > 0) 
			{	
				console.log('Insert successful');
				// console.log("Key: ", resultAddKey.rows[0].key);
				// return resultAddKey.rows[0].key;
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
        const scheduleResult = await db.query(`DELETE FROM schedulefromemployee WHERE employee_id = $1`,[employee_id]);
        const results = await db.query(`DELETE FROM employeesincompany WHERE employee_id = $1`, [employee_id]);
        const results2 = await db.query(`DELETE FROM employee WHERE id = $1`, [employee_id]);
        if (scheduleResult.rowCount > 0 || results.rowCount > 0 || results2.rowCount > 0) {
            console.log('Delete successful');
            return true;
        }
        console.log('Delete ERROR');
        return false
        
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

const getActivationKey = async (email, activation_key) => {
	const db = await pool.connect();
	try {
		const resultEmailFound = await db.query(`SELECT *
												 FROM employee 
												 WHERE email = $1`, [email]);
		
		if (resultEmailFound.rowCount > 0) {
			const resultKeyFound = await db.query(`SELECT * 
											   	   FROM activationkeys 
											       WHERE employee_id = $1
												   ORDER BY id DESC`, [resultEmailFound.rows[0].id]);
			if (resultKeyFound.rowCount > 0) {
				let key = resultKeyFound.rows[0].key;
				let decodedKey = jwt.verify(key, 'thisisaverysecretkeyspongebob');
				if (decodedKey.activation_key.toString() === activation_key) {
					return resultEmailFound.rows[0];
				}
				else {
					console.error('No key found with this key:', activation_key);
					return false;
				}
			}
			else {
				console.error('No key found with this key:', activation_key);
				return false;
			}
		}
		return false;
		
	} catch (error) {
		console.error('Error in getting activation key:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); // Release the connection back to the pool
	  }
};

const deleteActivationKey = async (employee_id) => {
	const db = await pool.connect();
	try {
		const resultKeyDeletion = await db.query(`DELETE
												 FROM activationkeys 
												 WHERE employee_id = $1`, [employee_id]);

		if (resultKeyDeletion.rowCount > 0) {
			return true;
		}
		return false;
		
	} catch (error) {
		console.error('Error in getting deleting key:', error);
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
		console.log(results.rows);
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
										RETURNING *;
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
			return results.rows[0];
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

const updateEmployeeRememberSchedule = async (employee_id, keep_schedule) => {
	const db = await pool.connect();

	try {
		const results = await db.query(`UPDATE employee SET keepschedule = $2
										WHERE id = $1 RETURNING *`, [employee_id, keep_schedule]);
	
		if (results.rowCount === 0) {
		  console.error('No employee found with this Id:', employee_id);
		  return false;
		}
	
		return true;
	  } catch (error) {
		console.error(error);
		console.error('Error in updating employee:', error);
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

const addKeyByEmployeeMail = async (email, activated, activation_key) => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT * FROM employee WHERE email = $1 AND activated = $2", [email, activated]);
		if (results.rowCount > 0) 
		{	
			const resultAddKey = await db.query(`
											INSERT INTO activationkeys (employee_id, key)
											VALUES ($1, $2);
											`, [results.rows[0].id, activation_key]);
			if (resultAddKey.rowCount > 0) 
			{	
				console.log('Code created');
				return results.rows[0];
			}
		}
		return false;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	} finally {
		db.release(); 
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
		const results = await db.query("SELECT * FROM company WHERE email = $1", [email]);
		
		if (results.rowCount === 0) {
			return false;
		}

		const storedHashedPassword = results.rows[0].password;

		// Compare the entered password with the stored hashed password
		const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

		if (passwordMatch) {
			return results.rows[0];
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

const getSingleCompanyAdminDataByEmail = async (email) => {
	const db = await pool.connect();
	console.log("email2:", email)
	try {
		const results = await db.query("SELECT * FROM company WHERE email = $1", [email]);
		console.log("RESULTS: ", results.rowCount);
		if (results.rowCount === 0) {
			return false;
		}
		return results.rows[0];

	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

const getCompanyAdminById = async (adminId) => {
	const db = await pool.connect();
	try {
		const results = await db.query("SELECT * FROM company WHERE id = $1", [adminId]);
		return results.rows[0];
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

const getCompanyAdminEmailById = async (adminId) => {
	const db = await pool.connect();
	try {
	  const results = await db.query("SELECT email FROM company WHERE id = $1", [adminId]);
	  return results.rows[0]?.email; // Return the email or null if not found
	} catch (error) {
	  console.error('Error in getting user email:', error);
	  throw new Error("Internal error wah wah");
	} finally {
	  await db.release();
	}
  };

  const getSuperAdminEmail= async (superadminID) => {
	const db = await pool.connect();
	try {
	  const results = await db.query("SELECT email FROM superadmin WHERE id = $1", [superadminID]);
	  
	  if (results.rows.length > 0) {
		return results.rows[0].email;
	  } else {
		throw new Error("Superadmin with the specified id not found");
	  }
	} catch (error) {
	  console.error('Error in getting user data:', error);
	  throw new Error("Internal error wah wah");
	} finally {
	  db.release(); // Always release the database connection in a finally block
	}
  };
  

const getSingleSuperAdminData = async (email, password) => {
	try {
		const db = await pool.connect();
		const results = await db.query("SELECT * FROM superadmin WHERE email = $1", [email]);
		if (results.rowCount === 0) {
			return false;
		}

		const storedHashedPassword = results.rows[0].password;

		// Compare the entered password with the stored hashed password
		const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

		if (passwordMatch) {
			return results.rows[0];
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
}


const getSuperAdminById = async (superadminId) => {
	try {
		const db = await pool.connect();
		const results = await db.query("SELECT * FROM superadmin WHERE id = $1", [superadminId]);
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
  
  const checkEmailExists = async (email) => {
	const db = await pool.connect();
	try {
	  const result = await db.query(`
		SELECT COUNT(*) as count FROM (
		  SELECT 1 FROM company WHERE email = $1
		  UNION ALL
		  SELECT 1 FROM superadmin WHERE email = $1
		) AS combined_query;
	  `, [email]);
  
	  // If the count is greater than 0, the email exists
	  console.log(result);
	  return result.rows[0].count > 0;
	} catch (error) {
	  console.error('Error in checking email existence:', error);
	  throw new Error('Internal error');
	} finally {
	  db.release();
	}
  };
  

  const ChangeAdminPassword = async (newPassword, email) => {
    const db = await pool.connect();
    try {
        const hashedPassword = await hashPassword(newPassword); // Hash the new password

        // Try updating the password in the company table
        const companyResults = await db.query(`
            UPDATE company
            SET password = $1
            WHERE email = $2
            RETURNING *;
        `, [hashedPassword, email]);

        if (companyResults.rowCount > 0) {
            // Password updated in the company table
            return true;
        }

        // If not found in the company table, try updating in the superadmin table
        const superadminResults = await db.query(`
            UPDATE superadmin
            SET password = $1
            WHERE email = $2
            RETURNING *;
        `, [hashedPassword, email]);

        if (superadminResults.rowCount > 0) {
            // Password updated in the superadmin table
            return true;
        }

        // No rows were updated, which means the email was not found in either table
        console.error('No user found with this email:', email);
        return false;
    } catch (error) {
        console.error('Error in updating user password:', error);
        throw new Error('Internal error');
    } finally {
        db.release(); // Release the connection back to the pool
    }
};


  const updateAdmin = async (adminId, updatedAdmin) => {
	const db = await pool.connect();
  
	try {
	  const results = await db.query(
		`
		UPDATE company
		SET
		  admin_first_name = $1,
		  admin_last_name = $2,
		  company_name = $3,
		  full_schedule = $4,
		  email = $5,
		  password = $6
		WHERE
		  id = $7
		RETURNING *;
		`,
		[
		  updatedAdmin.admin_first_name,
		  updatedAdmin.admin_last_name,
		  updatedAdmin.company_name,
		  updatedAdmin.full_schedule,
		  updatedAdmin.email,
		  updatedAdmin.password,
		  adminId,
		]
	  );
  
	  if (results.rowCount > 0) {
		// Rows updated, return true
		return true;
	  }
  
	  // No rows were updated, admin not found with the given adminId
	  console.error('No admin found with this adminId:', adminId);
	  return false;
	} catch (error) {
	  console.error('Error in updating admin:', error);
	  throw new Error('Internal error');
	} finally {
	  db.release(); // Release the connection back to the pool
	}
  };
  

  const updateSuperAdmin = async (adminId, updatedAdmin) => {
	const db = await pool.connect();
  
	try {
	  const results = await db.query(
		`
		UPDATE superadmin
		SET
		  first_name = $1,
		  last_name = $2,
		  email = $3,
		  password = $4
		WHERE
		  id = $5
		RETURNING *;
		`,
		[
		  updatedAdmin.first_name,
		  updatedAdmin.last_name,
		  updatedAdmin.email,
		  updatedAdmin.password,
		  adminId,
		]
	  );
  
	  if (results.rowCount > 0) {
		// Rows updated, return true
		return true;
	  }
  
	  // No rows were updated, admin not found with the given adminId
	  console.error('No admin found with this adminId:', adminId);
	  return false;
	} catch (error) {
	  console.error('Error in updating admin:', error);
	  throw new Error('Internal error');
	} finally {
	  db.release(); // Release the connection back to the pool
	}
  };
  
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
	deleteActivationKey,
	createNewEmployee,
	deleteEmployee,
	getAllEmployeeData,	
	getActivationKey,
	getAllCompanies,
	getAllEmployeeDataByCompany,
	getSingleEmployeeData,
	addKeyByEmployeeMail,
	getSingleEmployeeByEmailData,
	getSingleCompanyAdminData,
	getSingleCompanyAdminDataByEmail,
	getSingleSuperAdminData,
	ChangePasswordEmployee,	
	getEmployeeSchedule,
	createEmployeeSchedule,
	updateEmployeeSchedule,
	updateEmployeeRememberSchedule,
	getAttendance,
	checkEmailExists,
	ChangeAdminPassword,
	updateAdmin,
	getCompanyAdminById,
	getSuperAdminById,
	updateSuperAdmin,
	getCompanyAdminEmailById,
	getSuperAdminEmail,
	pool
};
