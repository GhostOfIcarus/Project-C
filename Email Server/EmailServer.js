const nodemailer = require('nodemailer');
const express = require('express');
const EmailTemplates = require('./EmailTemplates.js');
const jwt = require('jsonwebtoken');


// Specify the port and init the express app
const port = 5001;
const app = express();

// Middleware to handle CORS
app.use(function (req, res, next) {
	const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000','http://localhost:8081', 'http://10.0.2.2:3000', 'http://10.0.2.2:8081'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

	// Allow credentials
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
  });

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
    to: '',
    subject: '',
    text: '',
};

// Send test email endpoint
app.post('/sendEmail/Test', (req, res) => {
    mailOptions.to = req.body.to;
    mailOptions.subject = req.body.subject;
    mailOptions.html = EmailTemplates.testEmail(req.body.name);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent: ' + info.response);
        }
    });
});

// Send forgot password email endpoint
app.post('/sendEmail/forgotPassword', (req, res) => {
    mailOptions.to = req.body.to;
    mailOptions.subject = req.body.subject;

    const tempToken = jwt.sign({ email : req.body.to }, 'nothisispatrick', { expiresIn: '1h' });

    mailOptions.html = EmailTemplates.forgotPassword(req.body.name, `http://localhost:3000/change_password?token=${tempToken}`);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent: ' + info.response);
        }
    });
});

// Send company registration email endpoint
app.post('/sendEmail/companyRegistration', (req, res) => {
    mailOptions.to = req.body.to;
    mailOptions.subject = "Registreer je bedrijf";
    
    const tempToken = jwt.sign({ adminEmail : req.body.to, companyName : req.body.CompanyName, adminFirstName : req.body.adminFirstName, adminLastName : req.body.adminLastName }, 'nothisispatrick', { expiresIn: '1h' });

    mailOptions.html = EmailTemplates.companyRegistration(req.body.adminFirstName, `http://localhost:3000/Company_Register?token=${tempToken}`);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent: ' + info.response);
        }
    });
});


// Decode and verify JWT token
app.post('/checkToken', async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = await jwt.verify(token, 'nothisispatrick');
        console.log(decoded);
        res.status(200).send({ message: 'Token verified', data: decoded });
    } catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
});


// Starting the email server
app.listen(port, () => {
	console.log(`Email server running on port: ${port}.`);
});

// Close the database connection when the Node process ends
process.on('exit', (code) => {
	  console.log(`About to exit with code: ${code}`);
  });


