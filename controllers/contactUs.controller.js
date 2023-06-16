const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (req, res) => {
    const { name, email, message } = req.body;

    // Validate inputs using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    // Email options
    const mailOptions = {
        from: process.env.GMAIL_ACCOUNT,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
};

module.exports = { sendEmail };