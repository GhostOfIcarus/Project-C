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

const getSingleEmployeeData = async (email, password) => {
	try {
		const db = await pool.connect();

		const results = await db.query("SELECT * FROM employee WHERE email = $1 AND password = $2", [email, password]);
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		throw new Error("Internal error wah wah");
	}
};

module.exports = {
	getAllEmployeeData,	
	getSingleEmployeeData,
	pool
};