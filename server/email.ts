import nodemailer from 'nodemailer';
import type { Inquiry } from '@shared/schema';
import * as dotenv from 'dotenv';

// Explicitly load environment variables
dotenv.config();

// Production debugging - Environment variables check
console.log('=== EMAIL CONFIGURATION DEBUG ===');
console.log('Environment Variables Status:');
console.log('MAILERSEND_USERNAME:', process.env.MAILERSEND_USERNAME ? 'SET' : 'MISSING');
console.log('MAILERSEND_PASSWORD:', process.env.MAILERSEND_PASSWORD ? 'SET' : 'MISSING');
console.log('MAILERSEND_FROM_EMAIL:', process.env.MAILERSEND_FROM_EMAIL || 'MISSING');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'MISSING');
console.log('Node Environment:', process.env.NODE_ENV || 'undefined');
console.log('===================================');

// Create reusable transporter object using Mailsender SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILERSEND_USERNAME,
    pass: process.env.MAILERSEND_PASSWORD
  },
  // Optimized timeouts for Vercel deployment
  connectionTimeout: 8000,
  greetingTimeout: 4000,
  socketTimeout: 8000,
  // Additional debugging options
  debug: true, // Enable debug logging
  logger: true // Enable logger
});

// Test SMTP connection function - REQUIRED by routes.ts
export async function testSMTPConnection() {
  console.log('=== TESTING SMTP CONNECTION ===');
  try {
    console.log('Attempting to verify SMTP connection...');
    const result = await transporter.verify();
    console.log('✅ SMTP connection successful:', result);
    return { 
      success: true, 
      message: 'SMTP connection verified successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    return { 
      success: false, 
      error: error.message,
      errorCode: error.code,
      timestamp: new Date().toISOString()
    };
  }
}

// Test email sending function - REQUIRED by routes.ts
export async function testEmailDeployment() {
  console.log('=== TESTING EMAIL DEPLOYMENT ===');
  console.log('Timestamp:', new Date().toISOString());
  
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'inquiries@wandrivo.com';
  const toEmail = process.env.EMAIL_USER || 'wandrivo@gmail.com';
  
  console.log(`From Email: ${fromEmail}`);
  console.log(`To Email: ${toEmail}`);
  
  const testMailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: `Deployment Test Email - ${new Date().toISOString()}`,
    html: `
      <h2>🧪 Email Deployment Test</h2>
      <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
      <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'undefined'}</p>
      <p><strong>From:</strong> ${fromEmail}</p>
      <p><strong>To:</strong> ${toEmail}</p>
      <p>If you receive this email, your deployment email configuration is working correctly!</p>
    `,
  };

  try {
    console.log('Attempting to send test email...');
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(testMailOptions, (error, info) => {
        if (error) {
          console.error('❌ Test email error in callback:', error);
          reject(error);
        } else {
          console.log('✅ Test email success in callback:', info);
          resolve(info);
        }
      });
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', (info as any).messageId);
    console.log('Response:', (info as any).response);
    
    return { 
      success: true, 
      messageId: (info as any).messageId,
      response: (info as any).response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Test email failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    
    return { 
      success: false, 
      error: error.message,
      errorCode: error.code,
      errorResponse: error.response,
      timestamp: new Date().toISOString()
    };
  }
}

export async function sendInquiryEmail(inquiry: Inquiry) {
  console.log('=== SENDING INQUIRY EMAIL ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Inquiry from:', inquiry.name, '(' + inquiry.email + ')');
  
  // Verify environment variables are available
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'inquiries@wandrivo.com';
  const toEmail = process.env.EMAIL_USER || 'wandrivo@gmail.com';
  
  console.log('Email Configuration:');
  console.log('From Email:', fromEmail);
  console.log('To Email:', toEmail);
  console.log('SMTP Host: smtp.mailersend.net');
  console.log('SMTP Port: 587');
  
  // Check authentication credentials
  if (!process.env.MAILERSEND_USERNAME || !process.env.MAILERSEND_PASSWORD) {
    console.error('❌ Missing SMTP credentials!');
    throw new Error('SMTP credentials not configured properly');
  }
  
  const mailOptions = {
    from: fromEmail,
    to: toEmail,
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
          <p>Customer email: ${inquiry.email}</p>
          <p>Server timestamp: ${new Date().toISOString()}</p>
        </div>
      </div>
    `,
  };

  console.log('Mail options prepared. Attempting to send...');

  try {
    // Test connection before sending
    console.log('Step 1: Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Send the email
    console.log('Step 2: Sending email...');
    const info = await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        console.error('❌ Email sending timeout after 30 seconds');
        reject(new Error('Email sending timeout'));
      }, 30000); // 30 second timeout

      transporter.sendMail(mailOptions, (error, info) => {
        clearTimeout(timeoutId);
        
        if (error) {
          console.error('❌ Email sending error in callback:', error);
          console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
          });
          reject(error);
        } else {
          console.log('✅ Email sent successfully in callback!');
          console.log('Message details:', {
            messageId: info.messageId,
            response: info.response,
            accepted: info.accepted,
            rejected: info.rejected
          });
          resolve(info);
        }
      });
    });

    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Final Message ID:', (info as any).messageId);
    console.log('Final Response:', (info as any).response);
    console.log('Email accepted by:', (info as any).accepted);
    console.log('Email rejected by:', (info as any).rejected);
    
    return { 
      success: true, 
      messageId: (info as any).messageId,
      message: 'Inquiry email sent successfully',
      response: (info as any).response,
      accepted: (info as any).accepted,
      rejected: (info as any).rejected,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ EMAIL SENDING FAILED!');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    console.error('Error response:', error.response);
    console.error('Full error object:', error);
    
    // Provide more specific error information
    let errorMessage = 'Failed to send inquiry email';
    if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email sending timed out - network connectivity issue';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed - check credentials';
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email addresses - check from/to addresses';
    } else if (error.responseCode === 450) {
      errorMessage = 'Domain verification required - check Mailsender dashboard';
    }
    
    throw new Error(errorMessage + ': ' + error.message);
  }
}

// Verify transporter configuration on startup
export async function verifyEmailConfiguration() {
  console.log('=== VERIFYING EMAIL CONFIGURATION ===');
  try {
    console.log('Checking transporter configuration...');
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return { 
      success: true, 
      message: 'Email configuration verified',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error);
    console.error('Configuration error details:', {
      message: error.message,
      code: error.code,
      host: 'smtp.mailersend.net',
      port: 587,
      hasUsername: !!process.env.MAILERSEND_USERNAME,
      hasPassword: !!process.env.MAILERSEND_PASSWORD
    });
    return { 
      success: false, 
      error: error.message,
      errorCode: error.code,
      timestamp: new Date().toISOString()
    };
  }
}

console.log('📧 Email module loaded successfully');
