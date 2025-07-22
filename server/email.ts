import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'wandrivo@gmail.com',
    pass: process.env.EMAIL_PASSWORD // App Password from Gmail
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendInquiryEmail(inquiry: Inquiry) {
  console.log('Starting email send process...');
  console.log('Using email configuration:', {
    from: '"Wandrivo Travel" <wandrivo@gmail.com>',
    to: 'yashgoyal4321@gmail.com',
    user: process.env.EMAIL_USER,
    hasPassword: !!process.env.EMAIL_PASSWORD
  });

  const mailOptions = {
    from: '"Wandrivo Travel" <wandrivo@gmail.com>',
    to: 'yashgoyal4321@gmail.com',
    subject: `New Travel Inquiry from ${inquiry.name}`,
    html: `
      <h2>New Travel Inquiry Details</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>City of Residence:</strong> ${inquiry.cityOfResidence}</p>
      <p><strong>Phone Number:</strong> ${inquiry.phoneNumber}</p>
      <p><strong>WhatsApp:</strong> ${inquiry.whatsapp || 'Not provided'}</p>
      <p><strong>Travel Destination:</strong> ${inquiry.travelDestination}</p>
      <p><strong>Date of Travel:</strong> ${inquiry.dateOfTravel}</p>
      <p><strong>Number of People:</strong> ${inquiry.numberOfPeople}</p>
      <p><strong>Vacation Type:</strong> ${inquiry.vacationType}</p>
      <p><strong>Budget Range:</strong> ${inquiry.budgetRange}</p>
      <p><strong>Inquiry Time:</strong> ${inquiry.createdAt}</p>
    `
  };

  try {
    console.log('Checking email configuration...');
    if (!process.env.EMAIL_PASSWORD) {
      throw new Error('Email password not configured in environment variables');
    }
    if (!process.env.EMAIL_USER) {
      throw new Error('Email user not configured in environment variables');
    }

    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      // Log specific Gmail SMTP error codes if present
      if (error.toString().includes('SMTP')) {
        console.error('SMTP Error detected. Common issues:');
        console.error('- Check if Gmail "Less secure app access" is enabled');
        console.error('- Verify App Password is correct');
        console.error('- Check Gmail account settings for any security blocks');
      }
    }
    return false;
  }
}
