// Vercel serverless function entry point with updated package data
// CRITICAL FIX: Use ES modules for Vercel compatibility
import nodemailer from 'nodemailer';

// Email functions embedded directly to avoid import issues
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILERSEND_USERNAME,
      pass: process.env.MAILERSEND_PASSWORD
    },
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

const samplePackages = [
  // Domestic Packages
  {
    id: 1,
    title: "Himachal Adventure Package",
    description: "Experience the beauty of Himachal Pradesh with visits to Manali, Shimla, and the stunning Spiti Valley.",
    destination: "Himachal Pradesh",
    price: 25000,
    duration: 6,
    category: "domestic",
    subCategory: "mountain",
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    highlights: ["Rohtang Pass visit", "Solang Valley activities", "Old Manali exploration", "Spiti Valley tour"],
    itinerary: ["Day 1-2: Shimla sightseeing and Mall Road", "Day 3-4: Manali and Solang Valley", "Day 5-6: Spiti Valley tour"]
  },
  {
    id: 2,
    title: "Uttrakhand Divine Journey",
    description: "Explore the spiritual and natural wonders of Uttrakhand, including Rishikesh, Haridwar, and Mussoorie.",
    destination: "Uttrakhand",
    price: 22000,
    duration: 7,
    category: "domestic",
    subCategory: "spiritual",
    imageUrl: "https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80",
    highlights: ["Ganges Aarti", "River rafting", "Valley of flowers", "Yoga sessions"],
    itinerary: ["Day 1-2: Rishikesh yoga and rafting", "Day 3-4: Haridwar temples", "Day 5-7: Mussoorie hill station"]
  },
  {
    id: 3,
    title: "Andaman Island Paradise",
    description: "Discover the pristine beaches and crystal-clear waters of the Andaman Islands.",
    destination: "Andaman Islands",
    price: 45000,
    duration: 6,
    category: "domestic",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    highlights: ["Radhanagar Beach", "Scuba diving", "Cellular Jail visit", "Island hopping"],
    itinerary: ["Day 1-2: Port Blair and Cellular Jail", "Day 3-4: Havelock Island", "Day 5-6: Neil Island"]
  },
  {
    id: 4,
    title: "Royal Rajasthan Tour",
    description: "Experience the royal heritage and desert culture of Rajasthan.",
    destination: "Rajasthan",
    price: 35000,
    duration: 8,
    category: "domestic",
    subCategory: "heritage",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    highlights: ["Palace tours", "Desert safari", "Folk music", "Heritage hotels"],
    itinerary: ["Day 1-2: Jaipur Pink City", "Day 3-4: Udaipur lakes", "Day 5-6: Jodhpur fort", "Day 7-8: Jaisalmer desert"]
  },
  {
    id: 5,
    title: "Golden Triangle Classic",
    description: "Explore India's famous Golden Triangle: Delhi, Agra, and Jaipur.",
    destination: "Delhi-Agra-Jaipur",
    price: 28000,
    duration: 6,
    category: "domestic",
    subCategory: "heritage",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    highlights: ["Taj Mahal", "Red Fort", "Amber Palace", "Local markets"],
    itinerary: ["Day 1-2: Delhi exploration", "Day 3-4: Agra and Taj Mahal", "Day 5-6: Jaipur sightseeing"]
  },
  {
    id: 6,
    title: "Ladakh Adventure Trek",
    description: "Experience the breathtaking landscapes and Buddhist culture of Ladakh.",
    destination: "Ladakh",
    price: 40000,
    duration: 8,
    category: "domestic",
    subCategory: "adventure",
    imageUrl: "https://images.pexels.com/photos/3392154/pexels-photo-3392154.jpeg?w=800&q=80",
    highlights: ["Pangong Lake", "Monasteries", "Khardung La", "Nubra Valley"],
    itinerary: ["Day 1-2: Leh acclimatization", "Day 3-4: Monastery tour", "Day 5-6: Pangong Lake", "Day 7-8: Nubra Valley"]
  },
  {
    id: 7,
    title: "Sikkim-Darjeeling Expedition",
    description: "Discover the tea gardens and Himalayan views of Sikkim and Darjeeling.",
    destination: "Sikkim-Darjeeling",
    price: 32000,
    duration: 7,
    category: "domestic",
    subCategory: "nature",
    imageUrl: "https://images.pexels.com/photos/953497/pexels-photo-953497.jpeg?w=800&q=80",
    highlights: ["Tea gardens", "Tiger Hill sunrise", "Monastery visits", "Cable car ride"],
    itinerary: ["Day 1-3: Darjeeling exploration", "Day 4-5: Pelling", "Day 6-7: Gangtok"]
  },
  {
    id: 8,
    title: "Meghalaya Nature Tour",
    description: "Explore the living root bridges and waterfalls of Meghalaya.",
    destination: "Meghalaya",
    price: 28000,
    duration: 6,
    category: "domestic",
    subCategory: "nature",
    imageUrl: "https://images.pexels.com/photos/1403036/pexels-photo-1403036.jpeg?w=800&q=80",
    highlights: ["Living root bridges", "Cherrapunji", "Dawki River", "Caves"],
    itinerary: ["Day 1-2: Shillong", "Day 3-4: Cherrapunji", "Day 5-6: Dawki and Mawlynnong"]
  },
  {
    id: 9,
    title: "Kashmir Paradise Package",
    description: "Experience the paradise on earth with Kashmir's scenic beauty.",
    destination: "Kashmir",
    price: 35000,
    duration: 7,
    category: "domestic",
    subCategory: "nature",
    imageUrl: "https://images.pexels.com/photos/2907578/pexels-photo-2907578.jpeg?w=800&q=80",
    highlights: ["Dal Lake", "Gulmarg", "Pahalgam", "Mughal gardens"],
    itinerary: ["Day 1-3: Srinagar and Dal Lake", "Day 4-5: Gulmarg", "Day 6-7: Pahalgam"]
  },
  {
    id: 10,
    title: "Arunachal Explorer",
    description: "Discover the untouched beauty of Arunachal Pradesh.",
    destination: "Arunachal Pradesh",
    price: 38000,
    duration: 8,
    category: "domestic",
    subCategory: "adventure",
    imageUrl: "https://images.pexels.com/photos/15386580/pexels-photo-15386580.jpeg?w=800&q=80",
    highlights: ["Tawang Monastery", "Tribal villages", "Sela Pass", "Wildlife"],
    itinerary: ["Day 1-2: Bomdila", "Day 3-4: Tawang", "Day 5-6: Dirang", "Day 7-8: Ziro Valley"]
  },
  {
    id: 11,
    title: "Goa Beach Holiday",
    description: "Enjoy the beaches, nightlife, and Portuguese heritage of Goa.",
    destination: "Goa",
    price: 20000,
    duration: 5,
    category: "domestic",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    highlights: ["Beach hopping", "Water sports", "Old Goa churches", "Nightlife"],
    itinerary: ["Day 1-2: North Goa beaches", "Day 3: Old Goa tour", "Day 4-5: South Goa relaxation"]
  },
  {
    id: 12,
    title: "Kerala Backwaters",
    description: "Experience the serene backwaters and culture of Kerala.",
    destination: "Kerala",
    price: 30000,
    duration: 6,
    category: "domestic",
    subCategory: "nature",
    imageUrl: "https://images.pexels.com/photos/30778230/pexels-photo-30778230.jpeg?w=800&q=80",
    highlights: ["Houseboat stay", "Ayurveda", "Tea plantations", "Beaches"],
    itinerary: ["Day 1-2: Kochi", "Day 3-4: Alleppey backwaters", "Day 5-6: Munnar"]
  },
  {
    id: 13,
    title: "Karnataka Heritage",
    description: "Explore the historic sites and natural beauty of Karnataka.",
    destination: "Karnataka",
    price: 25000,
    duration: 7,
    category: "domestic",
    subCategory: "heritage",
    imageUrl: "https://images.pexels.com/photos/739987/pexels-photo-739987.jpeg?w=800&q=80",
    highlights: ["Hampi ruins", "Mysore Palace", "Coorg hills", "Wildlife"],
    itinerary: ["Day 1-2: Bangalore", "Day 3-4: Mysore", "Day 5-7: Coorg"]
  },
  {
    id: 14,
    title: "Tamil Nadu Temple Tour",
    description: "Visit the ancient temples and cultural sites of Tamil Nadu.",
    destination: "Tamil Nadu",
    price: 28000,
    duration: 6,
    category: "domestic",
    subCategory: "spiritual",
    imageUrl: "https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg?w=800&q=80",
    highlights: ["Meenakshi Temple", "Shore Temple", "Hill stations", "Classical dance"],
    itinerary: ["Day 1-2: Chennai", "Day 3-4: Madurai", "Day 5-6: Mahabalipuram"]
  },
  // International Packages
  {
    id: 15,
    title: "Bali Paradise",
    description: "Experience the tropical paradise and cultural richness of Bali.",
    destination: "Bali",
    price: 75000,
    duration: 6,
    category: "international",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    highlights: ["Ubud forests", "Temple visits", "Beach clubs", "Rice terraces"],
    itinerary: ["Day 1-2: Seminyak beaches", "Day 3-4: Ubud culture", "Day 5-6: Nusa Dua luxury"]
  },
  {
    id: 16,
    title: "Dubai Extravaganza",
    description: "Discover the modern marvels and desert beauty of Dubai.",
    destination: "Dubai",
    price: 85000,
    duration: 5,
    category: "international",
    subCategory: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    highlights: ["Burj Khalifa", "Desert safari", "Gold Souk", "Palm Jumeirah"],
    itinerary: ["Day 1-2: Dubai city tour", "Day 3: Desert adventure", "Day 4-5: Abu Dhabi"]
  },
  {
    id: 17,
    title: "Singapore Highlights",
    description: "Explore the modern city-state of Singapore.",
    destination: "Singapore",
    price: 70000,
    duration: 5,
    category: "international",
    subCategory: "city",
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    highlights: ["Gardens by the Bay", "Universal Studios", "Marina Bay Sands", "Sentosa"],
    itinerary: ["Day 1-2: City exploration", "Day 3: Sentosa Island", "Day 4-5: Shopping and leisure"]
  },
  {
    id: 18,
    title: "Vietnam Discovery",
    description: "Experience the natural wonders and rich history of Vietnam.",
    destination: "Vietnam",
    price: 65000,
    duration: 7,
    category: "international",
    subCategory: "culture",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    highlights: ["Ha Long Bay", "Cu Chi Tunnels", "Hoi An", "Mekong Delta"],
    itinerary: ["Day 1-2: Hanoi", "Day 3-4: Ha Long Bay", "Day 5-7: Ho Chi Minh City"]
  },
  {
    id: 19,
    title: "Thailand Adventure",
    description: "Discover the beaches, temples, and cuisine of Thailand.",
    destination: "Thailand",
    price: 60000,
    duration: 7,
    category: "international",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    highlights: ["Bangkok temples", "Phi Phi Islands", "Night markets", "Thai massage"],
    itinerary: ["Day 1-2: Bangkok", "Day 3-4: Chiang Mai", "Day 5-7: Phuket"]
  },
  {
    id: 20,
    title: "Maldives Paradise",
    description: "Relax in luxury overwater villas in the Maldives.",
    destination: "Maldives",
    price: 120000,
    duration: 5,
    category: "international",
    subCategory: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    highlights: ["Overwater villa", "Snorkeling", "Spa treatments", "Water sports"],
    itinerary: ["Day 1-5: Resort activities and water sports"]
  },
  {
    id: 21,
    title: "Malaysia Explorer",
    description: "Experience the diverse attractions of Malaysia.",
    destination: "Malaysia",
    price: 55000,
    duration: 6,
    category: "international",
    subCategory: "city",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    highlights: ["Petronas Towers", "Batu Caves", "Langkawi", "Food tour"],
    itinerary: ["Day 1-2: Kuala Lumpur", "Day 3-4: Penang", "Day 5-6: Langkawi"]
  },
  {
    id: 22,
    title: "Sri Lanka Heritage",
    description: "Discover the cultural and natural wonders of Sri Lanka.",
    destination: "Sri Lanka",
    price: 45000,
    duration: 7,
    category: "international",
    subCategory: "culture",
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    highlights: ["Sigiriya Rock", "Tea plantations", "Temple of Tooth", "Wildlife safari"],
    itinerary: ["Day 1-2: Colombo", "Day 3-4: Kandy", "Day 5-7: Nuwara Eliya"]
  }
];

