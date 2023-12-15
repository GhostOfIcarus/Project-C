const nodemailer = require('nodemailer');
const express = require('express');


// Specify the port and init the express app
const port = 5001;
const app = express();

// Middleware for parching JSON requests
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnbuurtboer@gmail.com',
        pass: 'zgvvlnsmtqehatpc'
    },
});

const mailOptions = {
    from: 'johnbuurtboer@gmail.com',
    to: 'kimleeters@gmail.com',
    subject: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    text: 'AAAAAAAA',
};

// Send test mail



// Starting the API server
app.listen(port, () => {
	console.log(`Email server running on port: ${port}.`);
});

// Close the database connection when the Node process ends
process.on('exit', (code) => {
	  console.log(`About to exit with code: ${code}`);
  });


