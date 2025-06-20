const {transporter} = require('../config/emailConfig');

const sendStatusChangeEmail = async (clientEmail, status,token,name) => {
    const mailOptions = {
        from: 'addisuanley2010@gmail.com',
        to: clientEmail,
        subject: 'Your Onboarding Status has Changed to ' + status,
        html: `<p>Dear ${name},</p>
               <p>We wanted to inform you that your onboarding status has changed to <strong>${status}</strong>.</p>
               <p>Please check your account for more details.</p>
               <p>For further information, visit: <a href="http://localhost:3000/api/users/onboarding/${token}">Onboarding Status</a></p>
               <p>Best regards,<br>The Teamwork Software!</p>`,
     
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {sendStatusChangeEmail};