// Query functions remain the same
function getPackages(params = {}) {
  let filtered = [...samplePackages];

  if (params.category) {
    filtered = filtered.filter(p => p.category === params.category);
  }

  if (params.destination) {
    const searchDestination = params.destination.toLowerCase().replace(/[+-]/g, ' ');
    filtered = filtered.filter(p => {
      const packageDestination = p.destination.toLowerCase();
      return packageDestination.includes(searchDestination) || searchDestination.includes(packageDestination);
    });
    console.log(`Filtering by destination "${params.destination}" (normalized: "${searchDestination}"). Found ${filtered.length} matches.`);
  }

  if (params.minPrice) {
    filtered = filtered.filter(p => p.price >= parseInt(params.minPrice));
  }

  if (params.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseInt(params.maxPrice));
  }

  if (params.minDuration) {
    filtered = filtered.filter(p => p.duration >= parseInt(params.minDuration));
  }

  if (params.maxDuration) {
    filtered = filtered.filter(p => p.duration <= parseInt(params.maxDuration));
  }

  if (params.subCategory) {
    filtered = filtered.filter(p => p.subCategory === params.subCategory);
  }

  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'duration_asc':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration_desc':
        filtered.sort((a, b) => b.duration - a.duration);
        break;
    }
  }

  return filtered;
}

