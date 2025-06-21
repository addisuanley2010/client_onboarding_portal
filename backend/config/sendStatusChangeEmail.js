const {transporter} = require('../config/emailConfig');

const sendStatusChangeEmail = async (clientEmail, status,token,name) => {
    const mailOptions = {
        from: 'addisuanley2010@gmail.com',
        to: clientEmail,
        subject: 'Your Onboarding Status Update',
        html: `<p>Dear ${name},</p>
               <p>We wanted to inform you that your onboarding status has been updated to <strong>${status}</strong>.</p>
               <p>You can track your onboarding progress by clicking here: <a href="https://client-onboarding-portal.onrender.com/api/users/onboarding/${token}">View Onboarding Status</a></p>
               <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
               <p>Best regards,<br>The Teamwork Software Team</p>`,     
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendRegisterEmail = async (clientEmail, status,token,name) => {
    const mailOptions = {
        from: 'addisuanley2010@gmail.com',
        to: clientEmail,
        subject: 'Welcome to Our Client Onboarding Portal',
        html: `<p>Dear ${name},</p>
               <p>Thank you for registering with our Client Onboarding Portal. Your registration has been successfully completed with an initial status of <strong>${status}</strong>.</p>
               <p>You can now access your account to track your onboarding progress and complete any required steps.</p>
               <p>To view your onboarding status, please click here: <a href="https://client-onboarding-portal.onrender.com/api/users/onboarding/${token}">View Onboarding Status</a></p>
               <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
               <p>Best regards,<br>The Teamwork Software Team</p>`,     
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {sendStatusChangeEmail,sendRegisterEmail};