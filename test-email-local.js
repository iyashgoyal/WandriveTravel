// Test script to verify MailerSend configuration locally
// Run with: node test-email-local.js

import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🧪 Testing MailerSend Configuration Locally');
console.log('==========================================');

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('MAILERSEND_USERNAME:', process.env.MAILERSEND_USERNAME ? '✅ SET' : '❌ MISSING');
console.log('MAILERSEND_PASSWORD:', process.env.MAILERSEND_PASSWORD ? '✅ SET' : '❌ MISSING');
console.log('MAILERSEND_FROM_EMAIL:', process.env.MAILERSEND_FROM_EMAIL || '❌ MISSING');
console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ MISSING');

if (!process.env.MAILERSEND_USERNAME || !process.env.MAILERSEND_PASSWORD) {
  console.error('\n❌ Missing required environment variables!');
  console.log('Please set MAILERSEND_USERNAME and MAILERSEND_PASSWORD in your .env file');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILERSEND_USERNAME,
    pass: process.env.MAILERSEND_PASSWORD
  },
  debug: true,
  logger: true
});

async function testConnection() {
  console.log('\n🔍 Testing SMTP Connection...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return false;
  }
}

async function testEmailSending() {
  console.log('\n📧 Testing Email Sending...');
  
  const mailOptions = {
    from: process.env.MAILERSEND_FROM_EMAIL || 'inquiries@wandrivo.com',
    to: process.env.EMAIL_USER || 'wandrivo@gmail.com',
    subject: `Test Email - ${new Date().toISOString()}`,
    html: `
      <h2>🧪 Local Test Email</h2>
      <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
      <p><strong>Environment:</strong> Local Development</p>
      <p>If you receive this email, your MailerSend configuration is working correctly!</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    return false;
  }
}

// Run tests
async function runTests() {
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    await testEmailSending();
  } else {
    console.log('\n❌ Skipping email test due to connection failure');
  }
  
  console.log('\n🏁 Test completed');
  process.exit(0);
}

runTests().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
