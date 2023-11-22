const Pool = require('pg').Pool;


// UHOH password is visible not good for production!!!
const pool = new Pool({ 
	user: 'postgres',
	host: 'localhost',
	database: 'BuurtBoerDataBase',
	password: 'BingBong5432',
	port: 5432
});

// Get data from database
const getAllUserData = async () => {
	try {
		// return await new Promise(function (resolve, reject) {
			// pool.query("SELECT * FROM users", (error, results) => {
				// if (error) {
					// reject(error);
				// }
// 
				// if (results && results.rows) {
					// resolve(results.rows);
				// } else {
					// reject(new Error("No data found wah wah"));
				// }
			// });
		// });

		const db = await pool.connect();

		const results = await db.query("SELECT * FROM users");
		return results.rows;
	} catch (error) {
		console.error(error);
		console.error('Error in getting user data:', error);
		console.error('Query:', 'SELECT * FROM users');
		throw new Error("Internal error wah wah");
	}
};

module.exports = {
	getAllUserData,	
	pool
};
