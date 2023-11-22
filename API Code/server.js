const express = require('express');
const userModel = require('./userModel.js');

// Specify the port and express(Express framework for Node.js)
const port = 3000;
const app = express();

// Middleware for parching JSON requests
app.use(express.json());

// Middleware to handle CORS 
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://145.24.222.36');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});


// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
	try {
		const userData = await userModel.getAllUserData();
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

// Starting the API server
app.listen(port, () => {
	console.log(`Server running on port: ${port}.`);
});
