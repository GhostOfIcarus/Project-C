const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'VariFlavors@gmail.com',
        pass: 'sudxkocdebhdxhbw',
    },
});


const mailOptions = {
    from: 'VariFlavors@gmail.com',
    to: 'ikbenlucya@gmail.com',
    subject: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    text: 'AAAAAAAA',
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});