function getPackage(id) {
  return samplePackages.find(p => p.id === id);
}

let inquiries = [];
let nextInquiryId = 1;

function createInquiry(inquiry) {
  const newInquiry = {
    id: nextInquiryId++,
    ...inquiry,
    createdAt: new Date().toISOString()
  };
  inquiries.push(newInquiry);
  return newInquiry;
}

export default async function handler(req, res) {
  // Enable CORS and no-cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const url = req.url || '';
  
  console.log('Request received:', method, url);
  
  try {
    if (method === 'GET' && url === '/api/packages') {
      const packages = getPackages(req.query || {});
      res.status(200).json(packages);
    } else if (method === 'GET' && url.startsWith('/api/packages/')) {
      const id = parseInt(url.split('/')[3]);
      const pkg = getPackage(id);
      if (!pkg) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.status(200).json(pkg);
    } else if (method === 'GET' && url === '/api/inquiries') {
      res.status(200).json(inquiries);
    } else if (method === 'POST' && url === '/api/inquiries') {
      console.log('📧 Processing new inquiry request in Vercel handler...');
      console.log('Request body:', req.body);
      
      // Create inquiry in memory first
      const inquiry = createInquiry(req.body);
      console.log('✅ Inquiry created with ID:', inquiry.id);
      
      // CRITICAL FIX: Send email notification
      console.log('📤 Attempting to send email notification...');
      let emailResult = null;
      let emailError = null;
      
      try {
        emailResult = await sendInquiryEmail(inquiry);
        console.log('✅ Email sent successfully:', emailResult.messageId);
      } catch (error) {
        console.error('❌ Email sending failed:', error);
        emailError = error.message;
        // Don't throw here - we still want to return the created inquiry
      }

      // Send response AFTER email processing is complete
      console.log('📤 Sending response to client...');
      res.status(201).json({
        ...inquiry,
        emailSent: emailResult?.success || false,
        emailMessageId: emailResult?.messageId || null,
        emailError: emailError,
        timestamp: new Date().toISOString()
      });
    } 
    // ADDED: Test email endpoints for debugging
    else if (method === 'GET' && url === '/api/test-smtp') {
      console.log('🔍 Testing SMTP connection...');
      const result = await testSMTPConnection();
      res.status(200).json(result);
    } else if (method === 'GET' && url === '/api/test-email') {
      console.log('📧 Testing email deployment...');
      const result = await testEmailDeployment();
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
      timestamp: new Date().toISOString()
    });
  }
}
