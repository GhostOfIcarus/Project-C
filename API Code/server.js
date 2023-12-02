const express = require('express');
const Functions = require('./API-Functions.js');

// Specify the port and express(Express framework for Node.js)
const port = 5000;
const app = express();

// Middleware for parching JSON requests
app.use(express.json());

// Middleware to handle CORS
app.use(function (req, res, next) {
	const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	  }
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});


// API endpoints to test the API

// Using inspect element in the browser, you can see the JSON response and error messages (right click -> inspect -> console)

// GET endpoint to test if the API is running
app.get('/api/hello', (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

// GET endpoint to get all the user data and send it back to the client, for testing purposes!!!
app.get('/api/employee/allemployees', async (req, res) => {
	try {
		const userData = await Functions.getAllEmployeeData();
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});


// API endpoints for the actual application

// POST endpoint to login, get the user data and send it back to the client
app.post('/api/employee/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await Functions.getSingleEmployeeData(email, password);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred getting the employee' });
	}
});

// POST endpoint to register a new user
app.post('/api/employee/register', async (req, res) => {
	try {
		const { First_Name, Last_Name, Email, Password, KeepSchedule } = req.body;
		const userData = await Functions.registerEmployee(First_Name, Last_Name, Email, Password, KeepSchedule);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred adding an employee to the database' });
	}
});


// Starting the API server
app.listen(port, () => {
	console.log(`Server running on port: ${port}.`);
});

// Close the database connection when the Node process ends
process.on('exit', (code) => {
	pool.end(err => {
	  if (err) {
		console.error('Failed to close the pool:', err);
	  }
	  console.log(`About to exit with code: ${code}`);
	});
  });
