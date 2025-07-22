import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wandrivo@gmail.com',
    pass: 'pzkv asiu sefl wxko' // You'll need to set this up in your environment variables
  }
});

export async function sendInquiryEmail(inquiry: Inquiry) {
  const mailOptions = {
    from: '"Wandrivo Travel" <wandrivo@gmail.com>',
    to: 'wandrivo@gmail.com',
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
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
