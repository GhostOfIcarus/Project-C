const express = require('express');
const Functions = require('./API-Functions.js');

// Specify the port and express(Express framework for Node.js)
const port = 5000;
const app = express();

// Middleware for parching JSON requests
app.use(express.json());

// Middleware to handle CORS
app.use(function (req, res, next) {
	const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081', 'http://localhost:8081'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	  }
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});


// API endpoints to fetch data
app.get('/api/hello', (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

app.get('/api/employee/allemployees', async (req, res) => {
	try {
		const userData = await Functions.getAllEmployeeData();
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

app.post('/api/employee/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await Functions.getSingleEmployeeData(email, password);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
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
