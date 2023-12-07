const Pool = require('pg').Pool;


// UHOH password is visible not good for production!!!
const pool = new Pool({ 
	user: 'postgres',
	host: 'localhost',
	database: 'BuurtBoer',
	port: 5432
});

// Functions to fetch data from the database
const getAllEmployeeData = async () => {
	try {
		const db = await pool.connect();

		const results = await db.query("SELECT * FROM employee");
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

const getEmployeeSchedule = async (employeeId, week) => {
	try {
	  const db = await pool.connect();
  
	  const results = await db.query(`
									  SELECT *
	                                  FROM schedule
									  JOIN schedulefromemployee ON schedulefromemployee.schedule_id = schedule.id
									  WHERE schedulefromemployee.employee_id = $1 AND schedule.week_number = $2
									`, [employeeId, week]);
	  return results.rows[0];
	} catch (error) {
	  console.error(error);
	  console.error('Error in getting user data:', error);
	  throw new Error("Internal error wah wah");
	}
  }

const getSingleEmployeeData = async (email, password) => {
	try {
		const db = await pool.connect();

		const results = await db.query("SELECT * FROM employee WHERE email = $1 AND password = $2", [email, password]);
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

const getSingleEmployeeByEmailData = async (email) => {
	try {
		const db = await pool.connect();

		const results = await db.query("SELECT * FROM employee WHERE email = $1", [email]);
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

const ChangePasswordEmployee = async (newPassword, email) => {
	try {
	  const db = await pool.connect();
  
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
	}
  };

const getSingleCompanyAdminData = async (email, password) => {
	try {
		const db = await pool.connect();

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



module.exports = {
	getAllEmployeeData,	
	getSingleEmployeeData,
	getSingleEmployeeByEmailData,
	getSingleCompanyAdminData,
	getSingleSuperAdminData,
	ChangePasswordEmployee,	
	getEmployeeSchedule,
	pool
};
