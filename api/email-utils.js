// Email utilities for Vercel serverless function (CommonJS compatible)
const nodemailer = require('nodemailer');

// FIXED: Create transporter function for serverless environment
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILERSEND_USERNAME,
      pass: process.env.MAILERSEND_PASSWORD
    },
    // Optimized for Vercel serverless
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    pool: false,
    maxConnections: 1,
    maxMessages: 1,
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
  });
}

// Test SMTP connection
async function testSMTPConnection() {
  console.log('=== TESTING SMTP CONNECTION ===');
  const transporter = createTransporter();
  
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
    return { 
      success: false, 
      error: error.message,
      errorCode: error.code,
      timestamp: new Date().toISOString()
    };
  } finally {
    transporter.close();
  }
}

// Test email sending
async function testEmailDeployment() {
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

  const transporter = createTransporter();

  try {
    console.log('Attempting to send test email...');
    const info = await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        console.error('❌ Test email timeout after 20 seconds');
        reject(new Error('Email sending timeout'));
      }, 20000);

      transporter.sendMail(testMailOptions, (error, info) => {
        clearTimeout(timeoutId);
        
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
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Test email failed:', error);
    
    return { 
      success: false, 
      error: error.message,
      errorCode: error.code,
      errorResponse: error.response,
      timestamp: new Date().toISOString()
    };
  } finally {
    transporter.close();
  }
}

// Send inquiry email
async function sendInquiryEmail(inquiry) {
  console.log('=== SENDING INQUIRY EMAIL ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Inquiry from:', inquiry.name, '(' + inquiry.email + ')');
  
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'inquiries@wandrivo.com';
  const toEmail = process.env.EMAIL_USER || 'wandrivo@gmail.com';
  
  console.log('Email Configuration:');
  console.log('From Email:', fromEmail);
  console.log('To Email:', toEmail);
  
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

  const transporter = createTransporter();

  try {
    console.log('Step 1: Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    console.log('Step 2: Sending email...');
    const info = await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        console.error('❌ Email sending timeout after 25 seconds');
        reject(new Error('Email sending timeout - serverless function limit reached'));
      }, 25000);

      transporter.sendMail(mailOptions, (error, info) => {
        clearTimeout(timeoutId);
        
        if (error) {
          console.error('❌ Email sending error in callback:', error);
          reject(error);
        } else {
          console.log('✅ Email sent successfully in callback!');
          resolve(info);
        }
      });
    });

    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Final Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Inquiry email sent successfully',
      response: info.response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ EMAIL SENDING FAILED!');
    console.error('Error:', error);
    
    let errorMessage = 'Failed to send inquiry email';
    if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email sending timed out - network connectivity issue';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed - check credentials';
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email addresses - check from/to addresses';
    } else if (error.responseCode === 450) {
      errorMessage = 'Domain verification required - check MailerSend dashboard';
    }
    
    throw new Error(errorMessage + ': ' + error.message);
  } finally {
    transporter.close();
  }
}

module.exports = {
  sendInquiryEmail,
  testSMTPConnection,
  testEmailDeployment
};
