import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';
import * as dotenv from 'dotenv';

// Explicitly load environment variables
dotenv.config();

// Debug environment variables (remove after testing)
console.log('Debug - Environment variables:');
console.log('MAILERSEND_USERNAME:', process.env.MAILERSEND_USERNAME ? 'SET' : 'MISSING');
console.log('MAILERSEND_PASSWORD:', process.env.MAILERSEND_PASSWORD ? 'SET' : 'MISSING');
console.log('MAILERSEND_FROM_EMAIL:', process.env.MAILERSEND_FROM_EMAIL ? 'SET' : 'MISSING');

// Create reusable transporter object using Mailsender SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILERSEND_USERNAME,
    pass: process.env.MAILERSEND_PASSWORD
  },
  // Optional: Add connection timeout settings for better Vercel compatibility
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 10000      // 10 seconds
});

export async function sendInquiryEmail(inquiry: Inquiry) {
  // Additional debug info
  console.log('Attempting to send email with credentials check...');
  
  const mailOptions = {
    from: process.env.MAILERSEND_FROM_EMAIL || 'inquiries@yourdomain.com',
    to: process.env.EMAIL_USER || 'wandrivo@gmail.com',
    subject: 'New Travel Inquiry - Wandrivo Travel',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Travel Inquiry</h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
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
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This inquiry was submitted through the Wandrivo Travel website contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    // CRITICAL FIX: Wrap sendMail in a Promise and await it
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    console.log('Email sent successfully:', (info as any).messageId);
    return { 
      success: true, 
      messageId: (info as any).messageId,
      message: 'Inquiry email sent successfully' 
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send inquiry email');
  }
}

// Verify transporter configuration on startup (optional)
export async function verifyEmailConfiguration() {
  try {
    await transporter.verify();
    console.log('Mailsender SMTP configuration verified successfully');
    return { success: true, message: 'Email configuration verified' };
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return { success: false, error: 'Email configuration failed' };
  }
}
