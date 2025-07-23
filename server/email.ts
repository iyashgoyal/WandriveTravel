import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: 'wandrivo@gmail.com',
    pass: 'pzkvasiuseflwxko', // App Password from Gmail
  },
  // Remove tls: { rejectUnauthorized: false } unless absolutely necessary
});

export async function sendInquiryEmail(inquiry: Inquiry) {
  console.log('Starting email send process...');

  // Avoid logging sensitive information
  console.log('Using email configuration:', {
    from: '"Wandrivo Travel" <wandrivo@gmail.com>',
    to: 'yashgoyal4321@gmail.com',
    user: 'wandrivo@gmail.com',
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
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email notification:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}