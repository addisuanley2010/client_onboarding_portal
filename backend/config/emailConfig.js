const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false, 
    auth: {
        user: 'addisuanley2010@gmail.com',
        pass:process.env.EMAIL_PASSWORD,
    },
});

module.exports = {transporter}; 